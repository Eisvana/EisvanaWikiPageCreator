<script setup lang="ts">
import QSelectPreset from './QSelectPreset.vue';
import { mappedPlatformOptions } from '@/variables/platforms';

const model = defineModel<string>({ required: true });
</script>

<template>
  <QSelectPreset
    v-model="model"
    :options="mappedPlatformOptions"
    label="Platform"
  />
</template>
