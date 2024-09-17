<script setup lang="ts">
import Button from 'primevue/button';
import { onMounted, ref, toRaw, watch, type Ref } from 'vue';
import { defaultValuesKey } from '@/variables/localStorageKeys';
import { mappedWealthOptions } from '@/variables/wealth';
import Fluid from 'primevue/fluid';
import GlyphInput from './GlyphInput.vue';
import WealthSelect from './WealthSelect.vue';
import PlatformSelect from './PlatformSelect.vue';
import DepartmentSelect from './DepartmentSelect.vue';
import DialogWrapper from './DialogWrapper.vue';
import SmallSanitisedTextInput from './SmallSanitisedTextInput.vue';
import { usePageDataStore } from '@/stores/pageData';
import { defaultData } from '@/variables/preset';
import type { PresetData } from '@/types/preset';
import { storeToRefs } from 'pinia';
import { toReactive } from '@vueuse/core';

const isOpen = ref(false);

const pageData = usePageDataStore();
const { presetData: storedPresetData } = storeToRefs(pageData);

// TODO: the inputs don't reset because we can't control their dirty model

function cloneRef(obj: Ref) {
  const reactiveObj = toReactive(obj);
  const rawObj = toRaw(reactiveObj);
  const clonedObj = structuredClone(rawObj);
  return clonedObj;
}

const presetData = ref<PresetData>(cloneRef(storedPresetData));

watch(isOpen, () => loadData());

function loadData(data?: PresetData) {
  presetData.value = data ?? cloneRef(storedPresetData);
}

function storeData() {
  const jsonString = JSON.stringify(presetData.value);
  localStorage.setItem(defaultValuesKey, jsonString);
  pageData.$patch({ presetData: presetData.value });
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
  >
    <template #header>
      <h2 class="title is-4 has-text-centered mb-0 full-width">Global Preload Values</h2>
    </template>

    <Fluid class="mt-5">
      <SmallSanitisedTextInput
        v-if="!presetData.discovered"
        v-model="presetData.discoveredlink"
        initial-value=""
        label="Discoverer wiki name"
      />
      <SmallSanitisedTextInput
        v-if="!presetData.discoveredlink"
        v-model="presetData.discovered"
        initial-value=""
        label="Discoverer alias if no wiki"
      />
      <SmallSanitisedTextInput
        v-model="presetData.documenterName"
        initial-value=""
        label="Documenter alias if not discoverer"
      />
      <SmallSanitisedTextInput
        v-model="presetData.system"
        initial-value=""
        label="Name of the system"
      />
      <SmallSanitisedTextInput
        v-model="presetData.planet"
        initial-value=""
        label="Name of the planet"
      />
      <SmallSanitisedTextInput
        v-model="presetData.moon"
        initial-value=""
        label="Name of the moon"
      />
      <PlatformSelect v-model="presetData.platform" />
      <DepartmentSelect v-model="presetData.researchteam" />

      <WealthSelect
        v-model="presetData.wealth"
        :options="mappedWealthOptions"
      />

      <!--that no-explain is necessary, otherwise this would cause a bug with the layout-shift-prevention logic in the DialogWrapper-->
      <GlyphInput
        v-model="presetData.glyphs"
        no-explain
      />
    </Fluid>

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
.action-buttons {
  gap: 0.5rem;
}
</style>
