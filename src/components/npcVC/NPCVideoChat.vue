<template>
  <van-row justify="center">
    <video class="npcVideo" ref="npcVideo"></video>
  </van-row>
  <van-row justify="center" gutter='50'>
    <van-col>
      <video class="localVideo" ref="localVideo"></video>
    </van-col>
    <van-col>
      <van-row justify='center'>
        <van-button class="start-btn title" @click="start">开始面试</van-button>
      </van-row>
      <van-row justify='center'>
        <van-button class="stop-btn title" @click="stop">暂停</van-button>
      </van-row>
    </van-col>
  </van-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const localVideo = ref();
const npcVideo = ref();

const constraints = {
  audio: true,
  video: true,
};
async function start() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideo.value.srcObject = stream;
    localVideo.value.play();
  } catch (err) {
    console.error(err);
  }
}
//用于录制视频
// const constraints = { audio: true, video: true };
// const video = ref();
//媒体
// let mediaRecorder: MediaRecorder;
// const recordedChunks: BlobPart[] = [];

// const a = ref();
// const start = function () {
//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then(function (mediaStream) {
//       mediaRecorder = new MediaRecorder(mediaStream, { mimeType: "video/webm; codecs=vp9" })
//       mediaRecorder.ondataavailable = handleDataAvailable;
//       video.value.srcObject = mediaStream;
//       video.value.onloadedmetadata = function () {
//         video.value.play();
//       };
//     })
//     .catch(function (err) {
//       console.log(err.name + ": " + err.message);
//     }); // 总是在最后检查错误
// }
// const stop = function () {
//   video.value.srcObject = null;
// }
// function handleDataAvailable(event: BlobEvent) {
//   console.log("data-available");
//   if (event.data.size > 0) {
//     recordedChunks.push(event.data);
//     console.log(recordedChunks);
//     download();
//   } else {
//     // ...
//   }
// }
// const download = function () {
//   const blob = new Blob(recordedChunks, {
//     type: "video/webm",
//   });
//   const url = URL.createObjectURL(blob);
//   console.log(url);
//   a.value.href = url;
//   a.value.download = "test.webm";
//   a.value.click();
//   URL.revokeObjectURL(url);
// }

// const startRecord = function () {
//   console.log("开始录制")
//   mediaRecorder.start();
// }
// const stopRecord = function () {
//   console.log("结束录制")
//   mediaRecorder.stop();
// }

// const startVideo = function () {

// }

const stop = function () {
  const stream = localVideo.value.srcObject;
  for (const track of stream.getTracks()) {
    track.stop();
  }
  localVideo.value.srcObject = null;
}
</script>

<style lang="scss" scoped>
.container {
  .npcVideo {
    width: 18rem;
    height: 9rem;
    margin-bottom: 3rem;
    border: 0.1rem solid #eceff4;
    border-radius: 0.5rem;
  }

  .localVideo {
    width: 5rem;
    height: 6rem;
    border: 0.1rem solid #eceff4;
    border-radius: 0.5rem;
  }

  .start-btn {
    margin-bottom: 0.5rem;
  }
}
</style>
