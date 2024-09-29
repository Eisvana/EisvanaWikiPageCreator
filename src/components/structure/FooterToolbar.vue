<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { usePageDataStore } from '@/stores/pageData';
import { useToast, POSITION } from 'vue-toastification';

const pageData = usePageDataStore();

const toast = useToast();

function copyPage() {
  const randomBool = Math.random() > 0.5;
  if (randomBool) {
    toast.error('Button is not yet functional!');
  } else {
    toast.success('Copied!', {
      position: POSITION.BOTTOM_RIGHT,
    });
  }
}
</script>

<template>
  <Toolbar class="is-borderless is-radiusless">
    <template #center>
      <div class="is-gap-1 is-flex is-justify-content-center footer-toolbar">
        <Button
          label="Copy"
          @click="copyPage"
        />
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
