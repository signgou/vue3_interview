<template>
  <!-- 顶部导航栏 -->
  <van-nav-bar @click-left="back">
    <template #left>
      <van-icon name="arrow-left" color="#323233"></van-icon>
    </template>
    <template #title>
      <h1 class="top title">公试</h1>
    </template>
  </van-nav-bar>

  <!-- 广告 -->
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="black">
    <van-swipe-item>
      <h1 class="title">1</h1>
    </van-swipe-item>
    <van-swipe-item>
      <h1 class="title">2</h1>
    </van-swipe-item>
    <van-swipe-item>
      <h1 class="title">3</h1>
    </van-swipe-item>
    <van-swipe-item>
      <h1 class="title">4</h1>
    </van-swipe-item>
  </van-swipe>

  <!-- 选择连线 -->
  <div class="link-box">
    <van-grid :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" icon="contact-o" text="学生" />
    </van-grid>

    <!-- 加一个空白区域防止底部标签栏挡住选项 -->
    <div style="height: 50px;"></div>
  </div>

  <!-- 底部标签栏 -->
  <van-tabbar v-model="active" class="title" active-color="#000000" inactive-color="#969799">
    <van-tabbar-item name="link" icon="exchange">连线</van-tabbar-item>
    <van-tabbar-item name="profile" icon="user-o">我</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('link');
const back = function () {

}
</script>

<style lang="scss" scoped>
.link-box {
  margin-top: 5rem;
  height: auto;
}

.top.title {
  font-size: 1.1rem;
}

.my-swipe {
  border: 0.1rem solid #eceff4;
  border-radius: 1rem;
  margin-top: 1rem;

  .van-swipe-item {
    height: 8rem;
    align-content: center;
    text-align: center;

    .title {
      font-size: 1.2rem;
    }
  }
}
</style>
