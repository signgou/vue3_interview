<template>
  <van-nav-bar @click-left="$router.go(-1)">
    <template #left>
      <van-icon name="arrow-left" color="#323233"></van-icon>
    </template>
    <template #title>
      <h1 class="top title">人机面试</h1>
    </template>
  </van-nav-bar>

  <van-row justify="center">
    <div class="overview">
      <h1 class="title">题目概述</h1>
    </div>
  </van-row>

  <div class="container">
    <NPCVideoChat></NPCVideoChat>
  </div>
</template>

<script setup lang="ts">
import NPCVideoChat from '@/components/npcVC/NPCVideoChat.vue';

</script>

<style lang="scss" scoped>
.top.title {
  font-weight: lighter;
}

.overview {
  .title {
    font-size: 1rem;
  }

  border: 0.1rem solid #eceff4;
  border-radius: 1rem;
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
  width: 16rem;
  height: 8rem;
}

.container {
  height: 50vh;
}
</style>
