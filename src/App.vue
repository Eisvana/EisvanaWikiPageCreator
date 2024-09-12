<script setup lang="ts">
import MainToolbar from '@/components/MainToolbar.vue';
import { componentName } from '@/variables/route';
import { defineAsyncComponent, onMounted, type Component } from 'vue';
import { usePageDataStore } from './stores/pageData';
import FooterToolbar from './components/FooterToolbar.vue';

const pageData = usePageDataStore();

onMounted(async () => pageData.initStore());

const RouteComponent = defineAsyncComponent<Component>({
  loader: () => import(`./pages/${componentName}.vue`),
});
</script>

<template>
  <header class="header">
    <MainToolbar />
  </header>
  <main class="container main-page-content pt-4 my-5">
    <RouteComponent />
  </main>
  <footer
    v-if="componentName !== 'Home'"
    class="full-width"
  >
    <FooterToolbar />
  </footer>
</template>

<style scoped>
.header {
  border-block-end: 1px solid var(--p-toolbar-border-color);
}

footer {
  position: fixed;
  bottom: 0;
  border-block-start: 1px solid var(--p-toolbar-border-color);
}

.main-page-content {
  padding-block-end: 5rem;
}
</style>
