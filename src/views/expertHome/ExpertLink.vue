<template>
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
    <van-row justify="center">
      <h1 class="main title">等待连线学生列表</h1>
    </van-row>
    <van-row justify="center">
      <h2 v-show="!students.length" class="sub title">现在无学生，可以稍作休息^_^</h2>
    </van-row>
    <van-grid :gutter="10">
      <van-grid-item v-for="student in students" :key="student.key" icon="contact-o" :text="student.username"
        :to="`/expertInterview?room=${student.room}&setID=${student.setID}`" />
    </van-grid>

    <!-- 加一个空白区域防止底部标签栏挡住选项 -->
    <div style="height: 50px;"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import useExpertStore from '@/store/modules/expert';
const expert = useExpertStore();

interface student {
  key: string
  username: string
  room: string
  setID: string
}
const students = ref<student[]>([]);

//挂载前初始化socket
onBeforeMount(() => {
  expert.initSocket();
  expert.socket.on('updateStudents', (newStudents) => {
    students.value = newStudents;
  })
})

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
