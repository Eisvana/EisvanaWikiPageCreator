<script setup lang="ts">
import type { SelectOption, SelectOptionGroup } from '@/types/selectInputOptions';
import Select from 'primevue/select';

const model = defineModel<string | null>({ required: true });

defineProps<{
  options: (SelectOption | SelectOptionGroup | string)[];
  filter?: boolean;
  optionGroupChildren?: string;
  optionGroupLabel?: string;
  optionLabel?: string;
  optionValue?: string;
}>();
</script>

<template>
  <Select
    v-model="model"
    :filter
    :options
    :option-group-children
    :option-group-label
    :option-label
    :option-value
    class="full-width"
    label-class="small-select"
  />
</template>

<style scoped>
:deep(.small-select) {
  padding: calc(var(--p-inputtext-sm-padding-y) - 1px) calc(var(--p-inputtext-sm-padding-x) - 1px);
  font-size: var(--p-inputtext-sm-font-size);
}
</style>
