<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="emitHandle">emit</button>
    <img src="@/assets/logo.png" alt="" class="vueimg" />
    <Button type="primary" @click="download">下载</Button>
    <Button type="primary" @click="postmessage">通信</Button>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Button } from "vant";
export default defineComponent({
  props: {
    visiable: {
      type: Boolean,
    },
  },
  setup(props, context) {
    // console.log(props);
    // console.log(context);
    const emitHandle = () => {
      context.emit("pick");
    };
    return {
      emitHandle,
    };
  },
  methods: {
    download() {
      console.log(22);

      //       let img = new Image();
      // img.src = "xxxx"; //这里是图片的src
      // HTMLImageElement
      let img = document.querySelector(".vueimg") || new Image();
      console.log(img);

      img.crossOrigin = "anonymous"; //The opeartaion is insecure . 其它跨域的问题 自行代理解决
      img.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        let imgBase64Data = canvas.toDataURL("image/jpeg", 1); //这里就拿到了base64
        console.log(wx);
        wx.miniProgram.postMessage({
          data: {
            imgData: imgBase64Data, // 刚才拿到的base64 数据
          },
        });
      };
    },
    postmessage() {
      console.log(uni);
      uni.postMessage({
        data: {
          action: "postMessage",
          msg: "11",
        },
      });
      uni.webView.postMessage({
        data: {
          action: "postMessage",
          msg: "11",
        },
      });

      uni.navigateTo({
        url: "/pages/B/b",
      });
    },
  },
  components: {
    Button,
  },
});
</script>
