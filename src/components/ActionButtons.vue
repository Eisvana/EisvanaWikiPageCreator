<script setup lang="ts">
import { usePageDataStore } from '@/stores/pageData';
import { wikiLink } from '@/variables/wikiLink';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const pageData = usePageDataStore();
const { name } = storeToRefs(pageData);

const wikiPageLink = computed(() => `${wikiLink}Special:EditPage/${name.value}`);
</script>

<template>
  <div class="row q-gutter-x-md">
    <QBtn
      color="secondary"
      label="Copy Code"
    />
    <QBtn
      :href="wikiPageLink"
      color="secondary"
      label="Create Page"
      target="_blank"
    />
    <QBtn
      color="warning"
      label="Reset"
      text-color="dark"
      @click="pageData.resetStore"
    />
  </div>
</template>
