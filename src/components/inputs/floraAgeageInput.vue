<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import floraageDatalist from '@/datalists/floraDatalists';
import Explanation from '../structure/Explanation.vue';
import { usePageDataStore } from '../../stores/pageData';
import { storeToRefs } from 'pinia';

const pageData = usePageDataStore();
const { age } = storeToRefs(pageData);
</script>

<template>
  <InputRow>

    <template #label>
      <div class="label-combo">
        <label>Edad de la planta:</label>
      </div>
      <Explanation img="flora/age">
        Encontrado en el escaneo de flora. <template #heading>Edad de la planta</template>
        <template #content>
          Encontrado en el escaneo de flora.
        </template>
      </Explanation>
    </template>
    <template #input>
      <select v-model="age">
        <option v-for="(esfloraageDatalist, enfloraageDatalist) in floraageDatalist"
          :value="enfloraageDatalist">
          {{ esfloraageDatalist }}
        </option>
      </select>
    </template>
  </InputRow>
</template>
