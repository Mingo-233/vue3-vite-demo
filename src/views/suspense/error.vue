<template>
  <div>error</div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
const state = reactive({});
function handle() {
  console.log("handle");
}
onMounted(() => {});
</script>

<style lang="less" scoped></style>
