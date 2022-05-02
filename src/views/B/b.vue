<template>
  <h1>this is b</h1>
  <setupVue
    ref="setupRef"
    :show="show"
    @postMessageBySon="reciveMessage"
  ></setupVue>
  <div></div>
</template>

<script setup lang="ts">
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
onMounted(() => {
  //   console.log(setupRef);
  //   console.log(setupRef.value);
  let v = setupRef.value as unknown as sonComponentDate;
  //   console.log(setupRef.value.msg);
  //   console.log(v.msg);
});
</script>

<style lang="less" scoped></style>
