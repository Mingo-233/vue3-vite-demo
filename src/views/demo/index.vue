<template>
  <div>this is demo page</div>
  <DefineTemplate v-slot="{ age, name, id }">
    <div>
      <!-- <span>id: {{ id }}</span> -->
      <span>name:{{ name }}</span>
      <span>age: {{ age }}</span>
    </div>
  </DefineTemplate>
  <ReuseTemplate
    v-for="item in data"
    :key="item.age"
    :id="item.id"
    :name="item.name"
    :age="item.age"
  ></ReuseTemplate>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useTemplate } from "../../hooks/useTemplate";
const [DefineTemplate, ReuseTemplate] = useTemplate<{
  name: string;
  age: number;
  id: string;
}>();
const data = new Array(1).fill(0).map((_, index) => {
  return {
    id: `00x-${index}`,
    name: `sunshine-${index}`,
    age: index,
  };
});
const state = reactive({});
function handle() {
  console.log("handle");
}
onMounted(() => {});
</script>

<style lang="less" scoped></style>
