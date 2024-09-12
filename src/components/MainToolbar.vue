<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import ThemeSwitch from './ThemeSwitch.vue';
import NavBar from './NavBar.vue';
import { componentName } from '@/variables/route';
import Presets from './Presets.vue';
</script>

<template>
  <Toolbar class="toolbar is-radiusless">
    <template #start>
      <NavBar />
    </template>

    <template #center>
      <h1 class="title is-3">Eisvana Wiki Page Creator{{ componentName === 'Home' ? '' : ` - ${componentName}` }}</h1>
    </template>

    <template #end>
      <div class="settings-buttons">
        <Presets />
        <ThemeSwitch />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.settings-buttons {
  display: flex;
  gap: 0.5rem;
}

.toolbar {
  border: none;
}
</style>
