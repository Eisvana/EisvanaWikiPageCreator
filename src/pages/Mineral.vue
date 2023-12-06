<script setup lang="ts">
import InputColumn from '@/components/structure/InputColumn.vue';
import OutputColumn from '@/components/structure/OutputColumn.vue';
import ReleaseInput from '@/components/inputs/ReleaseInput.vue';
import SimpleInput from '@/components/inputs/SimpleInput.vue';
import InfoboxImageInput from '@/components/inputs/InfoboxImageInput.vue';
import DiscovererInputs from '@/components/inputs/DiscovererInputs.vue';
import GlyphInput from '@/components/inputs/GlyphInput.vue';
import DatalistWrapper from '@/components/inputs/DatalistWrapper.vue';
import ResourceInput from '@/components/inputs/ResourceInput.vue';
import ResearchteamInput from '@/components/inputs/ResearchteamInput.vue';
import InputRow from '@/components/structure/InputRow.vue';
import Subgrid from '@/components/structure/Subgrid.vue';
import Actions from '@/components/actions/Actions.vue';
import MineralInfobox from '@/components/infoboxes/MineralInfobox.vue';
import WikiTemplate from '@/components/structure/WikiTemplate.vue';
import ExplanationError from '@/components/structure/ExplanationError.vue';
import { addStaticPageData, forceDatalistComponent, numberErrorComponent } from '@/common';
import { usePageDataStore, useStaticPageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useDataValidationStore } from '@/stores/dataValidation';
import Explanation from '@/components/structure/Explanation.vue';
import { watchDebounced } from '@vueuse/core';
import mineralDatalists from '@/datalists/mineralDatalists';
import { useMarker } from '@/composables/useMarker';

const staticPageData = useStaticPageDataStore();
const { fullArticleElement } = storeToRefs(staticPageData);

const dataValidationStore = useDataValidationStore();

const wikiText = ref<HTMLDivElement | null>(null);

onMounted(() => {
  fullArticleElement.value = wikiText.value;
  // TODO: gallery should be integrated natively, not as separate Vue app
  addStaticPageData('galleryArray', ['', 'Scanner view', 'Discovery Menu']);
  addStaticPageData(
    'galleryExplanationExternal',
    `
	There is a preferred order of gallery pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Scanner view</li>
			<li>Discovery Menu</li>
		</ol>
 	</div>`
  );
  import('../startup/gallery');
});

const pageData = usePageDataStore();
const {
  release,
  name,
  orgName,
  image,
  discovered,
  discoveredlink,
  system,
  planet,
  moon,
  glyphs,
  content,
  formation,
  notes,
  elements,
  polymorphic,
  discDate,
  docBy,
  researchteam,
  region,
  sanitisedStrings,
  docBySentence,
  appearance,
} = storeToRefs(pageData);

const isPolymorphicInvalid = computed(() => numberErrorComponent(polymorphic.value));
const isContentInvalid = computed(() => numberErrorComponent(content.value));

const isFormationInvalid = ref('');
const isNotesInvalid = ref('');

watchDebounced(
  formation,
  () => (isFormationInvalid.value = forceDatalistComponent(formation.value, mineralDatalists.formationData)),
  {
    debounce: 500,
  }
);
watchDebounced(
  notes,
  () => (isNotesInvalid.value = forceDatalistComponent(notes.value, mineralDatalists.mineralNotesData)),
  {
    debounce: 500,
  }
);

watchEffect(() => {
  if (elements.value[0] === elements.value[1]) elements.value[1] = '';
});

const metalContent = computed(() => {
  const contentNumber = parseInt(content.value);
  if (isNaN(contentNumber)) return;
  return contentNumber + '%';
});

const filledElements = computed(() => elements.value.filter(Boolean));

const errorMessage = ref('');
const openErrorModal = ref(false);

function markCopy() {
  const { isValidData, message } = useMarker();
  errorMessage.value = message.value;
  openErrorModal.value = !isValidData.value;
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
        label="Mineral name:"
        identifier="nameInput"
        v-model="name"
        img="mineral/mineralName"
      >
        Enter exactly as seen in game. Watch out for 0 (zero) and O (o).
        <template #heading>Mineral Name</template>
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
        Planet Name OR the planet circled by the moon where the mineral can be found.
      </SimpleInput>
      <SimpleInput
        label="Name of the moon (if mineral is on moon):"
        identifier="moonInput"
        v-model="moon"
      >
        If the mineral is located on a moon. Leave blank if the mineral is on a planet.
      </SimpleInput>
      <GlyphInput />
      <SimpleInput
        v-model="content"
        :error="isContentInvalid"
        label="Metal content:"
        identifier="content"
        img="mineral/content"
        maxlength="2"
      >
        Found on the mineral scan.
        <template #heading>Metal Content</template>
        <template #content>Found on the mineral scan.</template>
      </SimpleInput>
      <SimpleInput
        v-model="formation"
        :error="isFormationInvalid"
        label="Formation process:"
        identifier="formation"
        list="formationData"
        img="mineral/formation"
      >
        Found on the mineral scan.
        <template #heading>Formation Process</template>
        <template #content>Found on the mineral scan.</template>
      </SimpleInput>
      <SimpleInput
        v-model="notes"
        :error="isNotesInvalid"
        label="Notes:"
        identifier="notes"
        list="mineralNotesData"
        img="mineral/notes"
      >
        Found on the mineral scan.
        <template #heading>Notes</template>
        <template #content>Found on the mineral scan.</template>
      </SimpleInput>
      <SimpleInput
        v-model="polymorphic"
        :error="isPolymorphicInvalid"
        identifier="polymorphic"
        label="Polymorphic (number of instances):"
        maxlength="2"
      >
        How many different models of this mineral were discovered.
        <template #heading>Polymorphic</template>
        <template #content>
          Sometimes multiple mineral models have the same name. This is called "Polymorphism". Enter the number of how
          many different mineral models had this name.
        </template>
      </SimpleInput>
      <ResourceInput
        v-for="n in 2"
        :index="n - 1"
        :resources="mineralDatalists.mineralResources"
        item="mineral"
      />
      <InputRow>
        <template #label>
          <label for="discDate">Discovery date:</label>
          <Explanation img="mineral/discDate">
            Found on the mineral scan.
            <template #heading>Discovery Date</template>
            <template #content>
              Found on the mineral scan.
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
          placeholder="This mineral is a <size> <colour> <type>."
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
      @mouseup="dataValidationStore.getSelectedText"
      @touchend="dataValidationStore.getSelectedText"
    >
      <div>
        <WikiTemplate template-name="Version">{{ release }}</WikiTemplate>
      </div>
      <MineralInfobox
        :mineral-name="sanitisedStrings.name"
        :image="image"
        :region="region"
        :systemName="sanitisedStrings.system"
        :planetName="sanitisedStrings.planet"
        :moonName="sanitisedStrings.moon"
        :content="metalContent"
        :formation="formation"
        :notes="notes"
        :elem-primary="elements[0]"
        :elem-secondary="elements[1]"
        :polymorphic="polymorphic"
        :disc-date="discDate.replaceAll('-', '/')"
        :discovered-name="sanitisedStrings.discovered"
        :discoveredlink-name="sanitisedStrings.discoveredlink"
        :researchteam="researchteam"
        :release="release"
      />
      <div>'''{{ sanitisedStrings.name }}''' is a variety of mineral.</div>
      <br />

      <div>==Summary==</div>
      <div>'''{{ sanitisedStrings.name }}''' is a type of [[mineral]]. {{ sanitisedStrings.appearance }}</div>
      <br />
      <template v-if="polymorphic">
        <div>
          <WikiTemplate template-name="Polymorphicmineral">{{ polymorphic }}</WikiTemplate>
        </div>
        <br />
      </template>

      <div>==Alias Names==</div>
      <div v-if="orgName">
        <WikiTemplate template-name="aliasc">text=Original|name={{ sanitisedStrings.orgName }}</WikiTemplate>
      </div>
      <div>
        <WikiTemplate template-name="aliasc">text=Current|name={{ sanitisedStrings.name }}</WikiTemplate>
      </div>
      <br />

      <div>==Discovery Menu==</div>
      <div>* Metal Content: {{ metalContent }}</div>
      <div>* Formation Process: {{ formation }}</div>
      <div>* Notes: {{ notes }}</div>
      <br />

      <div>==Location==</div>
      <div>
        It can be found on the
        <span v-if="moon">[[moon]] [[{{ sanitisedStrings.moon }}]] of the</span> [[planet]] [[{{ sanitisedStrings.planet }}]] in the [[{{
          sanitisedStrings.system
        }}]] [[star system]].
      </div>
      <div>
        <WikiTemplate template-name="CoordGlyphConvert">{{ glyphs }}</WikiTemplate>
      </div>
      <br />

      <div>==Resources==</div>
      <div>
        This mineral provides the
        {{ filledElements.length > 1 ? 'resources' : 'resource' }}
        {{ filledElements.map((el) => `[[${el}]]`).join(' and ') }}
        when mined.
      </div>
      <br />

      <div>==Additional Information==</div>
      <div v-if="docBy && docBy !== discoveredlink && docBy !== discovered">Documented by {{ docBySentence }}</div>
      <br />

      <div id="gallery"></div>
    </div>
  </OutputColumn>
  <DatalistWrapper
    v-for="(list, id) in mineralDatalists"
    :identifier="id"
    :data="list"
  />
</template>
