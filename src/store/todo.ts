import { defineStore } from "pinia";

interface List {
  id: number;
  done: boolean;
  thing: string;
}
export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    list: [
      { id: 1, done: false, thing: "learn pinia" },
      { id: 2, done: true, thing: "play lol" },
    ],
  }),
  getters: {},
  actions: {
    addList(value: string) {
      this.list.unshift({
        id: this.list.length + 1,
        done: false,
        thing: value,
      });
      console.log(this.list);
    },
    changeStatus(id: number) {
      const index = this.list.findIndex((item) => item.id === id);
      this.list[index].done = !this.list[index].done;
      console.log(this.list);
    },
    removeList(id: number) {
      const index = this.list.findIndex((item) => item.id === id);
      console.log(index);

      this.list.splice(index, 1);
      console.log(this.list);
    },
  },
});
