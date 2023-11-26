<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePageDataStore } from '../../stores/pageData';
import InputRow from '../structure/InputRow.vue';
import Explanation from '../structure/Explanation.vue';

const pageData = usePageDataStore();
const { elements } = storeToRefs(pageData);

defineProps<{
  index: number;
  resources:{[key:string]: string};
  item: string;
}>();

const verboseDescriptions = ['Primario', 'Secundario'];
</script>

<template>
  <InputRow>
    <template #label>
      <label>Elemento {{ index ? 'Secundario' : 'Primario' }}</label>
      <Explanation :img="`${item}/element` + index">
        Encontrado en el escaneo de {{ item }}.
        <template #heading>Elemento {{ verboseDescriptions[index] }}</template>
        <template #content>
          Encontrado en el escaneo de {{ item }}.
          <br />
          Dejar vacío si no está en la lista.
        </template>
      </Explanation>
    </template>
    <template #input>
      <select v-model="elements[index]">
        <option
        v-for="(esResource, enResource) in resources"
          :value="enResource"
        >
          {{ esResource }}
        </option>
      </select>
    </template>
  </InputRow>
</template>
