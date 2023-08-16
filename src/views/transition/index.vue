<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <button @click="handle">handle</button>
    <button @click="changeColor">changeColor</button>
    <p>{{ keyText }}</p>

    <!-- <Transition> -->
    <!-- <p v-if="show" :key="keyText">hello</p> -->
    <Son v-if="show" :data-key="keyText" :key="keyText">hello</Son>
    <!-- </Transition> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import Son from "./son.vue";
const show = ref(false);
const keyText = ref("key");
function handle() {
  console.log("handle");

  keyText.value = Math.random().toString(36).substr(2);
}

const theme = reactive({
  color: "red",
});
function changeColor() {
  console.log("changeColor");
  // 生成随机颜色
  theme.color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}
onMounted(() => {});
</script>

<style lang="less">
.v-enter-active,
.v-leave-active {
  transition: opacity 5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

p {
  color: v-bind("theme.color");
}
</style>
