<template>
  <div class="scroll" :style="myColor" :id="id">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "ScrollB",
  data() {
    return {};
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: "red"
    },
    target: {
      type: Number,
      default: 500
    }
  },
  computed: {
    myColor() {
      return { background: this.color };
    },
    id() {
      return "ball" + this._uid;
    }
  },
  mounted() {
    let dom = document.getElementById(this.id),
      distance = dom.offsetLeft;
    this.timer;
    let fn = () => {
      if (distance > 500) {
        return cancelAnimationFrame(this.timer);
      }
      distance += 2;
      dom.style.transform =`translate(${distance}px)`
      this.timer = requestAnimationFrame(fn);
    };
    this.timer = requestAnimationFrame(fn);
  }
};
</script>
<style>
.scroll {
  height: 50px;
  width: 50px;
  line-height: 50px;
  border-radius: 50%;
  text-align: center;
}
</style>