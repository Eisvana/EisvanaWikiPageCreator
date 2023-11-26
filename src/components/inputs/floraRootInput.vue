<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import florarootDatalist from '@/datalists/floraDatalists5';
import Explanation from '../structure/Explanation.vue';
import { usePageDataStore } from '../../stores/pageData';
import { storeToRefs } from 'pinia';

const pageData = usePageDataStore();
const { roots } = storeToRefs(pageData);
</script>

<template>
  <InputRow>
    <template #label>
      <div class="label-combo">
        <label>Estructura radical:</label>
      </div>
      <Explanation img="flora/roots">
        Encontrado en el escaneo de flora. <template #heading>Radical</template>
        <template #content>
          Encontrado en el escaneo de flora.
        </template>
      </Explanation>
    </template>
    <template #input>
      <select v-model="roots">
        <option v-for="(esflorarootDatalist, enflorarootDatalist) in florarootDatalist"
        :value="enflorarootDatalist">
          {{ esflorarootDatalist }}
        </option>
      </select>
    </template>
  </InputRow>
</template>
