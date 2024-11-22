<template>
  <van-row justify="center">
    <video class="remoteVideo" ref="remoteVideo"></video>
  </van-row>

  <van-row justify="center" gutter='50'>
    <van-col>
      <video class="localVideo" ref="localVideo"></video>
    </van-col>
    <van-col>
      <van-row justify='center'>
        <van-button v-show="!isReady" class="link-btn title" @click="link">开始连线</van-button>
      </van-row>
      <van-row justify='center'>
        <van-button v-show="isReady" class="stop-btn title" @click="change">{{ toStop }}</van-button>
      </van-row>
      <van-row justify='center'>
        <van-button class="end-btn title" @click="end">结束面试</van-button>
      </van-row>
    </van-col>
  </van-row>

  <van-popup v-model:show="showRate" round>
    <div class="rate">
      <van-row justify="center">
        <h1 class="total title">面试评价</h1>
      </van-row>
      <van-row>
        <h1 class="main title">评分:</h1>
      </van-row>
      <van-row justify="center">
        <van-rate color="#ffd21e" v-model="rate.score" allow-half />
      </van-row>
      <van-row justify="center">
        <van-field class="comment title" v-model="rate.comment" label="评语:" placeholder="对这次面试的评语" label-align="top" />
      </van-row>
      <van-row justify="center">
        <van-button class="comfirm-btn title" @click="finishRate">确认评价</van-button>
      </van-row>
    </div>
  </van-popup>

</template>

<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, reactive, ref } from 'vue'

import useExpertStore from '@/store/modules/expert';
import { useRouter } from 'vue-router';

const localVideo = ref();
const remoteVideo = ref();

const expert = useExpertStore();
const socket = computed(() => expert.socket)

//rtc
const config = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302",
        "stun:stun.l.google.com",
        "stun:stun1.l.google.com"]
    },
  ],
};
const pc = new RTCPeerConnection(config);
const constraints = {
  audio: true,
  video: true,
};
let makingOffer = false;
const polite = true;
const initRTC = function () {
  //添加轨道的事件
  pc.ontrack = ({ streams }) => {
    remoteVideo.value.srcObject = streams[0];
    remoteVideo.value.play();
  };

  //完美协商
  pc.onnegotiationneeded = async () => {
    try {
      makingOffer = true;
      await pc.setLocalDescription();
      socket.value.emit("message", { description: pc.localDescription });
    } catch (err) {
      console.error(err);
    } finally {
      makingOffer = false;
    }
  };
  pc.onicecandidate = ({ candidate }) => socket.value.emit("message", { candidate });
  //出现ice错误是重新获取ice
  pc.oniceconnectionstatechange = () => {
    if (pc.iceConnectionState === "failed") {
      pc.restartIce();
    }
  };
  interface Data {
    description: RTCSessionDescription,
    candidate: RTCIceCandidate
  }
  let ignoreOffer = false;
  //发信息
  const onmessage = async ({ description, candidate }: Data) => {
    try {
      if (description) {
        const offerCollision =
          description.type === "offer" &&
          (makingOffer || pc.signalingState !== "stable");

        ignoreOffer = !polite && offerCollision;
        if (ignoreOffer) {
          return;
        }

        await pc.setRemoteDescription(description);
        if (description.type === "offer") {
          await pc.setLocalDescription();
          socket.value.emit("message", { description: pc.localDescription });
        }
      } else if (candidate) {
        try {
          await pc.addIceCandidate(candidate);
        } catch (err) {
          if (!ignoreOffer) {
            throw err;
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  socket.value.on("message", onmessage);
}

const isReady = ref(false);
async function link() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    for (const track of stream.getTracks()) {
      pc.addTrack(track, stream);
    }
    localVideo.value.srcObject = stream;
    localVideo.value.play();
    isReady.value = true;
  } catch (err) {
    console.error(err);
  }
}


onBeforeMount(() => {
  initRTC();
})
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

const toStop = ref('暂停');
const change = function () {
  if (toStop.value == '暂停') {
    const stream = localVideo.value.srcObject;
    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
    }
    toStop.value = '开始';
    localVideo.value.srcObject = null;
  }
  else {
    link();
    toStop.value = '暂停'
  }
}

const showRate = ref(false);
const end = function () {
  console.log("结束面试");
  socket.value.emit('end');
  showRate.value = true;
}
const rate = reactive({
  score: 2.5,
  comment: '好'
})
const router = useRouter();
const finishRate = function () {
  socket.value.emit('rate', rate);
  showRate.value = false;
  change();
  router.push('/expertHome');
}

onBeforeUnmount(() => {
  if (localVideo.value.srcObject) change();
})
</script>

<style lang="scss" scoped>
.rate {
  padding: 1rem;
  align-content: center;

  .total.title {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }

  .main.title {
    font-size: 0.9rem;
    padding-left: 16px;
  }

  .comment.title {
    font-size: 0.9rem;
  }

  .comfirm-btn {
    border-style: none;
  }
}

.container {
  .remoteVideo {
    width: 18rem;
    height: 9rem;
    margin-bottom: 0.5rem;
    border: 0.1rem solid #eceff4;
    border-radius: 0.5rem;
  }

  .localVideo {
    width: 5rem;
    height: 6rem;
    border: 0.1rem solid #eceff4;
    border-radius: 0.5rem;
  }

  .link-btn,
  .stop-btn,
  .end-btn {
    height: 2.5rem;
    margin-bottom: 0.8rem;
  }

}
</style>
