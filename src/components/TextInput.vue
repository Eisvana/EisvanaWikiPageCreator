<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { useId } from '@/helpers/id';
import InputTableItem from './InputTableItem.vue';
import Explainer from './Explainer.vue';

defineProps<{
  label: string;
  maxlength?: string | number;
  invalid?: boolean;
  size?: 'small' | 'large';
  helpTitle?: string;
  helpImg?: string;
  tooltip?: string;
}>();

const id = useId('input-');

const model = defineModel<string>({ required: true });
</script>

<template>
  <InputTableItem>
    <template #label>
      <div class="is-flex is-justify-content-space-between full-width">
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
      <InputText
        v-model="model"
        :id
        :invalid
        :maxlength
        :size
      />
    </template>
  </InputTableItem>
</template>
