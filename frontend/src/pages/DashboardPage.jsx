import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import TimetableUploader from '../components/TimetableUploader'
import TimetableEditorGrid from '../components/TimetableEditorGrid'
import TodayScheduleCard from '../components/TodayScheduleCard'
import NotificationSettings from '../components/NotificationSettings'
import { getTimetable, parseTimetable, saveTimetable } from '../services/api'
import { registerWebPush } from '../services/pushNotifications'
export default function DashboardPage({ user, cohort, onSignOut }) {
  const [timetable, setTimetable] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState(''); const [leadTime, setLeadTime] = useState(15)
  const cohortId = useMemo(() => [cohort.college, cohort.department, cohort.semester, cohort.section].map((x) => x.toUpperCase().replace(/[^A-Z0-9]+/g, '_')).join('_'), [cohort])
  const token = () => user.getIdToken()
  useEffect(() => { token().then((value) => getTimetable(cohortId, value)).then((data) => setTimetable(data.timetable)).catch(() => {}) ; registerWebPush(user.uid).catch(() => {}) }, [cohortId])
  async function upload(file) { setLoading(true); setError(''); try { setTimetable((await parseTimetable(file, cohortId, await token())).timetable) } catch (e) { setError(e.message) } finally { setLoading(false) } }
  async function save() { try { await saveTimetable(cohortId, timetable, await token()) } catch (e) { setError(e.message) } }
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  return <><Navbar user={user} onSignOut={onSignOut} /><main className="mx-auto max-w-6xl space-y-8 px-6 py-8"><div><p className="text-sm uppercase tracking-wider text-cyan-400">{cohortId}</p><h1 className="mt-1 text-3xl font-bold text-white">Your lecture dashboard</h1></div><div className="grid gap-6 lg:grid-cols-[1fr_280px]"><div className="space-y-6"><TodayScheduleCard items={timetable?.[today] || []} />{timetable ? <><div className="flex items-center justify-between"><h2 className="text-lg font-semibold text-white">Review timetable</h2><button onClick={save} className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950">Save changes</button></div><TimetableEditorGrid timetable={timetable} onChange={setTimetable} /></> : <TimetableUploader onUpload={upload} loading={loading} />} {error && <p className="text-rose-400">{error}</p>}</div><aside className="h-fit rounded-xl border border-slate-800 bg-slate-900 p-5"><h2 className="mb-4 font-semibold text-white">Notifications</h2><NotificationSettings leadTime={leadTime} setLeadTime={setLeadTime} /><p className="mt-4 text-xs text-slate-500">Timezone: Asia/Kolkata (IST)</p></aside></div></main></>
}
