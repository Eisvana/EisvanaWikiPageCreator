<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { usePageDataStore } from '@/stores/pageData';

const pageData = usePageDataStore();
</script>

<template>
  <Toolbar class="is-borderless is-radiusless">
    <template #center>
      <div class="is-gap-1 is-flex is-justify-content-center footer-toolbar">
        <Button label="Copy" />
        <Button
          as="a"
          label="Create"
        />
        <Button
          label="Reset"
          severity="warn"
          @click="pageData.resetStore"
        />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.footer-toolbar {
  padding-inline-end: var(--p-scrollbar-width);
}
</style>
