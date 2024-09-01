<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const discovererName = ref('');
</script>

<template>
  <QBtn
    icon="tune"
    title="Defaults"
    fab-mini
    flat
    @click="isOpen = true"
  />

  <QDialog v-model="isOpen">
    <QCard>
      <QCardSection>Heading</QCardSection>
      <QCardSection>
        <QInput
          v-model="discovererName"
          label="Discoverer Name"
        />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
