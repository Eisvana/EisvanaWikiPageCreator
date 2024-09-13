<script setup lang="ts">
import type { TextInputProps } from '@/types/textInputProps';
import SanitisedTextInput from './SanitisedTextInput.vue';

defineProps<Omit<TextInputProps, 'size'>>();

const model = defineModel<string>({ required: true });
</script>

<template>
  <SanitisedTextInput
    v-model="model"
    :errorMessage
    :helpImg
    :helpTitle
    :invalid
    :label
    :maxlength
    :tooltip
    size="small"
  />
</template>
