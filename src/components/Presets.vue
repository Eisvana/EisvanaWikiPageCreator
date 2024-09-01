<script setup lang="ts">
import { defaultValuesKey } from '@/variables/localStorageKeys';
import { reactive, ref } from 'vue';
import GlyphInput from './GlyphInput.vue';

const isOpen = ref(false);

const defaultData = {
  discovered: '',
  discoveredlink: '',
  documenterName: '',
  system: '',
  planet: '',
  moon: '',
  platform: '',
  department: '',
  glyphs: '',
  wealth: '',
};

const presetData = reactive(structuredClone(defaultData));

const isValidKey = (item: unknown): item is keyof typeof presetData => typeof item === 'string' && item in presetData;

function loadData(data?: typeof defaultData) {
  const localStorageData = localStorage.getItem(defaultValuesKey) ?? '{}';
  const jsonData = JSON.parse(localStorageData);

  const useData = data ?? jsonData;

  for (const item in useData) {
    if (isValidKey(item)) presetData[item] = useData[item];
  }
}

function storeData() {
  const jsonString = JSON.stringify(presetData);
  localStorage.setItem(defaultValuesKey, jsonString);
}

function restoreDefaults() {
  loadData(structuredClone(defaultData));
}
</script>

<template>
  <QBtn
    icon="tune"
    title="Defaults"
    fab-mini
    flat
    @click="isOpen = true"
  />

  <QDialog
    v-model="isOpen"
    no-backdrop-dismiss
    @before-show="loadData()"
  >
    <QCard class="card-wrapper">
      <QCardSection>Global Preload Values</QCardSection>
      <QCardSection class="q-gutter-md row wrap input-grid">
        <QInput
          v-if="!presetData.discovered"
          v-model="presetData.discoveredlink"
          label="Discoverer wiki name"
          outlined
        />
        <QInput
          v-if="!presetData.discoveredlink"
          v-model="presetData.discovered"
          label="Discoverer alias if no wiki:"
          outlined
        />
        <QInput
          v-model="presetData.documenterName"
          label="Documenter alias if not discoverer:"
          outlined
        />
        <QInput
          v-model="presetData.system"
          label="Name of the system:"
          outlined
        />
        <QInput
          v-model="presetData.planet"
          label="Name of the planet:"
          outlined
        />
        <QInput
          v-model="presetData.moon"
          label="Name of the moon:"
          outlined
        />
        <QSelect
          v-model="presetData.platform"
          label="Platform:"
          outlined
        />
        <QSelect
          v-model="presetData.department"
          label="Department:"
          outlined
        />
        <QSelect
          v-model="presetData.wealth"
          label="System wealth:"
          outlined
        />
        <GlyphInput />
      </QCardSection>
      <QCardSection class="q-gutter-x-md">
        <QBtn
          color="positive"
          label="Set"
          text-color="dark"
          v-close-popup
          @click="storeData"
        />
        <QBtn
          color="negative"
          label="Cancel"
          v-close-popup
        />
        <QBtn
          color="warning"
          label="Restore Defaults"
          text-color="dark"
          @click="restoreDefaults"
        />
      </QCardSection>
    </QCard>
  </QDialog>
</template>

<style scoped lang="scss">
.card-wrapper {
  max-width: 650px;
}

.input-grid {
  display: flex;
  flex-wrap: wrap;
  flex-basis: 40%;
  gap: 1rem;

  & > * {
    flex-grow: 1;
  }
}
</style>
