<script setup>
import { ref, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { apiFetch } from '../composables/useApi.js'
import { trackEvent, trackConversion } from '../config/analytics.js'

const emit = defineEmits(['register'])

const open = ref(false)
const input = ref('')
const loading = ref(false)
const messages = ref([]) // del servidor: { id, role: 'user'|'assistant'|'agent', content }
const pending = ref(null) // mensaje del usuario en vuelo (optimista)
const notice = ref('') // aviso transitorio (errores)
const status = ref('') // '' | bot | needs_human | human | closed
const threadEl = ref(null)

// Nombre del asistente (sin nombre de persona por ahora).
const agentName = 'Asistente de Bendey'
const avatarSrc = '/asesora.png' // avatar del asistente (bot)

// Avatar del ASESOR humano: distinto al del bot, para que se note quién responde
// sin cambiar el color de los mensajes. Para usar una foto real, pon el archivo en
// public/ y cambia esta línea por:  const humanAvatarSrc = '/asesor.png'
const humanAvatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#10b981"/><stop offset="1" stop-color="#0f766e"/></linearGradient></defs><rect width="64" height="64" rx="32" fill="url(#h)"/><circle cx="32" cy="25" r="10" fill="#ffffff"/><path d="M14 52c0-9.5 8-15 18-15s18 5.5 18 15z" fill="#ffffff"/><path d="M20 27v-2a12 12 0 0 1 24 0v2" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/><rect x="16" y="26" width="5" height="8" rx="2.5" fill="#ffffff"/><rect x="43" y="26" width="5" height="8" rx="2.5" fill="#ffffff"/></svg>`
const humanAvatarSrc = 'data:image/svg+xml;utf8,' + encodeURIComponent(humanAvatarSvg)

// Avatar según quién habla.
function avatarFor(role) {
  return role === 'agent' ? humanAvatarSrc : avatarSrc
}

const GREETING = `¡Hola! 👋 Soy el ${agentName}. Pregúntame por los módulos, planes, precios o cómo empezar. Si prefieres, te derivo con un asesor.`

// Estado legible: el cliente SIEMPRE sabe con quién habla.
const withHuman = computed(() => status.value === 'human')
const waitingHuman = computed(() => status.value === 'needs_human')
const isClosed = computed(() => status.value === 'closed')
const headerSubtitle = computed(() => {
  if (isClosed.value) return 'Conversación cerrada'
  if (withHuman.value) return 'Te atiende un asesor'
  if (waitingHuman.value) return 'Conectando con un asesor…'
  return 'Respuesta al instante'
})

// Menú de opciones (los IDs coinciden con el servidor: orchestrator.ResolveSelection).
const MENU = [
  { id: 'menu:conocer', label: '🚀 Conocer Bendey' },
  { id: 'menu:planes', label: '💰 Planes y precios' },
  { id: 'menu:demo', label: '👀 Probar la demo' },
  { id: 'menu:prueba', label: '🎁 Prueba gratis (1 mes)' },
  { id: 'menu:pagos', label: '💳 Formas de pago' },
  { id: 'menu:asesor', label: '💬 Hablar con un asesor' },
]
const serverMenu = ref([]) // menú que el servidor pide mostrar (acción show_menu)

// Menú activo: el que envía el servidor, o el inicial cuando el hilo está vacío.
const activeMenu = computed(() => {
  if (serverMenu.value.length) return serverMenu.value.map((o) => ({ id: o.id, label: o.title }))
  if (messages.value.length === 0 && !pending.value && !loading.value) return MENU
  return []
})

function pickMenu(opt) {
  serverMenu.value = []
  send(opt.id, opt.label)
}

// Sesión persistente por navegador (mantiene el hilo entre recargas).
const SESSION_KEY = 'bendey_chat_session'
function newSession() {
  const id = 'web-' + Math.random().toString(36).slice(2, 12)
  localStorage.setItem(SESSION_KEY, id)
  return id
}
const sessionId = ref(localStorage.getItem(SESSION_KEY) || newSession())

// Burbuja proactiva. Se marca como vista SOLO en la sesión del navegador
// (sessionStorage): así vuelve a aparecer en la próxima visita. Antes usaba
// localStorage y quedaba oculta para siempre tras abrir el chat una vez.
const showTeaser = ref(false)
const TEASER_KEY = 'bendey_chat_teaser_seen'

// WebSocket: entrega en tiempo real (sin polling).
let ws = null
let wsRetry = null

function wsURL() {
  const base = import.meta.env.VITE_API_URL || window.location.origin
  const u = new URL('/api/public/assistant/chat/ws', base)
  u.protocol = u.protocol === 'https:' ? 'wss:' : 'ws:'
  u.searchParams.set('session_id', sessionId.value)
  return u.toString()
}

function connectWS() {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return
  try {
    ws = new WebSocket(wsURL())
  } catch {
    return
  }
  ws.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data)
      if (data.type === 'sync') applySync(data)
    } catch {
      /* payload inválido: ignorar */
    }
  }
  ws.onclose = () => {
    ws = null
    // Reconecta mientras el chat siga abierto.
    if (open.value) {
      clearTimeout(wsRetry)
      wsRetry = setTimeout(connectWS, 3000)
    }
  }
  ws.onerror = () => {
    if (ws) ws.close()
  }
}

function disconnectWS() {
  clearTimeout(wsRetry)
  if (ws) {
    ws.onclose = null
    ws.close()
    ws = null
  }
}

function applySync(data) {
  status.value = data.status || ''
  const list = data.messages || []
  if (list.length !== messages.value.length) scrollDown()
  messages.value = list
}

onMounted(() => {
  setTimeout(() => {
    if (!open.value && !sessionStorage.getItem(TEASER_KEY)) showTeaser.value = true
  }, 5000)
})
onUnmounted(disconnectWS)

function dismissTeaser() {
  showTeaser.value = false
  sessionStorage.setItem(TEASER_KEY, '1')
}
function openFromTeaser() {
  dismissTeaser()
  if (!open.value) toggle()
}

function scrollDown() {
  nextTick(() => {
    if (threadEl.value) threadEl.value.scrollTop = threadEl.value.scrollHeight
  })
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function formatMessage(text) {
  let s = escapeHtml(text || '')
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>')
  s = s.replace(/^\s*[-*]\s+/gm, '• ')
  return s
}

// reload: lectura one-shot (NO polling). Respaldo por si el WebSocket no conecta.
async function reload() {
  try {
    const data = await apiFetch(
      `/api/public/assistant/chat/messages?session_id=${encodeURIComponent(sessionId.value)}`,
    )
    applySync(data)
  } catch {
    /* silencioso: si falla, el chat sigue funcionando */
  }
}

function toggle() {
  open.value = !open.value
  if (open.value) {
    trackEvent('chat_open')
    showTeaser.value = false
    sessionStorage.setItem(TEASER_KEY, '1')
    reload() // rehidrata al abrir (respaldo)
    connectWS() // tiempo real: el WS envía el hilo al conectar y ante cada cambio
  } else {
    disconnectWS()
  }
  scrollDown()
}

async function send(preset, displayText) {
  const text = (typeof preset === 'string' ? preset : input.value).trim()
  if (!text || loading.value || isClosed.value) return
  input.value = ''
  notice.value = ''
  serverMenu.value = []
  pending.value = displayText || text // muestra la etiqueta amable, no el id crudo
  loading.value = true
  trackEvent('chat_message')
  scrollDown()
  try {
    const data = await apiFetch('/api/public/assistant/chat', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId.value, text }),
    })
    if (data.silent) {
      trackEvent('chat_handoff_request')
      // El bot escaló a un asesor: es un prospecto real. Como evento estándar,
      // Meta puede optimizar campañas hacia gente que pide contacto — útil sobre
      // todo al inicio, cuando aún hay pocos registros para optimizar.
      trackConversion('Lead', { content_name: 'Chat handoff' })
    }
    serverMenu.value = data.menu || []
    await reload()
  } catch (e) {
    notice.value = e.message || 'No pude responder ahora. Intenta de nuevo en un momento.'
  } finally {
    pending.value = null
    loading.value = false
    scrollDown()
  }
}

// Nueva conversación (tras cierre o si el cliente quiere empezar de cero).
function restart() {
  sessionId.value = newSession()
  messages.value = []
  status.value = ''
  notice.value = ''
  scrollDown()
}

function goPrecios() {
  trackEvent('chat_view_pricing')
  open.value = false
  window.location.hash = '#precios'
}
function goRegister() {
  trackEvent('chat_register_click')
  emit('register')
}
</script>

<template>
  <!-- Panel de chat -->
  <div
    v-if="open"
    class="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:bottom-28 sm:right-6"
    style="height: min(70vh, 560px)"
  >
    <!-- Header -->
    <div class="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white">
      <div class="flex items-center gap-2">
        <img
          :src="withHuman ? humanAvatarSrc : avatarSrc"
          alt=""
          class="h-9 w-9 rounded-full object-cover ring-2 ring-white/40"
        />
        <div>
          <p class="text-sm font-semibold leading-tight">
            {{ withHuman ? 'Asesor Bendey' : agentName }}
          </p>
          <p class="flex items-center gap-1 text-[11px] leading-tight text-white/70">
            <span
              class="inline-block h-1.5 w-1.5 rounded-full"
              :class="isClosed ? 'bg-slate-300' : waitingHuman ? 'bg-amber-300' : 'bg-green-400'"
            ></span>
            {{ headerSubtitle }}
          </p>
        </div>
      </div>
      <button @click="toggle" class="text-white/80 hover:text-white" aria-label="Cerrar chat">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Aviso de estado: el cliente sabe con quién habla -->
    <div v-if="withHuman" class="bg-emerald-50 px-3 py-1.5 text-center text-[11px] font-medium text-emerald-700">
      Ahora te atiende una persona del equipo Bendey
    </div>
    <div v-else-if="waitingHuman" class="bg-amber-50 px-3 py-1.5 text-center text-[11px] font-medium text-amber-700">
      Un asesor se conectará contigo en breve. Puedes seguir escribiendo.
    </div>

    <!-- Mensajes -->
    <div ref="threadEl" class="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-4">
      <!-- Saludo (siempre visible) -->
      <div class="flex items-end gap-2 justify-start">
        <img :src="avatarSrc" alt="" class="h-8 w-8 shrink-0 rounded-full object-cover shadow ring-1 ring-black/5" />
        <div class="max-w-[78%] whitespace-pre-wrap rounded-2xl bg-white px-3 py-2 text-sm text-slate-800 shadow-sm ring-1 ring-black/5">
          {{ GREETING }}
        </div>
      </div>

      <!-- Hilo real (servidor) -->
      <div
        v-for="m in messages"
        :key="m.id"
        class="flex items-end gap-2"
        :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <img
          v-if="m.role !== 'user'"
          :src="avatarFor(m.role)"
          :alt="m.role === 'agent' ? 'Asesor' : agentName"
          :title="m.role === 'agent' ? 'Asesor Bendey' : agentName"
          class="h-8 w-8 shrink-0 rounded-full object-cover shadow ring-1 ring-black/5"
        />
        <div
          class="max-w-[78%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm"
          :class="
            m.role === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-800 shadow-sm ring-1 ring-black/5'
          "
        >
          <span v-if="m.role === 'user'">{{ m.content }}</span>
          <span v-else v-html="formatMessage(m.content)"></span>
        </div>
      </div>

      <!-- Mensaje en vuelo (optimista) -->
      <div v-if="pending" class="flex justify-end">
        <div class="max-w-[78%] whitespace-pre-wrap rounded-2xl bg-blue-600/70 px-3 py-2 text-sm text-white">
          {{ pending }}
        </div>
      </div>

      <!-- Menú de opciones (al inicio o cuando el bot lo pide) -->
      <div v-if="activeMenu.length" class="flex flex-col gap-2 pt-1">
        <button
          v-for="opt in activeMenu"
          :key="opt.id"
          @click="pickMenu(opt)"
          class="w-full rounded-xl border border-blue-200 bg-white px-3 py-2 text-left text-sm font-medium text-blue-700 transition hover:bg-blue-50"
        >
          {{ opt.label }}
        </button>
      </div>

      <div v-if="notice" class="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs italic text-amber-700">
        {{ notice }}
      </div>
      <div v-if="loading" class="px-1 text-xs text-slate-400">Escribiendo…</div>

      <!-- Conversación cerrada -->
      <div v-if="isClosed" class="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center text-xs text-slate-500">
        Esta conversación fue cerrada.
        <button @click="restart" class="mt-1 block w-full font-semibold text-blue-600 hover:underline">
          Iniciar una nueva conversación
        </button>
      </div>
    </div>

    <!-- CTAs persistentes -->
    <div class="flex gap-2 border-t border-slate-100 bg-white px-2 pt-2">
      <button
        @click="goRegister"
        class="flex-1 rounded-lg bg-yellow-400 px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-yellow-300"
      >
        Registrarme gratis
      </button>
      <button
        @click="goPrecios"
        class="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Ver precios
      </button>
    </div>

    <!-- Input -->
    <div class="flex items-center gap-2 bg-white p-2">
      <input
        v-model="input"
        @keydown.enter="send()"
        :disabled="isClosed"
        type="text"
        :placeholder="isClosed ? 'Conversación cerrada' : 'Escribe tu mensaje…'"
        class="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-50"
      />
      <button
        @click="send()"
        :disabled="loading || !input.trim() || isClosed"
        class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-40"
        aria-label="Enviar"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Burbuja proactiva -->
  <div
    v-if="showTeaser && !open"
    class="fixed bottom-40 right-4 z-50 flex max-w-[15rem] items-start gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 sm:bottom-44 sm:right-6"
  >
    <img :src="avatarSrc" alt="" class="h-8 w-8 shrink-0 rounded-full object-cover" />
    <button @click="openFromTeaser" class="text-left text-sm text-slate-700">
      ¿Tienes dudas? Escríbeme, te ayudo al instante 👋
    </button>
    <button @click="dismissTeaser" class="text-slate-300 hover:text-slate-500" aria-label="Cerrar">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Botón flotante (encima del de WhatsApp) -->
  <button
    v-if="!open"
    @click="toggle"
    class="assistant-btn fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-indigo-700 sm:bottom-28 sm:right-6"
    aria-label="Abrir chat con el asistente de Bendey"
  >
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
    <span>Chatea con nosotros</span>
  </button>
</template>

<style scoped>
.assistant-btn {
  animation: pulse-blue 2s ease-in-out infinite;
}
@keyframes pulse-blue {
  0%, 100% {
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.5);
  }
  50% {
    box-shadow: 0 4px 24px rgba(79, 70, 229, 0.8);
  }
}
</style>
