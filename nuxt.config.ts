import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: false },

  // SSG: `nuxi generate` prerenderiza cada ruta a HTML estático (el objetivo del
  // proyecto: entregarle a Google el contenido ya renderizado, sin depender de JS).
  ssr: true,

  modules: ['@nuxtjs/sitemap', '@nuxt/image'],

  css: ['~/assets/css/main.css'],

  // Tailwind v4 igual que en el proyecto Vite original: plugin de Vite + @import
  // 'tailwindcss' en el CSS. Los tokens @theme (navy/gold) se conservan intactos.
  vite: {
    plugins: [tailwindcss()],
  },

  // Base del sitio para canonical, OG y sitemap automático (@nuxtjs/sitemap).
  site: {
    url: 'https://bendey.cloud',
    name: 'Bendey Cloud',
  },

  runtimeConfig: {
    public: {
      // Vacío en dev (rutas relativas → devProxy). En prod, NUXT_PUBLIC_API_BASE=https://api.bendey.cloud
      apiBase: '',
    },
  },

  nitro: {
    // Proxy de desarrollo: replica el proxy de Vite hacia el backend Go local,
    // así el chat, los planes y el registro funcionan sin CORS en dev.
    devProxy: {
      '/api': { target: 'http://localhost:3000/api', changeOrigin: true, ws: true },
      '/downloads': { target: 'http://localhost:3000/downloads', changeOrigin: true },
      '/storage': { target: 'http://localhost:3000/storage', changeOrigin: true },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'es-PE' },
      link: [
        { rel: 'icon', type: 'image/png', href: '/bendey.png' },
        { rel: 'apple-touch-icon', href: '/bendey.png' },
      ],
    },
  },
})
