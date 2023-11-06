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
import InputRow from "./components/structure/InputRow.vue";

import { sanitiseString } from "./common";

import { usePageDataStore } from "./stores/pageData";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const pageData = usePageDataStore();
const {
  release,
  name,
  picName,
  discovered,
  discoveredlink,
  system,
  planet,
  moon,
  glyphs,
} = storeToRefs(pageData);

const plantName = computed(() => sanitiseString(name.value));
const discoveredName = computed(() => sanitiseString(discovered.value));
const discoveredlinkName = computed(() => sanitiseString(discoveredlink.value));
const systemName = computed(() => sanitiseString(system.value));
const planetName = computed(() => sanitiseString(planet.value));
const moonName = computed(() => sanitiseString(moon.value));
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
      <DiscovererInputs type="Discoverer" />
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
      <div>| civilized =</div>
      <div>| biome =</div>
      <div>| type =</div>
      <div>| polymorphic =</div>
      <div>| age =</div>
      <div>| roots =</div>
      <div>| nut_source =</div>
      <div>| notes =</div>
      <div>| element_primary =</div>
      <div>| element_secondary =</div>
      <div>| discoveredlink = {{ discoveredlinkName }}</div>
      <div>| discovered = {{ discoveredName }}</div>
      <div>| discovered_on =</div>
      <div>| mode =</div>
      <div>| researchteam =</div>
      <div>| release = {{ release }}</div>
      <div v-pre>}}</div>
      <div>'''{{ plantName }}''' is a species of flora.</div>
      <br />

      <div>==Summary==</div>
      <div>
        '''{{ plantName }}''' is a [[species]] of [[flora]], categorised as a
        FLORATYPE.
      </div>
      <br />

      <div>==Alias Names==</div>
      <div v-pre>{{aliasc|text=Original|name=DefaultName}}</div>
      <div v-pre>{{aliasc|text=Current|name=RenamedName}}</div>
      <br />

      <div>==Location==</div>
      <div>
        It can be found on the [[planet]] [[PlanetName]] in the [[SystemName]]
        [[star system]].
      </div>
      <div>
        <span v-pre>{{CoordGlyphConvert|</span><output>{{ glyphs }}</output
        ><span v-pre>}}</span>
      </div>
      <br />

      <div>==Usage==</div>
      <div>
        This flora provides the resource [[ResourceName]] when harvested.
      </div>
      <br />

      <div>==Additional Information==</div>
      <br />

      <div>==Gallery==</div>
      <div>&lt;gallery&gt;</div>
      <div>nmsMisc_NotAvailable.png|Scanner view</div>
      <div>nmsMisc_NotAvailable.png|Discovery Menu</div>
      <div>nmsMisc_NotAvailable.png|Other image</div>
      <div>&lt;/gallery&gt;</div>
    </div>
  </OutputColumn>
</template>
