import { useState } from 'react'
import CohortSelector from '../components/CohortSelector'
export default function OnboardingPage({ onComplete }) {
  const [cohort, setCohort] = useState({ college: '', department: '', semester: '', section: '' })
  function submit(e) { e.preventDefault(); if (Object.values(cohort).every(Boolean)) onComplete(cohort) }
  return <main className="mx-auto max-w-2xl px-6 py-16"><h1 className="text-3xl font-bold text-white">Set up your cohort</h1><p className="mt-2 text-slate-400">Choose the group that shares your timetable.</p><form onSubmit={submit} className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6"><CohortSelector value={cohort} onChange={setCohort} /><button className="mt-6 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950">Continue</button></form></main>
}
