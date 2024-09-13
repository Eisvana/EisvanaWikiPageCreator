<script setup lang="ts">
import { ref, watchPostEffect } from 'vue';
import TextInput from './TextInput.vue';
import { sanitiseString } from '@/helpers/inputSanitisation';
import type { TextInputProps } from '@/types/textInputProps';

defineProps<TextInputProps>();

// sanitised model
const model = defineModel<string>({ required: true });

// raw input used by the component to not disturb the user
const dirtyModel = ref(model.value);

watchPostEffect(() => (model.value = sanitiseString(dirtyModel.value)));
</script>

<template>
  <TextInput
    v-model="dirtyModel"
    :errorMessage
    :helpImg
    :helpTitle
    :invalid
    :label
    :maxlength
    :size
    :tooltip
  >
    <slot></slot>

    <template #errorMessage>
      <slot name="errorMessage"></slot>
    </template>
  </TextInput>
</template>
