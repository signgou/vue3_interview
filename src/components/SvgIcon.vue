<template>
  <svg :style="{ width, height }" aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>


<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
  width: {
    type: String,
    default: '1rem'
  },
  height: {
    type: String,
    default: '1rem'
  }
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
