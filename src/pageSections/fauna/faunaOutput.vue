<script setup lang="ts">
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { civName as civilized } from '@/variables/civilization';
import WikiTemplate from '@/components/WikiTemplate.vue';
import { computed } from 'vue';
import GalleryOutput from '@/components/inputs/gallery/GalleryOutput.vue';

const pageData = usePageDataStore();
const {
  name,
  release,
  image,
  discovered,
  discoveredlink,
  researchteamValue: researchteam,
  system,
  planet,
  moon,
  glyphs,
  mode,
  regionData,
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
  produces,
  notes,
  docBy,
  docBySentence,
} = storeToRefs(pageData);

const combinedGender = computed(() => {
  if (gender.value && gender2.value && gender.value !== gender2.value) {
    return `${gender.value} - ${gender2.value}`;
  }
  return gender.value || gender2.value || '';

});

const combinedWeight = computed(() => {
  if (weight.value && weight2.value && weight.value !== weight2.value) {
    return `${weight.value} - ${weight2.value}`;
  }
  return weight.value || weight2.value || '';
});

const combinedHeight = computed(() => {
  if (height.value && height2.value && height.value !== height2.value) {
    return `${height.value} - ${height2.value}`;
  }
  return height.value || height2.value || '';
});
</script>

<template>
  <div><span v-pre>{{Version|</span>{{ release }}<span v-pre>}}</span></div>
  <!-- <div><span v-pre>{{</span>Eisvana<span v-pre>}}</span></div> -->
  <div v-pre>{{Base infobox</div>
  <div>| name = {{ name }}</div>
  <div>| image = {{ image }}</div>
  <div>| galaxy = {{ regionData.galaxy }}</div>
  <div>| region = {{ regionData.region }}</div>
  <div>| system = {{ system }}</div>
  <div>| planet = {{ planet }}</div>
  <div>| moon = {{ moon }}</div>
  <div>| coordinates = <WikiTemplate template-name="Glyphs2Coords">{{ glyphs }}</WikiTemplate></div>
  <div>| hemisphere = {{ hemisphere }}</div>
  <div>| rarity = {{ rarity }}</div>
  <div>| ecosystem = {{ ecosystem }}</div>
  <div>| activity = {{ activity }}</div>
  <div>| gender = {{ combinedGender }}</div>
  <div>| behaviour = {{ behaviour }}</div>
  <div>| diet = {{ diet }}</div>
  <div>| weight = {{ combinedWeight }}</div>
  <div>| height = {{ combinedHeight }}</div>
  <div>| notes = {{ notes }}</div>
  <div>| produces = {{ produces }}</div>
  <div>| genus = {{ genus }}</div>
  <div>| civilized = {{ civilized }}</div>
  <div>| discovered = {{ discovered }}</div>
  <div>| discoveredlink = {{ discoveredlink }}</div>
  <div>| mode = {{ mode }}</div>
  <div>| researchteam = {{ researchteam }}</div>
  <div>| release = {{ release }}</div>

  <div v-pre>}}</div>
  <div>'''{{ name }}''' is a species of flora.</div>
  <br />
  <div>==Summary==</div>
  <div>'''{{ name }}''' is a [[creature]], a member of the {{ genus }} [[genus]].</div>
  <br />
  <div>==Appearance==</div>
  <div class="keep-linebreaks">{{ appearance }}</div>
  <br />
  <div>==Discovery Menu==</div>
  <div>'''Additional Observations''': {{ notes }}</div>
  <br />
  <div>==Alias Names==</div>
  <div class="keep-linebreaks" v-if="orgName">
    <WikiTemplate template-name="aliasc">text=Original|name={{ orgName }}</WikiTemplate>
  </div>
  <div class="keep-linebreaks">
    <WikiTemplate template-name="aliasc">text=Current|name={{ name }}</WikiTemplate>
  </div>
  <br />
  <div>==Additional Information==</div>
      <div v-if="docBy && docBy !== discoveredlink && docBy !== discovered">Documented by {{ docBySentence }}</div>
      <br />
  <div>==Gallery==</div>
  <GalleryOutput />
</template>
