const directiveHandle = (v: any) => {
  v.directive("drag", {
    mounted: function (el: HTMLElement) {
      //监听document是因为如果监听元素el的话鼠标太快移出元素后就会失效
      let firstTime: number = 0,
        lastTime: number = 0;
      el.onmousedown = (event) => {
        document.getElementById("dragbtn")!.setAttribute("data-flag", "false");
        firstTime = new Date().getTime();
        //算出鼠标相对元素的位置
        let pointX = event.clientX - el.offsetLeft; //鼠标位置X减去元素距离左边距离（鼠标到元素左边的距离）
        let pointY = event.clientY - el.offsetTop; //鼠标位置Y减去距离顶部距离（鼠标到元素顶部的高度）

        document.onmousemove = (e) => {
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - pointX;
          let top = e.clientY - pointY;

          //移动当前元素
          el.style.left = left + "px";
          el.style.top = top + "px";
        };
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;

          // onmouseup 时的时间，并计算差值
          lastTime = new Date().getTime();
          if (lastTime - firstTime < 200) {
            document
              .getElementById("dragbtn")!
              .setAttribute("data-flag", "true");
          }
        };
      };
    },
  });
};

export { directiveHandle };
