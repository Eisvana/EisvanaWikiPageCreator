import { defineStore } from 'pinia';
import { versions } from '../variables/versions';
import { regions } from '../variables/regions';

interface StaticPageData {
  route: string;
  fullArticleElement: HTMLDivElement | null;
  debug: boolean;
}

const route = window.location.pathname.split('/')!.at(-1)!.slice(0, -5); // NoSonar getting the current filename without the "html" ending

const researchteamDefaultExceptions = ['base'];

export const departments = {
  '': 'Eisvana',
  'Wiki Scholars': 'Eisvana Wiki Scholars',
  EBC: 'Eisvana Builder Collective',
};

if (researchteamDefaultExceptions.includes(route)) departments[''] = '';

function getRegionGlyphs(glyphs: string) {
  return glyphs.substring(4); // NoSonar region glyphs start at index 4.
}

export const useStaticPageDataStore = defineStore('staticPageData', {
  state: (): StaticPageData => ({
    route,
    fullArticleElement: null,
    debug: false,
  }),
});

interface PageData {
  release: string;
  name: string;
  picName: string;
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
}

export const usePageDataStore = defineStore('pageData', {
  state: (): PageData => ({
    release: versions[0],
    name: '',
    picName: '',
    discovered: '',
    discoveredlink: '',
    orgName: '',
    system: '',
    planet: '',
    moon: '',
    glyphs: '',
    type: '',
    biome: '',
    age: '',
    roots: '',
    nutrients: '',
    notes: '',
    elements: [],
    polymorphic: '',
    discDate: '',
    docBy: '',
    researchteam: departments[''],
    appearance: '',
    pageName: '',
  }),

  getters: {
    isValidGlyphs: (state) => Object.keys(regions).includes(state.glyphs.substring(4)), // NoSonar region glyphs start at index 4. Tests if an address is valid for Eisvana
    region: (state) => {
      const regionGlyphs = getRegionGlyphs(state.glyphs);
      return regions[regionGlyphs] ?? '';
    },
    regionNumber: (state) => {
      const regionGlyphs = getRegionGlyphs(state.glyphs);
      const index = Object.keys(regions).indexOf(regionGlyphs);
      return index + 1;
    },
  },
});
