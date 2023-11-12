/**
 * @fileoverview Provides functions which can be used by the Planet page creator.
 */

import {
  addDomAsElement,
  getChildIndex,
  loadHTML,
  removeSpecificSection,
  sanitiseString,
  triggerEvent,
  wikiCode,
} from '../../common';
import { plural } from '../../miscLogic/planetMoonLogic';
import type { ElementFunctions } from '../../types/elements';
import { globalElements, pageData } from '../../variables/objects';

/**
 * Add a new section for adding a moon to a planet.
 * @param {HTMLElement} element - The element that triggered the addition of the moon section.
 * @returns {void}
 */
export function addMoon(element: HTMLButtonElement) {
  const inputSection = element.parentElement as HTMLElement;
  const elementList: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-moon]');
  const childIndex = getChildIndex(Array.from(elementList), 'dataset.moon');
  const moon_input = 'moon_input' + childIndex;

  const inputHTML = `<div class="table-cell text removable" data-moon="section${childIndex}">
		<button class="button is-outlined is-danger icon is-small" title="Remove moon" type="button" data-evt-id="removeButton">&#10006</button>
		<label for="${moon_input}">Moon name:</label>
	</div>
	<div class="table-cell data" data-moon="section${childIndex}">
		<input type="text" id="${moon_input}" data-evt-id="moonInput">
	</div>`;

  const eventListeners: ElementFunctions = [
    {
      element: 'moonInput',
      handler: 'input',
      func: () => moonList(),
    },
    {
      element: 'removeButton',
      handler: 'click',
      func: () => {
        removeSpecificSection('section' + childIndex, 'moon');
        enableMoonAdd();
      },
    },
  ];

  const inputDom = loadHTML(inputHTML, {}, eventListeners) as Document;

  addDomAsElement(inputDom, inputSection, 'beforebegin');

  const moonInputSectionCount = document.querySelectorAll('[data-moon]').length / 2; // NoSonar there are two sections for every moon (I guess...?)

  // enter the number of sections you want to allow behind the ">" operator.
  if (moonInputSectionCount + 1 > 2) {
    // NoSonar 2 moons is maximum
    element.disabled = true;
  }
}

/**
 * Enables the add button for moonInputs and triggers the moonList function
 * @function
 * @returns {void}
 */
export function enableMoonAdd() {
  const addButton = (globalElements.input.moonInputs as HTMLDivElement).querySelector('button') as HTMLButtonElement;
  addButton.disabled = false;
  moonList();
}

/**
 * Populates the moon list in the output with the current values of the moonInputs.
 * @function moonList
 * @returns {undefined}
 */
export function moonList() {
  const moonInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-moon] input');
  const moons = [];
  for (const input of Array.from(moonInputs)) {
    if (input.value) moons.push(`[[${sanitiseString(input.value)}]]`);
  }

  (globalElements.output.moonList as HTMLOutputElement).innerText = moons.join(', ');
  pageData.moons = moons;
  moonSentence();
}

/**
 * Generates a sentence describing the moons of the current planet.
 * @function
 * @returns {string} - Sentence describing the planet's moons.
 */
function moonSentence() {
  const output = (() => {
    const moons = pageData.moons as Array<string>;
    if (!moons || moons.length === 0) {
      return `This planet has no moons.`;
    } else {
      const moonCount = moons.length;
      return `This planet's [[moon]]${moonCount > 1 ? 's' : ''} ${plural(moonCount)} ${moons.join(' and ')}.`;
    }
  })();
  wikiCode(output, 'moonSentence');
}

export function generateGalleryArray() {
  const captions = [
    '',
    'Landscape',
    'Night View',
    'Cave System',
    'Analysis Visor',
    'Planet Exploration Guide',
    'Planet Page',
    'System Page',
    'Galaxy Map',
  ];

  const waterCaptions = ['Coast Area', 'Underwater'];

  // add water pics before AV
  if (pageData.terrain !== 'Pangean') {
    const avIndex = captions.indexOf('Analysis Visor');
    captions.splice(avIndex, 0, ...waterCaptions);
  }

  pageData.galleryArray = captions;
}

export function autoWater() {
  const terrain = pageData.terrain;
  if (typeof terrain !== 'string') return;
  const hasWaterTerrain = terrain !== 'Pangean';
  const waterValue = hasWaterTerrain ? 'Yes' : 'No';
  wikiCode(waterValue, 'water');
}

export function resetExternal() {
  moonList();
  const terrainInput = globalElements.input.terrainInput;
  if (terrainInput instanceof HTMLSelectElement) triggerEvent(terrainInput, 'change');
}
