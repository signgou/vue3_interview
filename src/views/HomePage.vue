<template>
  <div class="container">
    <van-row justify="center">
      <h1 class="title main">公试</h1>
    </van-row>
    <van-row justify="center">
      <h2 class="title sub">为你备考公务员考试</h2>
    </van-row>
    <van-row justify="center">
      <h2 class="title detail">xxxx</h2>
    </van-row>
    <van-row justify="center" gutter="30">
      <van-col>
        <van-button size="small" class="start-btn title">开始使用</van-button>
      </van-col>
      <van-col>
        <van-button size="small" class="detail-btn title">了解详情</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script setup lang="ts">


</script>

<style lang="scss" scoped>
.container {
  .main {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  .sub {
    color: #be3528;
    font-size: 1.5rem;
  }

  .detail {
    color: #be3528;
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }
}
</style>
