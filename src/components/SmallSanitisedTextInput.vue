<script setup lang="ts">
import type { TextInputProps } from '@/types/textInputProps';
import SanitisedTextInput from './SanitisedTextInput.vue';

defineProps<Omit<TextInputProps, 'size'>>();

const model = defineModel<string>({ required: true });
</script>

<template>
  <SanitisedTextInput
    v-model="model"
    :error-message
    :help-img
    :help-title
    :initial-value
    :invalid
    :label
    :maxlength
    :tooltip
    size="small"
  >
    <slot></slot>

    <template #errorMessage>
      <slot name="errorMessage"></slot>
    </template>
  </SanitisedTextInput>
</template>
