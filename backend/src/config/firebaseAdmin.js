import admin from 'firebase-admin'

const credential = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  ? admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON))
  : admin.credential.applicationDefault()

if (!admin.apps.length) admin.initializeApp({ credential })
export const db = admin.firestore()
export const messaging = admin.messaging()
export const verifyIdToken = (token) => admin.auth().verifyIdToken(token)
