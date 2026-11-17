export default function CohortSelector({ value, onChange }) {
  const fields = [['college', 'College', 'ABES'], ['department', 'Department', 'CSE'], ['semester', 'Semester', '5'], ['section', 'Section', 'A']]
  return <div className="grid gap-4 sm:grid-cols-2">
    {fields.map(([key, label, placeholder]) => <label key={key} className="text-sm text-slate-300">{label}
      <input value={value[key]} placeholder={placeholder} onChange={(e) => onChange({ ...value, [key]: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-cyan-400" />
    </label>)}
  </div>
}
