import { db, messaging } from '../config/firebaseAdmin.js'

export async function dispatchNotifications(now = new Date()) {
  const snapshot = await db.collection('users').get()
  const sent = []
  for (const userDoc of snapshot.docs) {
    const user = userDoc.data()
    if (!user.cohortId) continue
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Asia/Kolkata' }).format(now)
    const timeParts = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).formatToParts(now)
    const currentMinutes = Number(timeParts.find((part) => part.type === 'hour').value) * 60 + Number(timeParts.find((part) => part.type === 'minute').value)
    const leadTime = Number(user.leadTimeMinutes || 15)
    const cohort = await db.collection('cohorts').doc(user.cohortId).get()
    const items = cohort.data()?.timetable?.[day] || []
    const due = items.filter((item) => {
      const [hour, minute] = String(item.start).split(':').map(Number)
      const start = hour * 60 + minute
      return start > currentMinutes && start - currentMinutes <= leadTime
    })
    if (!due.length) continue
    const devices = await userDoc.ref.collection('devices').get()
    const tokens = devices.docs.map((device) => device.data().token).filter(Boolean)
    if (tokens.length) { await messaging.sendEachForMulticast({ tokens, notification: { title: `Upcoming: ${due[0].subject}`, body: `${due[0].start} • ${due[0].room || 'Room TBA'}` }, data: { cohortId: user.cohortId } }); sent.push(userDoc.id) }
  }
  return { usersNotified: sent.length }
}
