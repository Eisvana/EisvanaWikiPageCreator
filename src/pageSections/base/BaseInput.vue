<script setup lang="ts">
// import CheckboxInput from '@/components/CheckboxInput.vue';
// import CheckboxSection from '@/components/CheckboxSection.vue';
import DepartmentSelect from '@/components/DepartmentSelect.vue';
import GlyphInput from '@/components/GlyphInput.vue';
import PlatformSelect from '@/components/PlatformSelect.vue';
import InputTableItem from '@/components/InputTableItem.vue';
import SmallSanitisedTextInput from '@/components/SmallSanitisedTextInput.vue';
import SingleFileUpload from '@/components/SingleFileUpload.vue';
import TextareaInput from '@/components/TextareaInput.vue';
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import Checkbox from 'primevue/checkbox';
import Panel from 'primevue/panel';
import { ref } from 'vue';
import DateSelect from '@/components/DateSelect.vue';

const pageData = usePageDataStore();
const {
  name,
  discovered,
  image,
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

const isCollapsed = ref(false);
</script>

<template>
  <SmallSanitisedTextInput
    v-model="name"
    label="Name"
  />
  <SingleFileUpload
    v-model="image"
    label="Main image"
  />
  <SmallSanitisedTextInput
    v-model="system"
    label="System"
  />
  <SmallSanitisedTextInput
    v-model="planet"
    label="Planet"
  />
  <SmallSanitisedTextInput
    v-model="moon"
    label="Moon"
  />
  <SmallSanitisedTextInput
    v-model="axes"
    label="Planetary Coords"
  />
  <GlyphInput v-model="glyphs" />
  <SmallSanitisedTextInput
    v-model="type"
    label="Type of the base"
  />
  <!-- <CheckboxSection>
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
  </CheckboxSection> -->

  <SmallSanitisedTextInput
    v-model="discoveredlink"
    label="Builder wiki name"
  />
  <SmallSanitisedTextInput
    v-model="discovered"
    label="Builder alias if no wiki"
  />

  <PlatformSelect v-model="platform" />
  <DepartmentSelect v-model="researchteam" />

  <Panel
    v-model:collapsed="isCollapsed"
    class="my-4"
    header="Census"
    toggleable
  >
    <template #toggleicon>
      <span :class="`pi pi-chevron-${isCollapsed ? 'down' : 'up'}`"></span>
    </template>
    <SmallSanitisedTextInput
      v-model="censusplayer"
      help-img="base/playerName"
      help-title="Player Name"
      label="Ingame name"
      tooltip="Your ingame name"
      >Your ingame name. Don't include any ingame titles.
    </SmallSanitisedTextInput>
    <SmallSanitisedTextInput
      v-model="censusreddit"
      label="Reddit name"
      tooltip='Your Reddit name. "u/" not necessary'
    />
    <SmallSanitisedTextInput
      v-model="censussocial"
      label="Social media name"
      tooltip="Social Media profile if you don't have Reddit (Facebook, Instagram, Wiki, etc). Put the full link here"
    />
    <SmallSanitisedTextInput
      v-model="censusdiscord"
      label="Discord name"
      tooltip="Your Discord name. Please enter your username, not your display name"
    />
    <SmallSanitisedTextInput
      v-model="censusfriend"
      help-img="base/friendCode"
      help-title="NMS Friend Code"
      label="Friend code"
      tooltip="Can be found in the Options"
    >
      You can find your friend code in the Options &rarr; Network &rarr; View No Man's Sky Friends List &rarr; Show My
      No Man's Sky Friend Code
    </SmallSanitisedTextInput>
    <DateSelect
      v-model="censusarrival"
      label="Date of arrival in Eisvana"
    />
    <InputTableItem>
      <template #label>
        <label for="census-checkbox">Create census entry</label>
      </template>
      <template #input>
        <Checkbox
          v-model="censusshow"
          false-value=""
          input-id="census-checkbox"
          true-value="Y"
          binary
        />
      </template>
    </InputTableItem>
  </Panel>

  <div class="is-flex is-flex-direction-column textareas">
    <TextareaInput
      v-model="layout"
      label="Base Layout"
      type="TextareaInput"
    />
    <TextareaInput
      v-model="features"
      label="Base Features"
      type="TextareaInput"
    />
    <TextareaInput
      v-model="additionalInfo"
      label="Additional Information"
      type="TextareaInput"
    />
  </div>
</template>

<style scoped>
.textareas {
  gap: 1rem;
}
</style>
