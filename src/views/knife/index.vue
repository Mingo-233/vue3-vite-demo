<script lang="ts" setup>
import BackgroundOfLayer from "./BackgroundOfLayer.vue";
import Layer from "./Layer.vue";

</script>
<template>
  <div class="container">

    <div class="layer-warp">
      <BackgroundOfLayer></BackgroundOfLayer>
      <div class="layer-suit">
        <Layer></Layer>
      </div>
    </div>
    <iframe
      id="preview-app"
      src=""
      frameborder="0"
      width="800px"
      height="600px"
    ></iframe>
  </div>
</template>
<style lang="less" scoped>
.container {
  position: relative;
  margin-top: 50px;
  display: flex;
  background-color: #ccc;
  .layer-warp {
    scale: 0.5;
    transform-origin: left top;
  }
  .layer-suit{
    position: absolute;
    top: 0;
  }
  #preview-app {
    position: absolute;
    right: 0;
    border: 1px solid #000;
  }
}
</style>
