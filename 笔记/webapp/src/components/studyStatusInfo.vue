<template>
  <div>
    <div class="pos-b" v-if="studyStatus === 1">学习完成</div>
    <div class="pos-b" v-else-if="studyStatus === 2" v-text="'已学习' + (studiedPercent || 0) + '%'"></div>
    <div class="pos-b" v-else>未学习</div>
  </div>
</template>

<script>
export default {
  name: "studyStatusInfo",
  props: {
    // 学习状态
    studyStatus: 0,
    // 学习进度
    studiedPercent: 0
  }
};
</script>