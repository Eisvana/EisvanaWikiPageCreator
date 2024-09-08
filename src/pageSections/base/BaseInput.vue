<script setup lang="ts">
import CheckboxInput from '@/components/CheckboxInput.vue';
import CheckboxSection from '@/components/CheckboxSection.vue';
import DepartmentSelect from '@/components/DepartmentSelect.vue';
import GlyphInput from '@/components/GlyphInput.vue';
import PlatformSelect from '@/components/PlatformSelect.vue';
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
  platform,
  researchteam,
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
  layout,
  features,
  additionalInfo,
} = storeToRefs(pageData);
</script>

<template>
  <WikiDataTextInput
    v-model="name"
    label="Name"
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

  <WikiDataTextInput
    v-model="discoveredlink"
    label="Builder wiki name"
  />
  <WikiDataTextInput
    v-model="discovered"
    label="Builder alias if no wiki"
  />

  <PlatformSelect v-model="platform" />
  <DepartmentSelect v-model="researchteam" />

  <QSeparator spaced />

  <QExpansionItem
    label="Census"
    default-opened
  >
    <QCardSection>
      <WikiDataTextInput
        v-model="censusplayer"
        help-img="base/playerName"
        help-title="Player Name"
        label="Ingame name"
        tooltip="Your ingame name"
        >Your ingame name. Don't include any ingame titles.
      </WikiDataTextInput>
      <WikiDataTextInput
        v-model="censusreddit"
        label="Reddit name"
        tooltip='Your Reddit name. "u/" not necessary'
      />
      <WikiDataTextInput
        v-model="censussocial"
        label="Social media name"
        tooltip="Social Media profile if you don't have Reddit (Facebook, Instagram, Wiki, etc). Put the full link here"
      />
      <WikiDataTextInput
        v-model="censusdiscord"
        label="Discord name"
        tooltip="Your Discord name. Please give your username, not your display name"
      />
      <WikiDataTextInput
        v-model="censusfriend"
        help-img="base/friendCode"
        help-title="NMS Friend Code"
        label="Friend code"
        tooltip="Can be found in the Options"
      >
        You can find your friend code in the Options &rarr; Network &rarr; View No Man's Sky Friends List &rarr; Show My
        No Man's Sky Friend Code
      </WikiDataTextInput>
      <WikiDataTextInput
        v-model="censusarrival"
        label="Day of arrival in Eisvana"
        type="date"
      />
      <QCheckbox
        v-model="censusshow"
        false-value=""
        label="Create census entry"
        true-value="Y"
      />
    </QCardSection>
  </QExpansionItem>

  <QSeparator spaced />

  <WikiDataTextInput
    v-model="layout"
    label="Base Layout"
    type="textarea"
  />
  <WikiDataTextInput
    v-model="features"
    label="Base Features"
    type="textarea"
  />
  <WikiDataTextInput
    v-model="additionalInfo"
    label="Additional Information"
    type="textarea"
  />

  <QSeparator spaced />
</template>
