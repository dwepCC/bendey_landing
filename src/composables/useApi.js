// En desarrollo VITE_API_URL está vacío → paths relativos → Vite proxy al backend local (sin CORS).
// En producción VITE_API_URL=https://api.bendey.cloud → URL absoluta.
const API_BASE = import.meta.env.VITE_API_URL ?? ''

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`)
  return data
}
