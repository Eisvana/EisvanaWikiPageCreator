<script setup lang="ts">
import { watch, nextTick, defineAsyncComponent, type Component } from 'vue';
import { usePageDataStore, useStaticPageDataStore } from './stores/pageData';
import { storeToRefs } from 'pinia';
import { useMarker } from './composables/useMarker';

const staticPageData = useStaticPageDataStore();
const { route } = storeToRefs(staticPageData);

const pageData = usePageDataStore();
const { pageName, glyphs } = storeToRefs(pageData);

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
  <RouteComponent />
</template>
