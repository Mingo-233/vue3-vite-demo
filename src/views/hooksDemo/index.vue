<script setup name="DDemo" lang="ts">
import { useFetchSelect } from "@/utils/selectHook";
import { useAutoRequest } from "@/utils/loadingHook";
import { useLogClick } from "@/utils/eventHook";
import triggerEvent from "./triggerEvent.vue";
//   模拟调用接口
function getRemoteData() {
  return new Promise<any[]>((resolve, reject) => {
    setTimeout(() => {
      // 模拟接口调用有概率出错
      if (Math.random() > 0.5) {
        resolve([
          {
            key: 1,
            name: "苹果",
            value: 1,
          },
          {
            key: 2,
            name: "香蕉",
            value: 2,
          },
          {
            key: 3,
            name: "橘子",
            value: 3,
          },
        ]);
      } else {
        reject(new Error("不小心出错了！"));
      }
    }, 1000);
  });
}

// 将之前用的 options,loading，和调用接口的逻辑都抽离到hook中
const selectBind = useFetchSelect({
  apiFun: getRemoteData,
});

const [loading, onSubmit] = useAutoRequest(getRemoteData);

const { bindEvent, bindProps } = useLogClick();

function reciver() {
  console.log(arguments);

  console.log("reciver");
}
const bindEvent2 = {
  triggerA: reciver(),
};
</script>

<template>
  <div class="hooks-demo">
    <!-- 将hook返回的接口，通过 v-bind 绑定给组件 -->
    <a-select v-bind="selectBind" />

    <div class="col">
      loading: {{ loading }}
      <a-button :loading="loading" @click="onSubmit">提交</a-button>
    </div>
    <div class="col">
      log:
      <a-tag v-on="bindEvent" v-bind="bindProps">log打印</a-tag>
    </div>

    <!-- <triggerEvent @trigger-a="reciver"></triggerEvent> -->
    <triggerEvent v-on="bindEvent2"></triggerEvent>
  </div>
</template>

<style lang="less">
.hooks-demo {
  margin: 10px auto auto;
  text-align: center;
}
</style>
