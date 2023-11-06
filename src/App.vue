<script setup lang="ts">
import InputColumn from "./components/structure/InputColumn.vue";
import OutputColumn from "./components/structure/OutputColumn.vue";
import ReleaseInput from "./components/inputs/ReleaseInput.vue";
import NameInput from "./components/inputs/NameInput.vue";
import InfoboxImageInput from "./components/inputs/InfoboxImageInput.vue";
import DiscovererInputs from "./components/inputs/DiscovererInputs.vue";
import OriginalNameInput from "./components/inputs/OriginalNameInput.vue";
import SystemInput from "./components/inputs/SystemInput.vue";
import PlanetInput from "./components/inputs/PlanetInput.vue";
import MoonInput from "./components/inputs/MoonInput.vue";
import GlyphInput from "./components/inputs/GlyphInput.vue";
import BiomeInput from "./components/inputs/BiomeInput.vue";
import DatalistWrapper from "./components/inputs/DatalistWrapper.vue";
import FloraResourceInput from "./components/inputs/FloraResourceInput.vue";
import ResearchteamInput from "./components/inputs/ResearchteamInput.vue";
import InputRow from "./components/structure/InputRow.vue";

import { sanitiseString } from "./common";
import { vowels } from "./variables/simple";
import { pageData as oldPageData } from "./variables/objects";

import { usePageDataStore } from "./stores/pageData";
import { storeToRefs } from "pinia";
import { computed, onMounted, watchEffect } from "vue";
import floraDatalists from "./datalists/floraDatalists";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./modules/gallery/App.vue";

onMounted(() => {
  // TODO: gallery should be integrated natively, not as separate Vue app
  oldPageData.galleryArray = ["", "Scanner view", "Discovery Menu"];
  const app = createApp(App);

  app.use(createPinia());

  app.mount("#galleryInput");
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
} = storeToRefs(pageData);

const plantName = computed(() => sanitiseString(name.value));
const discoveredName = computed(() => sanitiseString(discovered.value));
const discoveredlinkName = computed(() => sanitiseString(discoveredlink.value));
const systemName = computed(() => sanitiseString(system.value));
const planetName = computed(() => sanitiseString(planet.value));
const moonName = computed(() => sanitiseString(moon.value));
const originalName = computed(() => sanitiseString(orgName.value));

const floraTypes = [
  "Flower",
  "Mushroom",
  "Tree",
  "Leafy Plant",
  "Cactus",
  "Coral",
  "Seaweed",
  "Infected",
  "Exotic",
];

watchEffect(() => {
  if (elements.value[0] === elements.value[1]) elements.value[1] = "";
});
</script>

<template>
  <InputColumn>
    <div class="table">
      <ReleaseInput />
      <NameInput label="Plant name:" />
      <OriginalNameInput />
      <InfoboxImageInput />
      <SystemInput />
      <PlanetInput />
      <MoonInput />
      <GlyphInput />
      <InputRow>
        <template #label>
          <label>What type of plant is this?</label>
        </template>

        <template #input>
          <select v-model="type">
            <option v-for="floraType in floraTypes" :value="floraType">
              {{ floraType }}
            </option>
          </select>
        </template>
      </InputRow>
      <BiomeInput />
      <InputRow>
        <template #label>
          <label for="age">Age:</label>
        </template>

        <template #input>
          <input v-model="age" list="ageData" id="age" type="text" />
        </template>
      </InputRow>
      <InputRow>
        <template #label>
          <label for="roots">Root structure:</label>
        </template>

        <template #input>
          <input v-model="roots" list="rootData" id="roots" type="text" />
        </template>
      </InputRow>
      <InputRow>
        <template #label>
          <label for="nutSource">Nutrient source:</label>
        </template>

        <template #input>
          <input
            v-model="nutrients"
            list="nutSourceData"
            id="nutSource"
            type="text"
          />
        </template>
      </InputRow>
      <InputRow>
        <template #label>
          <label for="notes">Notes:</label>
        </template>

        <template #input>
          <input v-model="notes" list="floraNotesData" id="notes" type="text" />
        </template>
      </InputRow>
      <FloraResourceInput :index="0" />
      <FloraResourceInput :index="1" />
      <InputRow>
        <template #label>
          <label for="discDate">Discovery date:</label>
        </template>

        <template #input>
          <input v-model="discDate" id="discDate" type="date" />
        </template>
      </InputRow>
      <InputRow>
        <p>Information about the player.</p>
      </InputRow>
      <DiscovererInputs type="Discoverer" />
      <InputRow>
        <template #label>
          <label for="docBy">Documenter if not discoverer:</label>
        </template>

        <template #input>
          <input v-model="docBy" id="docBy" type="text" />
        </template>
      </InputRow>
      <ResearchteamInput />
    </div>

    <div id="galleryInput"></div>
    <div id="galleryItems" class="gallery-items-wrapper"></div>
    <div id="actions" class="buttons"></div>
    <div id="albumActions" class="buttons"></div>
  </InputColumn>

  <OutputColumn>
    <div class="wikiText" id="fullArticle" data-link="page">
      <div>
        <span v-pre>{{Version|</span>
        <output>{{ release }}</output>
        <span v-pre>}}</span>
      </div>
      <div v-pre>{{Flora infobox</div>
      <div>| name = {{ plantName }}</div>
      <div>| image = {{ picName || "nmsMisc_NotAvailable.png" }}</div>
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
      <div>| discovered_on = {{ discDate.replaceAll("-", "/") }}</div>
      <div>| mode =</div>
      <div>| researchteam = {{ researchteam }}</div>
      <div>| release = {{ release }}</div>
      <div v-pre>}}</div>
      <div>'''{{ plantName }}''' is a species of flora.</div>
      <br />

      <div>==Summary==</div>
      <div>
        '''{{ plantName }}''' is a [[species]] of [[flora]], categorised as
        {{ vowels.includes(type.toLowerCase().slice(0, 1)) ? "an" : "a" }}
        {{ type }}.
      </div>
      <br />
      <div v-if="polymorphic">
        <span v-pre>{{polymorphic|</span><output>{{ polymorphic }}</output
        ><span v-pre>}}</span>
      </div>

      <div>==Alias Names==</div>
      <div v-if="orgName">
        <span v-pre>{{aliasc|text=Original|name=</span
        ><output>{{ originalName }}</output
        ><span v-pre>}}</span>
      </div>
      <div>
        <span v-pre>{{aliasc|text=Current|name=</span
        ><output>{{ plantName }}</output
        ><span v-pre>}}</span>
      </div>
      <br />

      <div>==Location==</div>
      <div>
        It can be found on the
        <span v-if="moon">[[moon]] [[{{ moonName }}]] of the</span> [[planet]]
        [[{{ planetName }}]] in the [[{{ systemName }}]] [[star system]].
      </div>
      <div>
        <span v-pre>{{CoordGlyphConvert|</span><output>{{ glyphs }}</output
        ><span v-pre>}}</span>
      </div>
      <br />

      <div>==Usage==</div>
      <div v-if="elements.filter((el) => el).length">
        This flora provides the
        {{ elements.filter((el) => el).length > 1 ? "resources" : "resource" }}
        {{
          elements
            .filter((el) => el)
            .map((el) => `[[${el}]]`)
            .join(" and ")
        }}
        when harvested.
      </div>
      <div v-else>This flora provides no harvestable resources.</div>
      <br />

      <div>==Additional Information==</div>
      <div v-if="docBy">
        Documented by {{ docBy.startsWith("{{") ? docBy : `''${docBy}''` }}
      </div>
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
