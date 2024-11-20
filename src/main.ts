import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import adapter from 'webrtc-adapter'
//svg
import 'virtual:svg-icons-register'
//导入用于注册全局组件的自定义插件
import globalComponent from '@/components'
//导入路由插件
import router from './router'
//适配桌面端
// 引入模块后自动生效
import '@vant/touch-emulator'
//导入pinia
import pinia from './store'

//设置vant提示
import { setToastDefaultOptions } from 'vant'
setToastDefaultOptions({ duration: 1000 })
//解决toast样式被覆盖而不能正常工作
import 'vant/es/toast/style'
//同理解决diglog问题
import 'vant/es/dialog/style'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(globalComponent)
app.mount('#app')
