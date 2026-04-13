import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import { randomUUID } from "crypto";
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "./src/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

async function startServer() {
  const app = express();
  const PORT = 3000;
  const r2AccountId = process.env.R2_ACCOUNT_ID || "";
  const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID || "";
  const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY || "";
  const r2Bucket = process.env.R2_BUCKET_NAME || "";
  const r2PublicBaseUrl = process.env.R2_PUBLIC_BASE_URL || "";
  const r2Endpoint = process.env.R2_ENDPOINT || (r2AccountId ? `https://${r2AccountId}.r2.cloudflarestorage.com` : "");
  const canUseR2 = Boolean(r2Endpoint && r2AccessKeyId && r2SecretAccessKey && r2Bucket);

  app.use(cors());
  app.use(express.json());

  const s3 = canUseR2
    ? new S3Client({
      region: "auto",
      endpoint: r2Endpoint,
      credentials: {
        accessKeyId: r2AccessKeyId,
        secretAccessKey: r2SecretAccessKey,
      },
    })
    : null;

  const sanitizeFolder = (input: string) =>
    input
      .replace(/\.\./g, "")
      .replace(/[^a-zA-Z0-9/_-]/g, "")
      .replace(/\/+/g, "/")
      .replace(/^\/|\/$/g, "") || "misc";

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  });

  app.post("/api/files/upload", upload.single("file"), async (req, res) => {
    try {
      if (!canUseR2 || !s3) {
        return res.status(500).json({
          success: false,
          error: "R2 non configuré. Ajoutez R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY et R2_BUCKET_NAME.",
        });
      }

      if (!req.file) {
        return res.status(400).json({ success: false, error: "Aucun fichier reçu." });
      }

      const folderRaw = typeof req.body?.folder === "string" ? req.body.folder : "misc";
      const folder = sanitizeFolder(folderRaw);
      const safeOriginal = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
      const objectKey = `${folder}/${Date.now()}-${randomUUID()}-${safeOriginal}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: r2Bucket,
          Key: objectKey,
          Body: req.file.buffer,
          ContentType: req.file.mimetype || "application/octet-stream",
          ContentDisposition: `inline; filename="${safeOriginal}"`,
        })
      );

      const fileUrl = r2PublicBaseUrl
        ? `${r2PublicBaseUrl.replace(/\/$/, "")}/${objectKey}`
        : `/api/files/download?publicId=${encodeURIComponent(objectKey)}`;

      return res.status(200).json({
        success: true,
        url: fileUrl,
        publicId: objectKey,
        name: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });
    } catch (error) {
      console.error("Erreur upload API:", error);
      return res.status(500).json({ success: false, error: "Erreur interne du serveur." });
    }
  });

  app.delete("/api/files", (req, res) => {
    try {
      if (!canUseR2 || !s3) {
        return res.status(500).json({
          success: false,
          error: "R2 non configuré.",
        });
      }

      const publicId = String(req.query.publicId || "");
      if (!publicId) {
        return res.status(400).json({ success: false, error: "publicId manquant." });
      }

      const safePath = publicId.replace(/\.\./g, "").replace(/^\/+/, "");
      s3
        .send(
          new DeleteObjectCommand({
            Bucket: r2Bucket,
            Key: safePath,
          })
        )
        .then(() => res.status(200).json({ success: true }))
        .catch((error) => {
          console.error("Erreur suppression API:", error);
          res.status(500).json({ success: false, error: "Erreur interne du serveur." });
        });
    } catch (error) {
      console.error("Erreur suppression API:", error);
      return res.status(500).json({ success: false, error: "Erreur interne du serveur." });
    }
  });

  app.get("/api/files/download", async (req, res) => {
    try {
      if (!canUseR2 || !s3) {
        return res.status(500).json({
          success: false,
          error: "R2 non configuré.",
        });
      }

      const publicId = String(req.query.publicId || "");
      if (!publicId) {
        return res.status(400).json({ success: false, error: "publicId manquant." });
      }

      const safePath = publicId.replace(/\.\./g, "").replace(/^\/+/, "");
      const command = new GetObjectCommand({
        Bucket: r2Bucket,
        Key: safePath,
      });
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 10 });
      return res.redirect(signedUrl);
    } catch (error) {
      console.error("Erreur download API:", error);
      return res.status(500).json({ success: false, error: "Erreur interne du serveur." });
    }
  });

  // Webhook for PADDE-CI
  app.post("/api/webhooks/padde-ci", async (req, res) => {
    try {
      const data = req.body;

      const auditId = `PADDE-${Math.floor(1000 + Math.random() * 9000)}`;
      await setDoc(doc(db, 'padde_audits', auditId), {
        ...data,
        createdAt: new Date().toISOString(),
        processed: false
      });

      res.status(200).json({ success: true, message: "Demande d'audit reçue et traitée avec succès." });
    } catch (error) {
      console.error("Erreur Webhook PADDE-CI:", error);
      res.status(500).json({ success: false, error: "Erreur interne du serveur." });
    }
  });

  // GET Webhook for PADDE-CI (to view audits in admin.html)
  app.get("/api/webhooks/padde-ci", async (req, res) => {
    try {
      const { getDocs, query, collection, where } = await import("firebase/firestore");
      const q = query(
        collection(db, 'tasks'),
        where('title', '>=', 'Audit PADDE-CI'),
        where('title', '<=', 'Audit PADDE-CI\uf8ff')
      );

      const snapshot = await getDocs(q);
      const audits = snapshot.docs.map(doc => {
        const data = doc.data();
        // Extract original data from description if possible, or just return basic info
        let originalData: any = {};
        try {
          const description = data.description || '';
          const detailsMatch = description.match(/Détails complets:\n([\s\S]*)$/);
          if (detailsMatch && detailsMatch[1]) {
            originalData = JSON.parse(detailsMatch[1]);
          }
        } catch (e) { }

        return {
          id: doc.id,
          type_audit: originalData?.type || 'audit-inconnu',
          date: data.createdAt,
          donnees_completes: originalData || {}
        };
      });

      res.status(200).json(audits);
    } catch (error) {
      console.error("Erreur GET Webhook PADDE-CI:", error);
      res.status(500).json({ success: false, error: "Erreur interne du serveur." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
