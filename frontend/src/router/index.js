import { createRouter, createWebHistory } from 'vue-router'
import AdminRoot from '../components/admin/adminroot.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'adminroot',
      component: AdminRoot
    }
  ]
})

export default router
