<script setup>
import { WHATSAPP_URL } from '../config/contact.js'
</script>

<template>
  <a
    :href="WHATSAPP_URL"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-btn fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5"
    aria-label="Chatear por WhatsApp sobre Bendey Cloud"
  >
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2A9.93 9.93 0 0 0 2 11.96a9.86 9.86 0 0 0 1.41 5.1L2 22l5.09-1.34a10.06 10.06 0 0 0 4.95 1.27h.01A9.96 9.96 0 0 0 22 11.96 9.93 9.93 0 0 0 12.04 2Zm5.87 13.47c-.24.68-1.19 1.29-1.88 1.46-.5.13-1.15.23-3.36-.72-2.82-1.17-4.63-4.05-4.77-4.24-.14-.19-1.14-1.51-1.14-2.88s.72-2.04.97-2.32c.25-.28.54-.35.72-.35h.52c.17 0 .39-.06.61.46.24.58.82 2 .89 2.14.07.14.11.3.02.48-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.29.29-.13.57.17.28.75 1.24 1.61 2.01 1.11.99 2.05 1.3 2.35 1.45.3.15.47.13.65-.08.18-.21.75-.88.95-1.18.2-.3.41-.25.69-.15.28.1 1.79.84 2.09.99.3.15.5.23.57.36.07.13.07.75-.17 1.43Z" />
    </svg>
    <span class="hidden sm:inline">Chatea por WhatsApp</span>
    <span class="sm:hidden">WhatsApp</span>
  </a>
</template>

<style scoped>
.whatsapp-btn {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 14px rgba(37, 211, 102, 0.5);
  }
  50% {
    box-shadow: 0 4px 24px rgba(37, 211, 102, 0.8);
  }
}
</style>
