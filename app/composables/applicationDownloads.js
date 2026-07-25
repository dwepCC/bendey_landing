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

/** CTAs principales: Microsoft Store, Google Play y descarga directa Windows. */
export function buildAppDownloadCTAs(app, resolvePublicUrl) {
  const ctas = []
  if (app.windows_store_url?.trim()) {
    ctas.push({
      key: 'ms-store',
      label: 'Microsoft Store',
      href: app.windows_store_url.trim(),
      external: true,
      variant: 'store',
    })
  }
  if (app.android_store_url?.trim()) {
    ctas.push({
      key: 'play-store',
      label: 'Google Play',
      href: app.android_store_url.trim(),
      external: true,
      variant: 'store',
    })
  }
  const winDirect = app.downloads?.windows?.download_url
  if (winDirect) {
    ctas.push({
      key: 'direct-win',
      label: 'Descarga directa (.exe)',
      href: resolvePublicUrl(winDirect),
      external: false,
      download: true,
      variant: 'direct',
      version: app.downloads?.windows?.version,
      size: app.downloads?.windows?.file_size,
    })
  }
  return ctas
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
      gradient: 'from-violet-600 via-purple-600 to-indigo-700',
      tag: 'Restaurantes',
      perks: ['Mesas y comandas', 'Cocina en tiempo real', 'Caja integrada'],
    },
  }
  return (
    map[code] || {
      emoji: '📲',
      gradient: 'from-violet-600 to-indigo-700',
      tag: 'App Bendey',
      perks: ['Sincronizado con la nube', 'Multiplataforma', 'Actualizaciones automáticas'],
    }
  )
}
