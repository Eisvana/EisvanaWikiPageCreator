<script setup lang="ts">
import { defineAsyncComponent, type Component, onMounted } from 'vue';
import { usePageDataStore, useStaticPageDataStore } from './stores/pageData';
import { storeToRefs } from 'pinia';
import { getRelease } from './common';

const staticPageData = useStaticPageDataStore();
const { route } = storeToRefs(staticPageData);

const pageData = usePageDataStore();
const { release } = storeToRefs(pageData);

onMounted(async () => {
  const currentRelease = await getRelease();
  release.value = currentRelease;
});

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
