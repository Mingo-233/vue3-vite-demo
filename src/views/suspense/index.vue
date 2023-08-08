<template>
  <div>
    suspence
    <Suspense
      @pending="pending"
      @fallback="fallback"
      @resolve="resolve"
      :timeout="3000"
    >
      <!-- <template #default>
        <div>sleep</div>
      </template> -->
      <AsyncComp></AsyncComp>

      <template #fallback>
        <div>loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, defineAsyncComponent } from "vue";
import ErrorComponent from "./error.vue";
import loadingComponent from "./loading.vue";
const AsyncComp = defineAsyncComponent(() => import("./async.vue"));
// const AsyncComp = defineAsyncComponent({
//   // 加载函数
//   loader: () => import("./async.vue"),

//   // 加载异步组件时使用的组件
//   loadingComponent: loadingComponent,
//   // 展示加载组件前的延迟时间，默认为 200ms
//   delay: 2000,
//   // 加载失败后展示的组件
//   errorComponent: ErrorComponent,
//   // 如果提供了一个 timeout 时间限制，并超时了
//   // 也会显示这里配置的报错组件，默认值是：Infinity
//   timeout: 3000,
// });
const state = reactive({});
function pending() {
  console.log(arguments);
  console.log("pending");
}
function resolve() {
  console.log(arguments);
  console.log("resolve");
}
function fallback() {
  console.log(arguments);
  console.log("fallback");
}
onMounted(() => {});
</script>

<style lang="less" scoped></style>
