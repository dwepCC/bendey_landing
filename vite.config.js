import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_BACKEND_PROXY_URL || 'http://localhost:3000'

  return {
    plugins: [vue(), tailwindcss()],
    appType: 'spa',
    server: {
      // En dev, /r/CODIGO debe servir index.html (SPA)
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
          ws: true, // necesario para el WebSocket del chat (/api/public/assistant/chat/ws)
        },
        '/downloads': {
          target: backendUrl,
          changeOrigin: true,
        },
        '/storage': {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
    preview: {
      historyApiFallback: true,
    },
  }
})
