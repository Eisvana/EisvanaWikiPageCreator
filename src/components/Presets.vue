<script setup lang="ts">
import Button from 'primevue/button';
import { reactive, ref } from 'vue';
import { defaultValuesKey } from '@/variables/localStorageKeys';
import { mappedWealthOptions } from '@/variables/wealth';
import TextInput from './TextInput.vue';
import Fluid from 'primevue/fluid';
import GlyphInput from './GlyphInput.vue';
import WealthSelect from './WealthSelect.vue';
import PlatformSelect from './PlatformSelect.vue';
import DepartmentSelect from './DepartmentSelect.vue';
import DialogWrapper from './DialogWrapper.vue';

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
  hideDialog();
}

function restoreDefaults() {
  loadData(structuredClone(defaultData));
}

function hideDialog() {
  isOpen.value = false;
}
</script>

<template>
  <Button
    aria-label="Defaults"
    icon="pi pi-sliders-h"
    title="Global Defaults"
    @click="isOpen = true"
  />

  <DialogWrapper
    v-model="isOpen"
    :closable="false"
    pt:footer:class="is-flex-wrap-wrap is-justify-content-center action-buttons"
    @show="loadData()"
  >
    <template #header>
      <h2 class="title is-4 has-text-centered mb-0 full-width">Global Preload Values</h2>
    </template>

    <Fluid class="input-grid mt-5">
      <TextInput
        v-if="!presetData.discovered"
        v-model="presetData.discoveredlink"
        label="Discoverer wiki name"
        outlined
      />
      <TextInput
        v-if="!presetData.discoveredlink"
        v-model="presetData.discovered"
        label="Discoverer alias if no wiki"
        outlined
      />
      <TextInput
        v-model="presetData.documenterName"
        label="Documenter alias if not discoverer"
        outlined
      />
      <TextInput
        v-model="presetData.system"
        label="Name of the system"
        outlined
      />
      <TextInput
        v-model="presetData.planet"
        label="Name of the planet"
        outlined
      />
      <TextInput
        v-model="presetData.moon"
        label="Name of the moon"
        outlined
      />
      <PlatformSelect v-model="presetData.platform" />
      <DepartmentSelect v-model="presetData.department" />

      <WealthSelect
        v-model="presetData.wealth"
        :options="mappedWealthOptions"
      />
    </Fluid>

    <!--that no-explain is necessary, otherwise this would cause a bug with the layout-shift-prevention logic in the DialogWrapper-->
    <GlyphInput
      v-model="presetData.glyphs"
      no-explain
    />

    <template #footer>
      <Button
        severity="success"
        label="Set"
        @click="storeData"
      />
      <Button
        severity="danger"
        label="Cancel"
        @click="hideDialog"
      />
      <Button
        severity="warn"
        label="Restore Defaults"
        @click="restoreDefaults"
      />
    </template>
  </DialogWrapper>
</template>

<style scoped>
.input-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(40%, 200px), 1fr));
  gap: 1.5rem;

  & > * {
    flex-grow: 1;
    min-width: 40%;
  }
}

.action-buttons {
  gap: 0.5rem;
}
</style>
