import Vue from "vue"
import App from "./App.vue"
import router from './router'
import store from './store'
import global from './components/global'
import { getScript } from './libs/prototype'
import common from '_c/common'

Vue.config.productionTip = false;
Vue.use(global);
Vue.use(common);
Vue.prototype.getScript = getScript;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");