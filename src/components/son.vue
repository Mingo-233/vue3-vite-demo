<template>
  <div>this is a 孙子组件</div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
const msg = ref(null);
const handle = () => {
  console.log("handle");
};

const info = inject("provideInfo");
onMounted(() => {
  console.log(info);
});
</script>

<style lang="less" scoped></style>
