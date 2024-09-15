<script setup lang="ts">
import SelectDropdown from './SelectDropdown.vue';
import { mappedPlatformOptions } from '@/variables/platforms';

const model = defineModel<string>({ required: true });
</script>

<template>
  <SelectDropdown
    v-model="model"
    :options="mappedPlatformOptions"
  />
</template>
