<script setup lang="ts">
import WikiDataTextInput from '@/components/WikiDataTextInput.vue';
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';

const pageData = usePageDataStore();
const { name } = storeToRefs(pageData);
</script>

<template>
  <WikiDataTextInput
    v-model="name"
    label="Name"
  />
</template>
