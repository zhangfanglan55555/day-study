<template>
  <div v-infinite-scroll="iNext" infinite-scroll-disabled="busy" infinite-scroll-immediate-check="false" infinite-scroll-distance="10" style="min-height: 2rem;">
    <slot></slot>
    <div class="dropload-down" style="line-height: .88rem" v-show="isLoad">
      <div class="dropload-load">
        <span class="loading"></span>加载中...</div>
    </div>
    <div v-show="iNoMore" class="dropload-noData">没有更多数据</div>
  </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";

export default {
  name: "scroller",
  data() {
    return {
      busy: false,
      isLoad: true,
      iNoMore: false
    };
  },
  props: {
    next: Function
  },
  directives: {
    infiniteScroll,
    "infinite-scroll-disabled": {
      inserted: function(el, b) {
        el.setAttribute("infinite-scroll-disabled", b.value);
      }
    }
  },
  methods: {
    iNext() {
      this.next();
    },
    refresh() {
      this.iNoMore = false;
      this.isLoad = true;
      this.busy = false;
    },
    finish() {
      this.iNoMore = true;
      this.isLoad = false;
    },
    noData() {
      this.iNoMore = false;
      this.isLoad = false;
    },
    start() {
      this.busy = true;
    },
    stop() {
      this.busy = false;
    }
  },
  watch: {
    iNoMore: function(val) {
      this.busy = val;
      this.isLoad = !val;
    }
  }
};
</script>
