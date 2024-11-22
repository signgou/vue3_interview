<template>
  <van-row justify="center">
    <van-icon name="volume-o" class="npc" size="4rem" />
  </van-row>
  <van-row justify="center" gutter='50'>
    <van-col>
      <video class="localVideo" ref="localVideo"></video>
    </van-col>
    <van-col>
      <van-row justify='center'>
        <van-button v-show="canStart" class="start-btn title" @click="start">开始面试</van-button>
      </van-row>
      <van-row justify='center'>
        <van-button v-show="!canStart && !theEnd" class="next-btn title" @click="next">下一题</van-button>
      </van-row>
      <van-row justify='center'>
        <van-button v-show="!canStart" class="stop-btn title" @click="stop">关闭摄像头</van-button>
      </van-row>
    </van-col>
  </van-row>

</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { speak } from '@/utils/speech';
import type { Question } from '@/apis/questions/type';

const localVideo = ref();
const { questions, isEnd } = defineProps<{
  questions: Question[],
  isEnd: (state: boolean) => void
}>()

const constraints = {
  audio: true,
  video: true,
};
const canStart = ref(true);
async function start() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideo.value.srcObject = stream;
    localVideo.value.play();
    index = 0;
    canStart.value = false;
    theEnd.value = false;
    isEnd(false);
    speak('人机面试开始，在听完并回答完问题后，即可点击下一题继续面试')
    next();
  } catch (err) {
    console.error(err);
  }
}

let index = 0;
const theEnd = ref(false);
const next = function () {
  if (index < questions.length) {
    speak(`问题${index + 1}:` + questions[index++].questionText);
  }
  else {
    speak("面试结束，请自行查看答案");
    theEnd.value = true;
    isEnd(true);
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

const stop = function () {
  const stream = localVideo.value.srcObject;
  for (const track of stream.getTracks()) {
    track.stop();
  }
  localVideo.value.srcObject = null;
  canStart.value = true;
}

//离开页面时若未关闭摄像头就将其关闭
onBeforeUnmount(() => {
  if (localVideo.value.srcObject) stop();
})

</script>

<style lang="scss" scoped>
.container {
  .npc {
    padding: 3rem 6rem;
    margin-bottom: 1rem;
    border: 0.1rem solid #eceff4;
    border-radius: 0.5rem;
  }

  .localVideo {
    width: 5rem;
    height: 6rem;
    border: 0.1rem solid #eceff4;
    border-radius: 0.5rem;
  }

  .stop-btn,
  .next-btn,
  .start-btn {
    height: 2rem;
    margin-bottom: 1rem;
  }
}
</style>
