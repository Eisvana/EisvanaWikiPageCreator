<script setup lang="ts">
const clearLocalStorage = () => localStorage.clear();
//TODO implement the debug skip checkbox
</script>

<template>
  <label class="debug-skip-label"
    ><input
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
