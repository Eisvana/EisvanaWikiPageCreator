<script setup lang="ts">
import { sanitiseString } from '@/helper/inputSanitisation';
import { watchEffect } from 'vue';

defineProps<{
  label: string;
  error?: boolean;
  errorMessage?: string;
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
    outlined
  />
</template>
