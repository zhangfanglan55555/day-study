import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './routes';//存放映射表
// 第三方插件 引入后要使用 Vue.use() =》 install v相当于初始化

Vue.use(VueRouter);//install方法中注册了两个全局组件 router-link  router-view
// 会在每个组件上定义两个属性   $router  $route  组件内使用 this.$router  this.$route

export default new VueRouter({
  mode: "hash",//默认 hash-有#号
  routes:routes,
})

// import router from './router/index.js' 对应的引入方法

