<script setup>
// Tutorial detallado de Bendey Resto. Contenido basado en los procesos REALES de la
// app (front_tenant_restaurant_tauri): navegación, pantallas, campos y flujos del código.
useSeo({
  title: 'Cómo usar Bendey Resto: guía paso a paso | Bendey Cloud',
  description:
    'Tutorial completo de Bendey Resto: configura tu restaurante e impresoras, arma tu carta y combos, atiende mesas, toma comandas, gestiona la cocina, cobra y factura, y cierra caja.',
})
useSoftwareApplicationSchema({
  name: 'Bendey Resto',
  description:
    'Sistema para restaurantes: mesas, comandas, cocina, POS y facturación electrónica, para Windows y Android.',
})

const sections = [
  {
    id: 'acceso',
    title: 'Accede a Bendey Resto',
    intro:
      'Bendey Resto es una app para Windows y Android. La primera vez vinculas tu restaurante; luego cada persona entra según su función, con sesión administrativa o con un PIN por estación.',
    steps: [
      { title: 'Vincula tu restaurante', detail: 'Al abrir la app por primera vez, ingresa el RUC de tu empresa (11 dígitos) y pulsa Continuar. Si aún no tienes cuenta, usa “Crear mi restaurante gratis”.' },
      { title: 'Elige el tipo de acceso', detail: 'Sesión administrativa (correo y clave) para configurar y supervisar; o Acceso por estación con PIN para el día a día, con tarjetas de Mozo, Cajero, Cocina y Delivery.' },
      { title: 'Ingresa con PIN', detail: 'En el acceso por estación, cada colaborador escribe su PIN de 4 a 6 dígitos en el teclado numérico. Cocina entra directo a la pantalla de Comandas; el resto va a su pantalla según sus permisos.' },
    ],
    tips: [
      'Los roles disponibles son admin, supervisor, cajero, mozo, cocina y delivery.',
      'El acceso por PIN debe estar habilitado desde la configuración; hasta entonces se entra con correo y clave.',
    ],
  },
  {
    id: 'configuracion',
    title: 'Configura tu negocio',
    intro: 'Deja lista la configuración base en Ajustes → Restaurante antes de empezar a vender.',
    steps: [
      { title: 'Empresa e impuestos', detail: 'En la pestaña Empresa completa los datos del negocio, y en Impuestos define tu configuración tributaria (IGV).' },
      { title: 'Sucursales', detail: 'En la pestaña Sucursales registra cada local con nombre, dirección, domicilio fiscal y marca la principal.' },
      { title: 'Series de comprobantes', detail: 'En la pestaña Series crea las series por sucursal y tipo de documento (nota de venta, boleta, factura). Las series con ventas quedan bloqueadas.' },
      { title: 'Usuarios y roles', detail: 'En la pestaña Operación crea a tu equipo (nombre, rol, sucursal y PIN de acceso) para que cada quien entre por su estación.' },
      { title: 'PIN de operaciones', detail: 'También en Operación define el PIN de operaciones (4 a 6 dígitos): es el que se pide para autorizar la anulación de pedidos y comandas.' },
      { title: 'Menú digital', detail: 'En la pestaña Menú Digital activas y configuras la carta digital que tus clientes pueden ver.' },
    ],
  },
  {
    id: 'impresoras',
    title: 'Configura tus impresoras',
    intro:
      'En Ajustes → Impresoras asignas una impresora por cada tipo de ticket. La impresión directa funciona en la app instalada (Windows/Android); en el navegador puedes guardar los ajustes pero no imprimir. La configuración se guarda solo en ese equipo y no se sincroniza.',
    steps: [
      { title: 'Comandas (cocina y bar)', detail: 'Asigna la impresora donde salen las comandas. Puedes definir una impresora por defecto y, además, una impresora distinta por cada área de preparación (cocina, bar, parrilla…), para que cada comanda se imprima donde corresponde.' },
      { title: 'Precuenta', detail: 'Asigna la impresora del detalle que el cliente revisa antes de pagar.' },
      { title: 'Documentos (boleta y factura)', detail: 'Asigna la impresora de los comprobantes de venta.' },
      { title: 'Elige impresora, ancho y conexión', detail: 'Para cada tipo selecciona la ticketera instalada, el ancho de papel (80 mm o 58 mm) y la conexión: en Windows por USB o por red (TCP). Para red, usa la IP fija de la ticketera en la misma Wi-Fi que el equipo.' },
      { title: 'Prueba cada impresora', detail: 'Usa el botón de prueba de cada tipo (y de cada área) para confirmar que imprime antes de operar.' },
      { title: 'Servidor LAN para tablets Android', detail: 'Al final de la página, en la PC con Windows puedes activar el servidor de impresión para que las tablets Android usen las impresoras conectadas a esa PC, sin que cada tablet tenga su propia ticketera.' },
    ],
    tips: ['Como la configuración es por dispositivo, repite la asignación de impresoras en cada equipo desde el que imprimas.'],
  },
  {
    id: 'carta',
    title: 'Arma tu carta',
    intro:
      'Construye el catálogo que verás al tomar pedidos. El orden recomendado es: categorías, áreas de preparación, productos, modificadores y combos.',
    steps: [
      { title: 'Categorías', detail: 'Crea las categorías de tu carta (entradas, bebidas, platos de fondo, postres…). Una categoría con productos no se puede eliminar.' },
      { title: 'Áreas de preparación', detail: 'Define cocina, bar, parrilla, etc., con su color y tiempo estimado en minutos. Se usan para enrutar las comandas y decidir en qué impresora sale cada ítem.' },
      { title: 'Crea productos', detail: 'En Productos pon nombre, precio, categoría, área de preparación, unidad SUNAT y afectación de IGV. El código de barras se autogenera (EAN-13). Marca su visibilidad “en carta de venta” y “en menú digital”.' },
      { title: 'Elige el tipo de producto', detail: 'Comercial (se vende tal cual), Insumo (ingrediente, no aparece en el POS) o Elaborado (con receta a partir de insumos; no controla stock propio). Para los elaborados usa “Armar receta”.' },
      { title: 'Presentaciones, extras y stock', detail: 'Activa presentaciones (tamaños/envases), grupos de extras y control de stock con mínimo e inicial si el producto lo requiere. Puedes importar productos desde Excel.' },
      { title: 'Modificadores (grupos de extras)', detail: 'Crea grupos reutilizables con modo de selección (Única, Múltiple o por Cantidades), mínimos y máximos a elegir, si es obligatorio, y opciones con precio adicional. Cada opción suma al precio del producto.' },
      { title: 'Combos', detail: 'El editor de combos tiene 4 pasos: Datos del combo (tipo: fijo, configurable, promoción por fechas, familiar o “arma tu combo”, y precio), Productos fijos, Opciones del cliente (pasos con mín/máx y recargo por opción) y Por sucursal (activar y precio por local). El inventario descuenta cada producto componente, nunca el combo.' },
    ],
  },
  {
    id: 'caja-apertura',
    title: 'Abre la caja',
    intro: 'Para cobrar en efectivo necesitas la caja abierta.',
    steps: [
      { title: 'Aperturar caja', detail: 'En Caja → Sesión ingresa el monto inicial y notas, y pulsa Aperturar. Si intentas cobrar en efectivo sin caja abierta, la app te pedirá abrirla.' },
      { title: 'Cuentas y métodos de pago', detail: 'En la pestaña Cuentas y métodos registra tus cuentas bancarias y los métodos de pago (con destino efectivo o cuenta), que luego eliges al cobrar.' },
    ],
  },
  {
    id: 'mesas',
    title: 'Atiende mesas (salón)',
    intro:
      'La pantalla de Mesas muestra tu salón por pisos, con el estado de cada mesa por color. Aquí ocurre casi toda la operación del mozo.',
    steps: [
      { title: 'Lee el salón', detail: 'Filtra por piso o sala y busca una mesa por nombre. Los colores indican el estado: Libre (verde), Ocupada (naranja), Por cerrar (rojo), Reservada (azul) y Viendo la carta (celeste). Arriba tienes estadísticas por estado.' },
      { title: 'Abre una mesa', detail: 'Toca una mesa libre, indica el número de comensales (por defecto 2) y notas, y confirma para abrirla. Se marca como ocupada y entras a su pedido.' },
      { title: 'Toma el pedido', detail: 'Cambia entre las pestañas Productos y Combos; filtra por categoría o por área de preparación y usa el buscador. Al agregar un producto con extras o presentaciones, se abre su configuración; los combos configurables piden elegir sus opciones.' },
      { title: 'Ajusta el carrito', detail: 'Cambia cantidades, agrega notas por línea y, si tienes permiso, edita el precio unitario. También puedes añadir un producto manual con nombre y precio libres.' },
      { title: 'Envía a cocina (comanda)', detail: 'Pulsa Comanda: esa ronda se envía a las pantallas de cocina y se imprime en el área correspondiente. Las rondas ya enviadas quedan a la vista y se pueden reimprimir.' },
      { title: 'Imprime la precuenta', detail: 'Pulsa Precuenta para mostrar (e imprimir) el detalle con el total a pagar, para que el cliente lo revise antes de cobrar.' },
      { title: 'Genera la venta y cobra', detail: 'Pulsa Generar venta: elige serie y tipo de documento, cliente, descuento y método(s) de pago. Con Cuenta dividida cobras solo algunas comandas (cobro parcial). Al cobrar todo, la mesa se cierra automáticamente.' },
    ],
    tips: [
      'Puedes mover una mesa a otra libre desde su menú.',
      'Para anular una comanda se pide el motivo y el PIN de operaciones.',
    ],
  },
  {
    id: 'pos',
    title: 'Vende en POS (directa, llevar y delivery)',
    intro: 'Para ventas sin mesa usa el POS. Elige el tipo de pedido según el caso.',
    steps: [
      { title: 'Venta directa', detail: 'Cobro inmediato, sin comanda ni precuenta. Ideal para mostrador: armas el pedido y pulsas Cobrar venta directa.' },
      { title: 'Para llevar', detail: 'Genera comanda para cocina; los datos del cliente (nombre, teléfono, notas) son opcionales.' },
      { title: 'Delivery', detail: 'Agrega dirección, referencia y asigna un repartidor. La dirección es obligatoria al enviar la comanda. Los repartidores y empresas de delivery se gestionan en su propia sección.' },
      { title: 'Acciones del pedido', detail: 'Según el tipo tienes Comanda (enviar a cocina), Guardar (dejar el pedido como borrador), Precuenta y Cobrar. La cola “Pedidos” lista los pedidos abiertos y permite anular con PIN.' },
    ],
  },
  {
    id: 'comandas',
    title: 'Gestiona la cocina (comandas)',
    intro: 'La pantalla de Comandas es el tablero de la cocina. Puedes verla por ítem o por pedido.',
    steps: [
      { title: 'Elige la vista', detail: 'Por ítem (cada línea enviada, ideal para estaciones) o por pedido (agrupado por mesa, llevar o delivery). Tu elección se recuerda en el equipo.' },
      { title: 'Lee cada comanda', detail: 'Cada tarjeta muestra el producto, la cantidad, el pedido o mesa, el área de preparación, los modificadores y las notas.' },
      { title: 'Avanza los estados', detail: 'Pulsa para avanzar: Pendiente → En preparación → Listo → Entregado. El estado solo avanza, no retrocede.' },
      { title: 'Filtra y anula', detail: 'Filtra por estado con los contadores para enfocarte en lo pendiente; para anular una comanda se pide motivo y PIN.' },
    ],
  },
  {
    id: 'facturacion',
    title: 'Cobra y factura',
    intro: 'Bendey Resto emite tus comprobantes electrónicos y los envía a SUNAT desde la sección Ventas.',
    steps: [
      { title: 'Cobra con uno o varios métodos', detail: 'El pago debe cubrir el total; el efectivo requiere caja abierta y la factura requiere un cliente con RUC. Al cobrar se muestra el comprobante y se imprime si está configurado.' },
      { title: 'Convierte y envía a SUNAT', detail: 'En Ventas puedes convertir una nota de venta en boleta o factura, y enviarla o reenviarla a SUNAT; si SUNAT no está habilitado, la app te lo indica.' },
      { title: 'Anula y descarga', detail: 'Anula una nota de venta o anúlala con nota de crédito. Descarga el PDF (ticket o A4), el PDF oficial SUNAT, el XML y el CDR, o imprime el ticket directo.' },
    ],
  },
  {
    id: 'cierre',
    title: 'Cierra caja y revisa reportes',
    intro: 'Al terminar el turno, cuadra la caja y analiza cómo fue el día.',
    steps: [
      { title: 'Arqueo y cierre', detail: 'En Caja → Sesión pulsa Cerrar caja: registra el saldo de cierre o un arqueo por denominaciones y notas. Antes de cerrar, la app avisa si hay operaciones activas.' },
      { title: 'Revisa el reporte de caja', detail: 'El reporte separa efectivo y electrónico, y muestra ventas brutas, anuladas y netas; puedes exportarlo a PDF.' },
      { title: 'Reportes del negocio', detail: 'Consulta los reportes de Kardex, Productos, Ventas y Recetas.' },
      { title: 'Dashboard', detail: 'El Dashboard muestra KPIs de operación y catálogo, el estado de las mesas y las tendencias, con presets de fecha (hoy, ayer, 7 o 30 días).' },
    ],
  },
]
</script>

<template>
  <TutorialLayout
    eyebrow="Guía de uso"
    h1="Cómo usar Bendey Resto: guía paso a paso"
    lead="Pon en marcha tu restaurante con Bendey Resto: configura tu negocio, tus impresoras y tu carta, atiende mesas, envía comandas a cocina, cobra y factura, y cierra tu caja al final del turno."
    app-name="Bendey Resto"
    :sections="sections"
  />
</template>
