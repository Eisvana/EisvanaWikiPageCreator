<script setup lang="ts">
import InputRow from "../structure/InputRow.vue";
import { usePageDataStore } from "../../stores/pageData";
import { storeToRefs } from "pinia";

const pageData = usePageDataStore();
const { picName } = storeToRefs(pageData);

function addPicName(e: Event) {
  if (!e.target || !(e.target instanceof HTMLInputElement)) return;

  const file = e.target.files?.[0];
  picName.value = file?.name ?? "";
}
</script>

<template>
  <InputRow>
    <template #label>
      <label for="picInput">Main image name, including file extension:</label>
    </template>

    <template #input>
      <input v-model="picName" type="text" id="picInput" />
      <input type="file" @change="addPicName" />
    </template>
  </InputRow>
</template>
