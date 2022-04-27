<template>
  <div class="title">
    hello 
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    console.log(11);
    
  },
})
</script>

<style lang="less" scoped>
.title {
  color: red;
}
</style>