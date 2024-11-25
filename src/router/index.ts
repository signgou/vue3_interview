import { createRouter, createWebHistory } from 'vue-router'
import { constRoutes } from './routes'
import useStudentStore from '@/store/modules/student'
import useExpertStore from '@/store/modules/expert'
const router = createRouter({
  history: createWebHistory(),
  routes: constRoutes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
router.beforeEach(async (to, from) => {
  //如果不需要授权就返回
  if (to.meta.requiresAuth == false) return

  const isAuthenticated = JSON.parse(
    sessionStorage.getItem('isAuthenticated') || 'false',
  )
  if (
    // 检查用户是否已登录
    !isAuthenticated
  ) {
    // 将用户重定向到登录页面
    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  //刷新
  if (from.path == '/') {
    const data = JSON.parse(sessionStorage.getItem('data') || '')
    const store = sessionStorage.getItem('store')
    if (data && store) {
      if (store == 'student') {
        useStudentStore().data = data
      } else {
        useExpertStore().data = data
      }
    }
  }
})
export default router
