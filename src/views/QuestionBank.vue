<template>
  <!-- 顶部导航栏 -->
  <van-nav-bar @click-left="$router.go(-1)" @click-right="$router.push('/studentHome')">
    <template #left>
      <van-icon name="arrow-left" color="#323233"></van-icon>
    </template>
    <template #title>
      <h1 class="top title">{{ title }}</h1>
    </template>
    <template #right>
      <van-icon name="wap-home-o" color="black"></van-icon>
    </template>
  </van-nav-bar>

  <div class="question-sets">
    <van-list v-model:loading="loading" :finished="finished" v-model:error="err" error-text="请求失败，点击重新加载"
      @load="onLoad">
      <van-cell class="title" center v-for="questionSet in questionSets" :key="questionSet.id"
        :title="questionSet.title" :label="questionSet.description" clickable :to="{
          path: '/selectMode',
          query: {
            setID: questionSet.id,
          }
        }">
        <template #right-icon>
          <van-icon name="tv-o" color="#323233" size="1.5rem" />
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { getQuestionBank } from '@/apis/questions';
import type { QuestionSet } from '@/apis/questions/type';
import { reactive, ref } from 'vue'
const { bankID, title } = defineProps(['bankID', "title"]);
let questionSets: QuestionSet[] = reactive([]);
const loading = ref(false);
const finished = ref(false);
const err = ref(false);

const onLoad = async () => {
  // 异步更新数据
  try {
    const { questionSets: theQS } = await getQuestionBank(bankID);
    questionSets = theQS;
    err.value = false;
    finished.value = true;
  } catch (error) {
    console.error(error);
    loading.value = false;
    err.value = true;
  }

};
</script>

<style lang="scss" scoped>
.top.title {
  font-size: 1rem;
  font-weight: lighter;
}

.question-sets {
  margin-top: 2rem;
}
</style>
