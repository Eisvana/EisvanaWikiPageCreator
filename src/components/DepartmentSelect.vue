<script setup lang="ts">
import { useId } from '@/helpers/id';
import SelectDropdown from './SelectDropdown.vue';
import { mappedDepartmentOptions } from '@/variables/departments';
import InputTableItem from './InputTableItem.vue';

withDefaults(
  defineProps<{
    initialValue?: string | null;
  }>(),
  {
    initialValue: null,
  }
);

const model = defineModel<string | null>({ required: true });

const id = useId('department-');
</script>

<template>
  <InputTableItem>
    <template #label>
      <label :id>Department</label>
    </template>
    <template #input>
      <SelectDropdown
        v-model="model"
        :aria-labelledby="id"
        :initial-value
        :options="mappedDepartmentOptions"
        show-clear
      />
    </template>
  </InputTableItem>
</template>
