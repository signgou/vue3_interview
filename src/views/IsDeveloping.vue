<template>
  <div class="container">
    <van-row justify="center">
      <van-col>
        <h1 class="main title">开发中</h1>
      </van-col>
    </van-row>
    <van-row justify="center">
      <van-col>
        <h2 class="sub title ">敬请期待</h2>
      </van-col>
    </van-row>
    <van-row justify="center">
      <van-button class="back-btn title" @click="back">返回</van-button>
    </van-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const back = function () {
  router.go(-1);
}
</script>

<style lang="scss" scoped>
.container {
  .main {
    font-size: 3rem;
  }

  .sub {
    font-size: 1rem;
    margin-top: 1rem;
  }

  .back-btn {
    margin-top: 2rem;
    height: 2rem;
    width: 4rem;
  }
}
</style>
