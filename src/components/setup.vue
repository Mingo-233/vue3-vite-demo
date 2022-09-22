<template>
  <div class="setup">
    <!-- <h1 v-if="show" @click="handle" ref="h1">This is setup</h1> -->
    <h2>this is setup</h2>
    {{ $attrs }}
    <son></son>
  </div>
</template>

<script setup lang="ts">
import son from "@/components/son.vue";
import {
  onMounted,
  ref,
  defineEmits,
  ComponentInternalInstance,
  getCurrentInstance,
} from "vue";
const app = getCurrentInstance();
console.log(app?.attrs);
console.log(app?.proxy);
const Props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
// 因为v3 取消了native修饰符
// 在子组件中defineEmits增加了 click 这个事件后 子组件在父组件中的@click只能通过子组件去触发
// 如果不在defineEmits 中添加 那么子组件在父组件中的@click 就会在子组件的根结点中注册click事件
const Emits = defineEmits(["postMessageBySon", "click"]);
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

<!-- <script lang="ts">
export default {
  inheritAttrs: false,
};
</script> -->
