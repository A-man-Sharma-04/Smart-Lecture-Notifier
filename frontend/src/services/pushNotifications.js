import { getMessaging, getToken, isSupported } from 'firebase/messaging'
import { doc, setDoc } from 'firebase/firestore'
import { db } from './firebase'

export async function registerWebPush(userId) {
  if (!(await isSupported()) || !('Notification' in window)) return null
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return null
  const token = await getToken(getMessaging(), { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY })
  if (token) await setDoc(doc(db, 'users', userId, 'devices', token), { token, platform: 'web', updatedAt: new Date() })
  return token
}
