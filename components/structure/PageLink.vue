<script setup lang="ts">
import type { PageLinkProps } from '@/types/objects';
import { computed } from 'vue';

const props = defineProps<PageLinkProps>();

const title = computed(() => {
  const vowels = 'aeiou';
  const firstLetter = props.text.slice(0, 1).toLowerCase();
  return `Create ${vowels.includes(firstLetter) ? 'an' : 'a'} ${props.text} page`;
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
