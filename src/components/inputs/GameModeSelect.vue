<script setup lang="ts">
import { useId } from '@/helpers/id';
import InputTableItem from '../InputTableItem.vue';
import SelectDropdown from './SelectDropdown.vue';
import { mappedModeOptions } from '@/variables/gamemodes';

defineProps<{ resetEvent?: string }>();

const model = defineModel<string>({ required: true });

const id = useId('gamemode-');
</script>

<template>
  <InputTableItem>
    <template #label>
      <label :id>Gamemode</label>
    </template>

    <template #input>
      <SelectDropdown
        v-model="model"
        :aria-labelledby="id"
        :options="mappedModeOptions"
        :reset-event
      />
    </template>
  </InputTableItem>
</template>
