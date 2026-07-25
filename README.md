# Bendey Cloud — Landing

Sitio de presentación de Bendey Cloud. **Nuxt 4** en modo estático (SSG): cada ruta se
prerenderiza a HTML para que Google (y cualquier crawler sin JavaScript) reciba el
contenido ya renderizado.

## Stack

- Nuxt 4 (Vue 3) — SSG con `nuxi generate`
- Tailwind CSS v4 (`@tailwindcss/vite` + tokens `@theme` en `app/assets/css/main.css`)
- `@nuxtjs/sitemap` — `sitemap.xml` automático en cada build
- `@nuxt/image`

## Estructura

```
app/
  app.vue             # JSON-LD global (Organization + WebSite)
  layouts/default.vue # widgets globales (ClientOnly) + lógica de referido
  pages/              # rutas = archivos (index, precios, contacto, restaurantes, ...)
  components/         # secciones de UI + SeoLanding
  composables/        # useSeo, useRegister, usePlans, ...
  config/             # brand, contact, seoRoutes
  plugins/            # analytics.client.ts
nuxt.config.ts        # módulos, proxy de dev, site.url, redirects
public/               # estáticos (favicon, og-image, robots.txt, _redirects)
```

## Scripts

```bash
npm run dev        # desarrollo (proxy /api -> backend Go local)
npm run generate   # build estático -> .output/public
npm run preview    # sirve el build
```

## Despliegue (Netlify)

- Build command: `npm run generate`
- Publish directory: `.output/public`
- Variable: `NUXT_PUBLIC_API_BASE=https://api.bendey.cloud`

Las rutas prerenderizadas se sirven como archivos; las no prerenderizadas
(`/r/CODIGO`) caen al shell `200.html` (ver `public/_redirects`).
