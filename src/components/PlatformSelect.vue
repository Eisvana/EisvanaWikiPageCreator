<script setup lang="ts">
import QSelectPreset from './QSelectPreset.vue';
import { mappedPlatformOptions } from '@/variables/platforms';

defineProps<{
  spaced?: boolean;
}>();

const model = defineModel<string>({ required: true });
</script>

<template>
  <QSelectPreset
    v-model="model"
    :options="mappedPlatformOptions"
    :spaced
    label="Platform"
  />
</template>
