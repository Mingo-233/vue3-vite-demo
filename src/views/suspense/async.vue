<template>
  <div>sleep</div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
const state = reactive({});
function sleep(time: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
await sleep(3000);
</script>

<style lang="less" scoped></style>
