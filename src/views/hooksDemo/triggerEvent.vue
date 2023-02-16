<template>
  <div>触发事件 ： <a-button @click="handle">触发事件</a-button></div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
const state = reactive({});
const Emits = defineEmits(["trigger-a"]);

function handle() {
  console.log("rigger-a");
  Emits("trigger-a", "no1");
}
onMounted(() => {});
</script>

<style lang="less" scoped></style>
