import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Profile from '../views/Profile.vue'

import { authGuard } from '@/auth/authGuard'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },    
    {
      path: '/mainpage',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
