<script setup lang="ts">
import InputRow from "../structure/InputRow.vue";

import { usePageDataStore } from "../../stores/pageData";
import { storeToRefs } from "pinia";

const pageData = usePageDataStore();
const { system } = storeToRefs(pageData);
</script>

<template>
  <InputRow>
    <template #label>
      <label for="systemInput">Name of the system:</label>
    </template>

    <template #input>
      <input v-model="system" type="text" id="systemInput" />
    </template>
  </InputRow>
</template>
