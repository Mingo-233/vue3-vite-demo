<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Sketch as KnifeLayer, Design } from "./helper";
// import BackgroundSkeleton from './BackgroundSkeleton.vue';
import Element from './Element.vue';
import { DPI } from "./helper";
import { layerKnifeData } from "./mockData";
import projectInfo from '../svg/info.json'
// const props = defineProps<{
//   layerKnife: KnifeLayer;
//   designs: Design[];
//   insideDesigns: Design[];
//   side: Ref<'inside' | 'outside'>;
//   background: Ref<string | null>;
//   science_image: string | null;
//   scale: Ref<number>;
//   name: string;
//   canva: any;
//   positionShift: number;
//   cutlineOnTop: Ref<boolean>;
//   isShowCutline: Ref<boolean>;
//   isClipByBleed: Ref<boolean>;
//   isArrowShow: Ref<boolean>;
// }>();
const layerKnife = layerKnifeData;
const designs = projectInfo.design_data
const $emit = defineEmits<{
  (e: 'selected', data: any): void;
}>();
const isClipByBleed = false
const side = ref('outside')
const canva = null
const positionShift = 0
const scale = ref(0.4172841139581744);
const name = "traditional"
// const designs = computed(() => {
//   if (props.side.value === 'inside') {
//     return props.insideDesigns;
//   } else {
//     return props.designs;
//   }
// });
const canvasClipPath = computed(() => {
  if (isClipByBleed) {
    return `url(#layer-clip-path_${name})`;
  } else {
    return 'none';
  }
});
</script>
<template>
  <div
    class="layer-box"
    :data-layer-name="name"
    :data-position-shift="positionShift"
    :style="{
      '--hover-width': 2 / scale / DPI,
      width: `${layerKnife.totalX}mm`,
      height: `${layerKnife.totalY}mm`,
      clipPath: canvasClipPath,
      overflow: canvasClipPath === 'none' ? 'inherit' : 'hidden',
    }"
  >
    <div class="design-box">
      <Element v-for="item in designs" :key="item.uuid" :data="item" :scale="scale" :canva="canva" />
    </div>
<!-- 
    <BackgroundSkeleton
      v-if="cutlineOnTop.value !== false"
      class="background-skeleton"
      :layerKnife="layerKnife"
      :isShowCutline="isShowCutline"
      :scale="scale"
      :name="name"
      :is-arrow-show="isArrowShow"
      :side="side"
    /> -->
  </div>
</template>
<style lang="less" scoped>
.noHover {
  &:hover {
    &::after {
      display: none;
    }
  }
}
.layer-box {
  position: relative;
  .design-box {
    position: absolute;
    left: 0;
    top: 0;
  }
  .background-skeleton {
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
  }
}
</style>
