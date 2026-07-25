import { initAnalytics, trackPageView } from '~/config/analytics.js'

// Reemplaza la llamada a initAnalytics() de main.js en la SPA. Es un plugin
// .client, así que solo corre en el navegador (nunca en el prerender), donde
// existen window/document. También cuenta las navegaciones internas (la landing
// era SPA: el snippet solo dispara PageView en la carga inicial).
export default defineNuxtPlugin((nuxtApp) => {
  initAnalytics()

  const router = useRouter()
  router.afterEach((to, from) => {
    if (from.name) trackPageView()
  })
})
