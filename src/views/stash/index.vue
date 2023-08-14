<script setup>
import {
  ref,
  effectScope,
  effect,
  computed,
  watch,
  watchEffect,
  reactive,
  getCurrentScope,
} from "vue";
const scopeA = effectScope();
const data = reactive({
  num: {
    step: 0,
  },
});
function handle() {
  data.num.step = Math.random();
  console.log(data.num);
}
scopeA.run(() => {
  const fn = () => {
    let b = data.num.step + "9";
    console.log("request", b);
  };
  effect(fn);
});
</script>

<template>
  <div>data num {{ data.num.step }}</div>
  <button @click="handle">bt</button>
</template>
