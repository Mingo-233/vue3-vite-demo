<template>
  <div>son</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";
console.log("setup");

onMounted(() => {
  console.log("onMounted");
});
onUnmounted(() => {
  console.log("onUnmounted");
});
</script>

<style lang="less" scoped></style>
