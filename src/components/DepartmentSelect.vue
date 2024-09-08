<script setup lang="ts">
import QSelectPreset from './QSelectPreset.vue';
import { mappedDepartmentOptions } from '@/variables/departments';

defineProps<{
  spaced?: boolean;
}>();

const model = defineModel<string>({ required: true });
</script>

<template>
  <QSelectPreset
    v-model="model"
    :options="mappedDepartmentOptions"
    :spaced
    label="Department"
  />
</template>
