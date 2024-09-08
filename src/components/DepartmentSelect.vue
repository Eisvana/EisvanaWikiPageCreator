<script setup lang="ts">
import QSelectPreset from './QSelectPreset.vue';
import { mappedDepartmentOptions } from '@/variables/departments';

const model = defineModel<string>({ required: true });
</script>

<template>
  <QSelectPreset
    v-model="model"
    :options="mappedDepartmentOptions"
    label="Department"
  />
</template>
