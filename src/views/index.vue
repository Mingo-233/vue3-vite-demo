<template>
  <div class="home">
    <button @click="handle">handle</button>
    <div
      class="route"
      v-for="item in routers"
      :key="item.path"
      @click="go(item)"
    >
      {{ item.path }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, RouteRecordRaw } from "vue-router";

import routers from "@/router/auto.js";
import fib from "virtual:fib";

// import env from "virtual:env";

// console.log(env);

function handle() {
  console.log("fib", fib(10));
}
const router = useRouter();
console.log(import.meta);
const go = (r: RouteRecordRaw) => {
  router.push({ path: r.path });
};
onMounted(() => {});
</script>

<style lang="less" scoped>
.home {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  // grid-template-rows: 200px;
  grid-row-gap: 30px;
  .route {
    background-image: linear-gradient(
        90deg,
        rgba(0, 255, 0, 0.5),
        rgba(7, 52, 7, 0.5)
      ),
      linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)),
      url("@/assets/logo.png");
    background-position: bottom;
    width: 200px;
    height: 100px;
    line-height: 100px;
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 20px;
    text-align: center;
  }
}
</style>
