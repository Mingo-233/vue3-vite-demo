<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { colorEqual } from '../../helper';
// import { Design } from '../../../typing';
const props = defineProps<{
  data: any;
}>();
const svgHTML = ref('');
function beautySvg(dom: Element) {
  const ele = dom.querySelectorAll('*');
  const styleDom = dom.querySelector('style') as HTMLStyleElement;
  if (styleDom) {
    document.head.appendChild(styleDom);
    if (styleDom.sheet) {
      const rules = styleDom.sheet.cssRules;
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i] as CSSStyleRule;
        const ruleDoms = dom.querySelectorAll(rule.selectorText);
        if (ruleDoms) {
          for (let k = 0; k < ruleDoms.length; k++) {
            ['fill', 'stroke'].forEach((type) => {
              ((ruleDoms[k] as any).style as any)[type] = rule.style.getPropertyValue(type);
            });
          }
        }
      }
    }
    document.head.removeChild(styleDom);
    dom.appendChild(styleDom);
  }
}
function getSvg(dom: Element, type: string, value: string) {
  const ele = dom.querySelectorAll('*');
  const result: any[] = [];
  for (let m = 0; m < ele.length; m++) {
    const i = ele[m];
    if (['defs', 'style'].includes(i.nodeName)) {
      continue;
    }
    if (i.getAttribute(type) && colorEqual(i.getAttribute(type) ?? '', value)) {
      result.push({ el: i, type: 'attr' });
      continue;
    }
    const style = (i as any).style as any;
    if (!style) {
      continue;
    }

    if (style.getPropertyValue(type) && colorEqual(style.getPropertyValue(type) ?? '', value)) {
      result.push({ el: i, type: 'style' });
    }
  }
  return result;
}
const container = ref();
watch(
  () => props.data,
  (v: any) => {
    if (v.can_set_color === 1) {
      const fills = props.data.fills || [];
      fetch(props.data.src as string)
        .then((response) => response.text())
        .then((body: string) => {
          const dom = document.createElement('div');
          dom.innerHTML = body;
          const svgDom = dom.querySelector('svg') as SVGSVGElement;
          (svgDom as any).setAttribute('preserveAspectRatio', 'none');

          Object.assign(svgDom.style, {
            width: `100%`,
            height: `100%`,
            display: 'block',
          });
          beautySvg(dom);
          let styleDom = dom.querySelector('style');
          if (!styleDom) {
            styleDom = document.createElement('style');
          }
          for (let i = 0; i < fills.length; i++) {
            const { type, value, color } = fills[i];
            let eles = getSvg(svgDom, type, value);
            if (eles.length === 0) {
              styleDom.innerHTML += `.pac-${fills[i].class}{${type}:${color}}`;
              svgDom.classList.add(`pac-${fills[i].class}`);
            } else {
              eles.forEach((vo: any) => {
                if (vo.type === 'attr') {
                  (vo.el as any).setAttribute(type, color);
                } else {
                  ((vo.el as any).style as any)[type] = color;
                }
              });
            }
          }
          svgDom.appendChild(styleDom);
          svgHTML.value = dom.querySelector('svg')?.outerHTML ?? '';
          const shadowRoot = container.value?.shadowRoot ?? container.value?.attachShadow({ mode: 'open' });
          if (shadowRoot) {
            shadowRoot.innerHTML = svgHTML.value;
          }
        });
    } else {
      fetch(props.data.src as string)
        .then((response) => response.text())
        .then((body: string) => {
          const shadowRoot = container.value?.shadowRoot ?? container.value?.attachShadow({ mode: 'open' });
          if (shadowRoot) {
            shadowRoot.innerHTML = body;
          }
        });
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
onMounted(() => {
  const shadowRoot = container.value.shadowRoot ?? container.value.attachShadow({ mode: 'open' });
  shadowRoot.innerHTML = svgHTML.value;
});
</script>
<template>
  <div
    class="svg-box"
    :style="{
      opacity: data.style.opacity === undefined ? 1 : data.style.opacity / 100,
      transform: data.style.transform,
    }"
    ref="container"
  ></div>
</template>
<style lang="less" scoped>
.svg-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

}
</style>
