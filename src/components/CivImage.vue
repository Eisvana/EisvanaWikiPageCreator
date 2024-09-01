<script setup lang="ts">
import type { CivImageProps } from '@/types/homePageProps';

defineProps<CivImageProps>();
</script>

<template>
  <a
    :href="link"
    rel="noopener noreferrer"
    target="_blank"
  >
    <img
      :alt="imgAlt"
      :src="img"
    />
  </a>
</template>

<style scoped lang="scss">
img {
  width: 200px;
}
</style>
