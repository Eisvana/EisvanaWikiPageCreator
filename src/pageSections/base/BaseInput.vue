<script setup lang="ts">
// import CheckboxInput from '@/components/CheckboxInput.vue';
// import CheckboxSection from '@/components/CheckboxSection.vue';
// import DepartmentSelect from '@/components/DepartmentSelect.vue';
import GlyphInput from '@/components/GlyphInput.vue';
// import PlatformSelect from '@/components/PlatformSelect.vue';
import InputTableItem from '@/components/InputTableItem.vue';
import SingleFileUpload from '@/components/SingleFileUpload.vue';
import TextareaInput from '@/components/TextareaInput.vue';
import TextInput from '@/components/TextInput.vue';
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import Checkbox from 'primevue/checkbox';
import DatePicker from 'primevue/datepicker';
import Divider from 'primevue/divider';
import Panel from 'primevue/panel';
import { ref } from 'vue';

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
  <TextInput
    v-model="name"
    label="Name"
  />
  <SingleFileUpload
    v-model="image"
    label="Main image"
  />
  <TextInput
    v-model="system"
    label="System"
  />
  <TextInput
    v-model="planet"
    label="Planet"
  />
  <TextInput
    v-model="moon"
    label="Moon"
  />
  <TextInput
    v-model="axes"
    label="Planetary Coords"
  />
  <GlyphInput v-model="glyphs" />
  <TextInput
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

  <TextInput
    v-model="discoveredlink"
    label="Builder wiki name"
  />
  <TextInput
    v-model="discovered"
    label="Builder alias if no wiki"
  />

  <!-- <PlatformSelect v-model="platform" />
  <DepartmentSelect v-model="researchteam" /> -->

  <Divider />

  <Panel
    v-model:collapsed="isCollapsed"
    header="Census"
    toggleable
  >
    <template #toggleicon>
      <span :class="`pi pi-chevron-${isCollapsed ? 'down' : 'up'}`"></span>
    </template>
    <TextInput
      v-model="censusplayer"
      help-img="base/playerName"
      help-title="Player Name"
      label="Ingame name"
      tooltip="Your ingame name"
      >Your ingame name. Don't include any ingame titles.
    </TextInput>
    <TextInput
      v-model="censusreddit"
      label="Reddit name"
      tooltip='Your Reddit name. "u/" not necessary'
    />
    <TextInput
      v-model="censussocial"
      label="Social media name"
      tooltip="Social Media profile if you don't have Reddit (Facebook, Instagram, Wiki, etc). Put the full link here"
    />
    <TextInput
      v-model="censusdiscord"
      label="Discord name"
      tooltip="Your Discord name. Please give your username, not your display name"
    />
    <TextInput
      v-model="censusfriend"
      help-img="base/friendCode"
      help-title="NMS Friend Code"
      label="Friend code"
      tooltip="Can be found in the Options"
    >
      You can find your friend code in the Options &rarr; Network &rarr; View No Man's Sky Friends List &rarr; Show My
      No Man's Sky Friend Code
    </TextInput>
    <InputTableItem>
      <template #label>
        <label for="date-input">Day of arrival in Eisvana</label>
      </template>
      <template #input>
        <DatePicker
          v-model="censusarrival"
          date-format="yy-mm-dd"
          icon-display="input"
          input-id="date-input"
          show-icon
        />
      </template>
    </InputTableItem>
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

  <Divider />

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

  <Divider />
</template>

<style scoped>
.textareas {
  gap: 1rem;
}
</style>
