<script setup lang="ts">
import InputColumn from '@/components/structure/InputColumn.vue';
import OutputColumn from '@/components/structure/OutputColumn.vue';
import ReleaseInput from '@/components/inputs/ReleaseInput.vue';
import SimpleInput from '@/components/inputs/SimpleInput.vue';
import InfoboxImageInput from '@/components/inputs/InfoboxImageInput.vue';
import DiscovererInputs from '@/components/inputs/DiscovererInputs.vue';
import GlyphInput from '@/components/inputs/GlyphInput.vue';
import BiomeInput from '@/components/inputs/BiomeInput.vue';
import DatalistWrapper from '@/components/inputs/DatalistWrapper.vue';
import FloraResourceInput from '@/components/inputs/FloraResourceInput.vue';
import ResearchteamInput from '@/components/inputs/ResearchteamInput.vue';
import InputRow from '@/components/structure/InputRow.vue';
import Subgrid from '@/components/structure/Subgrid.vue';
import Actions from '@/components/actions/Actions.vue';
import FloraInfobox from '@/components/infoboxes/FloraInfobox.vue';
import WikiTemplate from '@/components/structure/WikiTemplate.vue';
import ExplanationError from '@/components/structure/ExplanationError.vue';
import { addStaticPageData, hashPageData, removeNewlines, sanitiseString } from '@/common';
import floraDatalists from '@/datalists/floraDatalists';
import { usePageDataStore, useStaticPageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useDataValidationStore } from '@/stores/dataValidation';
import { useMarker } from '@/composables/useMarker';
import Explanation from '@/components/structure/Explanation.vue';

const staticPageData = useStaticPageDataStore();
const { fullArticleElement } = storeToRefs(staticPageData);

const dataValidationStore = useDataValidationStore();
const { copy, text } = storeToRefs(dataValidationStore);

const wikiText = ref<HTMLDivElement | null>(null);

onMounted(() => {
  fullArticleElement.value = wikiText.value;
  // TODO: gallery should be integrated natively, not as separate Vue app
  addStaticPageData('galleryArray', ['', 'Scanner view', 'Discovery Menu']);
  import('../startup/gallery');
});

const pageData = usePageDataStore();
const {
  release,
  name,
  orgName,
  picName,
  discovered,
  discoveredlink,
  system,
  planet,
  moon,
  glyphs,
  type,
  biome,
  age,
  roots,
  nutrients,
  notes,
  elements,
  polymorphic,
  discDate,
  docBy,
  researchteam,
  appearance,
} = storeToRefs(pageData);

const plantName = computed(() => sanitiseString(name.value));
const discoveredName = computed(() => sanitiseString(discovered.value));
const discoveredlinkName = computed(() => sanitiseString(discoveredlink.value));
const systemName = computed(() => sanitiseString(system.value));
const planetName = computed(() => sanitiseString(planet.value));
const moonName = computed(() => sanitiseString(moon.value));
const originalName = computed(() => sanitiseString(orgName.value));

watchEffect(() => {
  if (elements.value[0] === elements.value[1]) elements.value[1] = '';
});

const filledElements = computed(() => elements.value.filter((el) => el));

const docBySentence = computed(() => {
  const isLink = docBy.value.startsWith('{{');
  const hasResearchteam = researchteam.value.split(' ').length > 1;
  const documenter = isLink ? docBy.value : `''${docBy.value}''`;
  const researchteamLink = researchteam.value.includes('Wiki')
    ? '[[Eisvana Wiki Scholars|Eisvana Wiki Scholar]]'
    : `[[${researchteam.value}]] member`;
  return `${hasResearchteam ? researchteamLink : ''} ${documenter}`;
});

const errorMessage = ref('');
const openErrorModal = ref(false);

function markCopy() {
  const { isValidData, message } = useMarker();
  errorMessage.value = message.value;
  openErrorModal.value = !isValidData.value;
}

function getSelectedText(e: Event) {
  // this is some stupid BS: Chrome selects the theme switch button text, despite it having user-select:none. #chromesucks
  // I have no idea how to fix this, so I will just remove the button text from the string :shrug:
  const buttonText = document.getElementById('switchTheme')?.innerText;

  const element = e.target;
  if (!(element instanceof HTMLElement && buttonText)) return;

  const wikiTextContainer = element.closest('.wikiText');

  if (!(wikiTextContainer instanceof HTMLDivElement)) return;

  const sectionText = removeNewlines(wikiTextContainer.innerText).trim();
  const selection = window.getSelection() ?? '';
  const selectedText = (() => {
    const text = removeNewlines(selection.toString()).trim();
    if (text.endsWith(buttonText)) return text.replace(buttonText, '').trim();
    return text;
  })();

  text.value = hashPageData();
  copy.value = sectionText === selectedText;
}
</script>

<template>
  <InputColumn>
    <form
      class="table"
      @submit.prevent
    >
      <ReleaseInput />
      <SimpleInput
        label="Plant name:"
        identifier="nameInput"
        v-model="name"
        img="flora/floraName"
      >
        Enter exactly as seen in game. Watch out for 0 (zero) and O (o).
        <template #heading>Plant Name</template>
        <template #content>Enter exactly as seen in game. Watch out for 0 (zero) and O (o).</template>
      </SimpleInput>
      <SimpleInput
        label="Original name before uploading (if available):"
        identifier="orgNameInput"
        v-model="orgName"
      />
      <InfoboxImageInput />
      <SimpleInput
        label="Name of the System:"
        identifier="systemInput"
        v-model="system"
      />
      <SimpleInput
        label="Name of the planet:"
        identifier="planetInput"
        v-model="planet"
      >
        Planet Name OR the planet circled by the moon where the plant can be found.
      </SimpleInput>
      <SimpleInput
        label="Name of the moon (if plant is on moon):"
        identifier="moonInput"
        v-model="moon"
      >
        If the plant is located on a moon. Leave blank if the plant is on a planet.
      </SimpleInput>
      <GlyphInput />
      <BiomeInput />
      <SimpleInput
        label="Age:"
        identifier="age"
        list="ageData"
        v-model="age"
        img="flora/age"
      >
        Found on the flora scan.
        <template #heading>Age</template>
        <template #content>Found on the flora scan.</template>
      </SimpleInput>
      <SimpleInput
        label="Root structure:"
        identifier="roots"
        list="rootData"
        v-model="roots"
        img="flora/roots"
      >
        Found on the flora scan.
        <template #heading>Root Structure</template>
        <template #content>Found on the flora scan.</template>
      </SimpleInput>
      <SimpleInput
        label="Nutrient source:"
        identifier="nutSource"
        list="nutSourceData"
        v-model="nutrients"
        img="flora/nutSource"
      >
        Found on the flora scan.
        <template #heading>Nutrient Source</template>
        <template #content>Found on the flora scan.</template>
      </SimpleInput>
      <SimpleInput
        label="Notes:"
        identifier="notes"
        list="floraNotesData"
        v-model="notes"
        img="flora/notes"
      >
        Found on the flora scan.
        <template #heading>Notes</template>
        <template #content>Found on the flora scan.</template>
      </SimpleInput>
      <SimpleInput
        label="Polymorphic (number of instances):"
        identifier="polymorphic"
        v-model="polymorphic"
      >
        How many different models of this flora were discovered.
        <template #heading>Polymorphic</template>
        <template #content>
          Sometimes multiple flora models have the same name. This is called "Polymorphism". Enter the number of how
          many different flora models had this name.
        </template>
      </SimpleInput>
      <FloraResourceInput :index="0" />
      <FloraResourceInput :index="1" />
      <InputRow>
        <template #label>
          <label for="discDate">Discovery date:</label>
          <Explanation img="flora/discDate">
            Found on the flora scan.
            <template #heading>Discovery Date</template>
            <template #content>
              Found on the flora scan.
              <br />
              The exact discovery timestamp is displayed on the top left.
            </template>
          </Explanation>
        </template>

        <template #input>
          <input
            v-model="discDate"
            id="discDate"
            type="date"
          />
        </template>
      </InputRow>
      <Subgrid>
        <InputRow>
          <p>Information about the player.</p>
        </InputRow>
        <DiscovererInputs />
        <SimpleInput
          label="Documenter if not discoverer:"
          identifier="docBy"
          v-model="docBy"
        />
        <ResearchteamInput />
      </Subgrid>
      <InputRow>
        <label for="appearance">Appearance:</label>
        <textarea
          v-model="appearance"
          id="appearance"
          placeholder="This flora is a <size> <colour> <type>."
        ></textarea>
      </InputRow>
    </form>

    <div id="galleryInput"></div>
    <div
      id="galleryItems"
      class="gallery-items-wrapper"
    ></div>

    <Actions />
  </InputColumn>

  <ExplanationError
    v-model:open="openErrorModal"
    :error-message="errorMessage"
  />

  <OutputColumn @mousedown="markCopy">
    <div
      ref="wikiText"
      class="wikiText"
      id="fullArticle"
      @mouseup="getSelectedText"
      @touchend="getSelectedText"
    >
      <div>
        <WikiTemplate template-name="Version">{{ release }}</WikiTemplate>
      </div>
      <FloraInfobox
        :plantName="plantName"
        :picName="picName"
        region=""
        :systemName="systemName"
        :planetName="planetName"
        :moonName="moonName"
        :type="type"
        :biome="biome"
        :polymorphic="polymorphic"
        :age="age"
        :roots="roots"
        :nutrients="nutrients"
        :notes="polymorphic"
        :elemPrimary="elements[0]"
        :elemSecondary="elements[1]"
        :discDate="discDate.replaceAll('-', '/')"
        :discoveredName="discoveredName"
        :discoveredlinkName="discoveredlinkName"
        :researchteam="researchteam"
        :release="release"
      />
      <div>'''{{ plantName }}''' is a species of flora.</div>
      <br />

      <div>==Summary==</div>
      <div>'''{{ plantName }}''' is a [[species]] of [[flora]]. {{ appearance }}</div>
      <br />
      <template v-if="polymorphic">
        <div>
          <WikiTemplate template-name="Polymorphic">{{ polymorphic }}</WikiTemplate>
        </div>
        <br />
      </template>

      <div>==Alias Names==</div>
      <div v-if="orgName">
        <WikiTemplate template-name="aliasc">text=Original|name={{ originalName }}</WikiTemplate>
      </div>
      <div>
        <WikiTemplate template-name="aliasc">text=Current|name={{ plantName }}</WikiTemplate>
      </div>
      <br />

      <div>==Location==</div>
      <div>
        It can be found on the
        <span v-if="moon">[[moon]] [[{{ moonName }}]] of the</span> [[planet]] [[{{ planetName }}]] in the [[{{
          systemName
        }}]] [[star system]].
      </div>
      <div>
        <WikiTemplate template-name="CoordGlyphConvert">{{ glyphs }}</WikiTemplate>
      </div>
      <br />

      <div>==Usage==</div>
      <div v-if="filledElements.length">
        This flora provides the
        {{ filledElements.length > 1 ? 'resources' : 'resource' }}
        {{ filledElements.map((el) => `[[${el}]]`).join(' and ') }}
        when harvested.
      </div>
      <div v-else>This flora provides no harvestable resources.</div>
      <br />

      <div>==Additional Information==</div>
      <div v-if="docBy">Documented by {{ docBySentence }}</div>
      <br />

      <div id="gallery"></div>
    </div>
  </OutputColumn>
  <DatalistWrapper
    v-for="(list, id) in floraDatalists"
    :identifier="id"
    :data="list"
  />
</template>
