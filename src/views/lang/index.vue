<template>
  <div>
    <h1>language</h1>
    <button @click="handle">切换</button>
    <p>{{ $t("buffer") }}</p>
    <p>{{ $t("apple") }}</p>

    <p>{{ $t("ban") }}</p>
    <h3>具名格式</h3>
    <p>{{ $t("sayX", { msg: "嘻嘻嘻" }) }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { setLocale } from "../../utils/i18n";
const state = reactive({});
function handle() {
  setLocale("en");
}
onMounted(() => {});
</script>

<style lang="less" scoped></style>
