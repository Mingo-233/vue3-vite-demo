<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps<{
  data: any;
}>();
const cutRect = computed(() => {
  let x, y, width, height;
  if (props.data.bg) {
    x = props.data.bg.x;
    y = props.data.bg.y;
    width = props.data.bg.width;
    height = props.data.bg.height;
  } else {
    width = props.data.style.width;
    height = props.data.style.height;
  }
  return {
    x,
    y,
    width,
    height,
  };
});
function onImageLoad() {}
</script>
<template>
  <div
    class="element-image-box"
    :data-x="cutRect.x"
    :data-y="cutRect.y"
    :data-width="cutRect.width"
    :data-height="cutRect.height"
    :data-rx="cutRect.x + data.style.width"
    :data-ry="cutRect.y + data.style.height"
  >
    <img
      class="element-image"
      :src="data.src"
      :style="{
        left: `${cutRect.x}mm`,
        top: `${cutRect.y}mm`,
        width: `${cutRect.width}mm`,
        height: `${cutRect.height}mm`,
        opacity: data.style.opacity === undefined ? 1 : data.style.opacity / 100,
        transform: data.style.transform,
      }"
      @load="onImageLoad"
    />
  </div>
</template>
<style lang="less" scoped>
.element-image-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .element-image {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
