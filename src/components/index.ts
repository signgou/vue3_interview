import SvgIcon from '@/components/SvgIcon.vue'
import type { App } from 'vue'
//创一个对象来全局注册组件
const globalObject = { SvgIcon }
export default {
  install(app: App) {
    Object.keys(globalObject).forEach(key => {
      app.component(key, globalObject[key as keyof typeof globalObject])
    })
  },
}
