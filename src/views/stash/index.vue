<template>
  <div>
    <button @click="handle">按钮</button>
    <video id="player" controls></video>
    <input type="file" id="uploader" />
  </div>
</template>

<script setup lang="ts">
import localforage from "localforage";
import { onMounted, reactive } from "vue";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({
  corePath: "http://localhost:6800/ffmpeg-core.js",
  // corePath: "https://unpkg.com/@ffmpeg/core@0.11.6/dist/ffmpeg-core.js",
  log: true,
});
console.log(ffmpeg);

async function transcode(e: any) {
  let files = e.target.files;
  const { name } = files[0];
  await ffmpeg.load();
  ffmpeg.FS("writeFile", name, await fetchFile(files[0]));
  await ffmpeg.run("-i", name, "output.mp4");
  const data = ffmpeg.FS("readFile", "output.mp4");
  console.log(data);

  const video: any = document.getElementById("player");
  video.src = URL.createObjectURL(
    new Blob([data.buffer], { type: "video/mp4" })
  );
}

localforage.setItem("test", "stash data");
function handle() {
  console.log("handle");
  // let data = await localforage.getItem("test");
  // console.log(data);
}
onMounted(() => {
  var sab = new SharedArrayBuffer(1024);
  console.log(sab);

  let uploader = document.getElementById("uploader");

  (uploader as HTMLElement).addEventListener("change", transcode);
});
</script>

<style lang="less" scoped></style>
