<template>
  <div>
    <p>version {{ version }}</p>
    <button @click="changeVersion">change</button>
    <hr />
    <p>version2 {{ version2 }}</p>
    <button @click="changeVersion2">change</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useEffect } from "@/hooks/effect";
const { version, changeVersion } = useEffect();
const { version: version2, changeVersion: changeVersion2 } = useEffect();
</script>

<style lang="less" scoped></style>
