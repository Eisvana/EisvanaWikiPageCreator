<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import creatureNotesDatalist from '@/datalists/creatureDatalists2';
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
          <Explanation img="creature/creatureNotes">
            Encontrado en el escaneo de criaturas.
            <template #heading>Notas</template>
            <template #content>
              Encontrado en el escaneo de criaturas. Puede diferir del menú de descubrimiento.
            </template>
          </Explanation>
        </template>
        <template #input>
      <input list="creatureNotesDatalist" v-model="notes" type="text">
      <datalist id="creatureNotesDatalist">
        <option v-for="(escreatureNotesDatalist, encreatureNotesDatalist) in creatureNotesDatalist"
        :value="encreatureNotesDatalist">
          {{ escreatureNotesDatalist }}
        </option>
      </datalist>
    </template>
      </InputRow>
</template>
