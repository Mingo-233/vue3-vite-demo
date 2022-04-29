<template>
  <h1>{{ msg }}</h1>
  <h2>{{ num }}</h2>
  <button @click="addHandle">+1</button>
  <div class="person" ref="personRef">
    <div>name: {{ person.name }}</div>
    <div>age: {{ person.age }}</div>
    <button @click="updatePersonInfo">update</button>
  </div>
  <div>
    组件
    <Ab :visiable="true" @pick="pickHandle" ref="ab1"></Ab>
  </div>

  <div>time - {{ time }}</div>

  <div>statesAsRefs -- {{ foo }}</div>
  {{ state }}

  <div>
    <input type="text" name="" id="ii" ref="vv1" />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
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

    const pickHandle = () => {
      console.log("pick 触发了");
    };

    const time = computed(() => Date.now());

    watch(
      num,
      (newValue, oldValue) => {
        console.log(newValue, oldValue);
      },
      { immediate: true, deep: true }
    );

    const state = reactive({
      foo: "a",
      bar: "b",
    });
    const stateAsRefs = toRefs(state);
    console.log(stateAsRefs);

    const vv1 = ref<HTMLElement | null>(null);
    const ab1 = ref<HTMLElement | null>(null);

    const personRef = ref<HTMLElement | null>(null);

    onMounted(() => {
      console.log(vv1.value);
      console.log(personRef.value);
      console.log(ab1.value);
    });

    return {
      msg: "hello world",
      num,
      addHandle,
      person,
      updatePersonInfo,
      pickHandle,
      time,
      state,
      vv1,
      ab1,
      personRef,
      ...stateAsRefs,
    };
  },
  components: {
    Ab,
  },
});
</script>
