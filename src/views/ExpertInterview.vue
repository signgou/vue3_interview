<template>
  <van-nav-bar @click-left="$router.go(-1)">
    <template #left>
      <van-icon name="arrow-left" color="#323233"></van-icon>
    </template>
    <template #title>
      <h1 class="top title">面试学生</h1>
    </template>
  </van-nav-bar>

  <van-row justify="center">
    <div class="overview">
      <h1 class="question-title title">{{ title }}</h1>
      <van-row justify="center">
        <van-list v-model:loading="loading" :finished="finished" v-model:error="err" error-text="请求失败，点击重新加载"
          @load="onLoad" class="question">
          <van-collapse v-model="activeNames">
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
    <ExpertVideoChat></ExpertVideoChat>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import ExpertVideoChat from '@/components/expertVC/ExpertVideoChat.vue';

import useExpertStore from '@/store/modules/expert';
import type { Question } from '@/apis/questions/type';
import { getQuestionSet } from '@/apis/questions';
import { showFailToast } from 'vant';
const expert = useExpertStore();

const activeNames = ref([]);
const { room, setID } = defineProps({
  room: String,
  setID: String
});
onBeforeMount(() => {
  if (expert.first) {
    expert.initSocket();
  }
  if (room) {
    //console.log(room);
    expert.linkStudent(room);
  }
})

const loading = ref(false);
const finished = ref(false);
const err = ref(false);
let questions: Question[] = reactive([]);
const title = ref('');

const onLoad = async () => {
  // 异步更新数据
  try {
    if (setID) {
      const { questions: theQs, title: theTitle } = await getQuestionSet(setID);
      questions = theQs; title.value = theTitle;
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

</script>

<style lang="scss" scoped>
.top.title {
  font-weight: lighter;
}

.overview {
  .question-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .answer {
    margin-left: 0.2rem;
    font-size: 0.7rem;
  }

  margin-top: 1rem;
  overflow: auto;
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
