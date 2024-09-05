import { defineStore } from 'pinia';
import { fetchSectionWikiText } from '@/helper/api';
import parseMediawikiTemplate from 'parse-mediawiki-template';
import { currentReleaseKey, defaultValuesKey } from '@/variables/localStorageKeys';
import { civName } from '@/variables/civilization';
import { Notify } from 'quasar';
import { regions } from '@/variables/regions';
import { maxGlyphLength } from '@/variables/glyphData';

const researchteamDefaultExceptions = ['base'];

const localStorageData = () => JSON.parse(localStorage.getItem(defaultValuesKey) ?? '{}');

interface PageData {
  release: string;
  name: string;
  image: string;
  discovered: string;
  discoveredlink: string;
  system: string;
  planet: string;
  moon: string;
  glyphs: string;
  type: string;
  biome: string;
  age: string;
  roots: string;
  nutrients: string;
  notes: string;
  elements: string[];
  polymorphic: string;
  discDate: string;
  documenterName: string;
  researchteam: string;
  appearance: string;
  pageName: string;
  platform: string;
  mode: string;
  wealth: string;
  formation: string;
  content: string;
  axes: string;
  farm: boolean;
  geobay: boolean;
  landingpad: boolean;
  arena: boolean;
  terminal: boolean;
  racetrack: boolean;
  censusplayer: string;
  censussocial: string;
  censusreddit: string;
  censusdiscord: string;
  censusfriend: string;
  censusarrival: string;
  censusshow: string;
  gallery: {
    id: number;
    image: string;
    description: string;
  }[];
}

export const usePageDataStore = defineStore('pageData', {
  state: (): PageData => ({
    release: '',
    name: '',
    image: '',
    discovered: localStorageData()['discoveredInput builderInput'] ?? '',
    discoveredlink: localStorageData()['discoveredlinkInput builderlinkInput'] ?? '',
    system: localStorageData().systemInput ?? '',
    planet: localStorageData().planetInput ?? '',
    moon: localStorageData().moonInput ?? '',
    glyphs: localStorageData().portalglyphsInput ?? '',
    type: '',
    biome: 'Lush',
    age: '',
    roots: '',
    nutrients: '',
    notes: '',
    elements: [],
    polymorphic: '',
    discDate: '',
    documenterName: localStorageData().docbyInput ?? '',
    researchteam: localStorageData().researchteamInput ?? civName,
    appearance: '',
    pageName: '',
    platform: localStorageData().platformInput ?? '',
    mode: '',
    wealth: localStorageData().wealthInput ?? '',
    formation: '',
    content: '',
    axes: '',
    farm: false,
    geobay: false,
    landingpad: false,
    arena: false,
    terminal: false,
    racetrack: false,
    censusplayer: '',
    censussocial: '',
    censusreddit: '',
    censusdiscord: '',
    censusfriend: '',
    censusarrival: '',
    censusshow: '',
    gallery: [],
  }),

  getters: {
    regionData: (state): { region: string; regionNumber: string } => {
      if (state.glyphs.length !== maxGlyphLength) return { region: '', regionNumber: '' };
      const regionGlyphs = state.glyphs.slice(4);
      const eisvanaRegionGlyphs = Object.keys(regions);
      const regionIndex = eisvanaRegionGlyphs.indexOf(regionGlyphs);
      const regionNames = Object.values(regions);
      const currentRegion = regionNames[regionIndex];
      return {
        region: currentRegion,
        regionNumber: `EV${regionIndex + 1}`,
      };
    },
  },

  actions: {
    initStore() {
      this.getRelease();
      this.applyDefaults();
    },
    async getRelease() {
      const storedVersion = localStorage.getItem(currentReleaseKey) ?? '';
      this.release = storedVersion;
      try {
        const section = await fetchSectionWikiText('Template:Base preload', 0);
        const version = parseMediawikiTemplate(section ?? '', 'Version')[0]['1']; // unnamed parameters are 1-indexed
        if (!version || version === storedVersion) return;
        localStorage.setItem(currentReleaseKey, version);
        this.release = version || storedVersion;
      } catch (e) {
        Notify.create({
          type: 'negative',
          message: 'Failed to fetch release!',
          actions: [{ label: 'Retry', color: 'light-blue', handler: this.getRelease }],
        });
        console.error(e);
      }
    },
    applyDefaults() {
      const localStorageData = localStorage.getItem(defaultValuesKey) ?? '{}';
      const jsonData = JSON.parse(localStorageData);
      this.$patch(jsonData);
    },
  },
});
