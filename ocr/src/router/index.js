//createRouter:创建router实例对象
//createWebHistory:创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'

import Layout from '../views/Layout/indexPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path 和component对应关系的位置
  routes: [
  {
    path:'/',
    component: Layout
  }
  ]
})

export default router
