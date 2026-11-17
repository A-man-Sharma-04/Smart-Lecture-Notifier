import { Router } from 'express'
import multer from 'multer'
import { db, verifyIdToken } from '../config/firebaseAdmin.js'
import { parseTimetableImage } from '../services/visionParser.js'

const router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })
async function auth(req, res, next) {
  try { req.user = await verifyIdToken(req.headers.authorization?.replace('Bearer ', '')); next() } catch { res.status(401).json({ error: 'Authentication required' }) }
}
router.get('/:cohortId', auth, async (req, res) => {
  const doc = await db.collection('cohorts').doc(req.params.cohortId).get()
  if (!doc.exists) return res.status(404).json({ error: 'Cohort timetable not found' })
  res.json({ id: doc.id, ...doc.data() })
})
router.post('/parse', auth, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Timetable image is required' })
  try { res.json({ timetable: await parseTimetableImage(req.file) }) } catch (error) { res.status(502).json({ error: error.message }) }
})
router.put('/:cohortId', auth, async (req, res) => {
  if (!req.body?.timetable || typeof req.body.timetable !== 'object') return res.status(400).json({ error: 'A timetable object is required' })
  await db.collection('cohorts').doc(req.params.cohortId).set({ timetable: req.body.timetable, updatedAt: new Date(), updatedBy: req.user.uid }, { merge: true })
  await db.collection('users').doc(req.user.uid).set({ cohortId: req.params.cohortId }, { merge: true })
  res.json({ saved: true })
})
export default router
