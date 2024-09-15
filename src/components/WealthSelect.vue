<script setup lang="ts">
import SelectDropdown from './SelectDropdown.vue';
import { mappedWealthOptions } from '@/variables/wealth';

const model = defineModel<string>({ required: true });
</script>

<template>
  <SelectDropdown
    v-model="model"
    :options="mappedWealthOptions"
  />
</template>
