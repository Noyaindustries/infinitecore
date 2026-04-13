import { Handler } from "@netlify/functions";
import { deleteObject, hasR2Config, sanitizeObjectKey } from "./_r2";

const json = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "DELETE, OPTIONS",
  },
  body: JSON.stringify(body),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, { ok: true });
  if (event.httpMethod !== "DELETE") return json(405, { success: false, error: "Method Not Allowed" });

  if (!hasR2Config) return json(500, { success: false, error: "R2 non configuré." });

  try {
    const publicId = event.queryStringParameters?.publicId || "";
    if (!publicId) return json(400, { success: false, error: "publicId manquant." });

    const key = sanitizeObjectKey(publicId);
    await deleteObject(key);
    return json(200, { success: true });
  } catch (error) {
    console.error("Erreur files-delete:", error);
    return json(500, { success: false, error: "Erreur interne du serveur." });
  }
};
