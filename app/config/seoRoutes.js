// Fuente única de las páginas SEO por intención de búsqueda. La usan el Footer
// (enlazado interno site-wide) y el cross-link entre páginas hermanas.
export const solutionRoutes = [
  { to: '/facturacion-electronica-sunat', label: 'Facturación electrónica SUNAT' },
  { to: '/punto-de-venta-pos', label: 'Punto de venta (POS)' },
  { to: '/restaurantes', label: 'Sistema para restaurantes' },
  { to: '/inventario', label: 'Control de inventario' },
  { to: '/precios', label: 'Planes y precios' },
  { to: '/contacto', label: 'Contacto' },
]

// Guías/tutoriales de uso de cada aplicación.
export const tutorialRoutes = [
  { to: '/tutorial-bendey-erp', label: 'Cómo usar Bendey ERP' },
  { to: '/tutorial-bendey-resto', label: 'Cómo usar Bendey Resto' },
]

// Enlaces a las hermanas de una página (excluye la actual).
export function relatedTo(currentPath) {
  return solutionRoutes.filter((r) => r.to !== currentPath)
}
