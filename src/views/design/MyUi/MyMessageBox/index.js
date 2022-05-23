import myMessageComponents from "./MyMessageBox.vue";

import { createApp, watch } from "vue";

const MessageBox = (option) => {
  const messageBoxApp = createApp(myMessageComponents, option);
  return new Promise((resolve, reject) => {
    showMessage(messageBoxApp, { resolve, reject });
  });
};

const showMessage = (app, { resolve, reject }) => {
  const oFragment = document.createDocumentFragment();
  const vm = app.mount(oFragment);
  document.body.appendChild(oFragment);
  console.log(vm);
  vm.setVisable(true);

  watch(vm.state, (newVal, oldVal) => {
    if (!newVal.visiable) {
      switch (newVal.type) {
        case "cancel":
          console.log("reject");
          reject();
          break;
        case "confirm":
          console.log("resolve");

          resolve(newVal);
          break;
        default:
          break;
      }
    }
    hideMessageBox(app);
  });
};
const hideMessageBox = (app) => {
  app.unmount();
};
export default MessageBox;
