<script setup lang="ts">
import { computed, ref, inject } from 'vue';
// import { Design } from '../../../typing';
// import Editor from '../../../editor';
import { injectFontFamilies } from './help';
const props = defineProps<{
  data: any;
  canva?: any;
}>();
const contenteditable = ref(false);
const style = computed(() => {
  const dataStyle = props.data.style;
  const fontScale = Math.min((dataStyle.fontSize ?? 12) / 12, 1);
  const fontSize = Math.max(dataStyle.fontSize ?? 12, 12);
  return {
    width: !dataStyle.vertical ? `${dataStyle.width / fontScale}mm` : 'auto',
    minWidth: !dataStyle.vertical ? `${dataStyle.lineHeight ?? 12 / fontScale}mm` : 'auto',
    height: dataStyle.vertical ? `${dataStyle.height / fontScale}mm` : 'auto',
    minHeight: dataStyle.vertical ? `${dataStyle.lineHeight ?? 12 / fontScale}mm` : 'auto',
    lineHeight: `${(dataStyle.lineHeight ?? 12) / (dataStyle.fontSize ?? 12)}`,
    fontSize: `${fontSize}mm`,
    fontFamily: `${dataStyle.fontFamily},Gilroy,NotoSansCJK`,
    textAlign: dataStyle.textAlign,
    color: dataStyle.color,
    fontWeight: dataStyle.fontWeight,
    fontStyle: dataStyle.fontStyle ?? 'normal',
    opacity: dataStyle.opacity / 100,
    outline: 'none',
    lineBreak: 'anywhere', // 中文和字符的断句
    overflowWrap: 'anywhere', // 防止溢出
    wordBreak: 'break-all',
    whiteSpace: 'break-spaces',
    transform: `scale(${fontScale})`,
    transformOrigin: '0 0',
    writingMode: dataStyle.vertical ? 'vertical-rl' : 'horizontal-tb',
    cursor: contenteditable.value ? 'text' : '',
    userSelect: contenteditable.value ? 'text' : 'none',
    position: 'relative',
    '-webkit-font-smoothing': 'antialiased',
    'z-index': 1,
  };
});
const fontRef = ref<HTMLElement>();
function onEnableEdit() {
  contenteditable.value = true;
  const fontDiv = fontRef.value as HTMLElement;

  if (window.getSelection) {
    const range = window.getSelection() as any;
    range.selectAllChildren(fontDiv);
    // range.collapseToEnd();
  } else if ((document as any).selection) {
    const range = (document as any).selection.createRange() as any;
    range.selectNodeContents(fontDiv);
    // range.collapse(false);
    // range.select();
  }
  fontDiv.focus();
  props.canva && (props.canva.isFocus = false); // eslint-disable-line
}

function onUnableEdit() {
  contenteditable.value = false;
  props.canva && (props.canva.isFocus = true); // eslint-disable-line
}

// 加载字体
if (props.data.style.fontFamily) {
  const font = {
    fontFamily: props.data.style.fontFamily,
    src: props.data.src as string,
  };
  injectFontFamilies([font], 'ownFontStyle');
}
const isShowFake = computed(() => {
  return (
    ((props.data.style as any).fontShadow && (<any>props.data.style).fontShadow.length) ||
    ((<any>props.data.style).fontStroke && (<any>props.data.style).fontStroke.length)
  );
});
function fontFakeStyle(index: number) {
  const data = props.data;
  let shadow = '';
  ((<any>data.style).fontShadow || []).forEach((ele: any, i: number) => {
    shadow += `${ele.color} ${ele.value[0] / 3.7795275591}px ${ele.value[1] / 3.7795275591}px ${
      ele.value[2] / 3.7795275591
    }px ${i > 0 ? ',' : ''}`;
  });
  const dataStyle = props.data.style;
  const fontScale = Math.min((dataStyle.fontSize ?? 12) / 12, 1);
  const fontSize = Math.max(dataStyle.fontSize ?? 12, 12);
  const style = {
    position: 'absolute',
    zIndex: `-${index + 1}`,
    top: 0,
    left: 0,
    width: !dataStyle.vertical ? `${dataStyle.width / fontScale}mm` : 'auto',
    minHeight: !dataStyle.vertical ? `${(dataStyle.lineHeight ?? 12) / fontScale}mm` : 'auto',
    height: dataStyle.vertical ? `${dataStyle.height / fontScale}mm` : 'auto',
    minWidth: dataStyle.vertical ? `${(dataStyle.lineHeight ?? 12) / fontScale}` : 'auto',
    lineHeight: `${(dataStyle.lineHeight ?? 12) / (dataStyle.fontSize ?? 12)}`,
    display: 'block',
    fontSize: `${fontSize}mm`,
    fontFamily: `${dataStyle.fontFamily},Gilroy,NotoSansCJK`,
    textAlign: dataStyle.textAlign,
    color: dataStyle.color,
    fontWeight: dataStyle.fontWeight,
    fontStyle: dataStyle.fontStyle || 'normal',
    opacity: dataStyle.opacity / 100,
    outline: 'none',
    lineBreak: 'anywhere',
    overflowWrap: 'anywhere',
    wordBreak: 'break-all',
    whiteSpace: 'break-spaces',
    transform: `scale(${fontScale})`,
    transformOrigin: '0 0',
    writingMode: dataStyle.vertical ? 'vertical-rl' : 'horizontal-tb',
    cursor: '',
    userSelect: contenteditable.value ? 'text' : 'none',
    textShadow: shadow || '',
    '-webkit-text-stroke': `${(dataStyle as any).fontStroke[index].value / 3.7795275591}px ${
      (dataStyle as any).fontStroke[index].color
    }`,
    '-webkit-font-smoothing': 'antialiased',
  } as any;
  return style;
}
</script>
<template>
  <div class="font-box">
    <div
      class="element-font-box"
      ref="fontRef"
      @dblclick="onEnableEdit"
      @blur="onUnableEdit"
      :data-font-size="data.style.fontSize"
      :data-line-height="style.lineHeight"
      :data-width="data.style.width"
      :data-height="data.style.height"
      :style="(style as any)"
      :contenteditable="contenteditable"
    >
      {{ data.value }}
    </div>

    <template v-if="isShowFake">
      <div
        v-for="(ele, index) in (<any>data.style).fontStroke"
        :key="index"
        class="element-font-wrap"
        :class="`fontStyle${data.uuid}`"
        :style="fontFakeStyle(index)"
        :data-text="data.value"
        v-html="data.value"
      ></div>
    </template>
  </div>
</template>
<style lang="less" scoped>
.font-box {
  position: relative;
}
.element-font-box {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
