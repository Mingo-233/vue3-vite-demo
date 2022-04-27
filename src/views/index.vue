<template>
  <h1>{{ msg }}</h1>
  <h2>{{ num }}</h2>
  <button @click="addHandle">+1</button>
  <div class="person">
    <div>name: {{ person.name }}</div>
    <div>age: {{ person.age }}</div>
    <button @click="updatePersonInfo">update</button>
  </div>
  <div>
    组件
    <Ab :visiable="true"></Ab>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Ab from "@/components/ab.vue";
export default defineComponent({
  setup() {
    console.log("setip");
    const num = ref(1);

    const addHandle = () => {
      num.value++;
    };

    const person = reactive({ name: "mm", age: 18 });
    const updatePersonInfo = () => {
      person.age = ~~(Math.random() * 10);
    };
    return {
      msg: "hello world",
      num,
      addHandle,
      person,
      updatePersonInfo,
    };
  },
  components: {
    Ab,
  },
});
</script>
