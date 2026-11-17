import Groq from 'groq-sdk'

const schema = {
  Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
}
const prompt = `Extract the weekly college timetable as JSON only. Return an object with exactly these day keys: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. Each value is an array of objects with start and end in 24-hour HH:mm, subject, and room. Ignore breaks and empty cells. Use empty strings for unknown room values.`

export async function parseTimetableImage(file) {
  if (!process.env.GROQ_API_KEY) throw new Error('GROQ_API_KEY is not configured')
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY })
  const image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
  const completion = await client.chat.completions.create({
    model: process.env.GROQ_MODEL || 'qwen/qwen3.8-27b',
    temperature: 0,
    response_format: { type: 'json_object' },
    messages: [{ role: 'user', content: [{ type: 'text', text: prompt }, { type: 'image_url', image_url: { url: image } }] }]
  })
  const parsed = JSON.parse(completion.choices[0]?.message?.content || '{}')
  return Object.fromEntries(Object.keys(schema).map((day) => [day, Array.isArray(parsed[day]) ? parsed[day].map(normalizeEntry) : []]))
}

function normalizeEntry(entry) {
  return { start: String(entry.start || ''), end: String(entry.end || ''), subject: String(entry.subject || ''), room: String(entry.room || '') }
}
