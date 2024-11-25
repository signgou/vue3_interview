<template>
  <!-- 顶部导航栏 -->
  <van-nav-bar @click-left="$router.push('/login'); expert.socket.disconnect()">
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
    <van-tabbar-item name="link" icon="exchange" :to="{ name: 'link' }">连线</van-tabbar-item>
    <van-tabbar-item name="expertInfo" icon="user-o" :to="{ name: 'expertInfo' }">我</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">
import useExpertStore from '@/store/modules/expert';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();
const expert = useExpertStore();
const active = ref(route.name as string);
</script>

<style lang="scss" scoped>
.link-box {
  .main.title {
    margin-bottom: 1rem;
  }

  .sub.title {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #969799;
  }

  margin-top: 4rem;
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
