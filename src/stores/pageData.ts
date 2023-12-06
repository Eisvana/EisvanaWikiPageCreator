import { defineStore } from 'pinia';
import { versions } from '../variables/versions';
import { sanitiseString } from '@/common';

interface StaticPageData {
  route: string;
  fullArticleElement: HTMLDivElement | null;
  debug: boolean;
}

const route = window.location.pathname.split('/')!.at(-1)!.slice(0, -5); // NoSonar getting the current filename without the "html" ending

const researchteamDefaultExceptions = ['base'];

export const departments = {
  '': '',
};

if (researchteamDefaultExceptions.includes(route)) departments[''] = '';

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
  hub: string;
  image: string;
  discovered: string;
  discoveredlink: string;
  orgName: string;
  galaxy: string;
  system: string;
  regions: string;
  planet: string;
  moon: string;
  glyphs: string;
  gender: string;
  gender2: string;
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
  behaviours: string;
  activity: string;
  hemisphere: string;
  rarity: string;
  ecosystem: string;
}

export const usePageDataStore = defineStore('pageData', {
  state: (): PageData => ({
    release: versions[0],
    name: '',
    hub: 'Royal Space Society',
    image: '',
    discovered: localStorageData()['discoveredInput builderInput'] ?? '',
    discoveredlink: localStorageData()['discoveredlinkInput builderlinkInput'] ?? '',
    orgName: '',
    galaxy: '',
    system: localStorageData().systemInput ?? '',
    regions: '',
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
    researchteam: '',
    appearance: '',
    pageName: '',
    platform: localStorageData().platformInput ?? '',
    wealth: localStorageData().wealthInput ?? '',
    formation: '',
    content: '',
    behaviours: '',
    gender: '',
    gender2: '',
    activity: '',
    hemisphere: '',
    rarity: '',
    ecosystem: '',
  }),

  getters: {
    sanitisedName: (state) => sanitiseString(state.name),
    discoveredName: (state) => sanitiseString(state.discovered),
    discoveredlinkName: (state) => sanitiseString(state.discoveredlink),
    systemName: (state) => sanitiseString(state.system),
    galaxyName: (state) => sanitiseString(state.galaxy),
    hubName: (state) => sanitiseString(state.hub),
    regionName: (state) => sanitiseString(state.regions),
    planetName: (state) => sanitiseString(state.planet),
    moonName: (state) => sanitiseString(state.moon),
    originalName: (state) => sanitiseString(state.orgName),
    docBySentence: (state) => {
      const isLink = state.docBy.startsWith('{{');
      const hasResearchteam = state.researchteam.split(' ').length > 1;
      const documenter = isLink ? state.docBy : `''${state.docBy}''`;
      const researchteamLink = state.researchteam.includes('Wiki')
        ? '[[Wiki Scholars|Wiki Scholar]]'
        : `[[${state.researchteam}]] member`;
      return `${hasResearchteam ? researchteamLink : ''} ${documenter}`;
    },
  },
});
