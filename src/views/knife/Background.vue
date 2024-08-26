<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { Sketch as KnifeLayer } from "./helper";
import SvgUtil from "./SvgUtil";
// import ArrowPair from './ArrowPair.vue';
import { DPI } from "./helper";
import type { TUnitType } from "./helper";
import { getLayerKnifeData } from "./store/index";

import { usePdf } from "./pdf.js";
import path from "path";
// const props = defineProps<{
//   layerKnife: KnifeLayer;
//   name: string;
//   scale: Ref<number>;
//   background: Ref<string | null>;
//   science_image: string | null;
//   materialShow: Ref<boolean>;
//   isShowCutline: Ref<boolean>;
//   selectedFace: Ref<string>;
//   faceBackground: Ref<Record<string, { rgba: string; cmyk: string }>>;
//   isArrowShow: Ref<boolean>;
//   sizeUnit?: string;
//   sizeType?: string;
//   side?: Ref<"inside" | "outside">;
//   elaborate?: boolean;
//   unitType: TUnitType;
// }>();
const layerKnife = getLayerKnifeData();
const designs = [
  {
    bg: { x: 0, y: 0, width: 1080.3959641330482, height: 270.09899103326205 },
    id: "89109b25-c771-4e80-845a-340863871adb",
    src: "https://cdn.pacdora.com/font/3280b6fb-353d-40bb-804f-e553e615a7e8.woff2",
    type: "font",
    uuid: "89109b25-c771-4e80-845a-340863871adb",
    style: {
      top: 137.139,
      left: 55.0726,
      color: "#191919",
      width: 285.855,
      height: 34.3026,
      rotate: 0,
      opacity: 100,
      fontSize: 22.868381240544625,
      vertical: 0,
      textAlign: "center",
      fontFamily: "f99066",
      lineHeight: 34.30257186081695,
    },
    value: "Your text here",
    example: "Crimson-Roman",
    _layer_name: "traditional",
  },
];
const side = ref("inside");
const background = ref(null);
const scale = ref(0.37023462996825945);
const name = "traditional";
const isShowCutline = ref(true);
const materialShow = ref(true);
const selectedFace = ref("");
const faceBackground = ref<any>({});
const isArrowShow = ref(false);
const unitType = undefined;
const sizeType = undefined;
const science_image = "/white.jpg";
// const science_image1 = "/black.jpg";
const sizeUnit = "mm";
const elaborate = false;
const curFace = computed(() => {
  return selectedFace.value;
});

const scienceNullWH = computed(() => {
  return Math.floor(15 / scale.value);
});
const strokeWidth = computed(() => {
  // return 0.25 / scale.value / DPI;
  return 1;
});
const activeStrokeWidth = computed(() => {
  return 2.5 / scale.value / DPI;
});
const materialFill = computed(() => {
  if (science_image) {
    if (!materialShow.value) {
      return `url(#scienceImageNullPattern_${name})`;
    } else {
      return `url(#scienceImagePattern_${name})`;
    }
  } else {
    return `url(#scienceImageNullPattern_${name})`;
  }
});
const backgroundFill = computed(() => {
  if (background.value) {
    if (/^url/.test(background.value)) {
      return `url(#backgroundImagePattern_${name})`;
    } else {
      return background.value;
    }
  }
  return materialFill.value;
});
function backgroundOfFace(face: string) {
  if (faceBackground.value[face]) {
    return faceBackground.value[face].rgba;
  }
  return backgroundFill.value;
}
const bleedFill = computed(() => {
  return backgroundFill.value;
});
const bleedsForSvg = computed(() => {
  return SvgUtil.dlist_to_d(layerKnife.bleeds);
});
const cutsForSvg = computed(() => {
  return SvgUtil.dlist_to_d(layerKnife.cuts);
});
const holesForSvg = computed(() => {
  const { holes = [] } = layerKnife;
  return holes.map((e) => {
    return SvgUtil.dlist_to_d(e);
  });
});
const facesForSvg = computed(() => {
  return SvgUtil.buildFacesForSvg(layerKnife.faces);
});
const dashStyle = computed(() => {
  return `${0.75 / scale.value} ${0.5 / scale.value}`;
});

function log() {
  // console.log("bleedFill", bleedFill.value);
  // console.log("bleedsForSvg", bleedsForSvg.value);
  console.log("facesForSvg", facesForSvg.value);
  console.log("backgroundFill", backgroundFill.value);
  // console.log("cutsForSvg", cutsForSvg.value);
}
setTimeout(() => {
  log();
  const config = {
    bleedConfig: {
      path: bleedsForSvg.value,
      fill: bleedFill.value,
      strokeWidth: strokeWidth.value,
      strokeColor: "#ff0000",
      translate: {
        x: -layerKnife.bleedline,
        y: -layerKnife.bleedline,
      },
    },
    cutConfig: {
      path: cutsForSvg.value,
      fill: "none",
      strokeWidth: strokeWidth.value,
      strokeColor: "#00ff00",
    },
    holesConfig: {
      paths: holesForSvg.value,
      fill: "#ffffff",
      strokeWidth: strokeWidth.value,
      strokeColor: "#888800",
    },
    foldsConfig: {
      paths: layerKnife.folds,
      strokeWidth: strokeWidth.value,
      strokeColor: "#0000ff",
      strokeDasharray: {
        length: 0.75 / scale.value,
        space: 0.5 / scale.value,
      },
    },
  };
  usePdf(config);
}, 1000);
// const arrowSize = computed(() => {
//   if (sizeType === "dm") {
//     return layerKnife.knifeSize;
//   } else if (sizeType === "ed") {
//     return layerKnife.outSize;
//   } else if (sizeType === "id") {
//     return layerKnife.size;
//   }
//   const { sizeArrowData = [] } = layerKnife;
//   const widthArrow = sizeArrowData.find((vo) => vo.lineName === "W");
//   const heightArrow = sizeArrowData.find((vo) => vo.lineName === "H");
//   const lengthArrow = sizeArrowData.find((vo) => vo.lineName === "L");
//   return {
//     W: widthArrow?.lineLength ?? 0,
//     H: heightArrow?.lineLength ?? 0,
//     L: lengthArrow?.lineLength ?? 0,
//   };
// });
const whlArrowData = computed(() => {
  if (
    !layerKnife.sizeArrowData ||
    JSON.stringify(layerKnife.sizeArrowData) === "{}"
  ) {
    return [];
  }
  const { sizeArrowData = [] } = layerKnife;
  const lineNames = ["W", "L", "H"];
  // if (mode === 'advance') {
  //   return sizeArrowData.filter((vo) => !lineNames.includes(vo.lineName));
  // }
  return sizeArrowData.filter((vo) => lineNames.includes(vo.lineName));
});
</script>
<template>
  <div
    class="background-wrap"
    :style="`${side === 'inside' ? 'transform: scale(-1, 1)' : ''}`"
  >
    <svg id="globalSvg" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <pattern
          :id="`scienceImageNullPattern_${name}`"
          patternUnits="userSpaceOnUse"
          :height="scienceNullWH"
          :width="scienceNullWH"
        >
          <image
            x="0"
            y="0"
            :height="scienceNullWH"
            :width="scienceNullWH"
            xlink:href="/lattice.png"
          />
        </pattern>
        <pattern
          :id="`backgroundImagePattern_${name}`"
          patternUnits="userSpaceOnUse"
          :width="200"
          :height="200"
        >
          <image x="0" y="0" :width="200" :height="200" />
        </pattern>
        <pattern
          :id="`scienceImagePattern_${name}`"
          patternUnits="userSpaceOnUse"
          :height="128"
          :width="128"
        >
          <image
            x="0"
            y="0"
            :width="128"
            :height="128"
            :xlink:href="science_image"
            preserveAspectRatio="none"
          />
        </pattern>
      </defs>
      <svg
        v-if="layerKnife"
        x="0"
        y="0"
        width="1mm"
        height="1mm"
        overflow="visible"
        viewBox="0 0 1 1"
      >
        <path
          v-show="layerKnife.bleedline && isShowCutline"
          :transform="`translate(-${layerKnife.bleedline}, -${layerKnife.bleedline})`"
          :stroke-width="strokeWidth"
          stroke="#ff0000"
          :style="{ fill: bleedFill }"
          :d="bleedsForSvg"
        />
        <g>
          <!-- :class="{ 'face-active': item.name === curFace }" -->

          <path
            v-for="item in facesForSvg"
            :key="`knifeFace_${item.name}`"
            :id="`${name}_knifeFace_${item.name}`"
            :data-face="item.name"
            class="knife-face"
            :stroke-width="
              item.name === curFace ? activeStrokeWidth : strokeWidth
            "
            :fill="backgroundOfFace(item.name)"
            :d="item.d"
          />
        </g>
        <g>
          <path
            :stroke-width="strokeWidth"
            stroke="#00ff00"
            fill="none"
            :d="cutsForSvg"
          />
        </g>
        <g>
          <g v-for="(item, index) in layerKnife.folds" :key="index">
            <line
              v-if="!item.path && !item.blank"
              :stroke-width="strokeWidth"
              stroke="#0000ff"
              :stroke-dasharray="dashStyle"
              :x1="item.x1"
              :y1="item.y1"
              :x2="item.x2"
              :y2="item.y2"
            />
            <path
              v-if="item.path"
              stroke="#333333"
              :stroke-width="strokeWidth"
              :stroke-dasharray="dashStyle"
              fill="none"
              :d="item.d"
            />
          </g>
        </g>
        <g>
          <path
            v-for="(item, index) in holesForSvg"
            :key="`holes${index}`"
            :stroke-width="strokeWidth"
            stroke="#888800"
            :style="{ fill: '#ffffff' }"
            :d="item"
          />
        </g>
        <!-- <g v-if="isArrowShow && !elaborate">
          <template v-for="(item, index) in whlArrowData" :key="`a${index}`">
            <ArrowPair
              :p1="item.p1"
              :p2="item.p2"
              :rotate="item.rotate"
              :center="item.center"
              :lineName="item.lineName"
              :lineLength="arrowSize[item.lineName as 'W' | 'H' | 'L']"
              :scale="scale.value"
              :disabled="true"
              :lineType="item.lineType"
              :valueUnit="item.unit"
              :unitType="unitType ?? 'mm'"
              :tpointer="item.tpointer"
              :active="false"
              :side="side?.value || 'outside'"
              :size-unit="sizeUnit"
            />
          </template>
        </g> -->
      </svg>
    </svg>
  </div>
</template>
<style lang="less">
.face-hover {
  stroke: var(--primary-color);
  stroke-width: var(--hover-width);
}
</style>
<style lang="less" scoped>
.background-wrap {
  width: 100%;
  height: 100%;
}
svg {
  overflow: visible;
}

.face-active {
  stroke: #7c04fa;
}
</style>
