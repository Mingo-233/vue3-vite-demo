<script lang="ts" setup>
import { computed } from 'vue';
// import { Design } from '../../../typing';
import { getShapeContent } from './help/index';
const props = defineProps<{
  data: any;
}>();

const shapeHTML = computed(() => {
  const html = getShapeContent({
    width: props.data.style.width,
    height: props.data.style.height,
    uuid: props.data.uuid,
    type: props.data.shapeType ?? 'rectangle',
    radius: props.data.style.radius ?? 0,
    fill: props.data.style.color ?? 'none',
    stroke: props.data.style.stroke,
    strokeWidth: props.data.style.strokeWidth ?? 0,
    strokeDashArray: props.data.style.strokeDashArray ?? 0,
  });
  return html;
});
</script>
<template>
  <div
    :style="{
      opacity: data.style.opacity === undefined ? 1 : data.style.opacity / 100,
    }"
    class="shape-box"
    v-html="shapeHTML"
    :data-shape-type="data.shapeType"
  ></div>
</template>
<style lang="less" scoped>
.shape-box {
  width: 100%;
  height: 100%;
}
</style>
