<template>
  <h1>v-model</h1>
  <Son v-model="state.name" v-model:email="state.email"></Son>
  <Attrs id="root" class="test" name="张三" @confirm="handle" closeable></Attrs>
  {{ state }}
  <hr />
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import Son from "./componsnts/son.vue";
import Attrs from "./componsnts/attrs.vue";
const state = reactive({
  name: "aa",
  email: "bb",
});
const handle = () => {
  console.log("handle");
};
const obj = { name: "11" };

const proxy = reactive([obj]);
console.log(proxy.includes(proxy[0])); // false
onMounted(() => {});
</script>

<style lang="less" scoped></style>
