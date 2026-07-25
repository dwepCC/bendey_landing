// Analítica opt-in. Pon tus IDs para activarla; vacío = no carga nada (sin costo ni tracking).
//   - Google Analytics 4:  GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'
//   - Meta (Facebook) Pixel: META_PIXEL_ID = '1234567890'
export const GA_MEASUREMENT_ID = ''
export const META_PIXEL_ID = '1051253647370829'

// initAnalytics inyecta los scripts solo si hay ID configurado.
export function initAnalytics() {
  if (GA_MEASUREMENT_ID) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID)
  }

  if (META_PIXEL_ID) {
    ;(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = true
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    window.fbq('init', META_PIXEL_ID)
    window.fbq('track', 'PageView')
  }
}

// trackEvent envía un evento a las plataformas activas (no-op si no hay ninguna).
export function trackEvent(name, params = {}) {
  if (window.gtag) window.gtag('event', name, params)
  if (window.fbq) window.fbq('trackCustom', name, params)
}

// trackConversion envía un evento ESTÁNDAR de Meta (Lead, CompleteRegistration,
// ViewContent…). La diferencia con trackEvent no es cosmética: Meta solo puede
// optimizar la entrega de anuncios y medir conversiones con los estándar; los
// personalizados (trackCustom) sirven para analizar, no para optimizar campañas.
export function trackConversion(name, params = {}) {
  if (window.gtag) window.gtag('event', name, params)
  if (window.fbq) window.fbq('track', name, params)
}

// trackPageView refresca la vista de página en navegaciones internas. La landing es
// una SPA: el snippet solo dispara PageView en la carga inicial, así que sin esto
// Meta no vería los cambios de ruta (/apps, /terminos…).
export function trackPageView() {
  if (window.fbq) window.fbq('track', 'PageView')
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, { page_path: location.pathname })
  }
}
