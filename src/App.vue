<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->

  <router-view />

  <!-- <about msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
// import about from "@/components/ab.vue";
import routers from "@/router/auto.js";
defineComponent({
  name: "Home",
  components: {
    // about,
  },
});

console.log(routers);
</script>

<style>
#app {
}
</style>
