<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import floraNotesDatalist from '@/datalists/floraDatalists4';
import Explanation from '../structure/Explanation.vue';
import { usePageDataStore } from '../../stores/pageData';
import { storeToRefs } from 'pinia';

const pageData = usePageDataStore();
const { notes } = storeToRefs(pageData);
</script>

<template>
  <InputRow>
    <template #label>
      <div class="label-combo">
        <label>Notas:</label>
      </div>
      <Warning img="">
        <i>Usar el autocompletado para el cambio automático a inglés.</i>
      </Warning>
      <Explanation img="flora/notes">
        Encontrado en el escaneo de flora. <template #heading>Notas</template>
        <template #content>
          Encontrado en el escaneo de flora.
        </template>
      </Explanation>
    </template>
    <template #input>
      <input list="floraNotesDatalist" v-model="notes" type="text">
      <datalist id="floraNotesDatalist">
        <option v-for="(esfloraNotesDatalist, enfloraNotesDatalist) in floraNotesDatalist" :value="enfloraNotesDatalist">
          {{ esfloraNotesDatalist }}
        </option>
      </datalist>
    </template>
  </InputRow>
</template>
