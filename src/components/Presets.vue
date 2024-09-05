<script setup lang="ts">
import { defaultValuesKey } from '@/variables/localStorageKeys';
import { computed, reactive, ref } from 'vue';
import GlyphInput from './GlyphInput.vue';
import { mappedDepartmentOptions } from '@/variables/departments';
import { mappedPlatformOptions } from '@/variables/platforms';
import { wealth } from '@/variables/wealth';
import QSelectPreset from './QSelectPreset.vue';

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
      <QCardSection>
        <h2 class="text-h4 no-margin">Global Preload Values</h2>
      </QCardSection>
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
          label="Discoverer alias if no wiki"
          outlined
        />
        <QInput
          v-model="presetData.documenterName"
          label="Documenter alias if not discoverer"
          outlined
        />
        <QInput
          v-model="presetData.system"
          label="Name of the system"
          outlined
        />
        <QInput
          v-model="presetData.planet"
          label="Name of the planet"
          outlined
        />
        <QInput
          v-model="presetData.moon"
          label="Name of the moon"
          outlined
        />
        <QSelectPreset
          v-model="presetData.platform"
          :options="mappedPlatformOptions"
          label="Platform"
        />
        <QSelectPreset
          v-model="presetData.department"
          :options="mappedDepartmentOptions"
          label="Department"
        />
        <QSelectPreset
          v-model="presetData.wealth"
          :options="mappedWealthOptions"
          label="System wealth"
          use-input
        />
        <GlyphInput v-model="presetData.glyphs" />
      </QCardSection>
      <QCardActions class="q-mb-md q-gutter-x-md">
        <QBtn
          class="q-ml-lg"
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
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<style scoped lang="scss">
.card-wrapper {
  max-width: 650px;
}

.input-grid {
  gap: 0.5rem;

  & > * {
    flex-grow: 1;
    min-width: 40%;
  }
}
</style>
