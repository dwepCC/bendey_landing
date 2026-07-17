import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'
import { initAnalytics } from './config/analytics.js'

initAnalytics()

createApp(App).use(router).mount('#app')
