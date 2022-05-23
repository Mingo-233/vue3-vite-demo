<template>
  <div>
    <button @click="showMessageBox">showMessageBox</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { MyMessageBox } from "./MyUi";
const showMessageBox = () => {
  MyMessageBox({
    title: "提示",
    content: "您确定要删除吗？",
    confirmBtnText: "确定",
  })
    .then(() => {
      console.log("确定");
    })
    .catch(() => {
      console.log("取消");
    });
};

onMounted(() => {});
</script>

<style lang="less" scoped></style>
