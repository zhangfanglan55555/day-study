<template>
  <div id='app'>
    <ScrollB color='red' v-model='pos1' :target='500'>红球</ScrollB>
  </div>
</template>
<script>
import ScrollB from './components//ScrollB'
export default {
  name:"App",
  data(){
    return{
      pos1:50,
    }
  },
  components:{
    ScrollB
  }
}
</script>