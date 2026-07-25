<script setup>
// Layout base. En la siguiente tarea aloja Navbar/Footer y los widgets globales
// (chat WhatsApp, modal de registro). Por ahora solo envuelve la página.
</script>

<template>
  <div class="relative min-h-screen text-slate-800">
    <slot />
  </div>
</template>
