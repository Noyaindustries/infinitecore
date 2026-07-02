import { Handler } from '@netlify/functions';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  initializeFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  type Firestore,
} from 'firebase/firestore';
import { randomUUID } from 'crypto';

const firebaseConfig = {
  apiKey: 'AIzaSyBmSQsOxI4IJ7kSDn8z23gl6wZCgfzmGRU',
  authDomain: 'noya-industries-platform.firebaseapp.com',
  projectId: 'noya-industries-platform',
  storageBucket: 'noya-industries-platform.firebasestorage.app',
  messagingSenderId: '994757523169',
  appId: '1:994757523169:web:307dab266ab318dedae9a0',
};

const firestoreDatabaseId = 'ai-studio-42406826-d231-4e61-bda4-7369948f2694';

let cachedApp: FirebaseApp | undefined;
let cachedDb: Firestore | undefined;

function getDb(): Firestore {
  if (cachedDb) return cachedDb;
  cachedApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  cachedDb = initializeFirestore(
    cachedApp,
    { experimentalForceLongPolling: true },
    firestoreDatabaseId
  );
  return cachedDb;
}

const ALLOWED_ORIGINS = [
  'https://padde-ci.com',
  'https://www.padde-ci.com',
  'https://paddeci.netlify.app',
];

function auditTypeLabel(type: string | undefined): string {
  if (type === 'audit-rapide') return 'Rapide';
  if (type === 'audit-business') return 'Business';
  if (type === 'audit-institutionnel') return 'Institutionnel';
  return 'Institutionnel';
}

function clientNameFromPayload(data: Record<string, unknown>): string {
  const name =
    data.entreprise ?? data.dirigeant ?? data.denomination ?? data.responsable;
  return typeof name === 'string' && name.trim() ? name.trim() : 'Client PADDE-CI';
}

export const handler: Handler = async (event) => {
  const reqOrigin = event.headers.origin ?? event.headers.Origin ?? '';
  const corsOrigin =
    reqOrigin && ALLOWED_ORIGINS.includes(reqOrigin) ? reqOrigin : ALLOWED_ORIGINS[0];

  const headers = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const db = getDb();

    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body || '{}') as Record<string, unknown>;
      const type = typeof data.type === 'string' ? data.type : 'audit-generique';
      const label = auditTypeLabel(type);
      const clientName = clientNameFromPayload(data);
      const createdAt = new Date().toISOString();

      // Collection historique (Vercel /api/webhooks/padde-ci) — create: if true
      const auditId = `PADDE-${randomUUID().split('-')[0].toUpperCase()}`;
      await setDoc(doc(db, 'padde_audits', auditId), {
        ...data,
        source: 'padde-ci',
        createdAt,
        processed: false,
      });

      const taskId = `TSK-PADDE-${randomUUID().split('-')[0].toUpperCase()}`;
      await setDoc(doc(db, 'tasks', taskId), {
        id: taskId,
        userId: 'system',
        title: `Audit PADDE-CI: ${label}`,
        client: clientName,
        columnId: 'nouveau',
        isOrder: false,
        source: 'padde-ci',
        createdAt,
        updatedAt: createdAt,
        description: `Demande d'audit depuis padde-ci.com\nType: ${type}\nContact: ${data.whatsapp || 'Non fourni'}\n\nDétails:\n${JSON.stringify(data, null, 2)}`,
      });

      const orderId = `CMD-PADDE-${randomUUID().split('-')[0].toUpperCase()}`;
      await setDoc(doc(db, 'orders', orderId), {
        id: orderId,
        userId: 'system',
        clientName,
        serviceName: `Audit PADDE-CI: ${label}`,
        status: 'Nouveau',
        source: 'padde-ci',
        createdAt,
        details: data,
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Demande d'audit reçue.",
          auditId,
          orderId,
          taskId,
        }),
      };
    }

    if (event.httpMethod === 'GET') {
      const q = query(collection(db, 'padde_audits'), where('source', '==', 'padde-ci'));
      const snapshot = await getDocs(q);
      const audits = snapshot.docs.map((d) => {
        const row = d.data();
        return {
          id: d.id,
          type_audit: row.type,
          date: row.createdAt,
          statut: row.processed ? 'Traité' : 'Nouveau',
          client: clientNameFromPayload(row as Record<string, unknown>),
          donnees_completes: row,
        };
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(audits),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Erreur Netlify Function PADDE-CI:', message, error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Erreur interne du serveur.',
        detail: message.slice(0, 200),
      }),
    };
  }
};
