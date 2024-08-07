import { defineStore } from 'pinia';
import { regions } from '../variables/regions';
import { sanitiseString } from '@/common';

interface StaticPageData {
  route: string | undefined;
  fullArticleElement: HTMLDivElement | null;
  debug: boolean;
}

const route = window.location.pathname.split('/')!.at(-1)?.slice(0, -5); // NoSonar getting the current filename without the "html" ending

const researchteamDefaultExceptions = ['base'];

export const departments = {
  '': 'Eisvana',
  'Wiki Scholars': 'Eisvana Wiki Scholars',
  EBC: 'Eisvana Builder Collective',
};

if (route && researchteamDefaultExceptions.includes(route)) departments[''] = '';

export const useStaticPageDataStore = defineStore('staticPageData', {
  state: (): StaticPageData => ({
    route,
    fullArticleElement: null,
    debug: false,
  }),
});

const localStorageData = () => JSON.parse(localStorage.getItem('defaultSettings') ?? '{}');

interface PageData {
  release: string;
  name: string;
  image: string;
  discovered: string;
  discoveredlink: string;
  orgName: string;
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
  docBy: string;
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
    orgName: '',
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
    docBy: localStorageData().docbyInput ?? '',
    researchteam: localStorageData().researchteamInput ?? departments[''],
    appearance: '',
    pageName: '',
    platform: localStorageData().platformInput ?? '',
    wealth: localStorageData().wealthInput ?? '',
    formation: '',
    content: '',
  }),

  getters: {
    regionGlyphs: (state) => state.glyphs.substring(4), // NoSonar region glyphs start at index 4
    isValidGlyphs(): boolean {
      return Object.keys(regions).includes(this.regionGlyphs); // Tests if an address is valid for Eisvana
    },
    region(): string {
      return regions[this.regionGlyphs] ?? '';
    },
    regionNumber(): number {
      const index = Object.keys(regions).indexOf(this.regionGlyphs);
      return index + 1;
    },
    sanitisedStrings: (state) => ({
      name: sanitiseString(state.name),
      discovered: sanitiseString(state.discovered),
      discoveredlink: sanitiseString(state.discoveredlink),
      system: sanitiseString(state.system),
      planet: sanitiseString(state.planet),
      moon: sanitiseString(state.moon),
      orgName: sanitiseString(state.orgName),
      appearance: sanitiseString(state.appearance),
    }),
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
});
