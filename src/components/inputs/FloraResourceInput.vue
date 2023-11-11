<script setup lang="ts">
import { storeToRefs } from 'pinia';
import floraDatalists from '../../datalists/floraDatalists';
import { usePageDataStore } from '../../stores/pageData';
import InputRow from '../structure/InputRow.vue';
import Explanation from '../structure/Explanation.vue';

const pageData = usePageDataStore();
const { elements } = storeToRefs(pageData);

defineProps<{
  index: number;
}>();

const verboseDescriptions = ['Primary', 'Secondary'];
</script>

<template>
  <InputRow>
    <template #label>
      <label>{{ index ? 'Secondary' : 'Primary' }} element</label>
      <Explanation :img="`flora/element${index.toString()}`">
        Found on the flora scan.
        <template #heading>{{ verboseDescriptions[index] }} Element</template>
        <template #content>
          Found on the flora scan.
          <br />
          Leave empty if it isn't listed.
        </template>
      </Explanation>
    </template>
    <template #input>
      <select v-model="elements[index]">
        <option
          v-for="resource in floraDatalists.floraResources"
          :value="resource"
        >
          {{ resource }}
        </option>
      </select>
    </template>
  </InputRow>
</template>
