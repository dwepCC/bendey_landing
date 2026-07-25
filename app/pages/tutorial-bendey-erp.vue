<script setup>
// Tutorial detallado de Bendey ERP. Contenido basado en los procesos REALES de la
// app (front_tenant_web): sidebar, rutas, campos y validaciones verificados en el código.
useSeo({
  title: 'Cómo usar Bendey ERP: guía paso a paso | Bendey Cloud',
  description:
    'Tutorial completo de Bendey ERP: configura tu empresa e impresoras, carga tu catálogo, abre caja, registra ventas, emite comprobantes SUNAT, guías de remisión, compras e inventario.',
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
      'Bendey ERP se usa por la web con tu correo y clave. Al entrar verás un menú lateral con los módulos que incluye tu plan y tu rol, y una barra superior con las herramientas del día a día.',
    steps: [
      { title: 'Inicia sesión', detail: 'Entra con tu correo y contraseña. La razón social y el RUC de tu empresa ya quedaron definidos al registrarte y no se editan desde la app.' },
      { title: 'Elige tu sucursal activa', detail: 'En la barra superior, en el menú de usuario, usa el selector de sucursal. La sucursal condiciona qué series, caja, stock y reportes ves; cámbiala cuando trabajes en otro local.' },
      { title: 'Reconoce el menú', detail: 'El lateral agrupa: Ventas, Compras, Contactos, Inventario, Finanzas, Documentos avanzados, Reportes, Administración y Empresa. Si un grupo no aparece, tu plan no lo incluye o tu rol no tiene permiso.' },
      { title: 'Usa los accesos rápidos', detail: 'La pantalla de Inicio muestra KPIs de ventas y compras del día y del mes, con botones directos a POS, nota de venta, boleta/factura, productos y caja.' },
      { title: 'Vigila las notificaciones', detail: 'La campana de la barra superior avisa de comprobantes SUNAT pendientes, con error o rechazados, y de recordatorios de membresías, para que no se te pase nada.' },
    ],
    tips: ['El Dashboard (menú Inicio → Dashboard) amplía la analítica con gráficos de ventas, caja y comprobantes.'],
  },
  {
    id: 'configura-empresa',
    title: 'Configura tu empresa',
    intro:
      'Antes de emitir tu primer comprobante, completa el grupo “Empresa” del menú. Es la base de todo lo que factures.',
    steps: [
      { title: 'Mi empresa', detail: 'En Empresa → Mi empresa completa nombre comercial, moneda, ubicación (ubigeo), dirección, teléfono y correo. Sube tu logo (aparece en los comprobantes) y elige uno de los temas de color de la interfaz.' },
      { title: 'SUNAT / IGV', detail: 'En Empresa → SUNAT / IGV define la tasa de IGV, el régimen (general, simplificado o exonerado) y la zona de beneficio tributario. El estado de la facturación electrónica es de solo lectura (se activa desde el panel central).' },
      { title: 'Sucursales', detail: 'En Empresa → Sucursales registra cada local con nombre, dirección, teléfono y código de domicilio fiscal. Marca una como principal (esa no se puede eliminar).' },
      { title: 'Series y numeración', detail: 'En Empresa → Series crea una serie por sucursal y tipo de documento: nota de venta (00), boleta (03), factura (01), nota de crédito (07), nota de débito (08), guía de remisión (09), etc.' },
      { title: 'Cuida las series en uso', detail: 'Una serie que ya tiene documentos emitidos queda bloqueada para editar o eliminar, para no romper la correlatividad. Crea una nueva si necesitas cambiar algo.' },
    ],
    tips: ['Sin facturación electrónica activa, solo se permite la serie de nota de venta (código 00).'],
  },
  {
    id: 'usuarios',
    title: 'Crea usuarios y permisos',
    intro: 'Da acceso a tu equipo definiendo primero qué puede hacer cada rol y luego creando cada usuario.',
    steps: [
      { title: 'Define los roles', detail: 'En Administración → Roles crea roles con nombre y descripción, y marca los permisos agrupados por módulo (ventas, caja, inventario, compras, etc.) con las casillas.' },
      { title: 'Crea los usuarios', detail: 'En Administración → Usuarios registra a cada colaborador con correo, contraseña y rol, y asígnale una o varias sucursales.' },
      { title: 'Activa o desactiva accesos', detail: 'Puedes desactivar un usuario sin borrarlo (por ejemplo, personal de temporada) y reactivarlo cuando vuelva.' },
    ],
  },
  {
    id: 'impresoras',
    title: 'Configura tus impresoras',
    intro:
      'La impresión directa en ticketera está disponible en la app de Bendey ERP para Windows (USB o red) y Android (Bluetooth o red). La configuración es local de cada equipo y no se sincroniza, así que se hace en cada dispositivo que imprime.',
    steps: [
      { title: 'Abre la configuración', detail: 'En el menú Empresa → Impresora del dispositivo entra a “Impresora del dispositivo”. Si usas la versión web verás los ajustes, pero la impresión directa requiere la app instalada.' },
      { title: 'Elige el tipo de conexión', detail: 'En Windows: impresora instalada por USB, o por red (TCP/IP). En Android: Bluetooth o red. Todas imprimen tickets ESC/POS de tus comprobantes de venta (nota, boleta y factura).' },
      { title: 'Conexión USB (Windows)', detail: 'Selecciona en “Impresora Windows” la ticketera ya instalada en el equipo; Bendey imprime en modo RAW directamente sobre ella.' },
      { title: 'Conexión por red (TCP/IP)', detail: 'Ingresa un nombre opcional, la dirección IP o host de la ticketera (ej. 192.168.1.50) y el puerto TCP (habitualmente 9100). Debe estar en la misma red Wi-Fi que el dispositivo.' },
      { title: 'Haz una prueba', detail: 'Pulsa “Probar impresión” para confirmar que la ticketera responde antes de operar. Ajusta la conexión si no imprime.' },
    ],
    tips: [
      'Usa una IP fija en la ticketera de red para que no cambie y deje de imprimir.',
      'La impresión automática al cobrar se puede activar para no tener que confirmar cada ticket.',
    ],
  },
  {
    id: 'catalogo',
    title: 'Carga tu catálogo y contactos',
    intro: 'Registra lo que vendes y a quién le vendes. Todo se conecta con ventas, inventario y comprobantes.',
    steps: [
      { title: 'Crea un producto', detail: 'En Inventario → Productos → Nuevo: sube una imagen, deja el código autogenerado (o edítalo), pon el nombre, la unidad SUNAT, la categoría (puedes crearla al vuelo) y el precio de venta y de compra.' },
      { title: 'Define el IGV del producto', detail: 'Elige el tipo de afectación: gravado (10), exonerado (20), inafecto (30) o exportación (40), y marca si el precio ya incluye IGV. Esto determina cómo se calcula el impuesto en la venta.' },
      { title: 'Controla el stock', detail: 'Activa “Controlar stock” y define stock mínimo e inicial. Puedes añadir presentaciones (variantes) y grupos de modificadores, y trabajar con números de serie si el producto los usa.' },
      { title: 'Importa por Excel', detail: 'Si tienes muchos productos, usa Importar Excel; también puedes seleccionar varios y actualizar stock de forma masiva.' },
      { title: 'Registra servicios', detail: 'En Inventario → Servicios usas el mismo formulario para lo que no maneja stock (unidad ZZ).' },
      { title: 'Carga clientes y proveedores', detail: 'En Contactos, pestañas Clientes y Proveedores, pulsa Nuevo, elige el tipo de documento y escribe el número: el botón Consultar autocompleta razón social, dirección y ubigeo desde SUNAT/RENIEC. Completa teléfono, correo y, si quieres, foto y personas de contacto.' },
    ],
    tips: ['El POS trae un cliente por defecto “Clientes Varios” (público en general) que no se puede editar; sirve para ventas rápidas sin datos.'],
  },
  {
    id: 'caja',
    title: 'Abre y controla tu caja',
    intro: 'Para cobrar en efectivo necesitas una caja abierta. Hay una sesión por usuario y sucursal.',
    steps: [
      { title: 'Abre la caja', detail: 'En Finanzas → Caja pulsa Abrir caja e ingresa el balance inicial y notas. Verás tarjetas de Apertura, Ingresos, Egresos y Balance actual.' },
      { title: 'Registra ingresos y egresos', detail: 'Usa Ingreso o Egreso para movimientos manuales: elige categoría, referencia, método de pago, monto y notas.' },
      { title: 'Haz el arqueo', detail: 'Pulsa Arqueo y cuenta por denominaciones (billetes y monedas); el sistema compara con el balance esperado y muestra la diferencia.' },
      { title: 'Cierra la caja', detail: 'Al terminar el turno pulsa Cerrar caja: registra el balance final, un arqueo opcional y notas de cierre.' },
      { title: 'Configura bancos y métodos de pago', detail: 'En Finanzas → Cuentas/Bancos crea tus cuentas; en Métodos de pago define cada método (efectivo o cuenta bancaria). Estos métodos aparecen en ventas, POS y cobros.' },
    ],
  },
  {
    id: 'ventas',
    title: 'Registra tus ventas',
    intro:
      'Tienes cuatro formas de vender según la necesidad: punto de venta, nota de venta, comprobante electrónico y cotización. Todas comparten el mismo detalle de productos y condición de pago.',
    steps: [
      { title: 'Punto de venta (POS)', detail: 'En Ventas → Punto de venta busca productos (o usa el escáner de código de barras), tócalos para armar el carrito y ajusta cantidades o precio en línea. Pulsa Ir a cobrar.' },
      { title: 'Cierra la venta en el POS', detail: 'En el checkout elige tipo de documento (00/03/01 según tus series), serie, cliente (por defecto “Clientes Varios”, o registra uno validando su DNI/RUC), descuento por % o monto, y uno o varios métodos de pago. Confirma e imprime el ticket.' },
      { title: 'Nota de venta', detail: 'En Ventas → Notas de venta → Nueva: elige el cliente (buscable por nombre o documento), la serie de nota (00), agrega el detalle y la condición de pago, y pulsa Registrar. Es un comprobante de control interno, sin envío a SUNAT.' },
      { title: 'Boleta o Factura electrónica', detail: 'En Ventas → Boleta / Factura elige cliente (obligatorio; la factura exige RUC de 11 dígitos), el tipo y la serie, y la fecha y vencimiento. Agrega productos o un ítem manual; cada línea lleva cantidad, precio, afectación IGV e “IGV incluido”.' },
      { title: 'Elige la condición de pago', detail: 'Marca Contado o Crédito. En Crédito activa el plan de cuotas (genera una cuenta por cobrar). En efectivo con crédito necesitas caja abierta. Revisa el resumen (gravado/exonerado/inafecto, subtotal, IGV, total) y pulsa Emitir comprobante.' },
      { title: 'Cotizaciones', detail: 'En Ventas → Cotizaciones → Nueva registras una cotización con fecha de validez, estado y observaciones; no afecta stock ni caja. Desde la lista la conviertes en nota, boleta o factura con “Convertir ahora” o “Editar y generar”.' },
    ],
    tips: ['Desde la lista de notas de venta puedes convertir una nota en boleta o factura; el stock y los seriales no se descuentan dos veces.'],
  },
  {
    id: 'sunat',
    title: 'Envía tus comprobantes a SUNAT',
    intro:
      'El envío a SUNAT no ocurre al crear el comprobante: primero se registra y luego lo envías desde Ventas → Documentos electrónicos, donde gestionas todo el ciclo.',
    steps: [
      { title: 'Envía o reenvía', detail: 'En Documentos electrónicos, en la vista Facturas y boletas, cada comprobante muestra su estado SUNAT con los botones Enviar (o Reenviar si hubo error).' },
      { title: 'Descarga e imprime', detail: 'Obtén el PDF (A4 o ticket) e imprímelo en ticketera, y descarga el XML firmado y el CDR de respuesta de SUNAT.' },
      { title: 'Envía por WhatsApp', detail: 'Comparte el comprobante como imagen (A4 o ticket) directamente por WhatsApp al cliente.' },
      { title: 'Anula comprobantes', detail: 'Anula con Nota de crédito, o para boletas usa la comunicación de baja / resumen de anulación. También puedes emitir una Nota de débito.' },
      { title: 'Resúmenes de boletas', detail: 'En la vista Resúmenes y bajas generas el resumen diario de boletas por fecha, envías comunicaciones de baja y consultas el estado del CDR por tipo, serie y número.' },
    ],
  },
  {
    id: 'guias',
    title: 'Emite guías de remisión',
    intro: 'Si trasladas mercadería, genera la guía de remisión electrónica (GRE) desde Documentos avanzados. Necesitas una serie GRE (09 remitente / 31 transportista).',
    steps: [
      { title: 'Registra los maestros de transporte', detail: 'En Documentos avanzados → Transportistas y vehículos das de alta transportistas, conductores y vehículos; usa la misma consulta por DNI/RUC para traer datos validados.' },
      { title: 'Crea la guía', detail: 'En Documentos avanzados → Guías de remisión pulsa Nueva guía y completa: serie GRE, fecha/hora de traslado, destinatario (cliente buscable con su ubigeo), y los puntos de partida y llegada con dirección y ubigeo.' },
      { title: 'Detalla el traslado', detail: 'Indica el peso total (kg) y el número de bultos, elige la modalidad de transporte y asigna el transportista/conductor/vehículo. Agrega los bienes a trasladar (producto o ítem manual).' },
      { title: 'Emite y envía', detail: 'Pulsa Emitir y enviar a SUNAT. También puedes generar la guía directamente desde una venta ya registrada.' },
    ],
  },
  {
    id: 'compras-inventario',
    title: 'Compras e inventario',
    intro: 'Registra las compras a proveedores y mantén tu stock al día entre sucursales.',
    steps: [
      { title: 'Registra una compra', detail: 'En Compras → Nueva compra elige el proveedor, el tipo de documento (factura, boleta, nota de crédito o ticket), serie, número, fecha y método de pago (el monto se descuenta de la cuenta asociada).' },
      { title: 'Carga el detalle', detail: 'Agrega ítems con el buscador (trae el precio de compra), define unidad, cantidad y costo unitario. Si el producto usa números de serie, se registran uno por uno. Pulsa Registrar compra: el stock sube solo.' },
      { title: 'Anula si hace falta', detail: 'Anular una compra revierte automáticamente el stock, el kardex y los números de serie asociados.' },
      { title: 'Transfiere entre sucursales', detail: 'En Inventario → Transferencias elige sucursal origen y destino, agrega productos (verifica stock por sucursal) y confirma la recepción en el destino.' },
      { title: 'Consulta el kardex', detail: 'En Inventario → Kardex revisas el historial valorizado de entradas y salidas por producto.' },
    ],
  },
  {
    id: 'cobros-reportes',
    title: 'Cobros, reportes y análisis',
    intro: 'Cierra el círculo: cobra lo que te deben y toma decisiones con datos reales.',
    steps: [
      { title: 'Cobra las cuentas por cobrar', detail: 'En Finanzas → Cuentas por cobrar ves las ventas a crédito por estado (pendiente, parcial, pagada, vencida). Registra el pago de una cuota, de varias o del total con su método de pago; el efectivo se registra contra la caja abierta.' },
      { title: 'Genera reportes', detail: 'En Reportes tienes ventas, productos, ventas por producto, compras, kardex, caja y cuentas por cobrar, con filtros por sucursal, fecha, tipo de documento y estado, y exportación a PDF y Excel.' },
      { title: 'Analiza en el Dashboard', detail: 'El Dashboard reúne la analítica con gráficos de ventas, caja y comprobantes para ver el pulso del negocio de un vistazo.' },
    ],
  },
]
</script>

<template>
  <TutorialLayout
    eyebrow="Guía de uso"
    h1="Cómo usar Bendey ERP: guía paso a paso"
    lead="Todo lo que necesitas para poner en marcha Bendey ERP: desde configurar tu empresa e impresoras y cargar tu catálogo, hasta vender, emitir comprobantes SUNAT, controlar inventario y analizar resultados."
    app-name="Bendey ERP"
    :sections="sections"
  />
</template>
