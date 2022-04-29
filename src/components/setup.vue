<template>
  <div class="setup">
    <h1 @click="handle">This is setup</h1>
  </div>
</template>

<script setup lang="ts">
const handle = () => {
  console.log("handle");
};
</script>
