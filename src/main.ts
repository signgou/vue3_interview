import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import adapter from 'webrtc-adapter'
const app = createApp(App)
app.mount('#app')
