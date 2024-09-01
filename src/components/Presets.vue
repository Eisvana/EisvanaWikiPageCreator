<script setup lang="ts">
import { reactive, ref } from 'vue';

const localStorageKey = 'defaultSettings';

const isOpen = ref(false);

const defaultData = {
  discovererName: '',
  discovererWikiName: '',
  documenterName: '',
  systemName: '',
  planetName: '',
  moonName: '',
  platform: '',
  department: '',
  glyphs: '',
  systemWealth: '',
};

const presetData = reactive(structuredClone(defaultData));

const isValidKey = (item: unknown): item is keyof typeof presetData => typeof item === 'string' && item in presetData;

function loadData(data?: typeof defaultData) {
  const localStorageData = localStorage.getItem(localStorageKey) ?? '{}';
  const jsonData = JSON.parse(localStorageData);

  const useData = data ?? jsonData;

  for (const item in useData) {
    if (isValidKey(item)) presetData[item] = useData[item];
  }
}

function storeData() {
  const jsonString = JSON.stringify(presetData);
  localStorage.setItem(localStorageKey, jsonString);
  isOpen.value = false;
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
    <QCard>
      <QCardSection>Heading</QCardSection>
      <QCardSection class="q-gutter-y-md">
        <QInput
          v-model="presetData.discovererWikiName"
          label="Discoverer wiki name"
          filled
        />
        <QInput
          v-model="presetData.discovererName"
          label="Discoverer alias if no wiki:"
          outlined
        />
        <QInput
          v-model="presetData.documenterName"
          label="Documenter alias if not discoverer:"
        />
        <QInput
          v-model="presetData.systemName"
          label="Name of the system:"
        />
        <QInput
          v-model="presetData.planetName"
          label="Name of the planet:"
        />
        <QInput
          v-model="presetData.moonName"
          label="Name of the moon:"
        />
        <QSelect
          v-model="presetData.platform"
          label="Platform:"
        />
        <QSelect
          v-model="presetData.department"
          label="Department:"
        />
        <QSelect
          v-model="presetData.systemWealth"
          label="System wealth:"
        />
      </QCardSection>
      <QCardSection>
        <QBtn
          label="Set"
          @click="storeData"
        />
        <QBtn
          label="Cancel"
          @click="isOpen = false"
        />
        <QBtn
          label="Restore Defaults"
          @click="restoreDefaults"
        />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
