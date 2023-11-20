<script setup lang="ts">
import WikiTemplate from '../structure/WikiTemplate.vue';

defineProps<{
  plantName?: string;
  region?: string;
  image?: string;
  systemName?: string;
  planetName?: string;
  moonName?: string;
  type?: string;
  biome?: string;
  polymorphic?: string;
  age?: string;
  roots?: string;
  nutrients?: string;
  notes?: string;
  elemPrimary?: string;
  elemSecondary?: string;
  discoveredlinkName?: string;
  discoveredName?: string;
  discDate?: string;
  mode?: string;
  researchteam?: string;
  release?: string;
}>();
</script>

<template>
  <WikiTemplate
    :is-single-line="false"
    template-name="Flora infobox"
  >
    <div>| name = {{ plantName }}</div>
    <div>| image = {{ image || 'nmsMisc_NotAvailable.png' }}</div>
    <div>| galaxy = Eissentam</div>
    <div>| region = {{ region }}</div>
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
    <div>| element_primary = {{ elemPrimary }}</div>
    <div>| element_secondary = {{ elemSecondary }}</div>
    <div>| discoveredlink = {{ discoveredlinkName }}</div>
    <div>| discovered = {{ discoveredName }}</div>
    <div>| discovered_on = {{ discDate }}</div>
    <div>| mode = {{ mode }}</div>
    <div>| researchteam = {{ researchteam }}</div>
    <div>| release = {{ release }}</div>
  </WikiTemplate>
</template>
