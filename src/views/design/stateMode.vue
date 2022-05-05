<template>
  <div></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const msg = ref(null);
const handle = () => {
  console.log("handle");
};
onMounted(() => {});
</script>

<script>
var FSM = {
  off: {
    buttonWasPressed: function () {
      console.log("关灯");
      this.currentState = FSM.on;
    },
  },
  on: {
    buttonWasPressed: function () {
      console.log("开灯");
      this.currentState = FSM.off;
    },
  },
};

var Light = function () {
  this.currentState = FSM.off; // 设置初始状态
  this.button = null;
};

Light.prototype.init = function () {
  var self = this;

  var button = document.createElement("button");
  this.button = document.body.appendChild(button);
  this.button.innerHTML = "开关";

  this.button.onclick = function () {
    console.log(self);
    // self.currentState.buttonWasPressed.call(self); // 把请求委托给状态机FSM
    self.currentState.buttonWasPressed(); // 把请求委托给状态机FSM
  };
};

const light = new Light();
light.init();
</script>

<style lang="less" scoped></style>
