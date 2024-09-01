<script setup lang="ts">
import { Dark } from 'quasar';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const localStorageData = localStorage.getItem('theme');
const initialTheme = (localStorageData ?? prefersDark.toString()) === 'true'; // true = dark; false = light
switchTheme(initialTheme);

function switchTheme(theme?: boolean) {
  const newTheme = theme ?? !Dark.mode;
  Dark.set(newTheme);
  localStorage.setItem('theme', newTheme.toString());
}
</script>

<template>
  <QBtn
    icon="settings_brightness"
    title="Switch Theme"
    flat
    fab
    @click="switchTheme()"
  >
  </QBtn>
</template>
