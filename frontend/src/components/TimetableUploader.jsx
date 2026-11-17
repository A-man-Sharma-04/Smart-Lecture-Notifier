import { ImageUp } from 'lucide-react'
export default function TimetableUploader({ onUpload, loading }) {
  return <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-900/60 p-8 text-center hover:border-cyan-400">
    <ImageUp className="mb-3 text-cyan-400" /><span className="font-medium text-white">{loading ? 'Reading timetable…' : 'Upload timetable image'}</span><span className="mt-1 text-sm text-slate-400">PNG, JPG, or WEBP</span>
    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])} disabled={loading} />
  </label>
}
