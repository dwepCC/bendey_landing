// Dev: rutas relativas → devProxy de Nitro al backend Go local (sin CORS).
// Producción (build estático): API público absoluto. `import.meta.dev` lo resuelve
// Nuxt en build, así que `npm run generate` funciona sin variables de entorno.
// Se puede sobreescribir en build con VITE_API_URL si el dominio del API cambia.
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.dev ? '' : 'https://api.bendey.cloud')

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
