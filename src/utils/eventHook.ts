export function useLogClick() {
  function log(msg: string = "nihao", type = "info") {
    console.log("111");
    console.log(arguments);

    console[type as "info"](
      `%c${msg}`,
      "color: #fff; background: #1890ff; padding: 2px 4px; border-radius: 2px;"
    );
  }
  function close() {
    console.log("执行了close");
  }
  function change() {
    console.log("执行了 change");
  }
  return {
    bindProps: {
      closable: true,
    },
    bindEvent: {
      click: log,
      close: close,
      change: change,
    },
  };
}
