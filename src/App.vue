<script setup lang="ts">
import type { Component } from 'vue';
import Flora from './pages/Flora.vue';
import { useStaticPageDataStore } from './stores/pageData';
import { storeToRefs } from 'pinia';

const staticPageData = useStaticPageDataStore();
const { route: currentRoute } = storeToRefs(staticPageData);

const router: { [key: string]: Component } = {
  flora: Flora,
};
</script>

<template>
  <component :is="router[currentRoute]"></component>
</template>
