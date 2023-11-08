<script setup lang="ts">
import InputRow from '../structure/InputRow.vue';
import { usePageDataStore } from '../../stores/pageData';
import { storeToRefs } from 'pinia';

const pageData = usePageDataStore();
const { discovered, discoveredlink } = storeToRefs(pageData);

interface Props {
  type?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'Discoverer',
});
</script>

<template>
  <InputRow v-if="!discovered">
    <template #label>
      <label for="discoveredlinkInput">{{ type }} wiki name:</label>
    </template>
    <template #input>
      <input
        v-model="discoveredlink"
        type="text"
        id="discoveredlinkInput"
      />
    </template>
  </InputRow>

  <InputRow v-if="!discoveredlink">
    <template #label>
      <label for="discoveredInput">{{ type }} alias if no wiki:</label>
    </template>
    <template #input>
      <input
        v-model="discovered"
        type="text"
        id="discoveredInput"
      />
    </template>
  </InputRow>
</template>
