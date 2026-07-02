import { Handler } from '@netlify/functions';
import { initializeApp, getApps } from 'firebase/app';
import {
  initializeFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { randomUUID } from 'crypto';

const firebaseConfig = {
  apiKey: "AIzaSyBmSQsOxI4IJ7kSDn8z23gl6wZCgfzmGRU",
  authDomain: "noya-industries-platform.firebaseapp.com",
  projectId: "noya-industries-platform",
  storageBucket: "noya-industries-platform.firebasestorage.app",
  messagingSenderId: "994757523169",
  appId: "1:994757523169:web:307dab266ab318dedae9a0",
};

const firestoreDatabaseId = "ai-studio-42406826-d231-4e61-bda4-7369948f2694";

// Éviter la réinitialisation à chaque invocation (warm instances)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = initializeFirestore(
  app,
  { experimentalForceLongPolling: true },
  firestoreDatabaseId
);

const ALLOWED_ORIGINS = ['https://padde-ci.com', 'https://www.padde-ci.com'];

export const handler: Handler = async (event) => {
  const reqOrigin =
    event.headers.origin ?? event.headers.Origin ?? '';
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
    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body || '{}');

      const auditTypeLabel =
        data.type === 'audit-rapide' ? 'Rapide' :
        data.type === 'audit-business' ? 'Business' : 'Institutionnel';

      const clientName =
        data.entreprise || data.dirigeant || data.denomination || 'Client PADDE-CI';

      // 1. Créer une tâche dans le Pipeline Noya (visible par le Commando)
      const taskId = `TSK-PADDE-${randomUUID().split('-')[0].toUpperCase()}`;
      await setDoc(doc(db, 'tasks', taskId), {
        id: taskId,
        userId: 'system',
        title: `Audit PADDE-CI: ${auditTypeLabel}`,
        client: clientName,
        columnId: 'nouveau',
        isOrder: false,
        source: 'padde-ci',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: `Demande d'audit depuis padde-ci.com\nType: ${data.type}\nContact: ${data.whatsapp || 'Non fourni'}\n\nDétails:\n${JSON.stringify(data, null, 2)}`
      });

      // 2. Créer une commande dans les Commandes (visible par le SuperAdmin)
      const orderId = `CMD-PADDE-${randomUUID().split('-')[0].toUpperCase()}`;
      await setDoc(doc(db, 'orders', orderId), {
        id: orderId,
        userId: 'system',
        clientName,
        serviceName: `Audit PADDE-CI: ${auditTypeLabel}`,
        status: 'Nouveau',
        source: 'padde-ci',
        createdAt: new Date().toISOString(),
        details: data,
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: "Demande d'audit reçue." }),
      };
    }

    // GET — liste les audits PADDE-CI pour padde-ci.com si besoin
    if (event.httpMethod === 'GET') {
      const q = query(
        collection(db, 'orders'),
        where('source', '==', 'padde-ci')
      );
      const snapshot = await getDocs(q);
      const audits = snapshot.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          type_audit: data.serviceName,
          date: data.createdAt,
          statut: data.status,
          client: data.clientName,
          donnees_completes: data.details || {}
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
    console.error('Erreur Netlify Function PADDE-CI:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Erreur interne du serveur.' }),
    };
  }
};
