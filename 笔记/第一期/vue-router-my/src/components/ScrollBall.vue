<template>
  <div class="ball" :style="style" :id="ballId">
    <slot></slot>
  </div>
</template>
<script>
// 组件的id 问题 _uid
// 属性问题 校验 -> 计算属性
// 属性双向通信  props+emit / v-model / .sync
// 数据的绑定问题 $refs 拿到组件内部的方法 来调用组件中的方法
export default {
  name: "scroll-ball",
  props: {
    color: {
      type: String,
      defalut: "white"
    },
    value: {
      type: Number,
      default: 0
    },
    target: {
      type: Number,
      defalut: 300
    }
  },
  mounted() {
    // 单向数据流 子组件通知父亲 当前自己的位置，父亲更新位置，再传递给子组件
    let ball = document.getElementById(this.ballId);
    this.timer;
    let left = this.value;
    let fn = () => {
      if (left >= this.target) {
        return cancelAnimationFrame(this.timer);
      }
      left += 2;
      this.$emit("input", left + 2);
      // this.$emit("update:value", left + 2);
      ball.style.transform = `translate(${this.value}px)`;
      this.timer = requestAnimationFrame(fn);
    };

    this.timer = requestAnimationFrame(fn);
  },
  computed: {
    ballId() {
      return `ball` + this._uid;
    },
    style() {
      return { background: this.color };
    }
  },
  methods: {
    stop() {
      cancelAnimationFrame(this.timer);
    }
  }
};
</script>
<style lang="less" >
.ball {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  text-align: center;
  line-height: 100px;
  // border: 1px solid red;
  font-size: 28px;
}
</style>