<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePageDataStore } from '../../stores/pageData';
import { reactive } from 'vue';
import { getCurrentHTMLFile } from '../../common';
import InputRow from '../structure/InputRow.vue';

const pageData = usePageDataStore();
const { researchteam } = storeToRefs(pageData);

const departments = reactive({
  '': 'Eisvana',
  'Wiki Scholars': 'Eisvana Wiki Scholars',
  EBC: 'Eisvana Builder Collective',
});

if (getCurrentHTMLFile() === 'base') departments[''] = '';
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
