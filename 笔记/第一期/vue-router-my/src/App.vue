<template>
  <div id="app">
    <div class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand">管理</a>
        </div>
        <ul class="navbar-nav nav">
          <li>
            <!-- <router-link :to="{path:'/home'}">首页</router-link> -->
            <router-link :to="{path:'/home'}">首页</router-link>
            <!-- tag='' 目标dom -->
          </li>
          <li>
            <router-link :to="{path:'/profile'}">个人中心</router-link>
          </li>
          <li>
            <router-link :to="{path:'/user'}">用户</router-link>
          </li>
          <li>
            <router-link :to="{path:'/login'}">登录</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
      <router-view name='name'></router-view>
      <router-view name='version'></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style lang="less">
</style>
