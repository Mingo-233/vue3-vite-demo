<template>
  <div>
    <h2>vmodel - son</h2>
    <button @click="updateName">更新name</button>
    <button @click="updateEmail">更新email</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// 定义emit
// 如果v-model没有使用参数，则其默认值为modelValue，如上面的第一个v-model，
// 注意此时不再是像Vue2那样使用$emit('input')了，而是统一使用update:xxx的方式。
const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "update:email", value: string): void;
}>();
const updateName = () => {
  emits("update:modelValue", "李四");
};

const updateEmail = () => {
  emits("update:email", "123456@qq.com");
};

onMounted(() => {});
</script>

<style lang="less" scoped></style>
