<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import "@/assets/css/public/public.min.css";
import "@/assets/js/cache/manifest.min.js";
import "@/assets/js/cache/vendors.min.js";

export default {
  name: "app"
};
</script>