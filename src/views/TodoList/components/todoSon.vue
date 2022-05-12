<template>
  <div>this is todo list 子组件</div>
  <div>todoName ： {{ todoName }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTodoStore } from "@/store/todo";
import { storeToRefs } from "pinia";
const todoStore = useTodoStore();
let { todoName } = storeToRefs(todoStore);

const handle = () => {
  console.log("handle");
};
onMounted(() => {});
</script>

<style lang="less" scoped></style>
