import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/login')
    },
    {
      path: '/mainPage',
      name: 'mainpage',
      component: () => import('@/views/dashbored/mainPage')
    }
  ]
})
