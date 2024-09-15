<script setup lang="ts">
import SelectDropdown from './SelectDropdown.vue';
import { mappedDepartmentOptions } from '@/variables/departments';

const model = defineModel<string>({ required: true });
</script>

<template>
  <SelectDropdown
    v-model="model"
    :options="mappedDepartmentOptions"
  />
</template>
