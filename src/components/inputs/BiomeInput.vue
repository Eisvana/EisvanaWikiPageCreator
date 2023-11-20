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
      <label>¿En qué bioma se encuentra esta planta?</label>
    </template>

    <template #input>
      <select v-model="biome">
        <option value="Lush">Rico </option>
    <option value="Barren">Estéril</option>
    <option value="Dead">Muerto</option>
    <option value="Exotic">Exótico</option>
    <option value="Mega Exotic">Mega Exótico</option>
    <option value="Scorched">Quemado</option>
    <option value="Frozen">Congelado</option>
    <option value="Toxic">Tóxico</option>
    <option value="Irradiated">Irradiado</option>
    <option value="Marsh">Cenagal</option>
    <option value="Volcanic">Volcanico</option>
      </select>
    </template>
  </InputRow>
</template>
