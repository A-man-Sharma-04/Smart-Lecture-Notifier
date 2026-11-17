import { Router } from 'express'
import { dispatchNotifications } from '../services/notificationDispatcher.js'
const router = Router()
router.post('/dispatch', async (req, res) => {
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).json({ error: 'Invalid cron secret' })
  try { res.json(await dispatchNotifications()) } catch (error) { res.status(500).json({ error: error.message }) }
})
export default router
