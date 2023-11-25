<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import floranutSourceDatalist from '@/datalists/floraDatalists3';
import Explanation from '../structure/Explanation.vue';
import { usePageDataStore } from '../../stores/pageData';
import { storeToRefs } from 'pinia';

const pageData = usePageDataStore();
const { nutrients } = storeToRefs(pageData);
</script>

<template>
  <InputRow>

    <template #label>
      <div class="label-combo">
        <label>Fuente de nutrientes:</label>
      </div>
      <Explanation img="flora/nutSource">
        Encontrado en el escaneo de flora. <template #heading>Fuente de nutrientes</template>
        <template #content>
          Encontrado en el escaneo de flora.
        </template>
      </Explanation>
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
