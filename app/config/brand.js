export const brand = {
  name: 'Bendey',
  subname: 'Cloud',
  fullName: 'Bendey Cloud',
  domain: 'bendey.cloud',
  logoSrc: '/bendey.png',
  tagline: 'Plataforma integral para facturación electrónica y gestión empresarial',
}

// `to` = ruta real (RouterLink, sin recarga). `href` = ancla a una sección de la
// home (Módulos/Características no tienen página propia, siguen siendo anclas).
// Precios y Contacto SÍ son rutas reales ahora, así que van sin numeral.
export const homeNavigation = [
  { label: 'Inicio', to: '/' },
  { label: 'Módulos', href: '/#modulos' },
  { label: 'Características', href: '/#caracteristicas' },
  { label: 'Apps', to: '/apps' },
  { label: 'Precios', to: '/precios' },
  { label: 'Contacto', to: '/contacto' },
]

export const appsNavigation = [
  { label: 'Inicio', to: '/' },
  { label: 'Ver ERP', href: '/#modulos' },
  { label: 'Precios', to: '/precios' },
  { label: 'Apps', to: '/apps' },
]
