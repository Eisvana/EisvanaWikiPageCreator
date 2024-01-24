<script setup lang="ts">
import PageLink from '@/components/structure/PageLink.vue';
import CivImage from '@/components/structure/CivImage.vue';
import type {CivImageProps, PageLinkProps } from '@/types/objects';

const links: PageLinkProps[] = [
  {
    text: 'Bases Censo',
    url: './base.html',
  },
  {
    text: 'Bases Normales',
    url: './basenocensus.html',
  },
  // {
  //   text: 'Bases (TESTING)',
  //   url: './basepruebas.html',
  // },
   {
     text: 'Circuitos',
     url: './racetrack.html',
   },
   {
     text: 'Asentamientos',
     url: './settlement.html',
   },
  {
    text: 'Fauna',
    url: './fauna.html',
  },
  {
    text: 'Gusano de Arena',
    url: './sandworm.html',
  },
  {
    text: 'Flora',
    url: './flora.html',
  },
  {
    text: 'Naves',
    url: './starship.html',
  },
  {
    text: 'Multiherramientas',
    url: './multitool.html',
  },
  {
    text: 'Mineral',
    url: './mineral.html',
  },
  {
    text: 'Carguero Abandonado',
    url: './derelict.html',
  },
  {
    text: 'Fragatas Organicas',
    url: './biofrig.html',
  },
  // {
  //   text: 'Artifact',
  //   url: './artifact.html',
  // },
  {
    text: 'Sistemas',
    url: './system.html',
  },
  {
    text: 'Planetas',
    url: './planet.html',
  },
  {
    text: 'Lunas',
    url: './moon.html',
  },
];


const images: CivImageProps[] = [
  {
    link: 'https://nomanssky.fandom.com/es/wiki/Royal_Space_Society',
    imgAlt: 'Royal Space Society logo',
    img: 'https://static.wikia.nocookie.net/nomanssky_gamepedia/images/5/51/RSS_Emblem_Hub.png',
  },
];
</script>

<template>
  <h1 class="title is-spaced">Creador de páginas Wiki</h1>
  <div class="subtitle is-4">Elija qué tipo de página desea crear:</div>
  <nav
    aria-label="Subpages"
    class="page-options"
  >
    <PageLink
      v-for="link in links"
      :url="link.url"
      :text="link.text"
      :disabled="link.inactive"
    />
  </nav>
  <div class="built-by">
    <div>Traído a usted por:</div>
  </div>
  <div class="images">
    <CivImage
      v-for="image in images"
      :img="image.img"
      :img-alt="image.imgAlt"
      :link="image.link"
    />
  </div>
  <div><b>Royal Space Society</b></div>
</template>

<style scoped lang="scss">
.built-by {
  margin: 2em;
  font-size: 1.25rem;
}

.images {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2.5rem;
}

.page-options {
  max-width: 800px;
  margin: 1em auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5em;
}
</style>
