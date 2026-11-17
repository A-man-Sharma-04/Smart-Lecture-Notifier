export default function NotificationSettings({ leadTime, setLeadTime }) {
  return <label className="block text-sm text-slate-300">Notify me before each lecture
    <select value={leadTime} onChange={(e) => setLeadTime(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white">
      {[5, 10, 15, 30, 60].map((value) => <option key={value} value={value}>{value} minutes</option>)}
    </select>
  </label>
}
