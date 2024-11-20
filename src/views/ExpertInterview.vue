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
      <!-- expert -->
      <van-row justify="center">
        <van-list class="question">
          <van-collapse v-model="activeNames">
            <van-collapse-item class="title" title="笔试练习" name="1">
              <van-cell title-style="color:#969799" title="国考"></van-cell>
              <van-cell title-style="color:#969799" title="广东省省考"></van-cell>
              <van-cell title-style="color:#969799" title="其他"></van-cell>
            </van-collapse-item>
            <van-collapse-item class="title" title="面试练习" name="2">
              <van-cell title-style="color:#969799" title="基础素质测试"></van-cell>
              <van-cell title-style="color:#969799" title="专业技能面试"></van-cell>
              <van-cell title-style="color:#969799" title="综合面试"></van-cell>
            </van-collapse-item>
            <van-collapse-item class="title" title="模拟考试" name="3">
              <van-cell title-style="color:#969799" title="笔试模拟"></van-cell>
              <van-cell title-style="color:#969799" title="面试模拟"></van-cell>
              <van-cell title-style="color:#969799" title="综合模拟"></van-cell>
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
import { onBeforeMount, ref } from 'vue'
import ExpertVideoChat from '@/components/expertVC/ExpertVideoChat.vue';

import useExpertStore from '@/store/modules/expert';
const activeNames = ref([]);
const expert = useExpertStore();
const { room } = defineProps({
  room: String
});
onBeforeMount(() => {
  if (room) {
    //console.log(room);
    expert.linkStudent(room);
  }
})

</script>

<style lang="scss" scoped>
.top.title {
  font-weight: lighter;
}

.overview {
  .title {
    font-size: 1rem;
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
