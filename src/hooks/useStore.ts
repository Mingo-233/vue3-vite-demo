// store.js
import { computed, ref } from "vue";
import useGlobalState from "./useGlobalState";

export default useGlobalState(() => {
  // state
  const count = ref(0);
  // getters
  const doubleCount = computed(() => count.value * 2);
  // actions
  function increment() {
    count.value++;
  }
  return { count, doubleCount, increment };
});
