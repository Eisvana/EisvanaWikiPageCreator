<script setup lang="ts">
import InputRow from "../structure/InputRow.vue";

import { usePageDataStore } from "../../stores/pageData";
import { storeToRefs } from "pinia";

const pageData = usePageDataStore();
const { orgName } = storeToRefs(pageData);
</script>

<template>
  <InputRow>
    <template #label>
      <label for="orgNameInput">
        Original name before uploading (if available):
      </label>
    </template>

    <template #input>
      <input v-model="orgName" type="text" id="orgNameInput" />
    </template>
  </InputRow>
</template>
