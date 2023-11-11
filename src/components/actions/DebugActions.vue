<script setup lang="ts">
import { useStaticPageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';

const staticPageData = useStaticPageDataStore();
const { debug } = storeToRefs(staticPageData);

const clearLocalStorage = () => localStorage.clear();

watchEffect(() => (document.documentElement.dataset.debug = debug.value.toString()));
</script>

<template>
  <label class="debug-skip-label is-flex"
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
  gap: 0.3rem;
}
</style>
