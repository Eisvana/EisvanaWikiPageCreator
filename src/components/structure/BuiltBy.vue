<script setup lang="ts">
import type { BuiltByProps } from '@/types/objects';

defineProps<BuiltByProps>();
</script>

<template>
  <div>
    <a
      v-if="link"
      :href="link"
      :title="text"
      rel="noopener noreferrer"
      target="_blank"
      >{{ text }}
      <img
        :src="img"
        :alt="imgAlt"
      />
    </a>
    <template v-else
      >{{ text }}
      <img
        v-if="img"
        :src="img"
        :alt="imgAlt"
    /></template>
  </div>
</template>

<style scoped lang="scss">
img {
  max-height: 2rem;
  border-radius: 50%;
}
</style>
