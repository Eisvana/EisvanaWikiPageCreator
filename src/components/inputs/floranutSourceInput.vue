<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import floranutSourceDatalist from '@/datalists/floraDatalists3';

import { usePageDataStore } from '../../stores/pageData';
import { storeToRefs } from 'pinia';

const pageData = usePageDataStore();
const { nutrients } = storeToRefs(pageData);
</script>

<template>
  <InputRow>
    <template #label>
      <label>Fuente de nutrientes:</label>
    </template>

    <template #input>
      <select v-model="nutrients">
        <option
          v-for="(esfloranutSourceDatalist, enfloranutSourceDatalist) in floranutSourceDatalist"
          :value="enfloranutSourceDatalist"
        >
          {{ esfloranutSourceDatalist }}
        </option>
      </select>
    </template>
  </InputRow>
</template>
