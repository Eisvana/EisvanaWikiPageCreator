<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePageDataStore } from '../../stores/pageData';
import InputRow from '../structure/InputRow.vue';

const pageData = usePageDataStore();
const { biome } = storeToRefs(pageData);

const biomes = [
  'Lush',
  'Barren',
  'Dead',
  'Exotic',
  'Mega Exotic',
  'Scorched',
  'Frozen',
  'Toxic',
  'Irradiated',
  'Marsh',
  'Volcanic',
];
</script>

<template>
  <InputRow>
    <template #label>
      <label>In which biome is this plant?</label>
    </template>

    <template #input>
      <select v-model="biome">
        <option
          v-for="biome in biomes"
          :value="biome"
        >
          {{ biome }}
        </option>
      </select>
    </template>
  </InputRow>
</template>
