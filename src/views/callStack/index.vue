<template>
  <div>
    callStack
    <button @click="handle">qiehuan</button>
    <Son v-if="show"></Son>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { id, useWatch } from "./useWatch";
import Son from "./son.vue";
const show = ref(false);
function handle() {
  console.log("handle");
  show.value = !show.value;
}
</script>

<style lang="less" scoped></style>
