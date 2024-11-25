<template>
  <van-row justify="center">
    <van-image class="profile-photo" round fit="cover" src="/src/assets/icons/expert.svg" />
  </van-row>
  <van-cell-group class="detail title">
    <van-cell title="账号" :value="name" />
  </van-cell-group>
</template>

<script setup lang="ts">
import useExpertStore from '@/store/modules/expert';
import { computed } from 'vue';

const expert = useExpertStore();
const name = computed(() => expert.data.username);
</script>

<style lang="scss" scoped>
.profile-photo {
  border: 0.1rem solid #eceff4;
  width: 3rem;
  margin-top: 1rem;
  padding: 0.4rem
}

.detail {
  margin-top: 2rem;
}
</style>
