import type { RouteRecordRaw } from 'vue-router'

//常量路由
export const constRoutes = [
  {
    path: '/',
    component: () => import('@/views/HomePage.vue'),
    name: 'home',
  },
  {
    path: '/detail',
    component: () => import('@/views/DetailPage.vue'),
    name: 'detail',
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue'),
    name: 'login',
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterPage.vue'),
    name: 'register',
  },
  {
    path: '/studentHome',
    component: () => import('@/views/StudentHome.vue'),
    name: 'studentHome',
  },
  {
    path: '/expertHome',
    component: () => import('@/views/ExpertHome.vue'),
    name: 'expertHome',
  },
  {
    path: '/selectMode',
    component: () => import('@/views/SelectMode.vue'),
    name: 'selectMode',
  },
  {
    path: '/npcInterview',
    component: () => import('@/views/NPCInterview.vue'),
    name: 'npcInterview',
  },
  {
    path: '/expertInterview',
    component: () => import('@/views/ExpertInterview.vue'),
    name: 'expertInterview',
  },
  {
    path: '/expertInterviewing',
    component: () => import('@/views/ExpertInterviewing.vue'),
    name: 'expertInterviewing',
  },
  {
    path: '/:other(.*)*',
    component: () => import('@/views/IsDeveloping.vue'),
    name: 'develop',
  },
] as RouteRecordRaw[]
