<template>
  <div class="page">
    <div v-if="show">
      <div class="list" v-for="(item, index) in scenes" :key="index">
        <SkeletonLoader :loading="true">
          <template #skeleton>
            <SkeletonItem width="100%" height="auto"></SkeletonItem>
          </template>

          <template #content>
            <div
              class="card-container"
              :style="{ 'background-image': `url(${item.bgImg})` }"
              :gtm="item.gtm"
            >
              <div class="card-top">
                <div class="label">{{ item.name }}</div>
                <i class="p-icon-new-tab open-icon"></i>
              </div>
              <div class="img-warper">
                <img
                  :class="`bottom-img img-${item.symbol}`"
                  :src="item.bottomImg"
                  alt=""
                  :onload="imgOnLoad"
                />
              </div>
            </div>
          </template>
        </SkeletonLoader>
      </div>
    </div>

    <button @click="show = true">change</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import SkeletonItem from "./SkeletonItem.vue";
import SkeletonLoader from "./SkeletonLoader.vue";
import { reactive } from "vue";
const show = ref(false);

const bottomImgsLoadNum = ref(0);
const loadingState = reactive(<
  {
    bgImgs: "pending" | "done";
    bottomImgs: "pending" | "done";
  }
>{
  bgImgs: "pending",
  bottomImgs: "pending",
});

function imgOnLoad() {
  bottomImgsLoadNum.value++;
  if (bottomImgsLoadNum.value === scenes.value.length) {
    loadingState.bottomImgs = "done";
  }
}
const bgImgs = computed(() => {
  return scenes.value.map((item) => item.bgImg);
});
const loading = computed(() => {
  return !(
    loadingState.bgImgs === "done" && loadingState.bottomImgs === "done"
  );
});
const loadImages = () => {
  const imagePromises = bgImgs.value.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  });

  Promise.all(imagePromises)
    .then(() => {
      loadingState.bgImgs = "done";
    })
    .catch((error) => {
      console.error("Error loading images:", error);
      loadingState.bgImgs = "done";
    });
};
const mockImg = {
  moreToolBg1:
    "https://oss.pacdora.cn/frontend/web-assets/0767dc1e-22ed-4891-bf36-12e0afa39718.jpg",
  moreToolBg2:
    "https://oss.pacdora.cn/frontend/web-assets/a4444507-e78d-4927-8d85-00eb94016b23.jpg",
  moreToolBg3:
    "https://oss.pacdora.cn/frontend/web-assets/5de86028-57ab-43c6-bce1-25e5d41c1c68.jpg",
  moreToolImg1:
    "https://oss.pacdora.cn/frontend/web-assets/d8f40f0f-afac-4398-bd99-a5b9225c1385.webp",
  moreToolImg2:
    "https://oss.pacdora.cn/frontend/web-assets/502fa61a-cfc5-46f7-ad21-4767d2047b68.webp",
  moreToolImg3:
    "https://oss.pacdora.cn/frontend/web-assets/d4d0659a-6e31-44b2-8762-d57368aa69bd.webp",
};
const scenes = computed(() => {
  return [
    {
      bgImg: mockImg.moreToolBg1,
      // bgImg: 'https://oss.pacdora.cn/frontend/web-assets/4279cf08-7899-45ad-a6d8-498175a7ce15.jpg',

      bottomImg: mockImg.moreToolImg1,
      name: "modelingSoftware",
      gtm: "ga-mockup_mockup_more_3Ddesign",
      clickType: "design3D",
      symbol: "design3D",
    },
    {
      bgImg: mockImg.moreToolBg2,
      bottomImg: mockImg.moreToolImg2,
      name: "packagingPrinting",
      gtm: "ga-mockup_mockup_more_printing",
      clickType: "url",
      url: "/printing",
      symbol: "printing",
    },
    {
      bgImg: mockImg.moreToolBg3,
      bottomImg: mockImg.moreToolImg3,
      name: "editorAPI",
      gtm: "ga-mockup_mockup_more_api",
      clickType: "url",
      url: "/packaging-editor-api",
      symbol: "editor-api",
    },
  ];
});
onMounted(() => {
  loadImages();
});
</script>

<style lang="less" scoped>
.page {
  width: 300px;
  height: 800px;
  border: 1px solid #000;
  .list {
    &:last-child .card-container {
      margin-bottom: 0;
    }
    .card-container {
      position: relative;
      box-sizing: border-box;
      height: auto;
      min-height: 130px;
      margin-bottom: 16px;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        outline: 4px solid #fff;
        outline-offset: -6px;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: inset 0 0 0 2px var(--primary-color);
          pointer-events: none;
          z-index: 1;
          border-radius: 14px;
        }
      }
    }
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    .label {
      max-width: 142px;
      padding: 16px 16px 0;
    }
    .open-icon {
      margin-top: 6px;
      margin-right: 6px;
      font-size: 28px;
      color: #000;
    }
  }
  .img-warper {
    padding: 2px;
    min-height: 80px;
    .bottom-img {
      display: block;
      margin: 0 auto;
      object-fit: contain;
      border-radius: 14px;
      height: 86px;
    }
  }
}
</style>
