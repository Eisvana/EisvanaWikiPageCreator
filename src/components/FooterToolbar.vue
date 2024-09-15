<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { usePageDataStore } from '@/stores/pageData';

const pageData = usePageDataStore();
</script>

<template>
  <Toolbar class="toolbar is-radiusless">
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
          @click="pageData.resetStore"
        />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar {
  border: none;

  .footer-toolbar {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
}
</style>
