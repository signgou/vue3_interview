<template>
  <van-nav-bar @click-left="back">
    <template #left>
      <van-icon name="arrow-left" color="#323233"></van-icon>
    </template>
    <template #title>
      <h1 class="top title">人机面试</h1>
    </template>
  </van-nav-bar>
  <div class="container">
    <van-row justify="center">
      <h1>题目概述</h1>
    </van-row>
    <van-row justify="center">
      <h1>面试区域</h1>
    </van-row>
  </div>
</template>

<script setup lang="ts">
const back = function () {

}
</script>

<style lang="scss" scoped>
.top.title {
  font-weight: lighter;
}

.container {
  height: 80vh;

}
</style>
