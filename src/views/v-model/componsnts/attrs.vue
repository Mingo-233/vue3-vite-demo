<template>
  <div>
    <h2>attrs- son</h2>
    >
    <span>attrs{{ props.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
const props = defineProps(["name"]);
const attrs = useAttrs();
console.log("attrs", attrs);
</script>
<!-- <script lang="ts">
export default {
  inheritAttrs: false,
};
</script> -->
<style lang="less" scoped></style>
