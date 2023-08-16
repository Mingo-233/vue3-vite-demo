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

const counter = ref(0);
function handle() {
  counter.value++;
}
let nestedScope;

const parentScope = effectScope();

parentScope.run(() => {
  const doubled = computed(() => counter.value * 2);

  // with the detected flag,
  // the scope will not be collected and disposed by the outer scope
  nestedScope = effectScope(true /* detached */);
  nestedScope.run(() => {
    watchEffect(() => console.log("nestedScope", counter.value));
  });

  watchEffect(() => console.log("Count: ", doubled.value));
});

// disposes all effects, but not `nestedScope`
parentScope.stop();

// stop the nested scope only when appropriate
// nestedScope.stop();
</script>

<template>
  <!-- <div>data num {{ data.num.step }}</div> -->
  <button @click="handle">bt</button>
</template>
