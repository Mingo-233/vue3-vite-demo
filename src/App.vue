<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div class="home-btn" id="dragbtn" v-drag @click="backHome">home</div>

  <router-view />
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const backHome = () => {
  let isClick = document.getElementById("dragbtn")!.getAttribute("data-flag");
  if (isClick !== "true") return;
  router.push({ path: "/" });
};
</script>

<style lang="less" scoped>
.home-btn {
  position: fixed;
  top: 0;
  right: 0;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background: paleturquoise;
  cursor: pointer;
}
</style>
