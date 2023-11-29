<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import creatureBehaviourDatalist from '@/datalists/creatureDatalists3';
import Explanation from '../structure/Explanation.vue';
import { usePageDataStore } from '../../stores/pageData';
import { storeToRefs } from 'pinia';

const pageData = usePageDataStore();
const { behaviours } = storeToRefs(pageData);
</script>

<template>
    <InputRow>
        <template #label>
          <div class="label-combo">
          <label>Comportamiento:</label>
          </div>
          <Explanation img="creature/creatureBehaviour">
            Encontrado en el escaneo de criaturas.
            <template #heading>Comportamiento</template>
            <template #content>
              Encontrado en el escaneo de criaturas.
            </template>
          </Explanation>
        </template>
        <template #input>
      <input list="floraNotesDatalist" v-model="behaviours" type="text">
      <datalist id="floraNotesDatalist">
        <option v-for="(escreatureBehaviourDatalist, encreatureBehaviourDatalist) in creatureBehaviourDatalist" :value="encreatureBehaviourDatalist">
          {{ escreatureBehaviourDatalist }}
        </option>
      </datalist>
    </template>
      </InputRow>
</template>
