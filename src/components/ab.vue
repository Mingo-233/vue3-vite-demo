<template>
  <div class="about">
    <h1>This is an about page</h1>
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
  },
});
</script>
