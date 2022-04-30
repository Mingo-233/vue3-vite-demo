<template>
  <div class="setup">
    <h1 v-if="show" @click="handle" ref="h1">This is setup</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits } from "vue";
const Props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const Emits = defineEmits(["postMessageBySon"]);
const msg = ref("settp component date");
const handle = () => {
  console.log("handle");
  Emits("postMessageBySon", "no1");
};
defineExpose({
  msg,
});
onMounted(() => {
  // console.log(Props.show);
});
</script>
