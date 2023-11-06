<script setup lang="ts">
import InputRow from "../structure/InputRow.vue";

import { usePageDataStore } from "../../stores/pageData";
import { storeToRefs } from "pinia";

const pageData = usePageDataStore();
const { moon } = storeToRefs(pageData);
</script>

<template>
  <InputRow>
    <template #label>
      <label for="moonInput">Name of the moon (if applicable):</label>
    </template>

    <template #input>
      <input v-model="moon" type="text" id="moonInput" />
    </template>
  </InputRow>
</template>
