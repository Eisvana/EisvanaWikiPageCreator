/**
 * @fileoverview Provides functions that can be used by Planet and Moon pages.
 */

import {
  addDomAsElement,
  capitaliseFirst,
  extractNumber,
  forceDatalist,
  getChildIndex,
  getWormAlbum,
  image,
  limitCreatureSize,
  loadHTML,
  oddEven,
  removeSection,
  removeSpecificSection,
  sanitiseString,
  setDropdownOptions,
  sortObj,
  toggleSection,
  triggerEvent,
  wikiCode,
} from '../common';
import { globalElements, globalFunctions, links, pageData } from '../variables/objects';
import creatureInputs from '../htmlSnippets/creatureInputs.html?raw';
import floraInputs from '../htmlSnippets/floraInputs.html?raw';
import mineralInputs from '../htmlSnippets/mineralInputs.html?raw';
import { addAllTooltips } from '../modules/tooltip';
import { updateGlobalElements } from '../commonElements/elementBackend/elementStore';
import { buildDescriptor, initialiseSectionInputs, wikiCodePercentage } from './celestialobjectslogic';
import type { ElementFunctions, ElementIds } from '../types/elements';
import { getResourceData, getSentinelData } from '../datalists/planetDatalists';
import { getRegNumber } from './locationLogic';
import creatureData from './creatureData';
import type { LinkObjValues, PlanetPropResourceLinks } from '../types/links';
import type { StdObj } from '../types/objects';

const minResourceSections = 3;
const maxResourceSections = 5;

/**
 * Determines the appropriate verb to use based on the given number, and sends the output to the
 * specified destination if provided.
 *
 * @param {number} number - The number used to decide which verb to use.
 * @param {string} [dest] - An optional destination to send the output of the wikiCode() function to.
 * @returns {string} Either "is" or "are," depending if the number is singular or plural.
 */
export function plural(number: number, dest: string = ''): string | void {
  const word = number === 1 ? 'is' : 'are';
  if (!dest) return word;
  wikiCode(word, dest);
}

/**
 * Updates the descriptor text for a planet element.
 * @param {HTMLElement} element - The planet element to add the descriptor to.
 * @returns {void}
 */
export function planetDescriptor(element: HTMLInputElement) {
  const dest = element.dataset.destNoauto as string;
  const type = capitaliseFirst(pageData.pageType as string);
  const output = buildDescriptor(element.value, type, ' ');
  const destElements = globalElements.output[dest];
  if (Array.isArray(destElements)) {
    destElements.forEach((item) => (item.innerText = output));
  } else {
    destElements.innerText = output;
  }
}

/**
 * Constructs a sentence describing the location of the current star system.
 * @function
 * @returns {string} - A string describing the location of the current star system.
 */
export function locationSentence() {
  const { system: systemName, region: regionName } = pageData;

  const output = `It can be found in the [[${systemName}]] [[star system]] in the [[${regionName}]] [[region]] (EV${getRegNumber(
    regionName as string
  )}) of [[Eisvana]], in the [[Eissentam]] [[galaxy]].`;

  (globalElements.output.location as HTMLOutputElement).innerText = output;
}

/**
 * Adds a new section for entering a planet resource name.
 *
 * @param {Element} element - The button element that was clicked to add a new section.
 * @returns {void}
 */
export function addResource(
  element: HTMLButtonElement = (globalElements.input.resourceInputs as HTMLDivElement).querySelector(
    'button'
  ) as HTMLButtonElement
) {
  // Finds the inputSection element that is the parent element of the button element
  const inputSection = element.parentElement as HTMLElement;
  // Finds all elements that have a 'data-resource' attribute and returns a NodeList
  const elementList: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-resource]');
  // Returns the index of the last element found with 'data-resource' attribute
  const childIndex = getChildIndex(Array.from(elementList), 'dataset.resource');
  // Creates a new string that's the name of the new input element
  const resource_input = 'resource_input' + childIndex;

  const sectionName = 'section' + childIndex;

  // Creates HTML code for a new resource input section
  const inputHTML = `<div class="table-cell text removable" data-resource="section${childIndex}">
		<button class="button is-outlined is-danger icon is-small" title="Remove resource" type="button" disabled data-evt-id="removeButton">&#10006</button>
		<label for="${resource_input}">Resource name:</label>
	</div>
	<div class="table-cell data" data-resource="section${childIndex}">
		<input type="text" list="resources" id="${resource_input}" data-evt-id="resourceInput">
	</div>`;

  const eventListeners: ElementFunctions = [
    {
      element: 'resourceInput',
      handler: 'input',
      func: () => resourceList(),
    },
    {
      element: 'resourceInput',
      handler: 'change',
      func: function () {
        forceDatalist(this as unknown as HTMLInputElement);
      },
    },
    {
      element: 'removeButton',
      handler: 'click',
      func: () => {
        removeSpecificSection(sectionName, 'resource');
        enableResourceAdd();
      },
    },
  ];

  const inputDom = loadHTML(inputHTML, {}, eventListeners) as Document;

  addDomAsElement(inputDom, inputSection, 'beforebegin');

  // Gets all the remove buttons for the resource inputs and stores the count to a variable
  const resourceRemoveButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-resource] button');
  const resourceInputSectionCount = resourceRemoveButtons.length;

  // Ensures that there are always at least three resource inputs present
  // 3 resources is minimum
  while (document.querySelectorAll('[data-resource] button').length < minResourceSections) {
    addResource(element);
  }

  // Disables the add resource button if the number of sections is more than 5
  if (resourceInputSectionCount + 1 > maxResourceSections) element.disabled = true;

  // Enables all remove buttons if more than 3 sections are present (every planet has at least 3 resources)
  if (resourceInputSectionCount > minResourceSections) {
    for (const button of Array.from(resourceRemoveButtons)) {
      button.disabled = false;
    }
  }
}

/**
 * Enables the resource add button and disables the resource remove buttons if there are less than 4 resource input sections.
 * Also calls the resourceList function to update the list of resources.
 *
 * @function
 * @returns {void}
 */
export function enableResourceAdd() {
  const addButton = (globalElements.input.resourceInputs as HTMLDivElement).querySelector(
    'button'
  ) as HTMLButtonElement;
  addButton.disabled = false;

  const resourceRemoveButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-resource] button');
  const resourceInputSectionCount = resourceRemoveButtons.length;

  // minimum resource number is 3, disable button when it's at 3
  if (resourceInputSectionCount <= minResourceSections) {
    for (const button of Array.from(resourceRemoveButtons)) {
      button.disabled = true;
    }
  }
  resourceList();
}

/**
 * Gets the data of the resources and generates a list of resources, including their in-game names and shortcuts.
 * The generated list is then displayed in the HTML elements for the resource list and the resource bullets.
 *
 * @function
 * @returns {void}
 */
function resourceList() {
  const resourceShorts = getResourceData();
  const resourceInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-resource] input');
  const resources: Set<string> = new Set();
  for (const input of Array.from(resourceInputs)) {
    if (input.value) resources.add(input.value);
  }
  const resourceData: { [key: string]: string } = {};
  for (const resource of Array.from(resources)) {
    resourceData[resource] = resourceShorts[resource];
  }

  const usedResources = Object.keys(resourceData).map((resource) => `* {{ilink|${resource}}}`);
  const usedResourceShorts = Object.values(resourceData).map((resource) => `[[${resource}]]`);

  (globalElements.output.resourceList as HTMLOutputElement).innerText = usedResourceShorts.join(', ');
  (globalElements.output.resourceBullets as HTMLDivElement).innerText = usedResources.join('\n');
}

/**
 * Generates and assigns a sentence describing [[Sentinel]] activity on this page.
 * @function
 * @returns {void}
 */
export function sentinelSentence() {
  // Assigns the descriptor of the sentinel activity on this page.
  const sentDescriptor = pageData.sentinel as string;

  // Retrieves data about the available sentinel activities.
  const sentinels = getSentinelData();

  // Identifies the level of sentinel activity on this page.
  const sentLevel = (() => {
    for (const level in sentinels) {
      if (sentinels[level].includes(sentDescriptor)) return level;
    }
    return '';
  })();

  // Constructs a sentence describing Sentinel activity on this page.
  const output = `[[Sentinel]] activity on this ${(
    pageData.pageType as string
  ).toLowerCase()} is classified as: ''${sentDescriptor}''. The sentinels ${
    sentLevel === 'aggressive' ? '' : "don't"
  } present an immediate threat.`;

  // Assigns the constructed sentence to the corresponding HTML element.
  (globalElements.output.sentinelSentence as HTMLOutputElement).innerText = output;
}

/**
 * Adds a new fauna section to the page and updates the output section accordingly.
 *
 * @param {Element} element - The button element that was clicked to add the fauna section.
 * @returns {Promise} A promise that resolves when the fauna section is successfully added.
 **/
export function addFauna(element: HTMLButtonElement) {
  const inputSection = element.parentElement;
  const outputSection = globalElements.output[element.dataset.destNoauto as string] as HTMLElement;
  const sectionType = 'fauna';
  const elementList: NodeListOf<HTMLDivElement> = document.querySelectorAll(`[data-${sectionType}]`);
  const i = getChildIndex(Array.from(elementList), `dataset.${sectionType}`).toString();

  const evtListeners: ElementFunctions = [
    {
      element: 'removeButton',
      handler: 'click',
      func: function () {
        removeSpecificSection(`section${i}`, 'fauna');
        changeTableEntry(this as unknown as HTMLButtonElement);
      },
    },
    {
      element: 'hideButton',
      handler: 'click',
      func: function () {
        toggleSection(`fauna${i}`, this as unknown as HTMLButtonElement);
      },
    },
    {
      element: 'fileInput',
      handler: 'change',
      func: function () {
        image(this as unknown as HTMLInputElement);
      },
    },
    {
      element: 'ecosystemInput',
      handler: 'change',
      func: function () {
        genusDropdown(this as unknown as HTMLSelectElement);
      },
    },
    {
      element: 'genusInput',
      handler: 'change',
      func: function () {
        addGenus(this as unknown as HTMLSelectElement);
      },
    },
    {
      element: 'creatureHeightInput',
      handler: 'input',
      func: function () {
        limitCreatureSize(this as unknown as HTMLInputElement);
      },
    },
    {
      element: 'creatureLink',
      handler: 'change',
      func: function () {
        linkItem(this as unknown as HTMLInputElement);
      },
    },
  ];

  const inputDom = loadHTML(creatureInputs, { i }, evtListeners) as Document;

  const outputHTML = `<div data-fauna="section${i}">|-</div>
	<div data-fauna="section${i}">|[[File:<output id="faunaFile${i}"></output>|150px]] || <span style="display:none" name="faunaLink${i}">[[</span><output id="faunaName${i}" name="faunaName${i}"></output><span style="display:none" name="faunaLink${i}">]]</span> || <output id="faunaRarity${i}"></output> / <output id="faunaEcosystem${i}"></output> / <output id="faunaActivity${i}"> </output> <output id="faunaHemisphere${i}"></output> || <output id="faunaGenus${i}"></output> || <output id="faunaHeight${i}"></output>m || <output id="faunaWeight${i}"></output>kg || <output id="faunaDiscoverer${i}"></output></div>`;

  addDomAsElement(inputDom, inputSection as HTMLElement, 'beforebegin');

  outputSection.insertAdjacentHTML('beforeend', outputHTML);
  postProcessSection(element, sectionType, i);
  genusDropdown(globalElements.input[`faunaEcosystemInput${i}`] as HTMLSelectElement);
}

/**
 * Adds a flora element to the page.
 *
 * @param {HTMLElement} element - The element to add the flora to.
 * @returns {Promise<void>}
 */
export function addFlora(element: HTMLButtonElement) {
  const inputSection = element.parentElement;
  const outputSection = globalElements.output[element.dataset.destNoauto as string] as HTMLElement;
  const sectionType = 'flora';
  const elementList: NodeListOf<HTMLDivElement> = document.querySelectorAll(`[data-${sectionType}]`);
  const i = getChildIndex(Array.from(elementList), `dataset.${sectionType}`).toString();

  const evtListeners: ElementFunctions = [
    {
      element: 'removeButton',
      handler: 'click',
      func: function () {
        removeSpecificSection(`section${i}`, 'flora');
        changeTableEntry(this as unknown as HTMLButtonElement);
      },
    },
    {
      element: 'hideButton',
      handler: 'click',
      func: function () {
        toggleSection(`flora${i}`, this as unknown as HTMLButtonElement);
      },
    },
    {
      element: 'fileInput',
      handler: 'input',
      func: function () {
        image(this as unknown as HTMLInputElement);
      },
    },
    {
      element: 'floraElements',
      handler: 'input',
      func: function () {
        floraMineralResourceLinks(this as unknown as HTMLInputElement);
      },
    },
    {
      element: 'floraLink',
      handler: 'change',
      func: function () {
        linkItem(this as unknown as HTMLInputElement);
      },
    },
  ];

  const inputDom = loadHTML(floraInputs, { i }, evtListeners) as Document;

  const outputHTML = `<div data-flora="section${i}">|-</div>
	<div data-flora="section${i}">|[[File:<output id="floraFile${i}"></output>|150px]] || <span style="display:none" name="floraLink${i}">[[</span><output id="floraName${i}" name="floraName${i}"></output><span style="display:none" name="floraLink${i}">]]</span> || <output id="floraAge${i}"></output> || <output id="floraRoot${i}"></output> || <output id="floraNut${i}"></output> || <output id="floraNote${i}"></output> || <output id="floraElements${i}"></output> || <output id="floraDiscoverer${i}"></output></div>`;

  addDomAsElement(inputDom, inputSection as HTMLElement, 'beforebegin');

  outputSection.insertAdjacentHTML('beforeend', outputHTML);

  postProcessSection(element, sectionType, i);
}

export function addMineral(element: HTMLButtonElement) {
  const inputSection = element.parentElement;
  const outputSection = globalElements.output[element.dataset.destNoauto as string] as HTMLElement;
  const sectionType = 'mineral';
  const elementList: NodeListOf<HTMLDivElement> = document.querySelectorAll(`[data-${sectionType}]`);
  const i = getChildIndex(Array.from(elementList), `dataset.${sectionType}`).toString();

  const eventListeners: ElementFunctions = [
    {
      element: 'removeButton',
      handler: 'click',
      func: function () {
        removeSpecificSection(`section${i}`, 'mineral');
        changeTableEntry(this as unknown as HTMLButtonElement);
      },
    },
    {
      element: 'hideButton',
      handler: 'click',
      func: function () {
        toggleSection(`mineral${i}`, this as unknown as HTMLButtonElement);
      },
    },
    {
      element: 'fileInput',
      handler: 'input',
      func: function () {
        image(this as unknown as HTMLInputElement);
      },
    },
    {
      element: 'metalInput',
      handler: 'input',
      func: function () {
        wikiCodePercentage(this as unknown as HTMLInputElement);
      },
    },
    {
      element: 'mineralResourceInput',
      handler: 'input',
      func: function () {
        floraMineralResourceLinks(this as unknown as HTMLInputElement);
      },
    },
    {
      element: 'mineralLink',
      handler: 'change',
      func: function () {
        linkItem(this as unknown as HTMLInputElement);
      },
    },
  ];

  const inputDom = loadHTML(mineralInputs, { i }, eventListeners) as Document;

  const outputHTML = `<div data-mineral="section${i}">|-</div>
	<div data-mineral="section${i}">|[[File:<output id="mineralFile${i}"></output>|150px]] || <span style="display:none" name="mineralLink${i}">[[</span><output id="mineralName${i}" name="mineralName${i}"></output><span style="display:none" name="mineralLink${i}">]]</span> || <output id="mineralMetal${i}"></output> || <output id="mineralFormation${i}"></output> || <output id="mineralNote${i}"></output> || <output id="mineralElements${i}"></output> || <output id="mineralDiscoverer${i}"></output></div>`;

  addDomAsElement(inputDom, inputSection as HTMLElement, 'beforebegin');

  outputSection.insertAdjacentHTML('beforeend', outputHTML);

  postProcessSection(element, sectionType, i);
}

export function postProcessSection(element: HTMLButtonElement, sectionType: string, i: string) {
  addAllTooltips();
  changeTableEntry(element);

  const sectionElements: ElementIds = { input: {}, output: {} };

  const sectionSelector = `[data-${sectionType}="section${i}"]`;

  // adds functionality to the input elements in the new section
  initialiseSectionInputs(sectionSelector);

  const inputs = document.querySelectorAll(`${sectionSelector} :is(input, select)`);
  for (const input of Array.from(inputs)) {
    sectionElements.input![input.id] = input.id;
  }
  const outputs = document.querySelectorAll(`${sectionSelector} output`);
  for (const output of Array.from(outputs)) {
    if (output.id) sectionElements.output![output.id] = output.id;
  }
  updateGlobalElements(sectionElements);
}

/**
 * Function that handles the change in table entries.
 *
 * @param {HTMLButtonElement} element - The HTMLElement that was clicked.
 *
 * @returns {void}
 */
function changeTableEntry(element: HTMLButtonElement) {
  const parent = element.parentElement as HTMLElement;
  const section = parent.dataset.section as string;
  const elements: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.tableHeader[data-${section}]`);
  for (let i = 0; i < elements.length; i++) {
    const className = 'is-' + oddEven(i + 1);
    const subsection = elements[i].dataset[section];
    const cells = document.querySelectorAll(`[data-${section}="${subsection}"]`);
    for (const cell of Array.from(cells)) {
      cell.classList.remove('is-odd', 'is-even');
      cell.classList.add(className);
    }
  }
  if (!parent.dataset[section]) return;

  if (section === 'fauna') {
    findAndRemove(links.genera);
    addGenus();
  } else {
    findAndRemove((links.planetPropResources as PlanetPropResourceLinks)?.[section]);
    floraMineralResourceLinks();
  }

  function findAndRemove(object: LinkObjValues) {
    if (!object) return;
    const subsection = parent.dataset[section] as string;
    const sectionNumber = extractNumber(subsection);
    const item = Object.keys(object);
    const itemName = item.find((element) => extractNumber(element) === sectionNumber) as string;
    delete object[itemName];
  }
}

function addGenus(element: HTMLSelectElement | undefined = undefined) {
  const genera: StdObj = ((links.genera as StdObj) ??= {});
  if (element) {
    const value = element.value;
    const dest = element.dataset.destNoauto as string;

    genera[dest] = sanitiseString(value);
  }

  const usedGenera: Set<string> = new Set();
  const linkedGenera = sortObj(structuredClone(genera), true) as StdObj;
  for (const creature in linkedGenera) {
    const genus = linkedGenera[creature];
    if (genus && !usedGenera.has(genus)) {
      linkedGenera[creature] = `[[${genus}]]`;
      usedGenera.add(genus);
    }
  }

  for (const [key, output] of Object.entries(linkedGenera)) {
    (globalElements.output[key] as HTMLOutputElement).innerText = output;
  }
}

function floraMineralResourceLinks(element: HTMLInputElement | undefined = undefined) {
  const resources: PlanetPropResourceLinks = ((links.planetPropResources as PlanetPropResourceLinks) ??= {});
  if (element) {
    const value = element.value;
    const target = element.dataset.destNoauto as string;
    const id = element.id;
    const sectionName = element.parentElement!.dataset.section!.split(' ')[0];
    const planetProp = sectionName.replace(extractNumber(sectionName).toString(), '');

    resources[planetProp] ??= {};
    resources[planetProp][target] ??= {};
    resources[planetProp][target][id] = sanitiseString(value);
  }

  const usedResources: Set<string> = new Set();
  const linkedResources = sortObj(structuredClone(resources)) as PlanetPropResourceLinks; // flora, minerals
  for (const planetPropName in sortObj(linkedResources)) {
    const planetProp = linkedResources[planetPropName]; // flora1, flora2, flora3...
    for (const destId in sortObj(planetProp)) {
      const resources = planetProp[destId]; // flora1prim, flora1sec
      for (const [resourceInput, resource] of Object.entries(resources)) {
        // Carbon, Sodium
        if (resource && !usedResources.has(resource)) {
          resources[resourceInput] = `[[${resource}]]`;
          usedResources.add(resource);
        }
      }
    }
  }

  for (const prop in linkedResources) {
    for (const outputElement in linkedResources[prop]) {
      const output = Object.values(linkedResources[prop][outputElement]).filter(Boolean).join(', '); // filters for truthy values
      (globalElements.output[outputElement] as HTMLOutputElement).innerText = output;
    }
  }
}

// sets genus dropdown
function genusDropdown(element: HTMLSelectElement) {
  const ecosystem = element.value;
  const genera = Object.keys(creatureData.ecosystems[ecosystem]);
  const sectionNumber = extractNumber(element.id);
  const genusInputID = 'faunaGenusInput' + sectionNumber;

  const commonNames: Array<string> = [];
  for (const genus of genera) {
    commonNames.push(`${genus} (${creatureData.ecosystems[ecosystem][genus].commonName})`);
  }

  setDropdownOptions(globalElements.input[genusInputID] as HTMLSelectElement, genera, commonNames);
  addGenus(globalElements.input[genusInputID] as HTMLSelectElement);
}

export function autoWorm(wormBool: boolean) {
  if (wormBool) (globalElements.input.sandwormInput as HTMLInputElement).checked = true;
  addSandwormTemplate();
}

export function addSandwormTemplate() {
  const element = globalElements.input.sandwormInput as HTMLInputElement;
  const dest = element.dataset.destNoauto as string;
  const sections: Array<HTMLDivElement | HTMLOutputElement> = Array.from(
    document.querySelectorAll(`[data-section="${dest}"]`)
  );
  const outputElement = globalElements.output[dest] as HTMLOutputElement;
  sections.push(outputElement);
  for (const section of sections) {
    if (element.checked) {
      section.style.display = '';
    } else {
      section.style.display = 'none';
    }
  }
}

export function wormAutoSpawn() {
  const spawn = (() => {
    const elements = globalElements.input.autoSpawn as Array<HTMLInputElement>;
    for (const element of elements) {
      const inputElement = element;
      if (inputElement.checked) return inputElement.value;
    }
    return '';
  })();
  (globalElements.output.wormAutoSpawn as HTMLOutputElement).innerText = spawn;
}

export function wormAlbumName() {
  const output = getWormAlbum();
  (globalElements.output.wormAlbumName as HTMLOutputElement).innerText = output;
}

export function resetExternal() {
  const sections: NodeListOf<HTMLDivElement> = document.querySelectorAll(
    '[data-moon], [data-resource], [data-fauna], [data-flora], [data-mineral]'
  );
  removeSection(Array.from(sections));

  enableResourceAdd();
  wormAlbumName();
  if (typeof globalFunctions.enableMoonAdd == 'function') globalFunctions.enableMoonAdd();

  triggerEvent(
    (globalElements.input.resourceInputs as HTMLDivElement).querySelector('button') as HTMLButtonElement,
    'click'
  );
}

function linkItem(element: HTMLInputElement) {
  const isChecked = element.checked;
  const dest = element.dataset.destNoauto;
  if (dest) {
    const brackets: NodeListOf<HTMLSpanElement> = document.getElementsByName(dest);
    for (const bracket of Array.from(brackets)) {
      bracket.style.display = isChecked ? '' : 'none';
    }
  }
}
