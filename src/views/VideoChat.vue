<template>
  <div class="container">
    <input type="text" v-model="username" placeholder="username">
    <input type="text" v-model="room" placeholder="room">
    <video ref="localVideo" controls></video>
    <video ref="remoteVideo" controls></video>
    <button class="start-btn" @click="start">开始视频通话</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { io, Socket } from 'socket.io-client';

const room = ref("room1");
const username = ref("lisi");
const localVideo = ref();
const remoteVideo = ref();
//记录上一次的socket
let mySocket: Socket;
let firstTime = true;
//rtc
const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
const pc = new RTCPeerConnection(config);
const constraints = {
  audio: true,
  video: true,
};
let makingOffer = false;
let polite = true;

const initRTC = function () {
  if (!firstTime) {
    mySocket.disconnect();
  }
  //socket
  const socket = io('https://192.168.29.254:3000', {
    query: { username: username.value, room: room.value }
  });
  mySocket = socket;
  firstTime = false;

  socket.on("connect", () => {
    socket.on("full", () => {
      alert("该房间已满");
      socket.disconnect();
    })
  })

  socket.on("polite", (p) => {
    polite = p;
  });
  //添加轨道的事件
  pc.ontrack = ({ streams }) => {
    if (remoteVideo.value.srcObject) {
      return;
    }
    remoteVideo.value.srcObject = streams[0];
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

async function start() {
  initRTC();
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    for (const track of stream.getTracks()) {
      pc.addTrack(track, stream);
    }
    localVideo.value.srcObject = stream;
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

</script>

<style lang="scss">
.container {
  width: 100%;

  video {
    display: block;
    height: 180px;
  }
}
</style>
