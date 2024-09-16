<script setup lang="ts">
import SelectDropdown from './SelectDropdown.vue';
import { mappedWealthOptions } from '@/variables/wealth';
import InputTableItem from './InputTableItem.vue';
import { useId } from '@/helpers/id';

const model = defineModel<string>({ required: true });

const id = useId('wealth-');
</script>

<template>
  <InputTableItem>
    <template #label>
      <label :id>System wealth</label>
    </template>

    <template #input>
      <SelectDropdown
        v-model="model"
        :aria-labelledby="id"
        :options="mappedWealthOptions"
      />
    </template>
  </InputTableItem>
</template>
