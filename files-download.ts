import { Handler } from "@netlify/functions";
import { getSignedObjectUrl, hasR2Config, sanitizeObjectKey } from "./_r2";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: "Method Not Allowed" }),
    };
  }

  if (!hasR2Config) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: "R2 non configuré." }),
    };
  }

  try {
    const publicId = event.queryStringParameters?.publicId || "";
    if (!publicId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false, error: "publicId manquant." }),
      };
    }

    const key = sanitizeObjectKey(publicId);
    const signedUrl = await getSignedObjectUrl(key);
    return {
      statusCode: 302,
      headers: {
        Location: signedUrl,
        "Cache-Control": "no-store",
      },
      body: "",
    };
  } catch (error) {
    console.error("Erreur files-download:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: "Erreur interne du serveur." }),
    };
  }
};
