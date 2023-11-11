<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { departments, usePageDataStore } from '../../stores/pageData';
import InputRow from '../structure/InputRow.vue';

const pageData = usePageDataStore();
const { researchteam } = storeToRefs(pageData);
</script>

<template>
  <InputRow>
    <template #label>
      <label>Do you belong to a department?</label>
    </template>

    <template #input>
      <select v-model="researchteam">
        <option
          v-for="(name, short) in departments"
          :value="name"
          :key="short"
        >
          {{ short }}
        </option>
      </select>
    </template>
  </InputRow>
</template>
