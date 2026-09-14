export const platformMeta = {
  windows: {
    label: 'Windows',
    icon: '🪟',
    accent: 'from-sky-500 to-blue-600',
    storeLabel: 'Microsoft Store',
    storeKey: 'windows_store_url',
    downloadKey: 'windows',
    directLabel: 'Descargar para Windows',
    hint: 'Instalador .exe o .msi',
  },
  android: {
    label: 'Android',
    icon: '📱',
    accent: 'from-emerald-500 to-teal-600',
    storeLabel: 'Google Play',
    storeKey: 'android_store_url',
    downloadKey: 'android',
    directLabel: 'Descargar APK',
    hint: 'Instalación directa o tienda oficial',
  },
  linux: {
    label: 'Linux',
    icon: '🐧',
    accent: 'from-orange-500 to-amber-600',
    storeLabel: null,
    storeKey: null,
    downloadKey: 'linux',
    directLabel: 'Descargar paquete',
    hint: 'Archivo .zip',
  },
}

export function buildDownloadRows(app, resolvePublicUrl, formatFileSize) {
  return ['windows', 'android', 'linux']
    .map((key) => {
      const meta = platformMeta[key]
      if (!meta) return null

      const dl = app.downloads?.[meta.downloadKey]
      const direct = dl?.download_url
        ? {
            href: resolvePublicUrl(dl.download_url),
            version: dl.version,
            size: formatFileSize(dl.file_size),
            fileName: dl.file_name,
          }
        : null

      const storeUrl = meta.storeKey ? app[meta.storeKey] : ''
      const store = storeUrl ? { href: storeUrl, label: meta.storeLabel } : null

      if (!direct && !store) return null
      return { key, meta, direct, store }
    })
    .filter(Boolean)
}

export function appHasDownloads(app) {
  if (!app) return false
  return Boolean(
    app.windows_store_url ||
      app.android_store_url ||
      app.downloads?.windows?.download_url ||
      app.downloads?.android?.download_url ||
      app.downloads?.linux?.download_url,
  )
}

export function downloadChannelLabels(app) {
  const labels = []
  if (app.windows_store_url?.trim()) labels.push('Microsoft Store')
  if (app.android_store_url?.trim()) labels.push('Google Play')
  if (app.downloads?.windows?.download_url) labels.push('Descarga directa')
  if (app.downloads?.android?.download_url && !app.downloads?.windows?.download_url) {
    labels.push('APK directo')
  }
  return labels
}

/** Icono / gradiente por código de app (extensible). */
export function appVisual(code = '') {
  const map = {
    'bendey-restaurante': {
      emoji: '🍽️',
      gradient: 'from-bendey-navy via-bendey-navy-mid to-bendey-gold-dark',
      tag: 'Restaurantes',
      perks: ['Mesas y comandas', 'Cocina en tiempo real', 'Caja integrada'],
    },
  }
  return (
    map[code] || {
      emoji: '📲',
      gradient: 'from-bendey-navy to-bendey-navy-light',
      tag: 'App Bendey',
      perks: ['Sincronizado con la nube', 'Multiplataforma', 'Actualizaciones automáticas'],
    }
  )
}
