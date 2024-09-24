<script setup lang="ts">
import { ref, watchEffect, watchPostEffect } from 'vue';
import TextInput from './TextInput.vue';
import { sanitiseString } from '@/helpers/inputSanitisation';
import type { TextInputProps } from '@/types/textInputProps';
import { useEventListener } from '@vueuse/core';

const props = defineProps<TextInputProps & { resetEvent?: string }>();

// sanitised model
const model = defineModel<string>({ required: true });

const initialState = ref(props.initialValue ?? model.value);

// raw input used by the component to not disturb the user
const dirtyModel = ref(initialState.value);

watchEffect(() => {
  if (props.initialValue !== undefined) initialState.value = props.initialValue;
});

watchPostEffect(() => (model.value = sanitiseString(dirtyModel.value)));

useEventListener(document, props.resetEvent ?? 'reset', () => {
  dirtyModel.value = initialState.value;
});
</script>

<template>
  <TextInput
    v-model="dirtyModel"
    :error-message
    :help-img
    :help-title
    :invalid
    :label
    :maxlength
    :placeholder
    :tooltip
  >
    <slot></slot>

    <template #errorMessage>
      <slot name="errorMessage"></slot>
    </template>
  </TextInput>
</template>
