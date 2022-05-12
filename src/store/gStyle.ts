import { defineStore } from "pinia";

export const useGstyleStore = defineStore({
  id: "gStyle",
  state: () => ({
    globalStyle: {
      color: "red",
      fontSize: "20px",
    },
  }),
  getters: {},
  actions: {
    change(value: string) {},
  },
});
