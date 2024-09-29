<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import ThemeSwitch from './ThemeSwitch.vue';
import NavBar from './NavBar.vue';
import { componentName } from '@/variables/route';
import Presets from './Presets.vue';
import Tools from './Tools.vue';
</script>

<template>
  <Toolbar class="is-borderless is-radiusless">
    <template #start>
      <NavBar />
    </template>

    <template #center>
      <h1 class="title is-3">Eisvana Wiki Page Creator{{ componentName === 'Home' ? '' : ` - ${componentName}` }}</h1>
    </template>

    <template #end>
      <div class="is-flex is-gap-1">
        <Tools />
        <Presets />
        <ThemeSwitch />
      </div>
    </template>
  </Toolbar>
</template>
