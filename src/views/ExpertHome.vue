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
      <van-grid-item v-for="student in students" :key="student.key" icon="contact-o" :text="student.username"
        :to="`/expertInterview?room=${student.room}`" />
    </van-grid>

    <!-- 加一个空白区域防止底部标签栏挡住选项 -->
    <div style="height: 50px;"></div>
  </div>

  <!-- 底部标签栏 -->
  <van-tabbar v-model="active" class="title" active-color="#000000" inactive-color="#969799">
    <van-tabbar-item name="link" icon="exchange">连线</van-tabbar-item>
    <van-tabbar-item name="profile" icon="user-o" to="/isDeveloping">我</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import useExpertStore from '@/store/modules/expert';
const expert = useExpertStore();

interface student {
  key: string
  username: string
  room: string
}
const students = ref<student[]>([]);

//挂载前初始化socket
onBeforeMount(() => {
  expert.initSocket();
  expert.socket.on('updateStudents', (newStudents) => {
    students.value = newStudents;
  })
})

const active = ref('link');
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
