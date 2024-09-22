<script setup lang="ts">
import type { CivImageProps, PageLinkProps } from '@/types/homePageProps';
import CivImage from '@/components/CivImage.vue';
import Button from 'primevue/button';

const links: PageLinkProps[] = [
  {
    text: 'Base',
    url: './base.html',
  },
  // {
  //   text: 'Racetrack',
  //   url: './racetrack.html',
  // },
  // {
  //   text: 'Settlement',
  //   url: './settlement.html',
  // },
  {
    text: 'Fauna',
    url: './fauna.html',
  },
  {
    text: 'Sandworm',
    url: './sandworm.html',
  },
  {
    text: 'Flora',
    url: './flora.html',
  },
  {
    text: 'Starship',
    url: './starship.html',
  },
  {
    text: 'Multi-Tool',
    url: './multitool.html',
  },
  {
    text: 'Mineral',
    url: './mineral.html',
  },
  {
    text: 'Derelict Freighter',
    url: './derelict.html',
  },
  {
    text: 'Organic Frigate',
    url: './biofrig.html',
  },
  {
    text: 'System',
    url: './system.html',
  },
  {
    text: 'Planet',
    url: './planet.html',
  },
  {
    text: 'Moon',
    url: './moon.html',
  },
];

const images: CivImageProps[] = [
  {
    link: 'https://nomanssky.fandom.com/wiki/Eisvana',
    imgAlt: 'Eisvana logo',
    img: 'https://static.wikia.nocookie.net/nomanssky_gamepedia/images/8/85/Eisvana_Logo.png',
  },
];
</script>

<template>
  <p class="subtitle is-4 has-text-centered">Choose what page you want to create:</p>
  <nav
    aria-label="Subpages"
    class="page-options is-gap-3 mx-auto mb-6"
  >
    <Button
      v-for="link in links"
      :href="link.url"
      :label="link.text"
      as="a"
      class="is-size-4"
      size="large"
      outlined
    />
  </nav>
  <div class="is-flex is-flex-wrap-wrap is-justify-content-center is-gap-5">
    <CivImage
      v-for="image in images"
      :img="image.img"
      :img-alt="image.imgAlt"
      :link="image.link"
    />
  </div>
</template>

<style scoped>
.page-options {
  max-width: 800px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>
