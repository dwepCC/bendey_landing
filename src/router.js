import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AppsPage from './pages/AppsPage.vue'
import TerminosPage from './pages/TerminosPage.vue'
import { trackPageView } from './config/analytics.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/apps', name: 'apps', component: AppsPage, meta: { title: 'Descargar apps' } },
    { path: '/descargas', redirect: '/apps' },
    { path: '/terminos', name: 'terminos', component: TerminosPage, meta: { title: 'Términos y Condiciones' } },
    { path: '/terminos-y-condiciones', redirect: '/terminos' },
    { path: '/r/:code', name: 'referral', component: HomePage },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to, from) => {
  const base = 'Bendey Cloud'
  document.title = to.meta.title ? `${to.meta.title} | ${base}` : `${base} — ERP y facturación electrónica`
  // Solo en navegaciones internas: la carga inicial ya la contó initAnalytics().
  if (from.name) trackPageView()
})

export default router
