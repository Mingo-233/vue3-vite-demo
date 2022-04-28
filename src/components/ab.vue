<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="emitHandle">emit</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    visiable: {
      type: Boolean,
    },
  },
  setup(props, context) {
    console.log(11);
    console.log(props);
    console.log(context);
    const emitHandle = () => {
      context.emit("pick");
    };
    return {
      emitHandle,
    };
  },
});
</script>
