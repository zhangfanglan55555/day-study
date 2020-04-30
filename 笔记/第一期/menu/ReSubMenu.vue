<template>
  <SubMenu>
    <template #title>{{data.title}}</template>
    <template v-for="child in data.children">
      <!-- 如果没儿子 直接渲染 MenuItem 有儿子 将儿子递归传入 -->
      <MenuItem :key="child.title" v-if='!child.children'>{{child.title}}</MenuItem>
      <ReSub :key="child.title" :data='child' v-else></ReSub>
    </template>
  </SubMenu>
</template>
<script>
import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
export default {
  name: "ReSub", //可以使用递归组件
  components: {
    SubMenu,
    MenuItem
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>