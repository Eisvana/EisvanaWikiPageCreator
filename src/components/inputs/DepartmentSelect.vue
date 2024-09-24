<script setup lang="ts">
import { useId } from '@/helpers/id';
import SelectDropdown from './SelectDropdown.vue';
import { mappedDepartmentOptions } from '@/variables/departments';
import InputTableItem from '../InputTableItem.vue';

defineProps<{ resetEvent?: string }>();

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
        :initial-value="null"
        :options="mappedDepartmentOptions"
        :reset-event
        show-clear
      />
    </template>
  </InputTableItem>
</template>
