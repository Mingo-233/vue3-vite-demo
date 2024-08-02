<script setup>
import { ref, onMounted, watch } from "vue";
import SkeletonItem from "./SkeletonItem.vue";
const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="skeleton-loader scene-skeleton">
    <div v-if="loading">
      <slot name="skeleton">
        <SkeletonItem height="200px"></SkeletonItem>
      </slot>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="less">
.skeleton-loader {
  position: relative;
  /* 添加骨架屏的样式 */
  @keyframes slide-to-right {
    from {
      background-position: 100% 50%;
    }
    to {
      background-position: 0% 50%;
    }
  }
}
</style>
