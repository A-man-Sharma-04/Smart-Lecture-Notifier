const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export default function TimetableEditorGrid({ timetable, onChange }) {
  return <div className="overflow-x-auto rounded-xl border border-slate-800">
    <table className="min-w-full text-sm"><thead className="bg-slate-800 text-left text-slate-300"><tr><th className="p-3">Day</th><th className="p-3">Time</th><th className="p-3">Subject</th><th className="p-3">Room</th></tr></thead><tbody>
      {days.map((day) => (timetable[day] || []).map((item, index) => <tr key={`${day}-${index}`} className="border-t border-slate-800">
        <td className="p-2 text-slate-300">{day}</td>{['start', 'subject', 'room'].map((field) => <td className="p-2" key={field}><input value={field === 'start' ? `${item.start || ''}-${item.end || ''}` : item[field] || ''} onChange={(e) => {
          const next = structuredClone(timetable); const row = { ...next[day][index] }
          if (field === 'start') { const [start, end] = e.target.value.split('-'); row.start = start?.trim() || ''; row.end = end?.trim() || '' } else row[field] = e.target.value
          next[day][index] = row; onChange(next)
        }} className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-white" /></td>)}
      </tr>))}
    </tbody></table>
  </div>
}
