<script setup lang="ts">
import type { Component } from 'vue';
import Flora from './pages/Flora.vue';

const currentRoute = window.location.pathname.split('/')!.at(-1)!.slice(0, -5); // NoSonar getting the current filename without the "html" ending

const router: { [key: string]: Component } = {
  flora: Flora,
};
</script>

<template>
  <component :is="router[currentRoute]"></component>
</template>
