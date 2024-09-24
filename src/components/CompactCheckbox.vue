<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import { useId } from '@/helpers/id';

defineProps<{
  label: string;
  trueValue?: string;
  falseValue?: string;
  value?: string;
  name?: string;
}>();

const model = defineModel<string>({ required: true });

const id = useId('checkbox-');
</script>

<template>
  <div class="is-flex is-align-items-end is-gap-1 is-flex-grow-1">
    <Checkbox
      v-model="model"
      :false-value
      :input-id="id"
      :true-value
      binary
    />
    <label
      :for="id"
      class="is-flex-grow-1"
      >{{ label }}</label
    >
  </div>
</template>
