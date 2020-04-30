<template>
  <div id="app">
    <scrollBall color="red" v-model="pos1" :target="500" ref="ball1">红球</scrollBall>
    <!-- <ScrollBall color="yellow" :value="pos3" :target="500" @input="value=>pos3=value">黄球</ScrollBall>
    <ScrollBall color="blue" :target="500" :value.sync="pos2">蓝球</ScrollBall>
    <ScrollBall color="green" :value="pos4" :target="500" @update:value="value=>pos4=value">绿球</ScrollBall> -->
    <!-- v-model = :value + input
         :xxx.sync='xxx'  => :xxx + this.$emit('update:xxx')
    -->
    <button @click="getPosition">获取红球的位置</button>
    <button @click="stop">停止</button>
  </div>
</template>

<script>
import ScrollBall from "./components/ScrollBall";

export default {
  name: "App",
  data() {
    return {
      pos1: 50,
      pos2: 100,
      pos3: 200,
      pos4: 250
    };
  },
  components: { ScrollBall },
  methods: {
    getPosition() {
      console.log(this.pos1);
    },
    stop() {
      this.$refs.ball1.stop()
    }
  }
};
</script>

<style lang="less">
</style>
