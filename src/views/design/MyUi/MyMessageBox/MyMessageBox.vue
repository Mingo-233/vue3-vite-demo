<template>
  <div>
    <transition name="my-ui-message-box-fade">
      <div v-show="visiable" class="box">
        <h1>消息盒子</h1>
        <div>提示：{{ title }}</div>
        <div>内容： {{ context }}</div>
        <button @click="confirmBtnClick">确认</button>
        <button @click="cancelBtnClick">取消</button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "提示",
  },
  context: {
    type: String,
    default: "内容",
  },
});
const state = reactive({
  visiable: false,
  type: "",
});
let { visiable, type } = toRefs(state);

const setVisable = (visiable: boolean) => {
  state.visiable = visiable;
};

const confirmBtnClick = () => {
  state.type = "confirm";
  setVisable(false);
};

const cancelBtnClick = () => {
  state.type = "cancel";
  setVisable(false);
};
defineExpose({
  setVisable,
  state,
});
onMounted(() => {});
</script>

<style lang="less">
.box {
  border: 1px solid salmon;
}
.my-ui-message-box-fade-enter-from,
.my-ui-message-box-fade-leave-to {
  opacity: 0;
}

.my-ui-message-box-fade-enter-active {
  //   opacity: 1;
  transition: opacity 0.3s ease-in;
}
.my-ui-message-box-fade-leave-active {
  //   opacity: 1;
  transition: opacity 0.3s ease-out;
}
</style>
