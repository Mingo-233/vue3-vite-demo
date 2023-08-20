<template>
  <div>
    callStack
    <br />
    <button @click="handle">change</button>
    {{ id }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { id, useWatch } from "./useWatch";
import { nextTick } from "vue";
import { onUnmounted } from "vue";
// setTimeout(() => {
// }, 1000);
let c: any;
nextTick(() => {
  console.log("nextTick");
  const { cancel } = useWatch();
  c = cancel;
});
// useWatch();

function handle() {
  console.log("handle");
  id.value = Math.random() + "";
}
// onUnmounted(() => {
// //   c();
// });
</script>

<style lang="less" scoped></style>
