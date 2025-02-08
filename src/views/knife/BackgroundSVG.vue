<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { Sketch as KnifeLayer } from "./helper";
import SvgUtil from "./SvgUtil";
// import ArrowPair from './ArrowPair.vue';
import { DPI } from "./helper";
import type { TUnitType } from "./helper";
import { getLayerKnifeData, getProjectsInfo } from "./store/index";

// import { usePdf } from "./pdf.js";
import { useSvgPdf } from "./pdfSvg.js";
import path from "path";

const layerKnife = getLayerKnifeData();

const side = ref("outside");
const background = ref(null);
const scale = ref(0.37023462996825945);
const name = "traditional";
const isShowCutline = ref(true);
const materialShow = ref(true);
const selectedFace = ref("");
const faceBackground = ref(getProjectsInfo().face_background);
const isArrowShow = ref(false);
const unitType = undefined;
const sizeType = undefined;
function toBase64(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "Anonymous";
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const base64String = canvas.toDataURL();
      console.log(base64String);
      resolve(base64String);
    };
  });
}
const science_image =
  "https://cdn.baoxiaohe.com/94e8078a-9931-42cd-97ed-57883bd88085.jpg";
// const science_image = "/white.jpg";
const sizeUnit = "mm";
const elaborate = false;
const curFace = computed(() => {
  return selectedFace.value;
});

const scienceNullWH = computed(() => {
  return Math.floor(15 / scale.value);
});
const strokeWidth = computed(() => {
  return 0.25 / scale.value / DPI;
  // return 1;
});
console.log("strokeWidth", strokeWidth.value);

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
const cutLinePathV2 = computed(() => {
  const temp = cutsForSvg.value + holesForSvg.value.join("Z");
  return temp;
});
const foldLinePathV2 = computed(() => {
  let pathData = layerKnife.folds
    .map(
      (segment) => `M ${segment.x1} ${segment.y1} L ${segment.x2} ${segment.y2}`
    )
    .join(" ");

  console.log("foldLinePathV2", pathData);

  return pathData;
});

function backgroundOfFace(face: string) {
  if (faceBackground.value[face]) {
    return faceBackground.value[face].rgba;
  }
  return "#ffffff";
  // return backgroundFill.value;
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
  const faceNames = Object.keys(getProjectsInfo().face_background);
  const filterFaces = layerKnife.faces.filter((item) =>
    faceNames.includes(item.name)
  );
  // return SvgUtil.buildFacesForSvg(layerKnife.faces);
  return SvgUtil.buildFacesForSvg(filterFaces);
});
const dashStyle = computed(() => {
  return `${0.75 / scale.value} ${0.5 / scale.value}`;
});

function log() {
  // console.log("folds", layerKnife.folds);
  // console.log("holesForSvg", holesForSvg.value);
  // console.log("bleedFill", bleedFill.value);
  // console.log("bleedsForSvg", bleedsForSvg.value);
  // console.log("facesForSvg", facesForSvg.value);
  // console.log("backgroundFill", backgroundFill.value);
  // console.log("cutsForSvg", cutsForSvg.value);
}

setTimeout(() => {
  log();
  useSvgPdf();
}, 1000);
function mmToPt(mm: number) {
  return mm * (72 / 25.4);
}

const globalSvgWidth =
  layerKnife.totalX + 2 * layerKnife.bleedline + 2 * strokeWidth.value;
const globalSvgHeight =
  layerKnife.totalY + 2 * layerKnife.bleedline + 2 * strokeWidth.value;
// const globalSvgWidth = layerKnife.totalX + 2 * strokeWidth.value;
// const globalSvgHeight = layerKnife.totalY + 2 * strokeWidth.value;
// const translate = `translate(${strokeWidth.value * DPI}, ${
//   strokeWidth.value * DPI
// })`;
</script>
<template>
  <div
    class="background-wrap"
    :style="`${side === 'inside' ? 'transform: scale(-1, 1)' : ''}`"
  >
    <!-- 刀线层 -->
    <svg
      id="bleed-layer-svg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      :x="0"
      :y="0"
      :width="globalSvgWidth + 'mm'"
      :height="globalSvgHeight + 'mm'"
      overflow="visible"
      :viewBox="`0 0  ${globalSvgWidth} ${globalSvgHeight}`"
    >
      <path
        :stroke-width="strokeWidth"
        stroke="#00ff00"
        fill="none"
        :d="bleedsForSvg"
      />
    </svg>
    <svg
      id="cut-layer-svg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      :x="0"
      :y="0"
      :width="globalSvgWidth + 'mm'"
      :height="globalSvgHeight + 'mm'"
      overflow="visible"
      :viewBox="`0 0  ${globalSvgWidth} ${globalSvgHeight}`"
    >
      <path
        :transform="`translate(${layerKnife.bleedline}, ${layerKnife.bleedline})`"
        :stroke-width="strokeWidth"
        stroke="#0000ff"
        fill="none"
        :d="cutLinePathV2"
      />
    </svg>
    <svg
      id="fold-layer-svg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      :x="0"
      :y="0"
      :width="globalSvgWidth + 'mm'"
      :height="globalSvgHeight + 'mm'"
      overflow="visible"
      :viewBox="`0 0  ${globalSvgWidth} ${globalSvgHeight}`"
    >
      <path
        :transform="`translate(${layerKnife.bleedline}, ${layerKnife.bleedline})`"
        :stroke-width="strokeWidth"
        stroke="#ff0000"
        fill="none"
        :d="foldLinePathV2"
      ></path>
    </svg>
    <svg
      v-if="false"
      id="knife-layer-svg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      :x="0"
      :y="0"
      :width="globalSvgWidth + 'mm'"
      :height="globalSvgHeight + 'mm'"
      overflow="visible"
      :viewBox="`0 0  ${globalSvgWidth} ${globalSvgHeight}`"
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
            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADBJREFUOE9jfPn6w38GPEBMhB+fNAPjqAHDIgz+//+PNx28evMRfzoYNYCBceiHAQBcvVYJjLDNWQAAAABJRU5ErkJggg=="
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

      <svg id="knife-layer" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="bleed-g-svg"
          v-show="layerKnife.bleedline && isShowCutline"
        >
          <path
            :stroke-width="strokeWidth"
            stroke="#00ff00"
            fill="none"
            :d="bleedsForSvg"
          />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path
            :transform="`translate(${layerKnife.bleedline}, ${layerKnife.bleedline})`"
            :stroke-width="strokeWidth"
            stroke="#0000ff"
            fill="none"
            :d="cutsForSvg"
          />
          <path
            v-for="(item, index) in holesForSvg"
            :transform="`translate(${layerKnife.bleedline}, ${layerKnife.bleedline})`"
            :key="`holes${index}`"
            :stroke-width="strokeWidth"
            stroke="#0000ff"
            :style="{ fill: '#ffffff' }"
            :d="item"
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
              stroke="#ff0000"
              :x1="item.x1"
              :y1="item.y1"
              :x2="item.x2"
              :y2="item.y2"
            />
            <!-- <path
              v-if="item.path"
              stroke="#ff0000"
              :stroke-width="strokeWidth"
              fill="none"
              :d="item.d"
            /> -->
          </g>
        </svg>
      </svg>
    </svg>
    <svg id="design-layer" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        :x="0"
        :y="0"
        :width="globalSvgWidth + 'mm'"
        :height="globalSvgHeight + 'mm'"
        :viewBox="`0 0  ${globalSvgWidth} ${globalSvgHeight}`"
      >
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        transform="translate(100,100)"
      >
        <image x="10" y="10" xlink:href="" alt="" width="117mm" height="48mm" />
      </svg>
    </svg>
    <!-- 标注信息 -->
    <svg
      id="other-layer"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="600"
      height="400"
    >
      <!-- <path
        id="horizontalPath"
        d="M10 50 H 490"
        fill="transparent"
        stroke="black"
      />
      <text font-family="Verdana" font-size="24" fill="black">
        <textPath href="#horizontalPath">
          This text is written horizontally along the path!
        </textPath>
      </text> -->
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
