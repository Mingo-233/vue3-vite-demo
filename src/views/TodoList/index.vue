<template>
  <div class="todo-list">
    <h1 :style="{ color: todoListInfo.color, fontSize: todoListInfo.fontSize }">
      todo Name: {{ todoName }}
    </h1>
    <Field
      v-model="inputValue"
      label="文本"
      placeholder="请输入"
      style="width: 300px"
      @keyup.enter="handleEnter"
    />
    <CheckboxGroup v-model="checkedArray">
      <Checkbox
        :name="todo.id"
        v-for="todo in list"
        :key="todo.id"
        @change="checkBoxChange(todo.id)"
        >{{ todo.thing }}
        <Button type="danger" @click="remove(todo.id)" size="mini">删除</Button>
      </Checkbox>
    </CheckboxGroup>

    <button @click="changeName">change name</button>
    <button @click="changeStyle">change style</button>

    <hr />
    <todoSon />
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  computed,
  reactive,
  toRaw,
  isRef,
  isReactive,
} from "vue";
import { useTodoStore } from "@/store/todo";
import { Checkbox, CheckboxGroup, Field, Button } from "vant";
import { storeToRefs } from "pinia";
import todoSon from "./components/todoSon.vue";
import { isProxy } from "util/types";
const todoStore = useTodoStore();
let { list, todoName, todoListInfo } = storeToRefs(todoStore);

const f3 = computed(() => {
  let f = todoStore.list.filter((item) => item.done);
  return f.map((item) => item.id);
});
console.log("row");
let f = todoStore.list.filter((item) => item.done);
let f2 = f.map((item) => item.id);

let checkedArray = ref(f2);
console.log(checkedArray);

const checkBoxChange = (id: number) => {
  console.log(id);

  todoStore.changeStatus(id);
  console.log(checkedArray);
};
const inputValue = ref("");

const handleEnter = () => {
  if (inputValue.value.trim() === "") return;
  todoStore.addList(inputValue.value);
  inputValue.value = "";
};
const remove = (id: number) => {
  todoStore.removeList(id);
  console.log("remove");

  console.log(checkedArray.value);
};

const changeName = () => {
  // console.log(list);
  todoName.value = "???";
};
const changeStyle = () => {
  // todoListInfo.value.color = "green";
  todoStore.todoListInfo = {
    color: "blue",
    fontSize: "30px",
  };
};

onMounted(() => {
  console.log(checkedArray.value);
});
</script>

<style lang="less" scoped>
.todo-list {
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
