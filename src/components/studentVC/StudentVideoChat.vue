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
        <van-button :loading="load" v-show="!isReady" class="link-btn title" @click="wait">等待专家连线</van-button>
        <van-button v-show="isReady" class="link-btn title" @click="link">已匹配，开始面试</van-button>
      </van-row>
      <van-row justify='center'>
        <van-button class="stop-btn title" @click="change">{{ toStop }}</van-button>
      </van-row>
    </van-col>
  </van-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { io, Socket } from 'socket.io-client';


const username = ref("lisi");
const localVideo = ref();
const remoteVideo = ref();

//是否准备好面试
const isReady = ref(false);
const load = ref(false);
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


const initRTC = function () {
  if (!firstTime) {
    socket.disconnect();
  }
  //socket
  socket = io('https://192.168.29.254:3000', {
    query: { username: username.value, role: 'student' }
  });
  firstTime = false;

  //添加轨道的事件
  pc.ontrack = ({ streams }) => {
    if (remoteVideo.value.srcObject) {
      return;
    }
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
  socket.on('ready', () => {
    isReady.value = true;
    load.value = false;
  })
}

const wait = function () {
  load.value = true;
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
    localVideo.value.srcObject = null;
    toStop.value = '开始'
  }
  else {
    link();
    toStop.value = '暂停'
  }
}
</script>

<style lang="scss" scoped>
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
