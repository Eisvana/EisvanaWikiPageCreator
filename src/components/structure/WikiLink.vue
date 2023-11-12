<script setup lang="ts">
import { wikiLink } from '@/variables/simple';
import { computed } from 'vue';

const props = defineProps<{
  link: string;
  text: string;
}>();

const href = computed(() => wikiLink + props.link);
</script>

<template>
  <a
    :href="href"
    rel="noopener noreferrer"
    target="_blank"
    >{{ text }}</a
  >
</template>
