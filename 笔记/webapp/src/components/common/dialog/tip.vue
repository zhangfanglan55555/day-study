<template>
  <transition name="fade">
    <div class="yi-toast" v-if="visible">
      <div class="text" v-text="text"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "tip",
  data() {
    return {
      visible: true
    };
  },
  props: {
    // 显示文本
    text: {
      type: String
    },
    // 时间
    duration: {
      type: Number,
      default: 2000
    },
    close: Function
  },
  methods: {
    exit() {
      setTimeout(function() {
        this.visible = false;
        this.close && this.close();
      }.bind(this), this.duration);
    }
  },
  mounted() {
    this.exit();
  }
};
</script>

<style scoped>
.yi-yiche .yi-toast {
  display: block !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>