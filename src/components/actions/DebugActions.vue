<script setup lang="ts">
import { useStaticPageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';

const staticPageData = useStaticPageDataStore();
const { debug } = storeToRefs(staticPageData);

const clearLocalStorage = () => localStorage.clear();
</script>

<template>
  <label class="debug-skip-label"
    ><input
      v-model="debug"
      class="checkbox"
      type="checkbox"
      id="skipCheck"
    />Enable debug (no checks, no popups)</label
  >
  <button
    class="button is-danger is-small mx-4"
    id="clearCache"
    @click="clearLocalStorage"
  >
    Clear Localstorage
  </button>
</template>

<style scoped lang="scss">
.debug-skip-label {
  display: flex;
  gap: 0.3rem;
}
</style>
