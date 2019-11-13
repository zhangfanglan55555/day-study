<template>
  <div class="tabsBox my-study">
    <div class="tab-nav">
      <ul class="nav-ul">
        <li :class="['tab-tit', tabIndex === item.index ? 'active' : '']" v-for="item in tabData" :key="item.index" v-text="item.name" @click="tabClick(item)"></li>
      </ul>
    </div>
    <div class="tab-panel">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "courseMaster",
  data() {
    return {
      tabIndex: 0,
      tabData: null
    };
  },
  created() {
    // 页签数据
    this.initTabData();
    // 初始化页签
    for (let i = 0, len = this.tabData.length; i < len; i++) {
      if (this.tabData[i].to === this.$route.name) {
        this.tabIndex = this.tabData[i].index;
        break;
      }
    }
  },
  methods: {
    // 初始化页签数据
    initTabData() {
      this.tabData = [
        { index: 0, name: "已兑课程", to: "alreadyAgainst" },
        { index: 1, name: "收藏课程", to: "collection" },
        {
          index: 2,
          name: "学习统计",
          to: "learningStatistics",
          params: { source: 1 }
        }
      ];
    },
    // 页签点击事件
    tabClick(item) {
      this.tabIndex = item.index;
      this.$router.replace({ name: item.to, params: item.params });
    }
  }
};
</script>