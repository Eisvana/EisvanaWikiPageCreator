<script setup lang="ts">
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { civName as civilized } from '@/variables/civilization';
import { booleanToYesNo } from '@/helper/booleanFormatting';

const pageData = usePageDataStore();
const {
  name,
  release,
  image,
  discovered,
  discoveredlink,
  axes,
  researchteam,
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
  gallery,
} = storeToRefs(pageData);

const censusrenewal = new Date().getUTCFullYear();
</script>

<template>
  <div><span v-pre>{{Version|</span>{{ release }}<span v-pre>}}</span></div>
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
  <div>| farm = {{ booleanToYesNo(farm) }}</div>
  <div>| geobay = {{ booleanToYesNo(geobay) }}</div>
  <div>| landingpad = {{ booleanToYesNo(landingpad) }}</div>
  <div>| arena = {{ booleanToYesNo(arena) }}</div>
  <div>| terminal = {{ booleanToYesNo(terminal) }}</div>
  <div>| racetrack = {{ booleanToYesNo(racetrack) }}</div>
  <div>| censusplayer = {{ censusplayer }}</div>
  <div>| censussocial = {{ censussocial }}</div>
  <div>| censusreddit = {{ censusreddit }}</div>
  <div>| censusdiscord = {{ censusdiscord }}</div>
  <div>| censusfriend = {{ censusfriend }}</div>
  <div>| censusarrival = {{ censusarrival }}</div>
  <div>| censusrenewal = {{ censusrenewal }}</div>
  <div>| censusshow = {{ censusshow }}</div>
  <div v-pre>}}</div>
  <div>'''{{ name }}''' is a player base.</div>
  <br />
  <div>==Summary==</div>
  <!--TODO: Add moon sentence-->
  <div>
    '''{{ name }}''' is a [[Habitable Base|player base]], located on the planet [[{{ planet }}]] in the [[{{ system }}]]
    system.
  </div>
  <br />
  <div>==Layout==</div>
  <br />
  <div>==Features==</div>
  <br />
  <div>==Additional Information==</div>
  <br />
  <div>==Gallery==</div>
  <div>&lt;gallery&gt;</div>
  <div>{{ gallery }}</div>
  <div>&lt;/gallery&gt;</div>
</template>
