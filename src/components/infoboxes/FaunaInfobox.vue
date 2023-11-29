<script setup lang="ts">
import WikiTemplate from '../structure/WikiTemplate.vue';

defineProps<{
  creatureName?: string;
  hub?: string;
  galaxy?: string;
  region?: string;
  image?: string;
  systemName?: string;
  planetName?: string;
  coordinates?: string;
  moonName?: string;
  glyphs?: string;
  hemisphere?: string;
  rarity?: string;
  ecosystem?: string;
  activity?: string;
  gender?: string;
  gender2?: string;
  notes?: string;
  behaviours?: string;
  diet?: string;
  weight?: string;
  height?: string;
  genus?: string;
  produces?: string;
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
    template-name="Creature infobox"
  >
    <div>| name = {{ creatureName }}</div>
    <div>| image = {{ image || 'nmsMisc_NotAvailable.png' }}</div>
    <div>| galaxy = {{ galaxy }}</div>
    <div>| region = {{ region }}</div>
    <div>| system = {{ systemName }}</div>
    <div>| planet = {{ planetName }}</div>
    <div>| moon = {{ moonName }}</div>
    <div>| coordinates =  <WikiTemplate template-name="Glyphs2Coords">{{ glyphs }}</WikiTemplate></div>
    <div>| hemisphere = {{ hemisphere }}</div>
		<div>| rarity = {{ rarity }}</div>
    <div>| ecosystem = {{ ecosystem }}</div>
		<div>| activity = {{ activity }}</div>
		<div>| gender = {{ gender }} {{ gender2 }}</div>
    <div>| behaviour = {{ behaviours }}</div>
		<div>| diet = {{ diet }}</div>
		<div>| weight = {{ weight }}</div>
		<div>| height = {{ height }}</div>
		<div>| notes = {{ notes }}</div>
		<div>| produces = {{ produces }}</div>
		<div>| genus = {{ genus }}</div>
    <div>| civilized = {{ hub }}</div>
    <div>| discovered = {{ discoveredName }}</div>
    <div>| discoveredlink = {{ discoveredlinkName }}</div>
    <div>| mode = {{ mode }}</div>
    <div>| researchteam = {{ researchteam }}</div>
    <div>| release = {{ release }}</div>
  </WikiTemplate>
</template>
