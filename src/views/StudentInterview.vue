<template>
  <van-nav-bar @click-left="$router.go(-1)" @click-right="$router.push('/studentHome')">
    <template #left>
      <van-icon name="arrow-left" color="#323233"></van-icon>
    </template>
    <template #title>
      <h1 class="top title">专家面试</h1>
    </template>
    <template #right>
      <van-icon name="wap-home-o" color="black"></van-icon>
    </template>
  </van-nav-bar>

  <van-row justify="center">
    <div class="overview">
      <h1 class="main title">{{ title }}</h1>
      <h2 class="dsp title">{{ description }}</h2>
    </div>
  </van-row>

  <div class="container">
    <StudentVideoChat :setID="$route.query.setID"></StudentVideoChat>
  </div>
</template>

<script setup lang="ts">
import { getQuestionSet } from '@/apis/questions';
import StudentVideoChat from '@/components/studentVC/StudentVideoChat.vue';
import { showFailToast } from 'vant';
import { onBeforeMount, ref } from 'vue';
const title = ref('题目');
const description = ref('概述');
const { setID } = defineProps({
  setID: String
})
onBeforeMount(async () => {
  try {
    if (setID) {
      const { title: tle, description: dsp } = await getQuestionSet(setID);
      title.value = tle;
      description.value = dsp;
    }
    else {
      showFailToast('无套题ID');
    }

  }
  catch (err) {
    console.error(err);
    showFailToast('请求出错');
  }
})

</script>

<style lang="scss" scoped>
.top.title {
  font-weight: lighter;
}

.overview {
  .main.title {
    font-size: 1.5rem;
  }

  .dsp.title {
    margin-top: 1rem;
    font-size: 1rem;
    color: #969799;
  }

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
