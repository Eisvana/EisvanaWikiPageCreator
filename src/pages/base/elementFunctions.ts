import { addInfoBullet, docBy, hideDiscoverer, toggleSection } from '../../common';
import { processDate } from '../../miscLogic/dateLogic';
import { planetMoonSentence } from '../../miscLogic/locationLogic';
import type { ElementFunctions } from '../../types/elements';
import {
  capitaliseFriendCode,
  createCensusEntry,
  switchCensusSocialParm,
  validateDiscord,
  validateFriendcode,
  validateReddit,
  validateSocial,
} from './base';

const baseElementFunctions: ElementFunctions = [
  {
    element: ['planetInput', 'moonInput'],
    func: () => planetMoonSentence(),
  },
  {
    element: 'censusRedditInput',
    func: () => {
      validateReddit();
      hideDiscoverer('censusRedditInput', 'censusSocialInput');
      switchCensusSocialParm('censusreddit', 'censussocial');
    },
  },
  {
    element: 'censusSocialInput',
    func: () => {
      hideDiscoverer('censusSocialInput', 'censusRedditInput');
      switchCensusSocialParm('censussocial', 'censusreddit');
    },
  },
  {
    element: 'censusSocialInput',
    handler: 'change',
    func: () => validateSocial(),
  },
  {
    element: 'censusFriendInput',
    func: () => capitaliseFriendCode(),
  },
  {
    element: 'censusFriendInput',
    handler: 'change',
    func: () => validateFriendcode(),
  },
  {
    element: 'censusPlayerInput',
    func: () => createCensusEntry(),
  },
  {
    element: 'builderInput',
    func: () => {
      hideDiscoverer('builderInput', 'builderlinkInput');
      docBy();
    },
  },
  {
    element: 'builderlinkInput',
    func: () => {
      hideDiscoverer('builderlinkInput', 'builderInput');
      docBy();
    },
  },
  {
    element: 'addInfoInput',
    func: () => addInfoBullet(),
  },
  {
    element: 'censusDiscordInput',
    handler: 'change',
    func: () => validateDiscord(),
  },
  {
    element: 'censusArrivalInput',
    handler: 'change',
    func: function () {
      processDate(this as unknown as HTMLInputElement);
    },
  },
  {
    element: 'censusHideButton',
    handler: 'click',
    func: function () {
      toggleSection('census', this as unknown as HTMLButtonElement);
    },
  },
];

export default baseElementFunctions;
