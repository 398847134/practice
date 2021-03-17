import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Vuetify from 'vuetify'
import 'element-ui/lib/theme-chalk/index.css';
import animate from 'animate.css'
import echarts from 'echarts'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.css'
import {fetch} from './utils/https'
import * as filters from './filter/filter'


Vue.use(ElementUI);
Vue.use(Vuetify)
Vue.use(echarts)
Vue.use(animate)
// 请求封装
Vue.prototype.$fetch = fetch
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
