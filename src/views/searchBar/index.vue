<template>
  <div class="search-show">
    <button @click="handle">show</button>
    <button @click="handle2">hide</button>
    <div v-for="n in 5">
      ok，到这里我们已经可以看到基本效果了，我们来测试一下。让我们在 App.vue
      组件内随便写一个按钮，然后调用 SearchBarCreator 实例身上的 present
      方法。(maker 感觉不是那么合理，之后我们将 SearchBarMaker 变更为
      SeachBarCreator
      的叫法，仅仅是名字变了而已，逻辑什么的根本没变哦。🍦)ok，到这里我们已经可以看到基本效果了，我们来测试一下。让我们在
      App.vue 组件内随便写一个按钮，然后调用 SearchBarCreator 实例身上的 present
      方法。(maker 感觉不是那么合理，之后我们将 SearchBarMaker 变更为
      SeachBarCreator 的叫法，仅仅是名字变了而已，逻辑什么的根本没变哦。🍦)
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import searchBar from "./searchBarC";

function handle() {
  searchBar.show();
}
function handle2() {
  searchBar.hide();
}
onMounted(() => {
  // keydown 事件支持多个按键同时按下
  window.addEventListener("keydown", (e) => {
    if (e.metaKey && e.key === "k") {
      searchBar.show();
    }
    if (e.key === "Escape") {
      searchBar.hide();
    }
  });
});
</script>

<style lang="less" scoped>
.search-show {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
</style>

<style lang="less"></style>
