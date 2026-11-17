import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { Chrome } from 'lucide-react'
import { auth, googleProvider } from '../services/firebase'
export default function LoginPage() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('')
  async function submit(e) { e.preventDefault(); try { await signInWithEmailAndPassword(auth, email, password) } catch (err) { setError(err.message) } }
  return <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6"><div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8"><h1 className="text-2xl font-bold text-white">Never miss a lecture</h1><p className="mt-2 text-slate-400">Sign in to sync your cohort timetable.</p><form onSubmit={submit} className="mt-8 space-y-4"><input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white" /><input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white" /><button className="w-full rounded-lg bg-cyan-400 py-3 font-semibold text-slate-950">Sign in</button></form><button onClick={() => signInWithPopup(auth, googleProvider)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 py-3 text-white"><Chrome size={18} /> Continue with Google</button>{error && <p className="mt-4 text-sm text-rose-400">{error}</p>}</div></main>
}
