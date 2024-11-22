/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Speech from 'speak-tts'
import { showFailToast } from 'vant'

export function speak(text: string) {
  const speech = new Speech()
  if (!speech.hasBrowserSupport()) {
    // 检测浏览器是否支持，returns a boolean
    showFailToast('浏览器不支持文字转音频')
    return
  }
  speech
    .init({
      volume: 0.6, // 音量0-1
      lang: 'zh-CN', // 语言
      rate: 1, // 语速1正常语速，2倍语速就写2
      pitch: 1, // 音调
      voice: 'Microsoft Yaoyao - Chinese (Simplified, PRC)', //支持Microsoft Huihui - Chinese (Simplified, PRC),Microsoft Kangkang - Chinese (Simplified, PRC),Microsoft Yaoyao - Chinese (Simplified, PRC)
      listeners: {},
    })
    .then((/*data*/) => {
      //console.log('语音已准备好，声音可用', data)
    })
    .catch(e => {
      console.error('初始化时发生错误 : ', e)
    })

  speech
    .speak({
      text, //这里使用文字或者i18n 都可以 看自己需求
    })
    .then(() => {
      console.log('Success !')
    })
    .catch(e => {
      console.error('An error occurred :', e)
    })
}
