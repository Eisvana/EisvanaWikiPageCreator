<script setup lang="ts">
import { useId } from '@/helpers/id';
import InputTableItem from '../structure/InputTableItem.vue';
import SelectDropdown from './SelectDropdown.vue';
import { mappedPlatformOptions } from '@/variables/platforms';

defineProps<{ resetEvent?: string }>();

const model = defineModel<string>({ required: true });

const id = useId('platform-');
</script>

<template>
  <InputTableItem>
    <template #label>
      <label :id>Platform</label>
    </template>

    <template #input>
      <SelectDropdown
        v-model="model"
        :aria-labelledby="id"
        :options="mappedPlatformOptions"
        :reset-event
      />
    </template>
  </InputTableItem>
</template>
