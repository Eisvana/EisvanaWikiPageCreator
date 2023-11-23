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
        <option value="Ferrite dust">Polvo de Ferrita</option>
        <option value="Pure ferrite">Ferrita pura</option>
        <option value="Di-hydrogen">Dihidrogeno</option>
        <option value="Chromatic Metal">Metal cromatico</option>
        <option value="Sodium">Sodio</option>
        <option value="Oxygen">Oxigeno</option>
        <option value="Cobalt">Cobalto</option>
        <option value="Ionised Cobalt">Cobalto ionizado</option>
        <option value="Copper">Cobre</option>
        <option value="Silver">Plata</option>
        <option value="Tritium">Tritio</option>
        <option value="Carbon">Carbono</option>
        <option value="Salt">Sal</option>
        <option value="Chlorine">Clorina</option>
      </select>
    </template>
  </InputRow>
</template>
