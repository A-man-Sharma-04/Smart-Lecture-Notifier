import { Bell, LogOut } from 'lucide-react'

export default function Navbar({ user, onSignOut }) {
  return <header className="border-b border-slate-800 bg-slate-950/90 px-6 py-4">
    <div className="mx-auto flex max-w-6xl items-center justify-between">
      <div className="flex items-center gap-3"><Bell className="text-cyan-400" /><span className="font-semibold text-white">Smart Lecture Notifier</span></div>
      <button onClick={onSignOut} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"><span>{user?.displayName || user?.email}</span><LogOut size={16} /></button>
    </div>
  </header>
}
