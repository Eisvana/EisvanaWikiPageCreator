<script setup lang="ts">
import Button from 'primevue/button';
import { nextTick, ref, watch } from 'vue';
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
import { storeToRefs } from 'pinia';
import { syncRefs, useCloned } from '@vueuse/core';
import { emitGlobalEvent } from '@/helpers/event';
import { defaultData } from '@/variables/preset';

const isOpen = ref(false);

// I spent hours trying to figure out how to get this working. Now it works. Don't touch it.

const pageData = usePageDataStore();
const { presetData: storedPresetData } = storeToRefs(pageData);

const { cloned: clonedPresetData, sync } = useCloned(storedPresetData);

const initialValues = ref(clonedPresetData.value);

const presetData = ref(clonedPresetData.value);

syncRefs(clonedPresetData, [presetData, initialValues]);

watch(isOpen, sync);

const resetEvent = 'preset-reset';

function storeData() {
  const jsonString = JSON.stringify(presetData.value);
  localStorage.setItem(defaultValuesKey, jsonString);
  pageData.$patch({ presetData: presetData.value });
  hideDialog();
}

function restoreDefaults() {
  initialValues.value = structuredClone(defaultData);
  presetData.value.glyphs = '';
  nextTick(() => emitGlobalEvent(resetEvent));
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
        :initial-value="initialValues.discoveredlink"
        label="Discoverer wiki name"
        :reset-event
      />
      <SmallSanitisedTextInput
        v-if="!presetData.discoveredlink"
        v-model="presetData.discovered"
        :initial-value="initialValues.discovered"
        label="Discoverer alias if no wiki"
        :reset-event
      />
      <SmallSanitisedTextInput
        v-model="presetData.documenterName"
        :initial-value="initialValues.documenterName"
        label="Documenter alias if not discoverer"
        :reset-event
      />
      <SmallSanitisedTextInput
        v-model="presetData.system"
        :initial-value="initialValues.system"
        label="Name of the system"
        :reset-event
      />
      <SmallSanitisedTextInput
        v-model="presetData.planet"
        :initial-value="initialValues.planet"
        label="Name of the planet"
        :reset-event
      />
      <SmallSanitisedTextInput
        v-model="presetData.moon"
        :initial-value="initialValues.moon"
        label="Name of the moon"
        :reset-event
      />
      <PlatformSelect
        v-model="presetData.platform"
        :reset-event
      />

      <DepartmentSelect
        v-model="presetData.researchteam"
        :reset-event
      />

      <WealthSelect
        v-model="presetData.wealth"
        :options="mappedWealthOptions"
        :reset-event
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
