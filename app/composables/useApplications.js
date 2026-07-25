import { ref, computed, onMounted } from 'vue'
import { apiFetch } from './useApi.js'
import { appHasDownloads } from './applicationDownloads.js'

export { appHasDownloads }

const API_BASE = import.meta.env.VITE_API_URL ?? ''

/** Convierte rutas relativas (/downloads/...) en URL absoluta usando la API pública. */
export function resolvePublicUrl(url) {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  const root = API_BASE.replace(/\/api\/?$/, '')
  if (root) return `${root}${url.startsWith('/') ? url : `/${url}`}`
  return url
}

export function formatFileSize(bytes) {
  if (!bytes) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let i = 0
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024
    i += 1
  }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

export function useApplications() {
  const applications = ref([])
  const loading = ref(true)
  const error = ref(null)

  const visibleApplications = computed(() => applications.value.filter(appHasDownloads))

  onMounted(async () => {
    try {
      const res = await apiFetch('/api/public/applications')
      applications.value = res.data || []
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  })

  return {
    applications,
    visibleApplications,
    loading,
    error,
    resolvePublicUrl,
    formatFileSize,
  }
}
