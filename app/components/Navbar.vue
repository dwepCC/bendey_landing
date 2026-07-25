<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps({
  brand: { type: Object, required: true },
  navigation: { type: Array, required: true },
  dark: { type: Boolean, default: false },
})
const emit = defineEmits(['register'])

const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function handleNavigate() {
  mobileOpen.value = false
}

function isActive(item) {
  if (item.to) return route.path === item.to
  return false
}

const headerClass = computed(() => {
  if (props.dark) {
    return scrolled.value
      ? 'border-white/10 bg-slate-950/95 shadow-lg backdrop-blur-sm'
      : 'border-transparent bg-transparent'
  }
  return scrolled.value
    ? 'border-slate-200 bg-white/95 shadow-md backdrop-blur-sm'
    : 'border-transparent bg-white/80 backdrop-blur-sm'
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 border-b transition-all duration-300"
    :class="headerClass"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3" @click="handleNavigate">
        <img
          v-if="brand.logoSrc"
          :src="brand.logoSrc"
          :alt="brand.fullName"
          class="h-12 w-auto object-contain sm:h-14"
        />
        <div v-if="brand.logoSrc" class="hidden flex-col sm:flex">
          <span class="text-lg font-bold" :class="dark ? 'text-white' : 'text-bendey-navy'">
            {{ brand.name }}
            <span class="text-sm font-semibold text-bendey-gold">{{ brand.subname }}</span>
          </span>
        </div>
      </RouterLink>

      <div class="hidden items-center gap-8 md:flex">
        <div class="flex items-center gap-6 text-sm font-medium" :class="dark ? 'text-slate-300' : 'text-slate-600'">
          <template v-for="item in navigation" :key="item.label">
            <RouterLink
              v-if="item.to"
              :to="item.to"
              class="transition-colors hover:text-bendey-gold"
              :class="isActive(item) ? 'text-bendey-gold font-semibold' : (dark ? '' : 'hover:text-bendey-navy-mid')"
            >
              {{ item.label }}
            </RouterLink>
            <a
              v-else
              :href="item.href"
              class="transition-colors"
              :class="dark ? 'hover:text-bendey-gold' : 'hover:text-bendey-navy-mid'"
            >
              {{ item.label }}
            </a>
          </template>
        </div>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full bg-bendey-gold px-5 py-2.5 text-sm font-semibold text-bendey-navy shadow-sm transition hover:bg-bendey-gold-dark"
          @click="emit('register')"
        >
          Comenzar ahora
        </button>
      </div>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
        :class="dark ? 'border-white/20 bg-white/10 text-white' : 'border-slate-200 bg-slate-50 text-slate-800'"
        aria-label="Menú"
        @click="mobileOpen = !mobileOpen"
      >
        <span v-if="!mobileOpen" class="space-y-1.5">
          <span class="block h-0.5 w-5 rounded-full bg-current" />
          <span class="block h-0.5 w-4 rounded-full bg-current" />
          <span class="block h-0.5 w-6 rounded-full bg-current" />
        </span>
        <span v-else class="relative block h-5 w-5">
          <span class="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
          <span class="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
        </span>
      </button>
    </nav>

    <Transition name="fade">
      <div
        v-if="mobileOpen"
        class="border-t px-4 pb-4 pt-2 md:hidden"
        :class="dark ? 'border-white/10 bg-slate-950' : 'border-slate-200 bg-white'"
      >
        <div class="flex flex-col gap-3 text-sm font-medium">
          <template v-for="item in navigation" :key="item.label">
            <RouterLink
              v-if="item.to"
              :to="item.to"
              class="rounded-lg px-3 py-2 transition"
              :class="dark ? 'text-slate-200 hover:bg-white/10' : 'text-slate-700 hover:bg-violet-50 hover:text-violet-600'"
              @click="handleNavigate"
            >
              {{ item.label }}
            </RouterLink>
            <a
              v-else
              :href="item.href"
              class="rounded-lg px-3 py-2 transition"
              :class="dark ? 'text-slate-200 hover:bg-white/10' : 'text-slate-700 hover:bg-violet-50 hover:text-violet-600'"
              @click="handleNavigate"
            >
              {{ item.label }}
            </a>
          </template>
          <button
            type="button"
            class="mt-2 w-full rounded-lg bg-bendey-gold px-4 py-2.5 font-semibold text-bendey-navy hover:bg-bendey-gold-dark"
            @click="() => { handleNavigate(); emit('register') }"
          >
            Comenzar ahora
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
