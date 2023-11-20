<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { departments, usePageDataStore } from '../../stores/pageData';
import InputRow from '../structure/InputRow.vue';

const pageData = usePageDataStore();
const { researchteam } = storeToRefs(pageData);
</script>

<template>
  <InputRow>
    <template #label>
      <label>¿Perteneces a un gremio?</label>
    </template>

    <template #input>
    <input
        v-model="researchteam"
        type="text"
        id="researchTeam"
        placeholder="Si es que si, di a cual"
      />
    </template>
  </InputRow>
</template>
