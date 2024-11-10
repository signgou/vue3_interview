import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import adapter from 'webrtc-adapter'
import 'virtual:svg-icons-register'
//导入用于注册全局组件的自定义插件
import globalComponent from '@/components'

const app = createApp(App)
app.use(globalComponent)
app.mount('#app')
