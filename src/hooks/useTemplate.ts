import { defineComponent, shallowRef } from "vue";

// import { camelCase } from "lodash";
import type { DefineComponent, Slot } from "vue";

function camelCase(str: string) {
  return str.replace(/-([a-z])/g, (all, letter) => letter.toUpperCase());
}

// 将横线命名转大小驼峰
function keysToCamelKebabCase(obj: Record<string, any>) {
  const newObj: typeof obj = {};
  for (const key in obj) newObj[camelCase(key)] = obj[key];
  console.log("camelCase newObj", obj);
  console.log("keysToCamelKebabCase newObj", newObj);

  return newObj;
}

// export type DefineTemplateComponent<Bindings extends object> =
//   DefineComponent<object> & {
//     new (): { $slots: { default(_: Bindings): any } };
//   };

export type DefineTemplateComponent<Bindings extends object> =
  DefineComponent<object> & {
    new (): { $slots: { default(_: Bindings): any } };
  };

export type ReuseTemplateComponent<Bindings extends object> =
  DefineComponent<Bindings>;

export type ReusableTemplatePair<Bindings extends object> = [
  DefineTemplateComponent<Bindings>,
  ReuseTemplateComponent<Bindings>
];

export const useTemplate = <
  Bindings extends object
>(): ReusableTemplatePair<Bindings> => {
  const render = shallowRef<Slot | undefined>();

  const define = defineComponent({
    setup(_, { slots }) {
      return () => {
        // 将复用模板的渲染函数内容保存起来
        render.value = slots.default;
        console.log("defineComponent-slots", slots);
      };
    },
  }) as DefineTemplateComponent<Bindings>;

  const reuse = defineComponent({
    setup(_, { attrs, slots }) {
      return () => {
        // 还没定义复用模板，则抛出错误
        if (!render.value) {
          throw new Error("你还没定义复用模板呢！");
        }
        // 执行渲染函数，传入 attrs、slots
        const vnode = render.value({
          ...keysToCamelKebabCase(attrs),
          $slots: slots,
        });
        return vnode.length === 1 ? vnode[0] : vnode;
      };
    },
  }) as ReuseTemplateComponent<Bindings>;

  return [define, reuse];
};
