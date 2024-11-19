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
        <van-button class="link-btn title" @click="link">开始连线</van-button>
      </van-row>
      <van-row justify='center'>
        <van-button class="stop-btn title" @click="change">{{ toStop }}</van-button>
      </van-row>
      <van-row justify='center'>
        <van-button class="end-btn title" @click="end">结束面试</van-button>
      </van-row>
    </van-col>
  </van-row>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'

import useExpertStore from '@/store/modules/expert';

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
    console.log('处理信息')
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
    localVideo.value.srcObject = null;
    toStop.value = '开始'
  }
  else {
    link();
    toStop.value = '暂停'
  }
}

const end = function () {

}
</script>

<style lang="scss" scoped>
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
    height: 1.5rem;
    margin-bottom: 0.8rem;
  }

}
</style>
