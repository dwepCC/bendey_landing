<script setup>
// Tutorial de Bendey Resto. Contenido basado en los procesos REALES de la app
// (front_tenant_restaurant_tauri): navegación, pantallas y flujos verificados en el código.
useSeo({
  title: 'Cómo usar Bendey Resto: guía paso a paso | Bendey Cloud',
  description:
    'Tutorial completo de Bendey Resto: configura tu restaurante, arma tu carta y combos, atiende mesas, toma comandas, gestiona la cocina, cobra y factura, y cierra caja.',
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
      'Bendey Resto es una app (Windows y Android). La primera vez vinculas tu restaurante y luego cada persona entra según su función.',
    steps: [
      { title: 'Vincula tu restaurante', detail: 'Al abrir la app, ingresa el RUC de tu empresa (11 dígitos) y pulsa Continuar. Si aún no tienes cuenta, usa “Crear mi restaurante gratis”.' },
      { title: 'Elige cómo entrar', detail: 'Sesión administrativa (correo y clave) para configurar y supervisar; o Acceso por estación con PIN para el día a día: Mozo, Cajero, Cocina o Delivery.' },
      { title: 'Ingresa con PIN', detail: 'En el acceso por estación, cada colaborador escribe su PIN de 4 a 6 dígitos. Cocina entra directo a la pantalla de Comandas.' },
    ],
    tips: ['Los roles disponibles son admin, supervisor, cajero, mozo, cocina y delivery.'],
  },
  {
    id: 'configuracion',
    title: 'Configura tu negocio',
    intro: 'Deja lista la configuración en Ajustes antes de empezar a vender.',
    steps: [
      { title: 'Empresa e impuestos', detail: 'En Ajustes → Restaurante completa los datos de la empresa y la configuración de impuestos.' },
      { title: 'Sucursales y series', detail: 'Registra tus locales y crea las series de comprobantes por sucursal y tipo (nota de venta, boleta, factura).' },
      { title: 'Usuarios y PIN de operaciones', detail: 'En Ajustes → Restaurante → Operación crea tu equipo (rol, sucursal y PIN de acceso) y define el PIN de operaciones que autoriza anulaciones.' },
      { title: 'Impresoras', detail: 'En Ajustes → Impresoras configura las impresoras de Comandas (por área de preparación), Precuenta y Documentos: elige impresora, ancho de papel (80/58 mm) y conexión USB o Red, y haz una prueba.' },
    ],
    tips: ['La configuración de impresoras se guarda en cada dispositivo, no se sincroniza. En PC (Windows) puedes activar el servidor LAN para que tablets Android impriman con tus impresoras.'],
  },
  {
    id: 'carta',
    title: 'Arma tu carta',
    intro: 'Construye el catálogo que verás al tomar pedidos. El orden recomendado es: categorías, áreas, productos, modificadores y combos.',
    steps: [
      { title: 'Categorías', detail: 'Crea las categorías de tu carta (entradas, bebidas, platos, etc.).' },
      { title: 'Áreas de preparación', detail: 'Define cocina, bar, parrilla… con su color y tiempo estimado. Sirven para enrutar las comandas y la impresión por área.' },
      { title: 'Productos', detail: 'Crea cada producto con nombre, precio, categoría, área de preparación e IGV. Elige el tipo: Comercial, Insumo (ingrediente, no aparece en el POS) o Elaborado (con receta). Controla su visibilidad en la carta y el menú digital, y activa presentaciones, extras o stock si aplica.' },
      { title: 'Modificadores (extras)', detail: 'Crea grupos reutilizables de extras con modo de selección (única, múltiple o por cantidades), mínimos y máximos, y opciones con precio adicional.' },
      { title: 'Combos', detail: 'En el editor de combos define los datos (tipo: fijo, configurable, promoción por fechas, familiar o arma tu combo, y precio), los productos fijos, las opciones que elige el cliente y el precio por sucursal. El inventario descuenta cada producto del combo, no el combo.' },
    ],
  },
  {
    id: 'caja-apertura',
    title: 'Abre la caja',
    intro: 'Para cobrar en efectivo necesitas la caja abierta.',
    steps: [
      { title: 'Aperturar caja', detail: 'En Caja → Sesión ingresa el monto inicial y notas, y pulsa Aperturar. Si intentas cobrar en efectivo sin caja abierta, el sistema te lo pedirá.' },
    ],
  },
  {
    id: 'mesas',
    title: 'Atiende mesas (salón)',
    intro:
      'La pantalla de Mesas muestra tu salón por pisos, con el estado de cada mesa por color. Aquí ocurre casi toda la operación.',
    steps: [
      { title: 'Lee el salón', detail: 'Filtra por piso o sala y busca una mesa. Los colores indican el estado: Libre (verde), Ocupada (naranja), Por cerrar (rojo), Reservada (azul) y Viendo la carta (celeste).' },
      { title: 'Abre una mesa', detail: 'Toca una mesa libre, indica el número de comensales y notas, y confirma para abrirla.' },
      { title: 'Toma el pedido', detail: 'Cambia entre las pestañas Productos y Combos, filtra por categoría o área, y agrega ítems. Si el producto tiene extras o presentaciones, se abre su configuración; también puedes añadir un producto manual.' },
      { title: 'Envía a cocina', detail: 'Pulsa Comanda: la ronda se envía a las pantallas de cocina y se imprime en el área correspondiente.' },
      { title: 'Precuenta', detail: 'Pulsa Precuenta para mostrar (e imprimir) el detalle y que el cliente lo revise antes de pagar.' },
      { title: 'Genera la venta', detail: 'Pulsa Generar venta: elige serie y tipo de documento, cliente, descuento y método(s) de pago. Con Cuenta dividida puedes cobrar por partes. Al cobrar todo, la mesa se cierra.' },
    ],
    tips: ['Puedes mover una mesa a otra libre, y anular una comanda indicando motivo y el PIN de operaciones.'],
  },
  {
    id: 'pos',
    title: 'Vende en POS (directa, llevar y delivery)',
    intro: 'Para ventas sin mesa, usa el POS. Elige el tipo de pedido según el caso.',
    steps: [
      { title: 'Venta directa', detail: 'Cobro inmediato, sin comanda ni precuenta. Ideal para mostrador.' },
      { title: 'Para llevar', detail: 'Genera comanda para cocina; los datos del cliente son opcionales.' },
      { title: 'Delivery', detail: 'Agrega dirección, referencia y repartidor. La dirección es obligatoria al enviar la comanda.' },
      { title: 'Acciones del pedido', detail: 'Según el tipo, tienes Comanda (enviar a cocina), Guardar (borrador), Precuenta y Cobrar.' },
    ],
  },
  {
    id: 'comandas',
    title: 'Gestiona la cocina (comandas)',
    intro: 'La pantalla de Comandas es el tablero de la cocina. Puedes verlo por ítem o por pedido.',
    steps: [
      { title: 'Elige la vista', detail: 'Por ítem (cada línea enviada) o por pedido (agrupado por mesa, llevar o delivery). Tu elección se recuerda.' },
      { title: 'Avanza los estados', detail: 'Cada comanda avanza Pendiente → En preparación → Listo → Entregado. Solo avanza, no retrocede.' },
      { title: 'Filtra y anula', detail: 'Filtra por estado con los contadores; para anular una comanda se pide motivo y PIN.' },
    ],
  },
  {
    id: 'facturacion',
    title: 'Cobra y factura',
    intro: 'Bendey Resto emite tus comprobantes electrónicos y los envía a SUNAT.',
    steps: [
      { title: 'Métodos de pago', detail: 'Cobra con uno o varios métodos. El efectivo requiere caja abierta y la factura requiere un cliente con RUC.' },
      { title: 'Convierte a boleta/factura', detail: 'En Ventas puedes convertir una nota de venta en boleta o factura y enviarla a SUNAT.' },
      { title: 'Anulaciones y descargas', detail: 'Anula con nota de crédito y descarga el PDF, XML y CDR, o imprime el ticket directo.' },
    ],
  },
  {
    id: 'cierre',
    title: 'Cierra caja y revisa reportes',
    intro: 'Al terminar el turno, cuadra la caja y analiza cómo fue el día.',
    steps: [
      { title: 'Arqueo y cierre', detail: 'En Caja haz el arqueo por denominaciones y cierra la sesión con el saldo y notas. El reporte separa efectivo y electrónico, y ventas brutas, anuladas y netas.' },
      { title: 'Reportes', detail: 'Consulta los reportes de Kardex, Productos, Ventas y Recetas, con exportación.' },
      { title: 'Dashboard', detail: 'El Dashboard muestra KPIs de operación y catálogo, el estado de las mesas y las tendencias del negocio.' },
    ],
  },
]
</script>

<template>
  <TutorialLayout
    eyebrow="Guía de uso"
    h1="Cómo usar Bendey Resto: guía paso a paso"
    lead="Pon en marcha tu restaurante con Bendey Resto: configura tu negocio y tu carta, atiende mesas, envía comandas a cocina, cobra y factura, y cierra tu caja al final del turno."
    app-name="Bendey Resto"
    :sections="sections"
  />
</template>
