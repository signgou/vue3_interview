<template>
  <!-- 顶部导航栏 -->
  <van-nav-bar @click-left="$router.push('/login')">
    <template #left>
      <van-icon name="arrow-left" color="#323233"></van-icon>
    </template>
    <template #title>
      <h1 class="top title">公试</h1>
    </template>
  </van-nav-bar>

  <!-- 切换标签,缓存组件 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <!-- 底部标签栏 -->
  <van-tabbar v-model="active" class="title" active-color="#000000" inactive-color="#969799">
    <van-tabbar-item name="random" icon="question-o" to="/isDeveloping">随机一题</van-tabbar-item>
    <van-tabbar-item name="exercise" icon="records-o" :to="{ name: 'exercise' }">练习</van-tabbar-item>
    <van-tabbar-item name="studentInfo" icon="user-o" :to="{ name: 'studentInfo' }">我</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();
const active = ref(route.name as string);
</script>

<style lang="scss" scoped>
.exercise-box {
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
