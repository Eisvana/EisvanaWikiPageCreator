<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { computed, reactive, ref } from 'vue';
import { defaultValuesKey } from '@/variables/localStorageKeys';
import { wealth } from '@/variables/wealth';
import TextInput from './TextInput.vue';
import Fluid from 'primevue/fluid';

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

const mappedWealthOptions = computed(() =>
  Object.entries(wealth)
    .flatMap((item) => item[1].map((option) => ({ label: option, value: option })))
    .toSorted((a, b) => {
      const nameA = a.label.toUpperCase(); // ignore upper and lowercase
      const nameB = b.label.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        // names must be equal
        return 0;
      }
    })
);

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

  <Dialog
    v-model:visible="isOpen"
    :closable="false"
    :draggable="false"
    pt:root:class="preset-dialog-wrapper mx-4"
    pt:footer:class="is-flex-wrap-wrap is-justify-content-center action-buttons"
    modal
    @show="loadData()"
  >
    <template #header>
      <h2 class="title is-4 has-text-centered mb-0 heading">Global Preload Values</h2>
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
      <!-- <PlatformSelect
            v-model="presetData.platform"
            spaced
          />
          <DepartmentSelect
            v-model="presetData.department"
            spaced
          />
          <QSelectPreset
            v-model="presetData.wealth"
            :options="mappedWealthOptions"
            label="System wealth"
            spaced
            use-input
          />-->
    </Fluid>
    <!--
        <GlyphInput
          v-model="presetData.glyphs"
          spaced
        /> -->

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
  </Dialog>
</template>

<style scoped>
.heading {
  width: 100%;
}

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

<style>
.preset-dialog-wrapper {
  width: min(100%, 640px);
}
</style>
