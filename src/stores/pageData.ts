import { defineStore } from 'pinia';
import { fetchSectionWikiText } from '@/helpers/api';
import parseMediawikiTemplate from 'parse-mediawiki-template';
import { currentReleaseKey, defaultValuesKey } from '@/variables/localStorageKeys';
import { civName } from '@/variables/civilization';
import { regions, galaxies } from '@/variables/regions';
import { maxGlyphLength } from '@/variables/glyphData';
import { emitGlobalEvent } from '@/helpers/event';
import { route } from '@/variables/route';
import type { PresetData } from '@/types/preset';
import { defaultData } from '@/variables/preset';
import { nextTick } from 'vue';
import ReleaseErrorNotif from '@/components/ReleaseErrorNotif.vue';
import { useToast } from 'vue-toastification';
import type { GalleryFileItem } from '@/types/gallery';

const toast = useToast();

const localStorageData = () => JSON.parse(localStorage.getItem('defaultSettings') ?? '{}');

const researchteamDefaultExceptions: string[] = ['base'];

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
  orgName: string;
  platform: string;
  mode: string;
  wealth: string;
  formation: string;
  content: string;
  axes: string;
  farm: string;
  geobay: string;
  landingpad: string;
  arena: string;
  terminal: string;
  racetrack: string;
  censusplayer: string;
  censussocial: string;
  censusreddit: string;
  censusdiscord: string;
  censusfriend: string;
  censusarrival: string;
  censusshow: string;
  layout: string;
  features: string;
  additionalInfo: string;
  behaviour: string;
  activity: string;
  hemisphere: string;
  rarity: string;
  ecosystem: string;
  weight2: string;
  height2: string;
  gender: string;
  gender2: string;
  height: string;
  weight: string;
  diet: string;
  genus: string;
  produces: string[];
  docBy: string;
  docBySentence: string;
  galleryFiles: GalleryFileItem[];
  locationFiles: GalleryFileItem[];
  galleryDescriptions: string[];
  presetData: PresetData;
}

const defaultState: PageData = {
  release: '',
  name: '',
  image: '',
  discovered: '',
  discoveredlink: '',
  system: '',
  planet: '',
  moon: '',
  glyphs: '',
  type: '',
  biome: 'Lush',
  age: '',
  roots: '',
  nutrients: '',
  notes: '',
  elements: [],
  polymorphic: '',
  discDate: '',
  documenterName: '',
  researchteam: '',
  appearance: '',
  pageName: '',
  platform: '',
  mode: '',
  wealth: '',
  formation: '',
  content: '',
  axes: '',
  farm: 'No',
  geobay: 'No',
  landingpad: 'No',
  arena: 'No',
  terminal: 'No',
  racetrack: 'No',
  censusplayer: '',
  censussocial: '',
  censusreddit: '',
  censusdiscord: '',
  censusfriend: '',
  censusarrival: '',
  censusshow: '',
  layout: '',
  features: '',
  additionalInfo: '',
  orgName: '',
  behaviour: '',
  gender: '',
  gender2: '',
  activity: '',
  hemisphere: '',
  rarity: '',
  ecosystem: '',
  height: '',
  weight: '',
  weight2: '',
  height2: '',
  diet: '',
  genus:'',
  produces: [],
  docBy: localStorageData().docbyInput ?? '',
  docBySentence: '',
  galleryFiles: [],
  locationFiles: [],
  galleryDescriptions: [],
  presetData: structuredClone(defaultData),
};

export const usePageDataStore = defineStore('pageData', {
  state: (): PageData => structuredClone(defaultState),

  getters: {
    regionData: (state): { region: string; regionNumber: string; galaxy: string } => {
      if (state.glyphs.length !== maxGlyphLength) return { region: '', regionNumber: '', galaxy: '' };

      const regionGlyphs = state.glyphs.slice(4);
      const eisvanaRegionGlyphs = Object.keys(regions);
      const regionIndex = eisvanaRegionGlyphs.indexOf(regionGlyphs);
      const regionNames = Object.values(regions);
      const currentRegion = regionNames[regionIndex];

      const regionKey = regionGlyphs as keyof typeof regions;
      const currentGalaxy = galaxies[regionKey] || '';

      return {
        region: currentRegion,
        regionNumber: `EV${regionIndex + 1}`,
        galaxy: currentGalaxy,
      };
    },
    researchteamValue: (state) => state.researchteam ?? (researchteamDefaultExceptions.includes(route) ? '' : civName),
    docBySentence: (state) => {
      const isLink = state.docBy.startsWith('{{');
      const hasResearchteam = state.researchteam.split(' ').length > 1;
      const documenter = isLink ? state.docBy : `''${state.docBy}''`;
      const researchteamLink = state.researchteam.includes('Wiki')
        ? '[[Eisvana Wiki Scholars|Eisvana Wiki Scholar]]'
        : `[[${state.researchteam}]] member`;
      return `${hasResearchteam ? researchteamLink : ''} ${documenter}`;
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
        toast.error(ReleaseErrorNotif);
        console.error(e);
      }
    },
    applyDefaults() {
      const localStorageData = localStorage.getItem(defaultValuesKey) ?? '{}';
      const jsonData = JSON.parse(localStorageData);
      this.$patch({ ...jsonData, presetData: jsonData });
    },

    resetStore() {
      this.$patch(structuredClone(defaultState));
      // waiting for the DOM to update before changing the state again
      nextTick(() => {
        emitGlobalEvent('reset');
        this.initStore();
      });
    },
  },
});
