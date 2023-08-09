<template>
  <div>
    stash
    <Son class="b"></Son>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, defineOptions } from "vue";
import Son from "./son.vue";
const state = reactive({});
function handle() {
  console.log("handle");
}
</script>

<style lang="less" scoped></style>
