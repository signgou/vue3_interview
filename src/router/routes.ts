import type { RouteRecordRaw } from 'vue-router'

//常量路由
export const constRoutes = [
  {
    path: '/',
    component: () => import('@/views/HomePage.vue'),
    name: 'home',
    meta: { requiresAuth: false },
  },
  {
    path: '/detail',
    component: () => import('@/views/DetailPage.vue'),
    name: 'detail',
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue'),
    name: 'login',
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterPage.vue'),
    name: 'register',
    meta: { requiresAuth: false },
  },
  {
    path: '/studentHome',
    component: () => import('@/views/studentHome/StudentHome.vue'),
    name: 'studentHome',
    redirect: { name: 'exercise' },
    children: [
      {
        path: 'exercise',
        component: () => import('@/views/studentHome/StudentExercise.vue'),
        name: 'exercise',
      },
      {
        path: 'info',
        component: () => import('@/views/studentHome/StudentInfo.vue'),
        name: 'studentInfo',
      },
    ],
  },
  {
    path: '/expertHome',
    component: () => import('@/views/expertHome/ExpertHome.vue'),
    name: 'expertHome',
    redirect: { name: 'link' },
    children: [
      {
        path: 'link',
        component: () => import('@/views/expertHome/ExpertLink.vue'),
        name: 'link',
      },
      {
        path: 'info',
        component: () => import('@/views/expertHome/ExpertInfo.vue'),
        name: 'expertInfo',
      },
    ],
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
    props: route => route.query,
  },
  {
    path: '/studentInterview',
    component: () => import('@/views/StudentInterview.vue'),
    name: 'studentInterview',
    props: route => route.query,
  },
  {
    path: '/expertInterview',
    component: () => import('@/views/ExpertInterview.vue'),
    name: 'expertInterview',
    props: route => route.query,
  },
  {
    path: '/questionBank',
    component: () => import('@/views/QuestionBank.vue'),
    name: 'questionBank',
    props: route => {
      return route.query
    },
  },
  {
    path: '/:other(.*)*',
    component: () => import('@/views/IsDeveloping.vue'),
    name: 'develop',
    meta: { requiresAuth: false },
  },
] as RouteRecordRaw[]
