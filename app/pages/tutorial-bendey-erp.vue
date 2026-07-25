<script setup>
// Tutorial de Bendey ERP. Contenido basado en los procesos REALES de la app
// (front_tenant_web): sidebar, rutas y flujos verificados en el código.
useSeo({
  title: 'Cómo usar Bendey ERP: guía paso a paso | Bendey Cloud',
  description:
    'Tutorial completo de Bendey ERP: configura tu empresa, carga tu catálogo, abre caja, registra ventas, emite comprobantes SUNAT, guías de remisión, compras e inventario.',
})
useSoftwareApplicationSchema({
  name: 'Bendey ERP',
  description:
    'ERP en la nube con facturación electrónica SUNAT, POS, inventario, compras y caja para negocios en Perú.',
})

const sections = [
  {
    id: 'ingresa',
    title: 'Ingresa y ubícate',
    intro:
      'Bendey ERP se usa por la web con tu correo y clave. Al entrar verás el menú lateral con todos los módulos que incluye tu plan y tu rol.',
    steps: [
      { title: 'Inicia sesión', detail: 'Entra a la plataforma con tu correo y contraseña. La razón social y el RUC de tu empresa ya quedaron definidos al registrarte.' },
      { title: 'Elige tu sucursal', detail: 'En la barra superior, desde el menú de usuario, cambia la sucursal activa. La sucursal condiciona ventas, caja, series y reportes.' },
      { title: 'Revisa tu Inicio y Dashboard', detail: 'La pantalla de Inicio muestra KPIs del día y del mes y accesos rápidos; el Dashboard amplía la analítica con gráficos.' },
      { title: 'Vigila las notificaciones', detail: 'La campana de la barra superior avisa de comprobantes SUNAT pendientes, con error o rechazados, y recordatorios de membresías.' },
    ],
    tips: ['Si no ves un módulo (Compras, Facturación, etc.), es porque no está en tu plan o tu rol no tiene permiso.'],
  },
  {
    id: 'configura-empresa',
    title: 'Configura tu empresa',
    intro:
      'Antes de vender, deja lista la configuración en el grupo “Empresa” del menú. Es la base de tus comprobantes.',
    steps: [
      { title: 'Mi empresa', detail: 'En Empresa → Mi empresa completa nombre comercial, moneda, dirección, ubigeo, teléfono, correo, sube tu logo (aparece en los comprobantes) y elige el tema de color.' },
      { title: 'SUNAT / IGV', detail: 'En Empresa → SUNAT / IGV define la tasa de IGV, el régimen (general, simplificado o exonerado) y la zona de beneficio tributario.' },
      { title: 'Sucursales', detail: 'En Empresa → Sucursales registra cada local con su dirección, teléfono y código de domicilio fiscal, y marca la principal.' },
      { title: 'Series y numeración', detail: 'En Empresa → Series crea las series por sucursal y tipo de documento (nota de venta 00, boleta 03, factura 01, guía 09, etc.). Una serie con documentos emitidos queda bloqueada.' },
    ],
    tips: ['Sin facturación electrónica solo se permite la serie de nota de venta (código 00).'],
  },
  {
    id: 'usuarios',
    title: 'Crea usuarios y permisos',
    intro: 'Da acceso a tu equipo con el rol y las sucursales que corresponda.',
    steps: [
      { title: 'Roles y permisos', detail: 'En Administración → Roles crea roles con permisos agrupados por módulo (ventas, caja, inventario, etc.) usando las casillas.' },
      { title: 'Usuarios', detail: 'En Administración → Usuarios crea cada colaborador con su correo, contraseña, rol y las sucursales asignadas. Puedes activarlos o desactivarlos cuando quieras.' },
    ],
  },
  {
    id: 'catalogo',
    title: 'Carga tu catálogo y contactos',
    intro: 'Registra lo que vendes y a quién le vendes. Todo se conecta con ventas, inventario y comprobantes.',
    steps: [
      { title: 'Productos', detail: 'En Inventario → Productos crea cada producto: nombre, código (se autogenera), precio de venta, tipo de afectación IGV, si el precio incluye IGV, y activa “Controlar stock” con stock mínimo e inicial. Puedes añadir presentaciones y grupos de modificadores.' },
      { title: 'Importa por Excel', detail: 'Si tienes muchos productos, usa Importar Excel en lugar de cargarlos uno por uno.' },
      { title: 'Servicios', detail: 'En Inventario → Servicios registras lo que no maneja stock (unidad ZZ), con el mismo formulario.' },
      { title: 'Clientes y proveedores', detail: 'En Contactos crea clientes y proveedores. Ingresa el documento y pulsa Consultar: DNI/RUC autocompleta razón social, dirección y ubigeo desde SUNAT/RENIEC.' },
    ],
  },
  {
    id: 'caja',
    title: 'Abre tu caja',
    intro: 'Para cobrar en efectivo necesitas una caja abierta. Hay una sesión por usuario y sucursal.',
    steps: [
      { title: 'Abre la caja', detail: 'En Finanzas → Caja pulsa Abrir caja, ingresa el balance inicial y notas.' },
      { title: 'Registra ingresos y egresos', detail: 'Con la caja abierta puedes registrar movimientos (ingreso/egreso) con categoría, método de pago, monto y referencia.' },
      { title: 'Arqueo y cierre', detail: 'Al terminar, haz el arqueo por denominaciones (billetes y monedas) y cierra la caja con el balance final y notas.' },
    ],
    tips: ['Configura tus cuentas bancarias y métodos de pago en Finanzas → Métodos de pago; alimentan los cobros en ventas y POS.'],
  },
  {
    id: 'ventas',
    title: 'Registra tus ventas',
    intro:
      'Tienes cuatro formas de vender según tu necesidad: punto de venta, nota de venta, comprobante electrónico y cotización.',
    steps: [
      { title: 'Punto de venta (POS)', detail: 'En Ventas → Punto de venta busca productos (o usa el escáner), arma el carrito, pulsa Ir a cobrar, elige tipo de documento, serie, cliente, descuento y método(s) de pago. Imprime el ticket al confirmar.' },
      { title: 'Nota de venta', detail: 'En Ventas → Notas de venta creas un comprobante de control interno (SUNAT 00): cliente, serie, detalle y condición de pago. Luego puedes convertirla en boleta o factura.' },
      { title: 'Boleta / Factura', detail: 'En Ventas → Boleta / Factura elige el cliente (obligatorio; la factura exige RUC), tipo y serie, agrega productos, define la condición de pago (Contado o Crédito con cuotas) y pulsa Emitir comprobante.' },
      { title: 'Cotizaciones', detail: 'En Ventas → Cotizaciones registras una cotización con validez y estado; no afecta stock ni caja. Desde la lista puedes convertirla en nota, boleta o factura.' },
    ],
    tips: ['La condición Crédito genera una cuenta por cobrar con su plan de cuotas.'],
  },
  {
    id: 'sunat',
    title: 'Envía tus comprobantes a SUNAT',
    intro:
      'El envío a SUNAT no ocurre al crear el comprobante: se hace después desde Documentos electrónicos, donde gestionas todo el ciclo.',
    steps: [
      { title: 'Enviar o reenviar', detail: 'En Ventas → Documentos electrónicos cada boleta/factura muestra su estado SUNAT y el botón Enviar (o Reenviar si hubo error).' },
      { title: 'Descarga e imprime', detail: 'Obtén el PDF (A4 o ticket), el XML firmado y el CDR; también puedes enviar el comprobante por WhatsApp.' },
      { title: 'Anulaciones', detail: 'Anula con Nota de crédito, o para boletas usa el resumen de anulación (comunicación de baja).' },
      { title: 'Resúmenes de boletas', detail: 'En la vista Resúmenes y bajas generas el resumen diario de boletas por fecha y consultas el estado del CDR.' },
    ],
  },
  {
    id: 'guias',
    title: 'Emite guías de remisión',
    intro: 'Si trasladas mercadería, genera la guía de remisión electrónica (GRE) desde Documentos avanzados.',
    steps: [
      { title: 'Registra los transportistas', detail: 'En Documentos avanzados → Transportistas y vehículos das de alta transportistas, conductores y vehículos (con la misma consulta por DNI/RUC).' },
      { title: 'Crea la guía', detail: 'En Documentos avanzados → Guías de remisión pulsa Nueva guía: elige la serie GRE, destinatario, puntos de partida y llegada (con ubigeo), peso y bultos, la modalidad de transporte y los bienes a trasladar.' },
      { title: 'Emite y envía', detail: 'Pulsa Emitir y enviar a SUNAT. También puedes generar la guía directamente desde una venta.' },
    ],
  },
  {
    id: 'compras-inventario',
    title: 'Compras e inventario',
    intro: 'Registra las compras a proveedores y mantén tu stock al día entre sucursales.',
    steps: [
      { title: 'Nueva compra', detail: 'En Compras → Nueva compra elige el proveedor, tipo de documento, serie y número, método de pago y el detalle de productos con su costo. Al registrar, el stock sube automáticamente.' },
      { title: 'Anular una compra', detail: 'Si anulas una compra, se revierte el stock, el kardex y los números de serie.' },
      { title: 'Transferencias entre sucursales', detail: 'En Inventario → Transferencias mueves stock entre locales y confirmas la recepción en destino.' },
      { title: 'Kardex', detail: 'En Inventario → Kardex revisas el historial valorizado de entradas y salidas por producto.' },
    ],
  },
  {
    id: 'cobros-reportes',
    title: 'Cobros, reportes y análisis',
    intro: 'Cierra el círculo: cobra lo que te deben y toma decisiones con datos reales.',
    steps: [
      { title: 'Cuentas por cobrar', detail: 'En Finanzas → Cuentas por cobrar ves las ventas a crédito por estado y registras el pago de una cuota, varias o el total, con su método de pago.' },
      { title: 'Reportes', detail: 'En Reportes tienes ventas, productos, ventas por producto, compras, kardex, caja y cuentas por cobrar, con filtros y exportación a PDF y Excel.' },
      { title: 'Dashboard', detail: 'El Dashboard reúne la analítica con gráficos de ventas, caja y comprobantes para ver el pulso del negocio.' },
    ],
  },
]
</script>

<template>
  <TutorialLayout
    eyebrow="Guía de uso"
    h1="Cómo usar Bendey ERP: guía paso a paso"
    lead="Todo lo que necesitas para poner en marcha Bendey ERP: desde configurar tu empresa y cargar tu catálogo hasta vender, emitir comprobantes SUNAT, controlar inventario y analizar resultados."
    app-name="Bendey ERP"
    :sections="sections"
  />
</template>
