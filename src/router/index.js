import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import AccessDenied from '@/views/AccessDenied.vue'
import isAuthenticated from '@/authenticate'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AdminPage from '@/views/AdminPage.vue'
import CustomerPage from '@/views/CustomerPage.vue'
import authenticateRole from '@/role'
import AddBookView from '@/views/AddBookView.vue'
import BookList from '@/components/BookList.vue'
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
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/AdminPage',
    name: 'AdminPage',
    component: AdminPage
  },
  {
    path: '/CustomerPage',
    name: 'CustomerPage',
    component: CustomerPage
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/booklist',
    name: 'BookList',
    component: BookList
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  console.log('isAuthenticated', isAuthenticated.value)

  if (to.name === 'AccessDenied') { 
    next()
  } 
  else if (isAuthenticated.value && authenticateRole === 'Admin') {
    next({ name: 'AdminPage' })
  } 
  else if (isAuthenticated.value && authenticateRole === 'Customer') {
    next({ name: 'CustomerPage' })
  } 
  else if (
    to.name !== 'Home' &&
    to.name !== 'Login' &&
    to.name !== 'FireLogin' &&
    to.name !== 'FireRegister' &&
    to.name !== 'AddBook' &&
    !isAuthenticated.value
  ) {
    next({ name: 'AccessDenied' })
  } 
  else {
    next()
  }
})

  
export default router