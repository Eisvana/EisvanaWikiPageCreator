<script setup lang="ts">
import { watch, nextTick, defineAsyncComponent, type Component, onMounted } from 'vue';
import { usePageDataStore, useStaticPageDataStore } from './stores/pageData';
import { storeToRefs } from 'pinia';
import { useMarker } from './composables/useMarker';
import { getRelease } from './common';
// import MainToolbar from './primevueComponents/MainToolbar.vue';
import Home from './views/Home.vue';

const staticPageData = useStaticPageDataStore();
const { route } = storeToRefs(staticPageData);

const pageData = usePageDataStore();
const { pageName, glyphs, release } = storeToRefs(pageData);

onMounted(async () => {
  const currentRelease = await getRelease();
  release.value = currentRelease;
});

// I have no idea why I have to use nextTick() here. It's just one character behind otherwise apparently for some reason
watch([pageName, glyphs], () => nextTick(() => useMarker()), { immediate: true });

const router: Record<string, string> = {
  flora: 'Flora',
  mineral: 'Mineral',
  home: 'Home',
};

function getRouteComponent() {
  const currentRoute = route.value;
  if (!currentRoute || !router[currentRoute]) return router.home;
  return router[currentRoute];
}

const RouteComponent = defineAsyncComponent<Component>({
  loader: () => import(`./pages/${getRouteComponent()}.vue`),
});
</script>

<template>
  <Home />
  <!-- <RouteComponent /> -->
</template>
