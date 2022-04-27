<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->

  <router-view />

  <!-- <about msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
// import about from "@/components/ab.vue";

defineComponent({
  name: "Home",
  components: {
    // about,
  },
});
</script>

<style>
#app {
}
</style>
