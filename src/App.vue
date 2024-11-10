<template>
  <div>
    <SvgIcon name="user" width="100px" height="100px"></SvgIcon>
    <h1 class="title">公试</h1>
  </div>
</template>

<script setup lang="ts">
import request from './utils/request';
request.get('get').then(data => { console.log(data); })
</script>

<style lang="scss">
.title {
  font-family: '优设标题黑', sans-serif;
  font-size: 20px;
}
</style>
