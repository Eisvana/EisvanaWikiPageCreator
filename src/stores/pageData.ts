import { defineStore } from 'pinia';
import { fetchSectionWikiText } from '@/helpers/api';
import parseMediawikiTemplate from 'parse-mediawiki-template';
import { currentReleaseKey, defaultValuesKey } from '@/variables/localStorageKeys';
import { civName } from '@/variables/civilization';
import { regions } from '@/variables/regions';
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
  researchteam: string | null;
  appearance: string;
  pageName: string;
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
  galleryFiles: GalleryFileItem[];
  locationFiles: GalleryFileItem[];
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
  researchteam: null,
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
  galleryFiles: [],
  locationFiles: [],
  presetData: structuredClone(defaultData),
};

export const usePageDataStore = defineStore('pageData', {
  state: (): PageData => structuredClone(defaultState),

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
    researchteamValue: (state) => state.researchteam ?? (researchteamDefaultExceptions.includes(route) ? '' : civName),
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
