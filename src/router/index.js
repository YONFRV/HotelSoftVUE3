import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from '../stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/User/Login.vue')
    },
    {
      path: '/hotel',
      name: 'hotel',
      component: () => import('../views/Hotel/Index.vue')
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('../views/Room/Index.vue')
    },
    {
      path: '/type-romm',
      name: 'type-romm',
      component: () => import('../views/TypeRoom/Index.vue')
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('../views/City/Index.vue')
    },
    {
      path: '/accommodation',
      name: 'accommodation',
      component: () => import('../views/Accommodation/Index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/User/RegisterUser.vue')
    },
    {
      path: '/update',
      name: 'update',
      component: () => import('../views/User/UpdateUser.vue')
    }
  ]
})

router.beforeEach( async (to) =>{
  const publicPages = ['/login','/room','/accommodation','/type-romm','/hotel','/city']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if(authRequired && !auth.user){
    auth.returnUrl = to.fullPath
    return '/login'
  }
})

export default router
