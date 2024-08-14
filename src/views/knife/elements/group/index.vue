<script lang="ts" setup>
// import { Design } from '../../../typing';
// import Editor from '../../../editor';
import Image from '../image/index.vue';
// import Font from '../font/index.vue';
import Shape from '../shape/index.vue';
const props = defineProps<{
  data: any;
  canva?: any;
}>();
const designs = props.data.designs || [];
</script>
<template>
  <div class="group-box">
    <div
      class="element-box"
      v-for="item in designs"
      :data-x="item.style.left"
      :data-y="item.style.top"
      :data-width="item.style.width"
      :data-height="item.style.height"
      :key="item.uuid"
      :data-type="item.type"
      :style="{
        width: `${item.style.width}mm`,
        height: `${item.style.height}mm`,
        left: `${item.style.left}mm`,
        top: `${item.style.top}mm`,
        transform: `rotate(${item.style.rotate}deg) scale(${item.style.rotateX ? -1 : 1},${
          item.style.rotateY ? -1 : 1
        })`,
      }"
    >
      <Image v-if="item.type === 'img'" :data="item" :canva="canva" />
      <!-- <Font v-if="item.type === 'font'" :data="item" :canva="canva" /> -->
      <Shape v-if="item.type === 'shape'" :data="item" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.group-box {
  position: relative;
}
.element-box {
  position: absolute;
  overflow: visible;

  user-select: none;
  left: 0;
  top: 0;
  outline-color: var(--primary-color);
}
</style>
