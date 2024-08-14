<script lang="ts" setup>
import { computed, Ref, isRef } from 'vue';
// import { Design } from '../typing';
import Image from './elements/image/index.vue';
import Font from './elements/font/index.vue';
import Group from './elements/group/index.vue';
import Shape from './elements/shape/index.vue';
const props = withDefaults(
  defineProps<{
    data: any;
    scale: Ref<number> | number;
    canva?: any;
    showHover?: boolean;
  }>(),
  {
    showHover: true,
  },
);
const style = computed(() => props.data.style);
const scale = computed(() => {
  return isRef(props.scale) ? props.scale.value : props.scale;
});
const hasClip = computed(() => {
  if (props.data.type === 'img' && /(jpe?g|png)/.test((props.data.src ?? '').toLowerCase())) {
    return true;
  }
  return false;
});
function onStopDrag(e: Event) {
  e.preventDefault();
  e.stopPropagation();
}
</script>
<template>
  <div
    class="element-box"
    @dragstart="onStopDrag"
    :class="{ 'component-item-box': !!data.uuid, 'no-event': data._is_texture, 'no-hover': !showHover }"
    :data-is-lock="data.locked"
    :data-uuid="data.uuid"
    :data-mv-tag="data.uuid"
    :data-mv-layer="data._layer_name"
    :data-type="data.type"
    :data-rotate="style.rotate"
    :data-rotate-x="style.rotateX"
    :data-rotate-y="style.rotateY"
    :data-px="style.left"
    :data-py="style.top"
    :data-width="style.width"
    :data-height="style.height"
    :data-texture="data._is_texture"
    :data-hasClip="hasClip"
    :data-isProportional="data.isProportional"
    :style="{
      '--element-scale': `${2 / scale}px`,
      '--element-scale2': `${2 / scale}px`,
      '--element-neg-scale': `-${1 / scale}px`,
      width: `${style.width}mm`,
      height: `${style.height}mm`,
      left: 0,
      top: 0,
      transform: `translate(${style.left}mm, ${style.top}mm) rotate(${style.rotate}deg) scale(${style.rotateX ? -1 : 1},${style.rotateY ? -1 : 1})`,
      outlineWidth: `${1 / scale}px`,
      ...((style as any).clipPath ? { clipPath: (style as any).clipPath } : {}),
    }"
  >
    <Image v-if="data.type === 'img'" :data="data"  />
    <Font v-if="data.type === 'font'" :data="data" :canva="canva" />
    <Group v-if="data.type === 'group'" :data="data" :canva="canva" />
    <Shape v-if="data.type === 'shape'" :data="data" />
  </div>
</template>
<style lang="less" scoped>
.no-event {
  pointer-events: none;
}
.element-box {
  position: absolute;
  overflow: visible;
  user-select: none;
  left: 0;
  top: 0;
  outline-color: var(--primary-color);
  &:hover {
    overflow: visible;
    &:after {
      display: inline-block;
      position: absolute;
      left: var(--element-neg-scale);
      top: var(--element-neg-scale);
      width: calc(100% + var(--element-scale2));
      height: calc(100% + var(--element-scale2));
      content: ' ';
      pointer-events: none;
      border: solid var(--element-scale) var(--primary-color);
    }
  }
  &.no-hover {
    &:hover {
      &::after {
        display: none;
      }
    }
  }
}
</style>
