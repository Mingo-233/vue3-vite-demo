<template>
  <h1>this is b</h1>
  <setupVue
    ref="setupRef"
    :show="show"
    @click="clickHandle"
    @postMessageBySon="reciveMessage"
  ></setupVue>
  <div></div>
  <button @click="handle">handle</button>
  <h1>过渡 {{ Math.round(output) }}</h1>
</template>

<script setup lang="ts">
import { useTransition, TransitionPresets } from "@vueuse/core";
import {
  onMounted,
  Ref,
  ref,
  getCurrentInstance,
  shallowRef,
  provide,
} from "vue";
import setupVue from "@/components/setup.vue";
const msg = ref("message by b ");
const show = ref(true);
interface sonComponentDate {
  msg: String;
}
const setupRef = ref(null);
// const setupRef = ref(null);
const handle = () => {
  console.log("handle");
  const obj = {};
  // obj.fn();
  source.value = 5000;
};

const clickHandle = () => {
  console.log("clickHandle");
};
const reciveMessage = (a: string) => {
  console.log("reciveMessage");
  console.log(a);
};
const context = getCurrentInstance();
console.log(context);

let bb = shallowRef("xixi");
bb.value = "bb-change1 ";
// console.log(bb);

provide("provideInfo", {
  msg: "message by b",
});

const source = ref(0);

const output = useTransition(source, {
  duration: 3000,
  transition: TransitionPresets.easeOutExpo,
});

onMounted(() => {
  //   console.log(setupRef);
  //   console.log(setupRef.value);
  let v = setupRef.value as unknown as sonComponentDate;
  //   console.log(setupRef.value.msg);
  //   console.log(v.msg);
});
</script>

<style lang="less" scoped></style>
