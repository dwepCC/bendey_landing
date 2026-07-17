import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AppsPage from './pages/AppsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/apps', name: 'apps', component: AppsPage, meta: { title: 'Descargar apps' } },
    { path: '/descargas', redirect: '/apps' },
    { path: '/r/:code', name: 'referral', component: HomePage },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const base = 'Bendey Cloud'
  document.title = to.meta.title ? `${to.meta.title} | ${base}` : `${base} — ERP y facturación electrónica`
})

export default router
