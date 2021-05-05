import Vue from 'vue'

import 'normalize.css/normalize.css' // 一个现代的替代CSS重置

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全局css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // 图标
import '@/permission' // 权限控制

import echarts from 'echarts' // 引入echarts

/*引入需要View UI*/
import {
  Switch
} from 'view-design';
import 'view-design/dist/styles/iview.css'

/**
 * 如果您不想使用mock-server
 * 您希望使用MockJs作为模拟api
 * 您可以执行: mockXHR()
 *
 * 目前MockJs将在生产环境中使用
 * 请在上线前删除它!!!
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(ElementUI)

Vue.component('i-switch', Switch)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
