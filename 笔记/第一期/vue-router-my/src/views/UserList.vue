<template>
  <div>
    <li><router-link to="/user/detail?id=1">用户1</router-link></li>
    <li><router-link to="/user/detail?id=2">用户2</router-link></li>
  </div>
</template>

<script>
export default {
beforeRouteEnter (to, from, next) {
  // 此方法中不能拿到this
  // console.log(this)
  // console.log(from,to);//from.name 是从哪个路由过来的，to 是当前组件的信息
  if(from.name=='userAdd'){
    console.log('userAdd过来的');//执行顺序1
  }
  next(vm=>{
    console.log(vm);//组件渲染完成后会调用当前beforeRouteEneter方法，执行顺序3
    // VM 相当于当前组件的this
  })
},
mounted() {
  console.log(this)
  console.log('mounted');//属性顺序2
},
}
</script>

<style>

</style>