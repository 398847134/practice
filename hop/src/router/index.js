import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {title: '登录'},
      component: () => import('@/views/login/login'),
      noCache: true
    },
    {
      path: '/mainPage',
      name: 'mainpage',
      meta: {title: '首页'},
      component: () => import('@/views/dashbored/mainPage'),
      noCache: true,
      children: [

      ]
    },{
      path: '/permission',
      name: 'permission',
      component: () => import('@/views/dashbored/mainPage'),
      noCache: true,
      meta: {title: '权限中心'},
      children: [
        {
          path: '/permission/user',
          name: 'user',
          meta: {title: '用户管理'},
          component: () => import('@/views/permission/user'),
          noCache: true
        },
        {
          path: '/permission/role',
          name: 'role',
          meta: {title:'角色列表'},
          component: () => import('@/views/permission/role'),
          noCache: true
        }
      ]
    },{
      path: '/hotel',
      name: 'hotel',
      component: () => import('@/views/dashbored/mainPage'),
      noCache: true,
      meta: {title: '信息'},
      children: [
        {
          path: '/hotel/hotelInfo',
          name: 'hotelInfo',
          meta: {title: '基础信息'},
          component: () => import('@/views/hotel/hotelInfo'),
          noCache: true
        }
      ]
    }
  ]
})

