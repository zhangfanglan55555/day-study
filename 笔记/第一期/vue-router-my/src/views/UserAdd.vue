<template>
  <div>
    <input type="text" v-model="username" />
    <button @click='toList'>去列表页</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  // 路由钩子函数
  beforeRouteLeave(to, from, next) {
    // 如果输入框中有内容，离开前提示
    // 当组件切换时
    if (this.username) {
      let confirm = window.confirm("你确认切换吗");
      if(confirm){
        next();
      }
    } else {
      next();
    }
  },
  methods: {
    toList(){
      // vue.use(VueRouter)  $router 带r的存的都是方法   $route 存的都是属性
      this.$router.push('/user/list')
    }
  },
};
</script>

<style>
</style>