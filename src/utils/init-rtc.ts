import type { Socket } from 'socket.io-client'

export const initRTC = function (
  pc: RTCPeerConnection,
  remoteVideo: HTMLVideoElement,
  socket: Readonly<Socket>,
  polite: boolean,
) {
  let makingOffer = false
  let ignoreOffer = false
  //添加轨道的事件
  pc.ontrack = ({ streams }) => {
    remoteVideo.srcObject = streams[0]
    remoteVideo.play()
  }

  //完美协商
  pc.onnegotiationneeded = async () => {
    try {
      makingOffer = true
      await pc.setLocalDescription()
      socket.emit('message', { description: pc.localDescription })
    } catch (err) {
      console.error(err)
    } finally {
      makingOffer = false
    }
  }
  pc.onicecandidate = ({ candidate }) => socket.emit('message', { candidate })

  //出现ice错误是重新获取ice
  pc.oniceconnectionstatechange = () => {
    if (pc.iceConnectionState === 'failed') {
      pc.restartIce()
    }
  }
  interface Data {
    description: RTCSessionDescription
    candidate: RTCIceCandidate
  }

  const onmessage = async ({ description, candidate }: Data) => {
    try {
      if (description) {
        const offerCollision =
          description.type === 'offer' &&
          (makingOffer || pc.signalingState !== 'stable')

        ignoreOffer = !polite && offerCollision
        if (ignoreOffer) {
          return
        }

        await pc.setRemoteDescription(description)
        if (description.type === 'offer') {
          await pc.setLocalDescription()
          socket.emit('message', { description: pc.localDescription })
        }
      } else if (candidate) {
        try {
          await pc.addIceCandidate(candidate)
        } catch (err) {
          if (!ignoreOffer) {
            throw err
          }
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  socket.on('message', onmessage)
}
