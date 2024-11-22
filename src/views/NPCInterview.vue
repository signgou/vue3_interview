<template>
  <van-nav-bar @click-left="$router.go(-1)" @click-right="$router.push('/studentHome')">
    <template #left>
      <van-icon name="arrow-left" color="#323233"></van-icon>
    </template>
    <template #title>
      <h1 class="top title">人机面试</h1>
    </template>
    <template #right>
      <van-icon name="wap-home-o" color="black"></van-icon>
    </template>
  </van-nav-bar>

  <van-row justify="center">
    <div class="overview">
      <h1 class="title">{{ title }}</h1>
      <van-row justify="center">
        <van-list v-model:loading="loading" :finished="finished" v-model:error="err" error-text="请求失败，点击重新加载"
          @load="onLoad" class="question">
          <!-- 面试结束前展示 -->
          <h1 v-show="!end" class="tip title">在面试结束后会在此处展示答案</h1>
          <!-- 面试结束后展示 -->
          <van-collapse v-show="end" v-model="activeNames">
            <van-collapse-item v-for="question in questions" :key="question.id" class="title"
              :title="question.questionText" :name="question.id">
              <SvgIcon name="answer" width="0.9rem" height="0.9rem" /><span class="answer">{{ question.correctAnswer
                }}</span>
            </van-collapse-item>
          </van-collapse>
        </van-list>
      </van-row>
    </div>
  </van-row>

  <div class="container">
    <NPCVideoChat :questions="questions" :isEnd="isEnd"></NPCVideoChat>
  </div>
</template>

<script setup lang="ts">
import { getQuestionSet } from '@/apis/questions';
import type { Question } from '@/apis/questions/type';
import NPCVideoChat from '@/components/npcVC/NPCVideoChat.vue';
import { showFailToast } from 'vant';
import { ref } from 'vue'

//面试结束
const end = ref(false);

const activeNames = ref([]);
const loading = ref(false);
const finished = ref(false);
const err = ref(false);
const questions = ref<Question[]>([]);
const title = ref('题目');
const { setID } = defineProps({
  setID: String
});
const onLoad = async () => {
  // 异步更新数据
  try {
    if (setID) {
      const { questions: theQs, title: theTitle } = await getQuestionSet(setID);
      questions.value = theQs; title.value = theTitle;
      err.value = false;
      finished.value = true;
    }
    else {
      showFailToast('无题库ID');
      return;
    }
  } catch (error) {
    console.error(error);
    loading.value = false;
    err.value = true;
  }

};
const isEnd = function (state: boolean) {
  end.value = state;
}
</script>

<style lang="scss" scoped>
.top.title {
  font-weight: lighter;
}

.overview {
  .title {
    font-size: 1rem;
  }

  .question-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .answer {
    margin-left: 0.2rem;
    font-size: 0.7rem;
  }

  .tip.title {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #969799;
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
