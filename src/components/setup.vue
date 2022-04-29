<template>
  <div class="setup">
    <h1 @click="handle" ref="h1">This is setup</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const h1 = ref(null);
const handle = () => {
  console.log("handle");
};

onMounted(() => {
  console.log(h1.value);
});
</script>
