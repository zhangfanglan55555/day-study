import Vue from 'vue'
// import App from './App.vue'
import AppBall2 from './AppBall2';
import router from '@/router/index.js'
Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
new Vue({
  router,
  render: h => h(AppBall2),//默认去渲染 App的这个组件
}).$mount('#app')
 