<script setup lang="ts">
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { civName as civilized } from '@/variables/civilization';
import { computed } from 'vue';
import GalleryOutput from '@/components/gallery/GalleryOutput.vue';

const pageData = usePageDataStore();
const {
  name,
  release,
  image,
  discovered,
  discoveredlink,
  axes,
  researchteamValue: researchteam,
  system,
  planet,
  moon,
  glyphs,
  type,
  platform,
  mode,
  regionData,
  farm,
  geobay,
  landingpad,
  arena,
  terminal,
  racetrack,
  censusplayer,
  censussocial,
  censusreddit,
  censusdiscord,
  censusfriend,
  censusarrival,
  censusshow,
  features,
  layout,
  additionalInfo,
} = storeToRefs(pageData);

const censusrenewal = new Date().getUTCFullYear();

const locationSentence = computed(() => {
  const planetSentence = `planet [[${planet.value}]]`;
  const moonSentence = `moon [[${moon.value}]] of the`;
  return moon.value ? `${moonSentence} ${planetSentence}` : planetSentence;
});
</script>

<template>
  <div><span v-pre>{{Version|</span>{{ release }}<span v-pre>}}</span></div>
  <div><span v-pre>{{</span>Eisvana<span v-pre>}}</span></div>
  <div v-pre>{{Base infobox</div>
  <div>| name = {{ name }}</div>
  <div>| image = {{ image }}</div>
  <div>| civilized = {{ civilized }}</div>
  <div>| researchteam = {{ researchteam }}</div>
  <div>| builderlink = {{ discoveredlink }}</div>
  <div>| builder = {{ discovered }}</div>
  <div>| galaxy = Eissentam</div>
  <div>| region = {{ regionData.region }}</div>
  <div>| system = {{ system }}</div>
  <div>| planet = {{ planet }}</div>
  <div>| moon = {{ moon }}</div>
  <div>| axes = {{ axes }}</div>
  <div>| coordinates = <span v-pre>{{Glyphs2Coords|</span>{{ glyphs }}<span v-pre>}}</span></div>
  <div>| portalglyphs = {{ glyphs }}</div>
  <div>| type = {{ type }}</div>
  <div>| mode = {{ mode }}</div>
  <div>| platform = {{ platform }}</div>
  <div>| release = {{ release }}</div>
  <div>| farm = {{ farm }}</div>
  <div>| geobay = {{ geobay }}</div>
  <div>| landingpad = {{ landingpad }}</div>
  <div>| arena = {{ arena }}</div>
  <div>| terminal = {{ terminal }}</div>
  <div>| racetrack = {{ racetrack }}</div>
  <div>| censusplayer = {{ censusplayer }}</div>
  <div>| {{ censusreddit ? 'censusreddit' : 'censussocial' }} = {{ censussocial || censusreddit }}</div>
  <div>| censusdiscord = {{ censusdiscord }}</div>
  <div>| censusfriend = {{ censusfriend }}</div>
  <div>| censusarrival = {{ censusarrival }}</div>
  <div>| censusrenewal = {{ censusrenewal }}</div>
  <div>| censusshow = {{ censusshow }}</div>
  <div v-pre>}}</div>
  <div>'''{{ name }}''' is a player base.</div>
  <br />
  <div>==Summary==</div>
  <div>
    '''{{ name }}''' is a [[Habitable Base|player base]], located on the {{ locationSentence }} in the [[{{ system }}]]
    system.
  </div>
  <br />
  <div>==Layout==</div>
  <div class="keep-linebreaks">{{ layout }}</div>
  <br />
  <div>==Features==</div>
  <div class="keep-linebreaks">{{ features }}</div>
  <br />
  <div>==Additional Information==</div>
  <div class="keep-linebreaks">{{ additionalInfo }}</div>
  <br />
  <div>==Gallery==</div>
  <GalleryOutput />
</template>
