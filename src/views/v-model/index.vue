<template>
  <h1>v-model</h1>
  <Son v-model="state.name" v-model:email="state.email"></Son>
  <Attrs id="root" class="test" name="张三" @confirm="handle" closeable></Attrs>
  {{ state }}
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
onMounted(() => {});
</script>

<style lang="less" scoped></style>
