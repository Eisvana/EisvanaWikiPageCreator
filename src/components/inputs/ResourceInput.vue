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

const verboseDescriptions = ['Primary', 'Secondary'];
</script>

<template>
  <InputRow>
    <template #label>
      <label>{{ index ? 'Secondary' : 'Primary' }} element</label>
      <Explanation :img="`${item}/element` + index">
        Found on the {{ item }} scan.
        <template #heading>{{ verboseDescriptions[index] }} Element</template>
        <template #content>
          Found on the {{ item }} scan.
          <br />
          Leave empty if it isn't listed.
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
