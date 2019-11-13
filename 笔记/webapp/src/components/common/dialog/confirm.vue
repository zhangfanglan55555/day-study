<template>
    <div>
        <div class="yi-mask"></div>
        <div class="yi-modal" id="modalExch">
            <div class="ml-hd" v-text="text"></div>
            <div class="ml-ft">
                <button class="btnok" type="button" @click="$emit('ok')">确认</button>
                <button class="btnno" type="button" @click="$emit('close')">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "confirm",
  props: {
    text: {
      type: String,
      require: true
    }
  }
};
</script>