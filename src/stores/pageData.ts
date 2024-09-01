import { defineStore } from 'pinia';
import { fetchSectionWikiText } from '@/helper/api';
import parseMediawikiTemplate from 'parse-mediawiki-template';
import { currentReleaseKey, defaultValuesKey } from '@/variables/localStorageKeys';

const researchteamDefaultExceptions = ['base'];

export const departments = {
  '': 'Eisvana',
  'Wiki Scholars': 'Eisvana Wiki Scholars',
  EBC: 'Eisvana Builder Collective',
};

const localStorageData = () => JSON.parse(localStorage.getItem(defaultValuesKey) ?? '{}');

interface PageData {
  release: string;
  name: string;
  image: string;
  discovered: string;
  discoveredlink: string;
  department: string;
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
  wealth: string;
  formation: string;
  content: string;
}

export const usePageDataStore = defineStore('pageData', {
  state: (): PageData => ({
    release: '',
    name: '',
    image: '',
    discovered: localStorageData()['discoveredInput builderInput'] ?? '',
    discoveredlink: localStorageData()['discoveredlinkInput builderlinkInput'] ?? '',
    department: '',
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
    researchteam: localStorageData().researchteamInput ?? departments[''],
    appearance: '',
    pageName: '',
    platform: localStorageData().platformInput ?? '',
    wealth: localStorageData().wealthInput ?? '',
    formation: '',
    content: '',
  }),

  getters: {},
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
        console.error(e);
      }
    },
    applyDefaults() {
      const isValidKey = (item: unknown): item is keyof typeof this.$state =>
        typeof item === 'string' && item in this.$state;

      const localStorageData = localStorage.getItem(defaultValuesKey) ?? '{}';
      const jsonData = JSON.parse(localStorageData);
      for (const item in jsonData) {
        if (isValidKey(item)) this.$state[item] = jsonData[item];
      }
    },
  },
});
