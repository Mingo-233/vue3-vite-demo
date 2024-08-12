<script lang="ts" setup>
import { Ref, ref } from "vue";
import { Sketch as KnifeLayer, Design } from "./helper";
import Background from "./Background.vue";
import BackgroundSVG from "./BackgroundSVG.vue";

import { DPI } from "./helper";
import type { TUnitType } from "./helper";
import { layerKnifeData } from "./mockData";

const layerKnife = layerKnifeData;

const scale = ref(0.37023462996825945);
</script>
<template>
  <div
    class="layer-box"
    :style="{
      '--hover-width': 2 / scale / DPI,
      width: `${layerKnife.totalX}mm`,
      height: `${layerKnife.totalY}mm`,
    }"
  >
    <div class="design-box">
      <!-- <Background /> -->
      <BackgroundSVG />
    </div>
  </div>
</template>
<style lang="less" scoped>
.layer-box {
  position: relative;
  .design-box {
    position: absolute;
    width: 100%;
    height: 100%;
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
