<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import TextInput from './TextInput.vue';
import { sanitiseString } from '@/helpers/inputSanitisation';

const props = defineProps<{
  label: string;
  initialValue?: string;
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

watchEffect(() => (model.value = sanitiseString(dirtyModel.value)));
</script>

<template>
  <TextInput
    v-model="dirtyModel"
    v-bind="props"
  >
    <slot></slot>

    <template #errorMessage>
      <slot name="errorMessage"></slot>
    </template>
  </TextInput>
</template>
