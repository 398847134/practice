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
      component: () => import('@/views/dashbored/mainPage'),
      noCache: true,
      children: [
        {
          path: 'test1',
          name: 'test1',
          component: () => import('@/views/testtable/test1'),
          noCache: true
        },
        {
          path: 'test2',
          name: 'test2',
          component: () => import('@/views/testtable/test2'),
          noCache: true
        }
      ]
    }
  ]
})
