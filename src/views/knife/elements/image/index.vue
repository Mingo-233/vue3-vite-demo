<script lang="ts" setup>
// import { Design } from '../../../typing';
import Image from './Image.vue';
import Svg from './Svg.vue';
import { computed } from 'vue';
const props = defineProps<{
  data: any;
}>();

const isSvg = computed(() => {
  const extIndex = (props.data.src ?? '').lastIndexOf('.');
  const ext = (props.data.src ?? '').substring(extIndex + 1);
  return ext === 'svg';
});
</script>
<template>
  <Image v-if="!isSvg" :data="data" />
  <Svg v-if="isSvg" :data="data" />
</template>
