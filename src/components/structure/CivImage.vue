<script setup lang="ts">
import type { CivImageProps } from '@/types/objects';

defineProps<CivImageProps>();
</script>

<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      :src="img"
      :alt="imgAlt"
    />
  </a>
</template>

<style scoped lang="scss">
img {
  width: 200px;
}
</style>
