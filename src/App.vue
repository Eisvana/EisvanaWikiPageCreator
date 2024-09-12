<script setup lang="ts">
import MainToolbar from '@/components/MainToolbar.vue';
import { componentName } from '@/variables/route';
import { defineAsyncComponent, onMounted, type Component } from 'vue';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import { usePageDataStore } from './stores/pageData';

const pageData = usePageDataStore();

onMounted(async () => pageData.initStore());

const RouteComponent = defineAsyncComponent<Component>({
  loader: () => import(`./pages/${componentName}.vue`),
});
</script>

<template>
  <header>
    <MainToolbar />
  </header>
  <main class="container main-page-content pt-4 my-5">
    <RouteComponent />
  </main>
  <footer
    v-if="componentName !== 'Home'"
    class="full-width"
  >
    <Toolbar>
      <template #center>
        <div class="footer-toolbar">
          <Button label="Copy" />
          <Button
            as="a"
            label="Create"
          />
          <Button
            label="Reset"
            severity="warn"
          />
        </div>
      </template>
    </Toolbar>
  </footer>
</template>

<style scoped>
* {
  --p-toolbar-border-radius: 0;
}

footer {
  position: fixed;
  bottom: 0;

  .footer-toolbar {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
}

.main-page-content {
  padding-block-end: 5rem;
}
</style>
