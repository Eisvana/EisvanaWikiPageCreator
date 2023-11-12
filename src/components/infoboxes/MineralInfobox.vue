<script setup lang="ts">
import WikiTemplate from '../structure/WikiTemplate.vue';

defineProps<{
  mineralName?: string;
  image?: string;
  region?: string;
  systemName?: string;
  planetName?: string;
  moonName?: string;
  content?: string;
  formation?: string;
  notes?: string;
  elemPrimary?: string;
  elemSecondary?: string;
  polymorphic?: string;
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
    template-name="Mineral infobox"
  >
    <div>| name = {{ mineralName }}</div>
    <div>| image = {{ image || 'nmsMisc_NotAvailable.png' }}</div>
    <div>| galaxy = Eissentam</div>
    <div>| region = {{ region }}</div>
    <div>| system = {{ systemName }}</div>
    <div>| planet = {{ planetName }}</div>
    <div>| moon = {{ moonName }}</div>
    <div>| content = {{ content }}</div>
    <div>| formation = {{ formation }}</div>
    <div>| notes = {{ notes }}</div>
    <div>| element_primary = {{ elemPrimary }}</div>
    <div>| element_secondary = {{ elemSecondary }}</div>
    <div>| polymorphic = {{ polymorphic }}</div>
    <div>| civilized = Eisvana</div>
    <div>| discoveredlink = {{ discoveredlinkName }}</div>
    <div>| discovered = {{ discoveredName }}</div>
    <div>| discovered_on = {{ discDate }}</div>
    <div>| mode = {{ mode }}</div>
    <div>| researchteam = {{ researchteam }}</div>
    <div>| release = {{ release }}</div>
  </WikiTemplate>
</template>
