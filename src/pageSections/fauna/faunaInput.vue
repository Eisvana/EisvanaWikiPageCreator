<script setup lang="ts">
import GlyphInput from '@/components/inputs/GlyphInput.vue';
import DepartmentSelect from '@/components/inputs/DepartmentSelect.vue';
import SanitisedTextInput from '@/components/inputs/SanitisedTextInput.vue';
import SingleFileUpload from '@/components/inputs/SingleFileUpload.vue';
import TextareaInput from '@/components/inputs/TextareaInput.vue';
import GameModeSelect from '@/components/inputs/GameModeSelect.vue';
import GalleryInput from '@/components/inputs/gallery/GalleryInput.vue';

import EcosystemSelect from '@/components/inputs/fauna/EcosystemSelect.vue';
import HemisphereSelect from '@/components/inputs/fauna/HemisphereSelect.vue';
import RaritySelect from '@/components/inputs/fauna/RaritySelect.vue';
import GenusSelect from '@/components/inputs/fauna/GenusSelect.vue';
import ActivitySelect from '@/components/inputs/fauna/ActivitySelect.vue';
import GenderSelect from '@/components/inputs/fauna/GenderSelect.vue';
import BehavioursSelect from '@/components/inputs/fauna/BehavioursSelect.vue';
import DietSelect from '@/components/inputs/fauna/DietSelect.vue';
import NotesSelect from '@/components/inputs/fauna/NotesSelect.vue';

import FileUploadNotice from '@/components/FileUploadNotice.vue';

import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { watch, computed } from 'vue';

import creatureData from '@/miscLogic/creatureData';

const pageData = usePageDataStore();
const {
  name,
  discovered,
  discoveredlink,
  image,
  glyphs,
  system,
  planet,
  moon,
  mode,
  researchteam,
  orgName,
  appearance,
  genus,
  hemisphere,
  rarity,
  ecosystem,
  activity,
  gender2,
  behaviour,
  gender,
  height,
  height2,
  weight,
  weight2,
  diet,
  docBy,
  produces,
  notes,
} = storeToRefs(pageData);

const isSecondGenderVisible = computed(() => {
  return gender2.value !== "" && gender2.value !== gender.value;
});

watch(genus, (newGenus) => {
  if (newGenus && ecosystem.value) {
    produces.value = creatureData.ecosystems[ecosystem.value][newGenus]?.produces || [];
  }
});
</script>

<template>
  <SanitisedTextInput
    v-model="name"
    help-img="creature/creatureName"
    help-title="Creature Name"
    label="Creature Name:"
    tooltip="Enter exactly as it appears in the game. Be careful with 0 (zero) and O (oh)."
  >
    Enter exactly as it appears in the game. Be careful with 0 (zero) and O (oh).
  </SanitisedTextInput>

  <SingleFileUpload
    v-model="image"
    label="Main Image"
    help-title="File Upload"
    tooltip="The image will not be uploaded to the wiki. This is only for auto-completing the image name."
  >
    <FileUploadNotice />
  </SingleFileUpload>

  <SanitisedTextInput
    v-model="orgName"
    label="Original name before registering (if available):"
  />

  <SanitisedTextInput
    v-model="system"
    label="System Name:"
  />

  <SanitisedTextInput
    v-model="planet"
    label="Planet Name:"
    tooltip="Name of the planet OR the planet around which the moon orbits where the creature is found."
  />

  <SanitisedTextInput
    v-model="moon"
    label="Moon Name (if the plant is on the moon):"
    tooltip="If the creature is located on a moon. Leave blank if the plant is on a planet."
  />

  <GlyphInput v-model="glyphs" />

  <EcosystemSelect v-model="ecosystem" />
  <HemisphereSelect v-model="hemisphere" />
  <RaritySelect v-model="rarity" />
  <GenusSelect v-model="genus" />
  <ActivitySelect v-model="activity" />

  <GenderSelect
    v-model="gender"
    label="Gender:"
  />

  <GenderSelect
    v-model="gender2"
    label="Gender 2 (if applicable):"
  />

  <BehavioursSelect v-model="behaviour"/>
  <DietSelect v-model="diet"/>
  <NotesSelect v-model="notes"/>

  <SanitisedTextInput
    v-model="weight"
    label="Weight in KG:"
    maxlength="5"
    placeholder="1.5"
    tooltip="Found in the creature scan. No need to include 'kg'."
    help-img="creature/creatureWeight"
    help-title="Creature Weight"
  />

  <SanitisedTextInput
    v-if="isSecondGenderVisible"
    v-model="weight2"
    label="Weight for Gender 2: (if applicable)"
    maxlength="5"
    placeholder="1.5"
    tooltip="Found in the creature scan. No need to include 'kg'."
    help-img="creature/creatureWeight"
    help-title="Creature Weight"
  />

  <SanitisedTextInput
    v-model="height"
    label="Height in M:"
    maxlength="5"
    placeholder="1.5"
    tooltip="Found in the creature scan. No need to include 'm'."
    help-img="creature/creatureHeight"
    help-title="Creature Height"
  />

  <SanitisedTextInput
    v-if="isSecondGenderVisible"
    v-model="height2"
    label="Height for Gender 2: (if applicable)"
    maxlength="5"
    placeholder="1.5"
    tooltip="Found in the creature scan. No need to include 'm'."
    help-img="creature/creatureHeight"
    help-title="Creature Height"
  />

  <SanitisedTextInput
    v-model="discoveredlink"
    label="Discoverer's Name on the wiki:"
  />
  <SanitisedTextInput
    v-model="discovered"
    label="Discoverer's Alias if no wiki entry:"
  />

  <GameModeSelect v-model="mode" />

  <!-- <SanitisedTextInput
    v-model="researchteam"
    label="Department: (Optional)"
  /> -->

  <DepartmentSelect v-model="researchteam" />

  <SanitisedTextInput
    v-model="docBy"
    label="Documenter's Name if not the discoverer:"
  />

  <TextareaInput
    v-model="appearance"
    label="Appearance:"
    placeholder="This flora is a <size> <colour> <type>."
  />

  <!--
  <TextareaInput
    v-model="additionalInfo"
    label="Additional Information:"
  /> -->

  <GalleryInput />
</template>
