<script setup lang="ts">
import CheckboxInput from '@/components/CheckboxInput.vue';
import CheckboxSection from '@/components/CheckboxSection.vue';
import GlyphInput from '@/components/GlyphInput.vue';
import WikiDataTextInput from '@/components/WikiDataTextInput.vue';
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';

const pageData = usePageDataStore();
const {
  name,
  discovered,
  glyphs,
  type,
  discoveredlink,
  system,
  planet,
  moon,
  axes,
  farm,
  geobay,
  landingpad,
  terminal,
  arena,
  racetrack,
  censusplayer,
  censussocial,
  censusreddit,
  censusdiscord,
  censusfriend,
  censusarrival,
  censusshow,
} = storeToRefs(pageData);
</script>

<template>
  <WikiDataTextInput
    v-model="name"
    label="Name"
  />
  <WikiDataTextInput
    v-model="discoveredlink"
    label="Builder wiki name"
  />
  <WikiDataTextInput
    v-model="discovered"
    label="Builder alias if no wiki"
  />
  <WikiDataTextInput
    v-model="system"
    label="System"
  />
  <WikiDataTextInput
    v-model="planet"
    label="Planet"
  />
  <WikiDataTextInput
    v-model="moon"
    label="Moon"
  />
  <WikiDataTextInput
    v-model="axes"
    label="Planetary Coords"
  />
  <GlyphInput v-model="glyphs" />
  <WikiDataTextInput
    v-model="type"
    label="Type of the base"
  />
  <div>Features</div>
  <CheckboxSection>
    <CheckboxInput
      v-model="farm"
      label="Farm"
    />
    <CheckboxInput
      v-model="geobay"
      label="Geobay"
    />
    <CheckboxInput
      v-model="landingpad"
      label="Landing Pad"
    />
    <CheckboxInput
      v-model="arena"
      label="Arena"
    />
    <CheckboxInput
      v-model="terminal"
      label="Trade Terminal"
    />
    <CheckboxInput
      v-model="racetrack"
      label="Racetrack"
    />
  </CheckboxSection>

  <div>Census</div>
  <WikiDataTextInput
    v-model="censusplayer"
    label="Ingame name"
  />
  <WikiDataTextInput
    v-model="censusreddit"
    label="Reddit name"
  />
  <WikiDataTextInput
    v-model="censussocial"
    label="Social media name"
  />
  <WikiDataTextInput
    v-model="censusdiscord"
    label="Discord name"
  />
  <WikiDataTextInput
    v-model="censusfriend"
    label="Friend code"
  />
  <WikiDataTextInput
    v-model="censusarrival"
    label="Day of arrival in Eisvana"
    type="date"
  />
  <QCheckbox
    v-model="censusshow"
    label="Create census entry"
  />
</template>
