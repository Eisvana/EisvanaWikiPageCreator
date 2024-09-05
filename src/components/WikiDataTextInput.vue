<script setup lang="ts">
import { sanitiseString } from '@/helper/inputSanitisation';
import { watchEffect } from 'vue';
import type { QInputProps } from 'quasar';

defineProps<{
  label: string;
  error?: boolean;
  errorMessage?: string;
  type?: QInputProps['type'];
}>();

const model = defineModel<string>({ required: true });

watchEffect(() => (model.value = sanitiseString(model.value)));
</script>

<template>
  <QInput
    v-model.trim="model"
    :error
    :error-message
    :label
    :type
    outlined
  />
</template>
