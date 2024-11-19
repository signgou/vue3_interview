<template>
  <!-- 顶部导航栏 -->
  <van-nav-bar @click-left="$router.go(-1)">
    <template #left>
      <van-icon name="arrow-left" color="#323233"></van-icon>
    </template>
    <template #title>
      <h1 class="top title">模式选择</h1>
    </template>
  </van-nav-bar>

  <div class="container">
    <van-row justify="center">
      <van-button class="btn title" to="/npcInterview">人机面试</van-button>
    </van-row>
    <van-row justify="center">
      <van-button class="btn title" to="/studentInterview">专家面试</van-button>
    </van-row>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.top.title {
  font-size: 1rem;
  font-weight: lighter;
}

.container {
  height: 80vh;

  .btn {
    border-radius: 2rem;
    padding: 0 2rem;
    margin-bottom: 3rem;
  }
}
</style>
