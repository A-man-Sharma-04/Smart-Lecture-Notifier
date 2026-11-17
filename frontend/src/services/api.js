const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...options.headers }
  })
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || 'Request failed')
  return response.json()
}

export const getTimetable = (cohortId, token) => request(`/timetable/${cohortId}`, { headers: { Authorization: `Bearer ${token}` } })
export const parseTimetable = (file, cohortId, token) => {
  const body = new FormData()
  body.append('image', file)
  body.append('cohortId', cohortId)
  return request('/timetable/parse', { method: 'POST', body, headers: { Authorization: `Bearer ${token}` } })
}
export const saveTimetable = (cohortId, timetable, token) => request(`/timetable/${cohortId}`, {
  method: 'PUT', body: JSON.stringify({ timetable }), headers: { Authorization: `Bearer ${token}` }
})
