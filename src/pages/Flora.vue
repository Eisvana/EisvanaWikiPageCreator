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
import Actions from '@/components/structure/Actions.vue';

import { addStaticPageData, sanitiseString } from '@/common';
import floraDatalists from '@/datalists/floraDatalists';

import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watchEffect } from 'vue';

onMounted(() => {
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

const wikiText = ref<HTMLDivElement | null>();
const triedCopy = ref<boolean>(false);
const copiedSuccessful = ref<boolean>(false);

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

function copyArticle() {
  triedCopy.value = true;
  if (wikiText.value) {
    const copyTextContent = wikiText.value.innerText.replaceAll('\n\n\n', '\n\n');
    navigator.clipboard.writeText(copyTextContent);
  }
  copiedSuccessful.value = Boolean(wikiText.value); // checks if the wikitext value is set or null

  setTimeout(() => {
    triedCopy.value = false;
  }, 1500); // NoSonar wait 1.5 seconds before resetting the button
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
      />
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
      />
      <SimpleInput
        label="Name of the moon (if plant is on moon):"
        identifier="moonInput"
        v-model="moon"
      />
      <GlyphInput />
      <BiomeInput />
      <SimpleInput
        label="Age:"
        identifier="age"
        list="ageData"
        v-model="age"
      />
      <SimpleInput
        label="Root structure:"
        identifier="roots"
        list="rootData"
        v-model="roots"
      />
      <SimpleInput
        label="Nutrient source:"
        identifier="nutSource"
        list="nutSourceData"
        v-model="nutrients"
      />
      <SimpleInput
        label="Notes:"
        identifier="notes"
        list="floraNotesData"
        v-model="notes"
      />
      <FloraResourceInput :index="0" />
      <FloraResourceInput :index="1" />
      <InputRow>
        <template #label>
          <label for="discDate">Discovery date:</label>
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
          placeholder="This flora is..."
        ></textarea>
      </InputRow>
    </form>

    <div id="galleryInput"></div>
    <div
      id="galleryItems"
      class="gallery-items-wrapper"
    ></div>

    <Actions
      :copiedSuccessful="copiedSuccessful"
      :triedCopy="triedCopy"
      @copy="copyArticle"
    />
  </InputColumn>

  <OutputColumn>
    <div
      ref="wikiText"
      class="wikiText"
      id="fullArticle"
      data-link="page"
    >
      <div>
        <span v-pre>{{Version|</span>
        <output>{{ release }}</output>
        <span v-pre>}}</span>
      </div>
      <div v-pre>{{Flora infobox</div>
      <div>| name = {{ plantName }}</div>
      <div>| image = {{ picName || 'nmsMisc_NotAvailable.png' }}</div>
      <div>| galaxy = Eissentam</div>
      <div>| region =</div>
      <div>| system = {{ systemName }}</div>
      <div>| planet = {{ planetName }}</div>
      <div>| moon = {{ moonName }}</div>
      <div>| civilized = Eisvana</div>
      <div>| type = {{ type }}</div>
      <div>| biome = {{ biome }}</div>
      <div>| polymorphic = {{ polymorphic }}</div>
      <div>| age = {{ age }}</div>
      <div>| roots = {{ roots }}</div>
      <div>| nut_source = {{ nutrients }}</div>
      <div>| notes = {{ notes }}</div>
      <div>| element_primary = {{ elements[0] }}</div>
      <div>| element_secondary = {{ elements[1] }}</div>
      <div>| discoveredlink = {{ discoveredlinkName }}</div>
      <div>| discovered = {{ discoveredName }}</div>
      <div>| discovered_on = {{ discDate.replaceAll('-', '/') }}</div>
      <div>| mode =</div>
      <div>| researchteam = {{ researchteam }}</div>
      <div>| release = {{ release }}</div>
      <div v-pre>}}</div>
      <div>'''{{ plantName }}''' is a species of flora.</div>
      <br />

      <div>==Summary==</div>
      <div>'''{{ plantName }}''' is a [[species]] of [[flora]]. {{ appearance }}</div>
      <br />
      <div v-if="polymorphic">
        <span v-pre>{{polymorphic|</span><output>{{ polymorphic }}</output
        ><span v-pre>}}</span>
      </div>

      <div>==Alias Names==</div>
      <div v-if="orgName">
        <span v-pre>{{aliasc|text=Original|name=</span><output>{{ originalName }}</output
        ><span v-pre>}}</span>
      </div>
      <div>
        <span v-pre>{{aliasc|text=Current|name=</span><output>{{ plantName }}</output
        ><span v-pre>}}</span>
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
        <span v-pre>{{CoordGlyphConvert|</span><output>{{ glyphs }}</output
        ><span v-pre>}}</span>
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
      <div v-if="docBy">Documented by {{ docBy.startsWith('{{') ? docBy : `''${docBy}''` }}</div>
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
