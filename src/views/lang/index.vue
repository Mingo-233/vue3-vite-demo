<template>
  <div>
    <h1>language</h1>
    <p>{{ $t("buffer") }}</p>
    <p>{{ $t("apple") }}</p>

    <p>{{ $t("ban") }}</p>
  </div>
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
