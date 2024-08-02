<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "rect",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "auto",
  },
  borderRadius: {
    type: String,
    default: "14px",
  },
});
</script>

<template>
  <div
    class="skeleton-element skeleton-mask"
    :style="{ height: height, width: width, borderRadius: borderRadius }"
  ></div>
</template>

<style lang="less">
/* 添加骨架屏的样式 */
@keyframes slide-to-right {
  from {
    background-position: 100% 50%;
  }
  to {
    background-position: 0% 50%;
  }
}
.skeleton-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.skeleton-element {
  background-image: linear-gradient(to left, #e3e3e3, #f3f3f3, #e3e3e3);
  animation: slide-to-right 2s infinite;
  background-size: 400% 400%;
}
</style>
