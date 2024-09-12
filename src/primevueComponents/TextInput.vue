<script setup lang="ts">
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import { useId } from '@/helpers/id';

defineProps<{
  label: string;
}>();

const id = useId('input-');

const model = defineModel<string>({ required: true });
</script>

<template>
  <FloatLabel>
    <InputText
      v-model="model"
      :id
    />
    <label :for="id">{{ label }}</label>
  </FloatLabel>
</template>
