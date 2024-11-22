<template>
  <van-row justify="center">
    <video class="remoteVideo" ref="remoteVideo"></video>
  </van-row>
  <van-row justify="center" gutter='50'>
    <van-col>
      <video class="localVideo" ref="localVideo"></video>
    </van-col>
    <van-col>
      <van-button :loading="load" v-show="!isReady" class="link-btn title" @click="wait">等待专家连线</van-button>
      <van-button v-show="isReady && !underway" class="link-btn title" @click="link">已匹配，开始面试</van-button>
      <van-button v-show="underway" class="stop-btn title" @click="change">{{ toStop }}</van-button>
    </van-col>
  </van-row>

  <!-- 评分弹窗 -->
  <van-popup @click-overlay="finish" v-model:show="showRate" round>
    <div class="rate">
      <van-row justify="center">
        <h1 class="total title">面试评价</h1>
      </van-row>
      <van-row>
        <h1 class="main title">评分:</h1>
      </van-row>
      <van-row justify="center">
        <van-rate readonly color="#ffd21e" v-model="rate.score" allow-half />
      </van-row>
      <van-row justify="center">
        <van-field readonly class="comment title" v-model="rate.comment" label="评语:" placeholder="对这次面试的评语"
          label-align="top" />
      </van-row>
      <van-row justify="center">
        <van-button class="comfirm-btn title" @click="finish">结束这次面试</van-button>
      </van-row>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { io, Socket } from 'socket.io-client';
import useStudentStore from '@/store/modules/student';
import { closeToast, showFailToast, showLoadingToast } from 'vant';
import { useRouter } from 'vue-router';


const student = useStudentStore();
const localVideo = ref();
const remoteVideo = ref();
const { setID } = defineProps(['setID']);
//是否准备好面试
const isReady = ref(false);
const load = ref(false);
//面试中
const underway = ref(false);

//记录是否为第一次
let firstTime = true;
let socket: Socket;

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
const polite = false;

interface Rate {
  score: number
  comment: string
}
let rate: Rate;
const showRate = ref(false);
const router = useRouter();
const finish = function () {
  showRate.value = false;
  if (localVideo.value.srcObject) change();
  router.push('/studentHome');
}

const initSocket = function () {
  if (!firstTime) {
    socket.disconnect();
  }
  if (!setID) {
    showFailToast('setID出错了，请重新点击');
    return;
  }
  //socket
  socket = io(import.meta.env.VITE_APP_SOCKET_URL, {
    query: { username: student.data.username, role: 'student', setID }
  });
  socket.on('isEnd', () => {
    showLoadingToast({
      duration: 0,
      forbidClick: true,
      message: '等待评价中',
    });
  })
  socket.on('theRate', (theRate: Rate) => {
    closeToast();
    rate = theRate;
    showRate.value = true;
  })
  socket.on('ready', () => {
    isReady.value = true;
    load.value = false;
  })
  firstTime = false;
}

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
      socket.emit("message", { description: pc.localDescription });
    } catch (err) {
      console.error(err);
    } finally {
      makingOffer = false;
    }
  };
  pc.onicecandidate = ({ candidate }) => socket.emit("message", { candidate });

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
          socket.emit("message", { description: pc.localDescription });
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
  socket.on("message", onmessage);
}

const wait = function () {
  load.value = true;
  initSocket();
  initRTC();
}

async function link() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    for (const track of stream.getTracks()) {
      pc.addTrack(track, stream);
    }
    localVideo.value.srcObject = stream;
    localVideo.value.play();
    underway.value = true;
  } catch (err) {
    console.error(err);
  }
}

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
    toStop.value = '开始'
    localVideo.value.srcObject = null;
  }
  else {
    link();
    toStop.value = '暂停'
  }
}

//卸载前断连socket,localVideo
onBeforeUnmount(() => {
  if (socket) socket.disconnect();
  if (localVideo.value.srcObject) change();
  closeToast();
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
    color: #696c6e
  }

  .comfirm-btn {
    border-style: none;
  }
}


.container {
  .remoteVideo {
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

  .link-btn {
    margin-bottom: 0.5rem;
  }
}
</style>
