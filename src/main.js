import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 引入全局配置
import $conf from './common/config/config.js'
Vue.prototype.$conf = $conf

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
