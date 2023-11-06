<script setup lang="ts">
import InputRow from "../structure/InputRow.vue";

import { usePageDataStore } from "../../stores/pageData";
import { storeToRefs } from "pinia";

const pageData = usePageDataStore();
const { planet } = storeToRefs(pageData);
</script>

<template>
  <InputRow>
    <template #label>
      <label for="planetInput">Name of the planet:</label>
    </template>

    <template #input>
      <input v-model="planet" type="text" id="planetInput" />
    </template>
  </InputRow>
</template>
