<script setup lang="ts">
import { storeToRefs } from 'pinia';
import floraDatalists from '../../datalists/floraDatalists';
import { usePageDataStore } from '../../stores/pageData';
import InputRow from '../structure/InputRow.vue';

const pageData = usePageDataStore();
const { elements } = storeToRefs(pageData);

defineProps<{
  index: number;
}>();
</script>

<template>
  <InputRow>
    <template #label>
      <label>{{ index ? 'Secondary' : 'Primary' }} element</label>
    </template>
    <template #input>
      <select v-model="elements[index]">
        <option
          v-for="resource in floraDatalists.floraResources"
          :value="resource"
        >
          {{ resource }}
        </option>
      </select>
    </template>
  </InputRow>
</template>
