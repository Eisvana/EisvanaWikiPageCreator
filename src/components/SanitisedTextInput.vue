<script setup lang="ts">
import { ref, watchPostEffect } from 'vue';
import TextInput from './TextInput.vue';
import { sanitiseString } from '@/helpers/inputSanitisation';

defineProps<{
  label: string;
  maxlength?: string | number;
  invalid?: boolean;
  errorMessage?: string;
  size?: 'small' | 'large';
  helpTitle?: string;
  helpImg?: string;
  tooltip?: string;
}>();

// sanitised model
const model = defineModel<string>({ required: true });

// raw input used by the component to not disturb the user
const dirtyModel = ref(model.value);

watchPostEffect(() => (model.value = sanitiseString(dirtyModel.value)));
</script>

<template>
  <TextInput
    v-model="dirtyModel"
    :maxlength
    :invalid
    :errorMessage
    :size
    :helpTitle
    :helpImg
    :tooltip
    :label
  >
    <slot></slot>

    <template #errorMessage>
      <slot name="errorMessage"></slot>
    </template>
  </TextInput>
</template>
