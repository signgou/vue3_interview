<template>
  <van-row justify="center">
    <van-image class="profile-photo" round fit="cover" src="/src/assets/icons/student.svg" />
  </van-row>
  <van-cell-group class="detail title">
    <van-cell title="账号" :value="name" />
  </van-cell-group>
</template>

<script setup lang="ts">
import useStudentStore from '@/store/modules/student';
import { computed } from 'vue';

const student = useStudentStore();
const name = computed(() => student.data.username);
</script>

<style lang="scss" scoped>
.profile-photo {
  border: 0.1rem solid #eceff4;
  width: 3rem;
  margin-top: 1rem;
  padding: 0.3rem
}

.detail {
  margin-top: 2rem;
}
</style>
