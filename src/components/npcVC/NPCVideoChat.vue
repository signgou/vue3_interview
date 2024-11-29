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

  <!-- 用于录制视频 -->
  <a ref="a" style="display: none;"></a>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, useTemplateRef } from 'vue'
import { useSpeech } from '@/utils/speech';
import type { Question } from '@/apis/questions/type';
import { showConfirmDialog } from 'vant';
const { speak, speechStop } = useSpeech();
const localVideo = ref();
const { questions, isEnd } = defineProps<{
  questions: Question[],
  isEnd: (state: boolean) => void
}>()

//用于录制视频
const a = useTemplateRef('a');
let mediaRecorder: MediaRecorder;
const recordedChunks: BlobPart[] = [];
const mimeType = "video/webm; codecs=vp9,opus"
// const mimeType = "video/mp4"

function handleDataAvailable(event: BlobEvent) {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  } else {
    console.log("无数据");
  }
}
const download = function () {
  const blob = new Blob(recordedChunks, {
    type: 'video/mp4',
  });
  const url = URL.createObjectURL(blob);
  if (a.value) {
    a.value.href = url;
    a.value.download = "面试视频";
    a.value.click();
    URL.revokeObjectURL(url);
  }
  else {
    console.error('a元素初始化失败');
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

const constraints = {
  audio: true,
  video: true,
};
const canStart = ref(true);
async function start() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    localVideo.value.srcObject = stream;

    mediaRecorder = new MediaRecorder(stream, {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      mimeType
    })
    mediaRecorder.ondataavailable = handleDataAvailable;

    localVideo.value.play();
    index = 0;
    canStart.value = false;
    theEnd.value = false;
    isEnd(false);
    //开始录制
    mediaRecorder.start();
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
    mediaRecorder.stop();
    showConfirmDialog({
      title: '保存面试录屏',
      message:
        '是否需要保存面试录屏',
    })
      .then(() => {
        download();
      })
      .catch(() => {
      })
    theEnd.value = true;
    isEnd(true);
  }
}



const stop = function () {
  const stream = localVideo.value.srcObject;
  for (const track of stream.getTracks()) {
    track.stop();
  }
  localVideo.value.srcObject = null;
  canStart.value = true;
  speechStop();
}

//离开页面时若未关闭摄像头就将其关闭
onBeforeUnmount(() => {
  if (localVideo.value.srcObject) stop();
})

</script>

<style lang="scss" scoped>
.container {
  .npc {
    padding: 3rem 7rem;
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

  .stop-btn,
  .next-btn,
  .start-btn {
    height: 2rem;
    margin-bottom: 1rem;
  }
}
</style>
