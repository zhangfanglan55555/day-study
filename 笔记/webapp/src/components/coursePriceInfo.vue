<template>
    <div>
        <span class="primary">
            {{lessonPrice}}<small>易车币</small>
        </span>
        <del class="grayer del" v-if="lessonPrice < lessonCost" v-text="lessonCost + '易车币'"></del>
        <i class="icn-txt" v-if="isShowSale && lessonPrice < lessonCost">优惠</i>
    </div>
</template>

<script>
export default {
  name: "coursePriceInfo",
  props: {
    // 售价
    lessonPrice: 0,
    // 原价
    lessonCost: 0,
    // 是否显示优惠的标签
    isShowSale: false
  }
};
</script>