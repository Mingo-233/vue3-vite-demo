<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { Sketch as KnifeLayer } from "./helper";
import SvgUtil from "./SvgUtil";
// import ArrowPair from './ArrowPair.vue';
import { DPI } from "./helper";
import type { TUnitType } from "./helper";
import { layerKnifeData } from "./mockData";
import projectInfo from "../svg/info.json";
// import { usePdf } from "./pdf.js";
import { useSvgPdf } from "./pdfSvg.js";
import path from "path";

const layerKnife = layerKnifeData;

const side = ref("outside");
const background = ref(null);
const scale = ref(0.37023462996825945);
const name = "traditional";
const isShowCutline = ref(true);
const materialShow = ref(true);
const selectedFace = ref("");
const faceBackground = ref(projectInfo.face_background);
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
  console.log("faceBackground", faceBackground.value);
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
  // console.log("facesForSvg", facesForSvg.value);
  // console.log("backgroundFill", backgroundFill.value);
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
  // usePdf(config);
  useSvgPdf(config);
}, 1000);
function mmToPt(mm: number) {
  return mm * (72 / 25.4);
}

const globalSvgWidth = layerKnife.totalX + 2 * layerKnife.bleedline;
const globalSvgHeight = layerKnife.totalY + 2 * layerKnife.bleedline;
</script>
<template>
  <div
    class="background-wrap"
    :style="`${side === 'inside' ? 'transform: scale(-1, 1)' : ''}`"
  >
    <svg
      id="globalSvg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0"
      y="0"
      :width="globalSvgWidth + 'mm'"
      :height="globalSvgHeight + 'mm'"
      overflow="visible"
      :viewBox="`0 0 ${globalSvgWidth} ${globalSvgHeight}`"
    >
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
      <!-- 设计元素层 -->
      <!-- <svg  xmlns="http://www.w3.org/2000/svg" version="1.1">
    <image
            href="data:image/png;base64,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"
    x="0" y="0" />
</svg> -->
      <svg
        id="design-layer"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      ></svg>
      <!-- 刀线层 -->
      <svg id="knife-layer" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          v-show="layerKnife.bleedline && isShowCutline"
        >
          <path
            :stroke-width="strokeWidth"
            stroke="#ff0000"
            :style="{ fill: bleedFill }"
            :d="bleedsForSvg"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
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
            :transform="`translate(${layerKnife.bleedline}, ${layerKnife.bleedline})`"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path
            :transform="`translate(${layerKnife.bleedline}, ${layerKnife.bleedline})`"
            :stroke-width="strokeWidth"
            stroke="#00ff00"
            fill="none"
            :d="cutsForSvg"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <g
            v-for="(item, index) in layerKnife.folds"
            :key="index"
            :transform="`translate(${layerKnife.bleedline}, ${layerKnife.bleedline})`"
          >
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
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path
            v-for="(item, index) in holesForSvg"
            :transform="`translate(${layerKnife.bleedline}, ${layerKnife.bleedline})`"
            :key="`holes${index}`"
            :stroke-width="strokeWidth"
            stroke="#888800"
            :style="{ fill: '#ffffff' }"
            :d="item"
          />
        </svg>
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
