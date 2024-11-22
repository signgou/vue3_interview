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

  <!-- 练习选择 -->
  <div class="exercise-box">
    <van-collapse v-model="activeNames">
      <van-collapse-item class="title" title="笔试练习" name="1">
        <van-cell title-style="color:#969799" title="国考"></van-cell>
        <van-cell title-style="color:#969799" title="广东省省考"></van-cell>
        <van-cell title-style="color:#969799" title="其他"></van-cell>
      </van-collapse-item>
      <van-collapse-item class="title" title="面试练习" name="2">
        <van-cell v-for="questionBank in questionBanks" :key="questionBank.id" title-style="color:#969799"
          :title="questionBank.name" clickable :to="{
            path: '/questionBank',
            query: {
              title: questionBank.name,
              bankID: questionBank.id
            }
          }"></van-cell>
      </van-collapse-item>
      <van-collapse-item class="title" title="模拟考试" name="3">
        <van-cell title-style="color:#969799" title="笔试模拟"></van-cell>
        <van-cell title-style="color:#969799" title="面试模拟"></van-cell>
        <van-cell title-style="color:#969799" title="综合模拟"></van-cell>
      </van-collapse-item>
    </van-collapse>
    <!-- 加一个空白区域防止底部标签栏挡住选项 -->
    <div style="height: 50px;"></div>
  </div>

  <!-- 底部标签栏 -->
  <van-tabbar v-model="active" class="title" active-color="#000000" inactive-color="#969799">
    <van-tabbar-item name="random" icon="question-o" to="/isDeveloping">随机一题</van-tabbar-item>
    <van-tabbar-item name="exercise" icon="records-o">练习</van-tabbar-item>
    <van-tabbar-item name="profile" icon="user-o" to="/isDeveloping">我</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">
import { getAllQuestionBanks } from '@/apis/questions';
import type { QuestionBank } from '@/apis/questions/type';
import { showFailToast } from 'vant';
import { reactive, ref, onBeforeMount } from 'vue'
const activeNames = ref([]);
const active = ref('exercise');

let questionBanks: QuestionBank[] = reactive([]);
onBeforeMount(async () => {
  try {
    questionBanks = await getAllQuestionBanks();
  }
  catch (err) {
    console.error(err);
    showFailToast('出错了');
  }
})

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
