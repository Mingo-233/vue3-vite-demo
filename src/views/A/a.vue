<template>
  <h1 :style="{ color: fontColor }">
    {{ msg }}
  </h1>
  <button @click="changeColorHandle">change color</button>
  <h2>{{ num }}</h2>
  <button @click="addHandle">+1</button>
  <div class="person" ref="personRef">
    <div>name: {{ person.name }}</div>
    <div id="age">age: {{ person.age }}</div>
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
  <button @click="stop">stop watch</button>

  <button @click="sumHandle">sum handle</button>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  reactive,
  ref,
  toRaw,
  toRefs,
  watch,
  watchEffect,
} from "vue";
import Ab from "@/components/ab.vue";
export default defineComponent({
  setup() {
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
    // console.log(stateAsRefs);
    // console.log(state);
    // 转化为普通对象后 state仍然是proxy对象
    let normalObj = toRaw(state);
    // console.log(normalObj);

    const vv1 = ref<HTMLElement | null>(null);

    let fontColor = ref("#009900");
    const changeColorHandle = () => {
      fontColor.value = "#990000";
    };
    // watchEffect(() => {
    //   console.log(person.age);
    //   console.log(fontColor.value);

    //   console.log("watchEffect excuted");
    // });

    const NoA = ref(1);
    const NoB = ref(2);
    let sum = computed(() => NoA.value + NoB.value);

    const sumHandle = () => {
      NoA.value++;
      NoB.value++;
    };
    const stop = watchEffect(
      (onInvalidate) => {
        console.log(person.age);
        console.log("watchEffect excuted");
        // console.log("sum", sum.value);

        let el = document.querySelector("#age") as HTMLElement;
        let txt = el && el.innerText;
        console.log(txt);
        onInvalidate(() => {
          console.log("invalidate");
        });
      },
      { flush: "sync" }
    );
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });
    onMounted(() => {
      console.log("mounted");
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
      fontColor,
      changeColorHandle,
      stop,
      sumHandle,
      ...stateAsRefs,
    };
  },
  components: {
    Ab,
  },
});
</script>
