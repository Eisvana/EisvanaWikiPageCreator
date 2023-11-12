<script setup lang="ts">
import { type Component, watch, nextTick } from 'vue';
import Home from './pages/Home.vue';
import Flora from './pages/Flora.vue';
import Mineral from './pages/Mineral.vue';
import { usePageDataStore, useStaticPageDataStore } from './stores/pageData';
import { storeToRefs } from 'pinia';
import { useMarker } from './composables/useMarker';

const staticPageData = useStaticPageDataStore();
const { route: currentRoute } = storeToRefs(staticPageData);

const pageData = usePageDataStore();
const { pageName, glyphs } = storeToRefs(pageData);

// I have no idea why I have to use nextTick() here. It's just one character behind otherwise apparently for some reason
watch([pageName, glyphs], () => nextTick(() => useMarker()), { immediate: true });

const router: { [key: string]: Component } = {
  flora: Flora,
  mineral: Mineral,
};
</script>

<template>
  <component :is="router[currentRoute] ?? Home"></component>
</template>
