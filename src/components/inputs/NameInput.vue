<script setup lang="ts">
import InputRow from "../structure/InputRow.vue";

import { usePageDataStore } from "../../stores/pageData";
import { storeToRefs } from "pinia";

defineProps<{
  label: string;
}>();

const pageData = usePageDataStore();
const { name } = storeToRefs(pageData);
</script>

<template>
  <InputRow>
    <template #label>
      <label for="nameInput">
        {{ label }}
      </label>
    </template>

    <template #input>
      <input v-model="name" type="text" id="nameInput" />
    </template>
  </InputRow>
</template>
