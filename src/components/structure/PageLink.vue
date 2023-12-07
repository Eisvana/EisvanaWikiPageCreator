<script setup lang="ts">
import type { PageLinkProps } from '@/types/objects';
import { computed } from 'vue';

const props = defineProps<PageLinkProps>();

const title = computed(() => {
  const vowels = 'aeiou';
  const firstLetter = props.text.slice(0, 1).toLowerCase();
  return `Crea ${vowels.includes(firstLetter) ? 'un' : 'una'} página de ${props.text}`;
});
</script>

<template>
  <a
    :href="url"
    :title="title"
    class="button is-link is-outlined"
    >{{ text }}</a
  >
</template>

<style scoped lang="scss">
a {
  font-size: 1.5rem;
}
</style>
