<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePageDataStore } from '../../stores/pageData';
import InputRow from '../structure/InputRow.vue';
import Explanation from '../structure/Explanation.vue';

const pageData = usePageDataStore();
const { elements } = storeToRefs(pageData);

defineProps<{
  index: number;
  resources: string[];
  item: string;
}>();

const verboseDescriptions = ['Primario', 'Secundario'];
</script>

<template>
  <InputRow>
    <template #label>
      <label>Elemento {{ index ? 'Secundario' : 'Primario' }}</label>
      <Explanation :img="`${item}/element` + index">
        Encontrado en el {{ item }} escaneo.
        <template #heading>{{ verboseDescriptions[index] }} Elemento</template>
        <template #content>
          Encontrado en el {{ item }} escaneo.
          <br />
          Dejar vacío si no está en la lista.
        </template>
      </Explanation>
    </template>
    <template #input>
      <select v-model="elements[index]">
        <option
          v-for="resource in resources"
          :value="resource"
        >
          {{ resource }}
        </option>
      </select>
    </template>
  </InputRow>
</template>
