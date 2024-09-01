<script setup lang="ts">
import type { CivImageProps, PageLinkProps } from '@/types/homePageProps';
import CivImage from '@/components/CivImage.vue';

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
  <p class="q-pt-md text-h5 text-center">Choose what page you want to create:</p>
  <nav
    aria-label="Subpages"
    class="page-options q-mt-lg q-mb-xl q-mx-auto"
  >
    <QBtn
      v-for="link in links"
      :href="link.url"
      color="primary"
      size="xl"
      no-caps
      outline
    >
      {{ link.text }}
    </QBtn>
  </nav>
  <div class="eisvana-images">
    <CivImage
      v-for="image in images"
      :img="image.img"
      :img-alt="image.imgAlt"
      :link="image.link"
    />
  </div>
</template>

<style scoped lang="scss">
.eisvana-images {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2.5rem;
}

.page-options {
  max-width: 800px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5em;
}
</style>
