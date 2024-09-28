<script setup lang="ts">
import DepartmentSelect from '@/components/inputs/DepartmentSelect.vue';
import GlyphInput from '@/components/inputs/GlyphInput.vue';
import PlatformSelect from '@/components/inputs/PlatformSelect.vue';
import SanitisedTextInput from '@/components/inputs/SanitisedTextInput.vue';
import SingleFileUpload from '@/components/inputs/SingleFileUpload.vue';
import TextareaInput from '@/components/inputs/TextareaInput.vue';
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';
import Fieldset from 'primevue/fieldset';
import type { CheckboxData } from '@/types/checkboxTypes';
import GridCheckboxWrapper from '@/components/GridCheckboxWrapper.vue';
import GameModeSelect from '@/components/inputs/GameModeSelect.vue';
import CoordinateInput from '@/components/inputs/CoordinateInput.vue';
import GalleryInput from '@/components/inputs/gallery/GalleryInput.vue';
import FileUploadNotice from '@/components/FileUploadNotice.vue';
import CensusInputs from '@/components/inputs/CensusInputs.vue';

const pageData = usePageDataStore();
const {
  name,
  discovered,
  discoveredlink,
  image,
  glyphs,
  type,
  system,
  planet,
  moon,
  axes,
  platform,
  mode,
  researchteam,
  farm,
  geobay,
  landingpad,
  terminal,
  arena,
  racetrack,
  layout,
  features,
  additionalInfo,
} = storeToRefs(pageData);

const featureCheckboxes: CheckboxData[] = reactive([
  { model: farm, label: 'Farm' },
  { model: geobay, label: 'Geobay' },
  { model: landingpad, label: 'Landing Pad' },
  { model: terminal, label: 'Terminal' },
  { model: arena, label: 'Arena' },
  { model: racetrack, label: 'Racetrack' },
]);
</script>

<template>
  <SanitisedTextInput
    v-model="name"
    help-img="base/baseName"
    help-title="Base Name"
    label="Name"
    tooltip="Enter exactly as seen in game. Watch out for 0 (zero) and O (o)."
  >
    Enter exactly as seen in game. Watch out for 0 (zero) and O (o).
  </SanitisedTextInput>
  <SingleFileUpload
    v-model="image"
    label="Main image"
    help-title="File Upload"
    tooltip="Picture won't be uploaded to the wiki. This is only to autofill the image name."
  >
    <FileUploadNotice />
  </SingleFileUpload>
  <SanitisedTextInput
    v-model="system"
    label="System"
  />
  <SanitisedTextInput
    v-model="planet"
    label="Planet"
    tooltip="Planet Name OR the planet circled by the moon where the base can be found."
  />
  <SanitisedTextInput
    v-model="moon"
    label="Moon"
    tooltip="If the base is located on a moon. Leave blank if the base is on a planet."
  />
  <CoordinateInput v-model="axes" />
  <GlyphInput v-model="glyphs" />
  <SanitisedTextInput
    v-model="type"
    label="Type of the base"
    tooltip="Type and purpose of the base."
    help-title="Base Type"
  >
    <div class="dialog-center">
      <ul class="dialog-list">
        <li>Artistic</li>
        <li>Embassy</li>
        <li>Farm</li>
        <li>Headquarters</li>
        <li>Industrial</li>
        <li>Memorial</li>
        <li>Residential</li>
      </ul>
    </div>
  </SanitisedTextInput>

  <Fieldset
    class="mb-4"
    legend="Features"
  >
    <GridCheckboxWrapper :checkboxes="featureCheckboxes" />
  </Fieldset>

  <SanitisedTextInput
    v-model="discoveredlink"
    label="Builder wiki name"
  />
  <SanitisedTextInput
    v-model="discovered"
    label="Builder alias if no wiki"
  />

  <GameModeSelect v-model="mode" />
  <PlatformSelect v-model="platform" />
  <DepartmentSelect v-model="researchteam" />

  <CensusInputs />

  <div class="is-flex is-flex-direction-column is-gap-2">
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

  <GalleryInput />
</template>
