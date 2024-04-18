<template>
  <div>
    <h1>language</h1>
    <button @click="handle">切换</button>
    <p>{{ $t("buffer") }}</p>
    <p>{{ $t("apple") }}</p>

    <p>{{ $t("ban") }}</p>
    <p>{{ $t("children.name") }}</p>
    <p>{{ $t("mockup") }}</p>
    <hr />

    <h3>子模块</h3>
    <p>{{ $t("other") }}</p>
    <hr />

    <h3>$rt使用</h3>
    <div v-for="keyName in $tm('children')">
      {{ $rt(keyName) }}
    </div>
    <div v-for="item in $tm('cupList')">
      <!-- 官方文档建议 在用$tm循环里面的 要用$rt去接，但是不知道有什么区别，$t也是能用的。 -->
      {{ $t(item) }}
    </div>
    <hr />

    <h3>具名格式</h3>
    <p>{{ $t("sayX", { msg: "123" }) }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { setLocale } from "../../utils/i18n";
import { useI18n } from "vue-i18n";
const { t, rt } = useI18n();
let arr = ["other", "buffer"];
const composer = useI18n();
const state = reactive({});
function handle() {
  setLocale("en");
}
onMounted(() => {
  console.log(composer, "composer");
  console.log(t("buffer"));
  console.log(composer.t("other"));
});
</script>

<style lang="less" scoped></style>
