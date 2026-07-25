<script setup>
import { useInView } from '../composables/useInView'

const { elementRef, isInView } = useInView()

const modules = [
  {
    name: 'Facturación Electrónica',
    tag: 'SUNAT',
    description: 'Emite boletas, facturas, notas de crédito y débito electrónicas válidas ante SUNAT. Resúmenes diarios automáticos y control de series por sucursal.',
    details: ['Boletas y facturas electrónicas', 'Notas de crédito y débito', 'Resúmenes y bajas SUNAT', 'Series por sucursal'],
    icon: '🧾',
    highlight: true,
  },
  {
    name: 'Punto de Venta (POS)',
    tag: 'Ventas',
    description: 'Registra ventas rápidamente desde cualquier dispositivo. Integrado con inventario y facturación electrónica en un solo flujo.',
    details: ['Venta rápida con buscador', 'Múltiples métodos de pago', 'Descuentos y promociones', 'Historial de ventas'],
    icon: '🛒',
  },
  {
    name: 'Inventario',
    tag: 'Stock',
    description: 'Control de stock en tiempo real con kardex, movimientos y transferencias entre sucursales. Alertas de stock mínimo.',
    details: ['Kardex por producto', 'Transferencias entre sedes', 'Ajustes de inventario', 'Reportes de movimientos'],
    icon: '📦',
  },
  {
    name: 'Compras',
    tag: 'Proveedores',
    description: 'Gestiona órdenes de compra a proveedores y registra ingresos de mercadería con actualización automática del stock.',
    details: ['Órdenes de compra', 'Registro de ingresos', 'Vinculación con inventario', 'Historial por proveedor'],
    icon: '🏭',
  },
  {
    name: 'Caja y Bancos',
    tag: 'Tesorería',
    description: 'Controla el flujo de efectivo diario, apertura y cierre de caja, movimientos bancarios y métodos de pago.',
    details: ['Apertura y cierre de caja', 'Movimientos bancarios', 'Reportes de caja', 'Múltiples métodos de pago'],
    icon: '💰',
  },
  {
    name: 'Reportes',
    tag: 'Análisis',
    description: 'Toma decisiones con datos reales. Reportes de ventas, compras, kardex, rentabilidad por producto y más.',
    details: ['Reporte de ventas diarias', 'Ventas por producto', 'Reporte de compras', 'Kardex valorizado'],
    icon: '📊',
  },
  {
    name: 'Clientes y Proveedores',
    tag: 'Contactos',
    description: 'Directorio centralizado de clientes y proveedores con historial de transacciones, RUC y datos de facturación.',
    details: ['Búsqueda por RUC o DNI', 'Historial de compras/ventas', 'Datos para comprobantes', 'Segmentación'],
    icon: '👥',
  },
  {
    name: 'Usuarios y Roles',
    tag: 'Seguridad',
    description: 'Define qué puede hacer cada usuario en el sistema. Roles personalizables con permisos granulares por módulo y sucursal.',
    details: ['Roles personalizables', 'Permisos por módulo', 'Acceso multi sucursal', 'Auditoría de acciones'],
    icon: '🔐',
  },
  {
    name: 'Bendey resto',
    tag: 'Restaurantes',
    description: 'Módulo especializado para restaurantes y cafeterías. Gestiona mesas, órdenes de cocina y carta digital integrada con facturación.',
    details: ['Gestión de mesas por piso', 'Pantallas de cocina en tiempo real', 'Carta digital configurable', 'Integrado con facturación'],
    icon: '🍽️',
  },
]
</script>

<template>
  <section
    ref="elementRef"
    id="modulos"
    class="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"
  >
    <div
      class="mx-auto max-w-6xl transition-all duration-700"
      :class="isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <div class="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Todo lo que necesita tu negocio
          </h2>
          <p class="mt-3 max-w-xl text-slate-600">
            Módulos reales, operativos y conectados entre sí. Empieza con lo esencial y activa más según crezca tu operación.
          </p>
        </div>
        <span class="inline-flex shrink-0 items-center gap-2 rounded-lg border border-violet-300 bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700">
          <span class="h-2 w-2 rounded-full bg-violet-500" />
          {{ modules.length }} módulos disponibles
        </span>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="mod in modules"
          :key="mod.name"
          class="group flex flex-col rounded-xl border-2 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-md"
          :class="mod.highlight ? 'border-amber-300' : 'border-slate-200'"
        >
          <div class="mb-4 flex items-start justify-between gap-2">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-2xl">
              {{ mod.icon }}
            </div>
            <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
              {{ mod.tag }}
            </span>
          </div>

          <h3 class="text-base font-bold text-slate-900">{{ mod.name }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-500">{{ mod.description }}</p>

          <ul class="mt-4 flex flex-col gap-1.5">
            <li
              v-for="item in mod.details"
              :key="item"
              class="flex items-center gap-2 text-xs text-slate-600"
            >
              <svg class="h-3.5 w-3.5 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
