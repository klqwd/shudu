import Vue from 'vue'
import App from './App'
import i18n from './i18n'
import store from './store'
import router from './router'
import '../public/static/css/page.css'
import * as echarts from 'echarts'
import '@/assets/font_3853564_6x9ir2hab59/iconfont.css'

Vue.prototype.$echarts = echarts
import '@/vab'

Vue.config.productionTip = false
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: (h) => h(App),
})
