<!-- <template>
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

 -->

<template>
  <div>
    <p>count {{ count }}</p>
    <p>doubleCount {{ doubleCount }}</p>
    <button @click="increment">change</button>
    <hr />
    <p>count2 {{ count2 }}</p>
    <p>doubleCount2 {{ doubleCount2 }}</p>
    <button @click="increment2">change</button>
  </div>
</template>

<script setup lang="ts">
// A.vue
import useStore from "@/hooks/useStore";
const { count, doubleCount, increment } = useStore();
// B.vue
import useStore2 from "@/hooks/useStore";
const {
  count: count2,
  doubleCount: doubleCount2,
  increment: increment2,
} = useStore2();
</script>

<style lang="less" scoped></style>
