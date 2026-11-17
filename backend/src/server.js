import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cron from 'node-cron'
import timetableRoutes from './routes/timetableRoutes.js'
import cronRoutes from './routes/cronRoutes.js'
import { dispatchNotifications } from './services/notificationDispatcher.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/api/timetable', timetableRoutes)
app.use('/api/cron', cronRoutes)
if (process.env.NODE_ENV !== 'test') cron.schedule('*/5 * * * *', () => dispatchNotifications().catch((error) => console.error('Notification dispatch failed', error)))
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Smart Lecture Notifier API listening on ${port}`))
