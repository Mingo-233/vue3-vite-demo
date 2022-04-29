<template>
  <div class="title">hello</div>
  <Setup></Setup>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Setup from "@/components/setup.vue";
export default defineComponent({
  setup() {
    console.log(11);
  },
  components: {
    Setup,
  },
});
</script>

<style lang="less" scoped>
.title {
  color: red;
}
</style>
