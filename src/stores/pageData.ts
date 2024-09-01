import { defineStore } from 'pinia';
import { fetchSectionWikiText } from '@/helper/api';
import parseMediawikiTemplate from 'parse-mediawiki-template';

interface StaticPageData {
  route: string | undefined;
  fullArticleElement: HTMLDivElement | null;
  debug: boolean;
}

// TODO: gh-pages supports fancy endings as well, so for example wiki.eisvana.com/base would correctly resolve to the base.html file. This needs to be handled!
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

  getters: {},
  actions: {
    async getRelease() {
      const storedVersion = localStorage.getItem('release') ?? '';
      this.release = storedVersion;
      try {
        const section = await fetchSectionWikiText('Template:Base preload', 0);
        const version = parseMediawikiTemplate(section ?? '', 'Version')[0]['1']; // unnamed parameters are 1-indexed
        if (!version || version === storedVersion) return;
        localStorage.setItem('release', version);
        this.release = version || storedVersion;
      } catch (e) {
        console.error(e);
      }
    },
  },
});
