<template>
  <div class="search-bar">
    <input
      v-model="state.input"
      placeholder="请输入内容"
      @keyup.enter.native="handle"
    />
    <button @click="handle">搜索</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
const state = reactive({
  input: "",
});
function handle() {
  console.log("handle");
}
onMounted(() => {});
</script>

<style lang="less" scoped>
.search-bar {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1000;
  width: 60%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: rgb(78 78 78 / 5%);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 10px 5px 5px #8d80ad;
  animation: searchShow 1s;
}

@keyframes searchShow {
  0% {
    opacity: 0;
    transform: translate(-50%, 50px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
