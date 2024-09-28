<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { useId } from '@/helpers/id';
import InputTableItem from '../InputTableItem.vue';
import Explainer from '../Explainer.vue';
import InvalidInput from '../InvalidInput.vue';
import type { TextInputProps } from '@/types/textInputProps';

defineProps<TextInputProps>();

const id = useId('input-');

const model = defineModel<string>({ required: true });
</script>

<template>
  <InputTableItem>
    <template #label>
      <div class="is-flex is-justify-content-space-between is-align-items-center full-width">
        <label :for="id">{{ label }}</label>
        <Explainer
          v-if="tooltip"
          :help-img
          :help-title
          :tooltip
        >
          <slot></slot>
        </Explainer>
      </div>
    </template>
    <template #input>
      <InvalidInput
        :error-message
        :invalid
      >
        <InputText
          v-model="model"
          :id
          :invalid
          :maxlength
          :pt:root:placeholder="placeholder"
          size="small"
        />
        <template #errorMessage>
          <slot name="errorMessage"></slot>
        </template>
      </InvalidInput>
    </template>
  </InputTableItem>
</template>
