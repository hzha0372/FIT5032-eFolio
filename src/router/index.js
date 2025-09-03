import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import AccessDenied from '@/views/AccessDenied.vue'
import isAuthenticated from '@/authenticate'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/AccessDenied',
    name: 'AccessDenied',
    component: AccessDenied
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
    console.log('isAuthenticated', isAuthenticated.value)
  
    if (to.name === 'AccessDenied') {
      next()
    } else if (to.name !== 'Login' && !isAuthenticated.value) {
      next({ name: 'AccessDenied' })
    } else {
      next()
    }
  })
  
export default router