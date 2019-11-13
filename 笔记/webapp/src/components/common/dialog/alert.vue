<template>
    <div>
        <div class="yi-mask"></div>
        <div class="yi-modal" id="modalExch">
            <div class="ml-hd" v-text="text"></div>
            <div class="ml-ft">
                <button class="btnok" type="button" @click="$emit('ok')">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "alert",
  props: {
    text: {
      type: String,
      require: true
    }
  }
};
</script>