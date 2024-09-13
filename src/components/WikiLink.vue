<script setup lang="ts">
import { wikiLink } from '@/variables/wikiLink';
import { computed } from 'vue';
import ExternalLink from './ExternalLink.vue';

const props = defineProps<{
  link: string;
  text: string;
}>();

const href = computed(() => wikiLink + props.link);
</script>

<template>
  <ExternalLink
    :link="href"
    :text
  />
</template>
