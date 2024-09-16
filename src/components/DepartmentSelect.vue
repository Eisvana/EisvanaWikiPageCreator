<script setup lang="ts">
import { useId } from '@/helpers/id';
import SelectDropdown from './SelectDropdown.vue';
import { mappedDepartmentOptions } from '@/variables/departments';
import InputTableItem from './InputTableItem.vue';
import { watchEffect } from 'vue';

const model = defineModel<string | null>({ required: true });

const id = useId('department-');

watchEffect(() => (model.value ??= ''));
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
        :options="mappedDepartmentOptions"
        show-clear
      />
    </template>
  </InputTableItem>
</template>
