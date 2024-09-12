<script setup lang="ts">
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import { useId } from '@/helpers/id';

defineProps<{
  label: string;
  maxlength?: string | number;
  invalid?: boolean;
}>();

const id = useId('input-');

const model = defineModel<string>({ required: true });
</script>

<template>
  <FloatLabel>
    <InputText
      v-model="model"
      :id
      :invalid
      :maxlength
    />
    <label :for="id">{{ label }}</label>
  </FloatLabel>
</template>
