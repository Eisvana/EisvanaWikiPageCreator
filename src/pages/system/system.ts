/**
 * @fileoverview Provides functions which can be used by the System page creator.
 */

import { addDomAsElement, extractNumber, getChildIndex, hideInput, image, loadHTML, numberStats, oddEven, removeSection, removeSpecificSection, sanitiseString, shortenGHub, sortObj, storeData, toggleSection, wikiCode, wikiCodeSimple } from '../../common';
import { assignFunction } from '../../commonElements/elementBackend/elementFunctions';
import { updateGlobalElements } from '../../commonElements/elementBackend/elementStore';
import { autoInfested, buildDescriptor, initialiseSectionInputs } from '../../miscLogic/celestialobjectslogic';
import { HubGal, getHubNumber, regNr } from '../../miscLogic/locationLogic';
import { addAllTooltips } from '../../modules/tooltip';
import { ElementFunctions, ElementIds } from '../../types/elements';
import { SortObj, StdObj } from '../../types/objects';
import { globalElements, links, pageData } from '../../variables/objects';
import tradeableInputs from '../../htmlSnippets/tradeableInputs.html?raw';
import planetInputHTML from '../../htmlSnippets/planetInputs.html?raw';
import planetOutputHTML from '../../htmlSnippets/planetOutputs.html?raw';
import { BiomeLinks, ResourceAndCreatureLinks } from '../../types/links';

/**
 * Generates a sentence that describes the location of the page.
 *
 * @function
 */
export function locationSentence() {
	const { region, civShort: civ } = pageData;
	const HubNr = regNr(region as string);
	const galaxy = HubGal(civ as string);

	/**
	 * The sentence describing the location of the page.
	 *
	 * @type {string}
	 */
	const output = `Located in the [[${region}]] [[region]]${HubNr} of the ${galaxy}.`;

	wikiCode(output, 'loc');
}

/**
 * Inserts the planet table into the code.
 * @function
 * @returns {void}
 */
export function planetInputs() {
	const inputTarget = (globalElements.input.waterInput as HTMLInputElement).parentElement!.previousElementSibling as HTMLElement;
	const outputTarget = globalElements.output.planets as HTMLDivElement;
	const { planet: planetNr, moon: moonNr } = pageData;
	const bodies = clamp(parseInt(planetNr as string) + parseInt(moonNr as string), 2, 6);	// NoSonar 2 is the minimum number of planets, 6 is the maximum
	if (isNaN(bodies)) return;

	/**
	 * Clamps a value between a minimum and maximum value.
	 * @function
	 * @param {number} value - The value to clamp.
	 * @param {number} min - The minimum value to clamp to.
	 * @param {number} max - The maximum value to clamp to.
	 * @returns {number} The clamped value.
	 */
	function clamp(value: number, min: number, max: number): number {
		return Math.max(min, Math.min(max, value));
	}

	/**
	 * Calculates the difference between the number of planet sections in the code and the number of planet sections that should exist based on the number of planets and moons.
	 * @function
	 * @returns {number} The difference in the number of planet sections.
	 */
	function diff() {
		const planetIDs = new Set();
		const planets = (() => {
			const elements: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-planet]');
			for (const element of Array.from(elements)) {
				planetIDs.add(element.dataset.planet);
			}
			return planetIDs.size;
		})();
		const diff = bodies - planets;		// positive if we need to add sections, negative if we need to delete sections
		return diff;
	}
	const elementList: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-planet]');
	let childIndex = getChildIndex(Array.from(elementList), 'dataset.planet');

	while (diff() != 0) {
		if (diff() > 0) {
			addPlanet(childIndex);
			childIndex++;
		} else {
			removePlanet();
		}
	}

	/**
	 * Removes a planet section from the planet table.
	 * @function
	 * @returns {void}
	 */
	function removePlanet() {
		const elements: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-planet]');
		const planetIDs = new Set();
		for (const element of Array.from(elements)) {
			planetIDs.add(element.dataset.planet);
		}
		const sectionName = Array.from(planetIDs).pop();
		const sections: NodeListOf<HTMLDivElement> = document.querySelectorAll(`[data-planet="${sectionName}"]`);
		removeSection(Array.from(sections));
	}

	/**
	 * Adds a new planet section to the planet table.
	 * @function
	 * @param {number} i - The index of the planet section to add.
	 * @returns {void}
	 */
	function addPlanet(i: number) {
		const replacementStrings: StdObj = {
			i: i.toString(),
			oddEvenClass: 'is-' + oddEven(i),
		}

		const evtListeners: ElementFunctions = [
			{
				element: 'hideButtonPlanet',
				handler: 'click',
				func: function () { toggleSection(`planet${i}`, this as unknown as HTMLButtonElement) }
			},
			{
				element: 'hideButtonResource',
				handler: 'click',
				func: function () { toggleSection(`resource${i}`, this as unknown as HTMLButtonElement) }
			},
			{
				element: 'addResourceButton',
				handler: 'click',
				func: function () { addResourceInput(this as unknown as HTMLButtonElement, i) }
			},
			{
				element: 'fileInput',
				handler: 'change',
				func: function () { image(this as unknown as HTMLInputElement) }
			},
			{
				element: 'biomeInput',
				handler: 'change',
				func: function () { biomeLinks(this as unknown as HTMLSelectElement) }
			},
			{
				element: 'moonCheckbox',
				handler: 'change',
				func: function () { moonSwitch(this as unknown as HTMLInputElement) }
			},
			{
				element: 'descriptorInput',
				handler: 'input',
				func: function () { expandDescriptor(this as unknown as HTMLInputElement) }
			},
			{
				element: 'weatherInput',
				handler: 'input',
				func: function () { wikiCodeSimple(this as unknown as HTMLInputElement) }
			},
			{
				element: 'faunaTotalInput',
				handler: 'input',
				func: function () { numberStats(this as unknown as HTMLInputElement) }
			},
		]

		const inputDom = loadHTML(planetInputHTML, replacementStrings, evtListeners) as Document;
		const outputHtml = loadHTML(planetOutputHTML, replacementStrings) as string;

		addAllTooltips(inputDom);

		addDomAsElement(inputDom, inputTarget, 'beforebegin');

		outputTarget.insertAdjacentHTML('beforeend', outputHtml);

		// adds functionality to the input elements in the new planet section
		initialiseSectionInputs(`[data-planet="planet${i}"]`);

		// updates global elements with new output elements
		const resourceOutputs: ElementIds = { output: {} };
		const outputs: NodeListOf<HTMLOutputElement> = document.querySelectorAll(`#body${i} output`);
		for (const output of Array.from(outputs)) {
			const id = output.id;
			resourceOutputs.output![id] = id;
		}
		updateGlobalElements(resourceOutputs);

		// updates the biome links for the new planet section
		biomeLinks(document.getElementById(`biome_input${i}`) as HTMLSelectElement);

		// adds resource input elements to the new planet section
		const resourceButton = document.getElementById(`addResourceButton${i}`) as HTMLButtonElement;
		if (!resourceButton) return;
		for (let j = 0; j < 3; j++) {		// NoSonar adds 3 resource inputs, because 3 is the minimum
			addResourceInput(resourceButton, i);
		}
	}
}

/**
 * Adds a new resource input section and updates the global elements list.
 *
 * @param {HTMLElement} element - The HTML element that was clicked.
 * @param {string} sectionTarget - The target section.
 * @returns {undefined} - Returns nothing.
 */
function addResourceInput(element: HTMLButtonElement, sectionTarget: number) {
	const inputSection = element.parentElement as HTMLElement;
	const elementList: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-resource]');
	const childIndex = getChildIndex(Array.from(elementList), 'dataset.resource');
	const resource = 'resource' + sectionTarget;
	const resource_input = 'resource_input' + childIndex;
	const oddEvenClass = 'is-' + oddEven(sectionTarget);

	const inputHTML = `<div class="tableCell text removable ${oddEvenClass}" data-section="resource${sectionTarget} planet${sectionTarget}" data-resource="section${childIndex}" data-planet="planet${sectionTarget}">
		<button class="button is-danger is-outlined icon is-small" title="Remove resource" type="button" disabled data-evt-id="removeButton">&#10006</button>
		<label for="${resource_input}">Resource name:</label>
	</div>
	<div class="tableCell data ${oddEvenClass}" data-section="resource${sectionTarget} planet${sectionTarget}" data-resource="section${childIndex}" data-planet="planet${sectionTarget}">
		<input type="text" list="resources" id="${resource_input}" data-dest-noauto="${resource}" data-evt-id="addButton">
	</div>`;

	const evtListeners: ElementFunctions = [
		{
			element: 'removeButton',
			handler: 'click',
			func: () => { removeSpecificSection(`section${childIndex}`, 'resource'); removeResource(resource_input) }
		},
		{
			element: 'addButton',
			handler: 'input',
			func: function () { addResource(this as unknown as HTMLInputElement) }
		},
	]

	const inputDom = loadHTML(inputHTML, {}, evtListeners) as Document;

	addDomAsElement(inputDom, inputSection, 'beforebegin');

	// Update the global elements list for the new input element.
	const resourceElements: ElementIds = { input: {} };
	resourceElements.input![resource_input] = resource_input;
	updateGlobalElements(resourceElements);

	// Get all of the current resource input sections, and count them.
	const resourceInputSections = getResourceInputSections(sectionTarget);
	const resourceInputSectionCount = getResourceInputSectionCount(resourceInputSections);

	// enter the number of sections you want to allow behind the ">" operator.
	// If there are more input sections than the maximum (6), disable the "add" button.
	if (resourceInputSectionCount + 1 > 6) {	// NoSonar limits the resource input count to 6
		element.disabled = true;
	}

	// default state is disabled because that's easier to handle.
	// Enable the "remove" button for every input section if there are more than the minimum (3, because every planet has at least 3 resources).
	if (resourceInputSectionCount > 3) {		// NoSonar enable "remove" button if more than 3 inputs
		for (const element of Array.from(resourceInputSections)) {
			const button = element.querySelector('button');
			if (button) button.disabled = false;
		}
	}
}

/**
 * Returns an array of DOM elements that have the attribute "data-resource"
 * and the attribute "data-planet" that matches the specified "sectionTarget" value.
 *
 * @param {string} sectionTarget - The value to match the "data-planet" attribute of the elements to be returned.
 * @returns {Array.<HTMLElement>} - The array of elements that match the specified criteria.
 */
function getResourceInputSections(sectionTarget: number) {
	const sections: NodeListOf<HTMLDivElement> = document.querySelectorAll(`[data-resource][data-planet="planet${sectionTarget}"]`);
	return Array.from(sections);
}

/**
 * Returns the count of unique 'resource' input sections in the provided array.
 * @param {HTMLInputElement[]} inputs - Array of input elements containing a dataset property with a 'resource' key.
 * @returns {number} - Count of unique 'resource' input sections.
 */
function getResourceInputSectionCount(inputs: Array<HTMLDivElement>) {
	const sections: Set<string> = new Set();
	for (const input of inputs) {
		const resource = input.dataset.resource as string;
		sections.add(resource);
	}
	return sections.size;
}

/**
 * Removes a specified resource from the page.
 *
 * @param {string} resourceID - The ID of the resource input element to remove.
 * @returns {void}
 */
export function removeResource(resourceID: string) {
	const resourceInput = globalElements.input[resourceID] as HTMLInputElement;
	const planet = resourceInput.dataset.destNoauto as string;
	const id = resourceInput.id;
	const sectionTarget = extractNumber(planet) as number;

	// remove element from resources
	if (resourceInput.value) {
		delete (links.resources as ResourceAndCreatureLinks)[planet][id];
		addResource();
	}

	// enable "add resource" button
	(document.getElementById(`addResourceButton${sectionTarget}`) as HTMLButtonElement).disabled = false;

	// disable remove buttons if 3 inputs or less
	const resourceInputSections = getResourceInputSections(sectionTarget);
	const resourceInputSectionCount = getResourceInputSectionCount(resourceInputSections);

	if (resourceInputSectionCount < 4) {	// NoSonar 3 resources is the minimum
		for (const element of resourceInputSections) {
			const button = element.querySelector('button');
			if (button) button.disabled = true;
		}
	}
}

/**
 * Toggles between "Moon" and "Planet" descriptions for an element and expands a descriptor dropdown.
 * @param {HTMLInputElement} element - The element that was clicked.
 * @returns {void}
 */
export function moonSwitch(element: HTMLInputElement) {
	const descriptorInput = document.getElementById(element.dataset.destNoauto as string) as HTMLInputElement | null;
	if (!descriptorInput) return;
	const i = extractNumber(element.id);
	const planetClass = element.checked ? 'Moon' : 'Planet';

	document.getElementById('planetClass' + i)!.innerText = planetClass;

	expandDescriptor(descriptorInput, planetClass);
}

/**
 * Expand a descriptor from a user input and use it to build output for a specified element.
 *
 * @param {HTMLElement} element - The element containing the user input.
 * @param {string|null} planetClass - The class of planet or moon.
 * @returns {void}
 */
function expandDescriptor(element: HTMLInputElement, planetClass: string | undefined = undefined) {
	const i = extractNumber(element.id);
	if (!planetClass) {
		planetClass = (document.getElementById('moon_input' + i) as HTMLInputElement).checked ? 'Moon' : 'Planet';
	}
	const descriptor = element.value;
	const dest = element.dataset.destNoauto as string;
	const output = buildDescriptor(descriptor, planetClass, '<br>');
	(globalElements.output[dest] as HTMLOutputElement).innerText = output;

	const isInfested = autoInfested(element);		// returns true or false
	if (typeof isInfested != 'boolean') return;
	infestedBiomeLinks('infested' + i, isInfested)
}

/**
 * Generates a list of upgrades for Space Station Merchants.
 *
 * @param {string|null} group - The ID of the checkbox group to get upgrades for. If not provided, checks all groups.
 * @returns {void}
 */
export function merchantUpgrades(group: string = '') {
	const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-dest-checkbox-group]');
	if (group) {
		getCheckedBoxes(group);
		return;
	}

	// if the checkboxes have no onchange event (i.e. at page load), assign them one
	const merchants: Set<string> = new Set();
	for (const checkbox of Array.from(checkboxes)) {
		const listeners = checkbox.dataset.listener ?? '';
		const listenerArray = listeners.split(' ');
		if (!listenerArray.includes('change')) assignFunction({ element: checkbox, func: function () { merchantUpgrades((this as unknown as HTMLInputElement).dataset.destCheckboxGroup) } });
		merchants.add(checkbox.dataset.destCheckboxGroup as string);
	}
	for (const merchant of merchants) {
		getCheckedBoxes(merchant);
	}
	return;

	function getCheckedBoxes(group: string) {
		const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(`[data-dest-checkbox-group="${group}"]`);
		const parm = (group.startsWith('SD')) ? '' : group.substring(0, 2);		// NoSonar this gets everything except the group prefix
		const checked: Array<string> = [];
		for (const checkbox of Array.from(checkboxes)) {
			const checkboxElement = checkbox;
			if (checkboxElement.checked) checked.push(checkboxElement.value);
		}

		const code: Array<string> = [];
		for (let i = 1; i <= checked.length; i++) {
			const output = `| ${parm}${i}=${checked[i - 1]}`;
			code.push(output);
		}
		wikiCode(code.join('\n'), group);
		const wrapper = (globalElements.output[group] as HTMLOutputElement).closest('#scrapDealer') as HTMLDivElement;
		if (!wrapper) return;		// return if not scrap dealer
		if (code.length == 0) {
			wrapper.style.display = 'none';
		} else {
			wrapper.style.display = '';
		}
	}
}

/**
 *  Creates new tradeable input and output sections in the trade terminal.
 *  @function addTradeableSections
 *  @description This function defines commonly used elements and variables, assigns functions to certain input elements, and adds new tradeable input and output sections to the appropriate elements in the trade terminal. It also disables the "Add Tradeable" button if the number of sections would exceed 5.
 *  @example addTradeableSections();
 */
export function tradeables() {
	// Define commonly used elements and variables
	const inputSection = globalElements.input.terminalInputs as HTMLDivElement;
	const outputSection = globalElements.output.tradeTerminal as HTMLDivElement;
	const elementList: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-tradeable]');
	const childIndex = getChildIndex(Array.from(elementList), 'dataset.tradeable').toString();
	const replacementStrings: StdObj = {
		childIndex,
		price: 'price' + childIndex,
		text: 'text' + childIndex,
		text_input: 'text_input' + childIndex,
		price_input: 'price_input' + childIndex,
	}

	const evtListeners: ElementFunctions = [
		{
			element: 'removeButton',
			handler: 'click',
			func: () => { removeSpecificSection(`section${childIndex}`, 'tradeable'); enableTradeableAdd() }
		}
	]

	// Get the HTML for the new tradeable input section
	const inputDom = loadHTML(tradeableInputs, replacementStrings, evtListeners) as Document;

	// Define the HTML for the new tradeable output section
	const codeHTML = `<div data-tradeable="section${childIndex}">|-</div>
	<div data-tradeable="section${childIndex}">| {{ilink|<output id="${replacementStrings.text}"></output>}} || {{Units}} <output id="${replacementStrings.price}"></output></div>`;

	// Assign functions to certain input elements
	const inputs: NodeListOf<HTMLInputElement> = inputDom.querySelectorAll(`[data-tradeable="section${childIndex}"] input[data-dest]`);
	for (const input of Array.from(inputs)) {
		assignFunction({ element: input, func: function () { wikiCode(this as unknown as HTMLInputElement) } });
	}
	const noautoInputs: NodeListOf<HTMLInputElement> = inputDom.querySelectorAll(`[data-tradeable="section${childIndex}"] input[data-dest-noauto]`);
	for (const input of Array.from(noautoInputs)) {
		assignFunction({ element: input, func: function () { storeData(this as unknown as HTMLInputElement); numberStats(this as unknown as HTMLInputElement) } });
	}

	// Add the new tradeable input and output sections to the appropriate elements
	addDomAsElement(inputDom, inputSection, 'beforebegin');

	outputSection.insertAdjacentHTML('beforeend', codeHTML);

	// Count the number of tradeable input sections and disable the "Add Tradeable" button if it exceeds 5 sections
	const tradeableInputSections: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-tradeable]');
	const tradeableInputSectionCount = (() => {
		const sections = new Set();
		for (const tradeableInputSection of Array.from(tradeableInputSections)) {
			const section = tradeableInputSection.dataset.tradeable as string;
			sections.add(section);
		}
		return sections.size;
	})();

	const button = inputSection.querySelector('button') as HTMLButtonElement;

	// enter the number of sections you want to allow behind the ">" operator.
	if (tradeableInputSectionCount + 1 > 5) {	// NoSonar 5 is the maximum number of tradeables per system
		button.disabled = true;
	}
}

/**
 * Enables the "add tradeable" button in the terminal input section.
 *
 * @function
 * @returns {void}
 */
export function enableTradeableAdd() {
	const inputSection = globalElements.input.terminalInputs as HTMLDivElement;
	const button = inputSection.querySelector('button') as HTMLButtonElement;

	// enable "add tradeable" button
	button.disabled = false;
}

export function resetExternal() {
	const sections: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-tradeable], [data-planet]');
	removeSection(Array.from(sections));
}

/**
 * Sets the text content of the 'regionLong' element to the full name of the region
 * or a modified version of the name if it contains more than one word.
 * @function
 * @returns {void}
 */
export function regionLong() {
	const region = pageData.region as string;
	const output = (() => {
		if (region.split(' ').length == 1) return region + ' region';
		return region;
	})();
	const outputElement = globalElements.output.regionLong as HTMLOutputElement;
	outputElement.innerText = output;
}

/**
 * Creates or updates the `resources` object with a new resource and generates the output to display.
 *
 * @param {HTMLInputElement|null} element - The input element from which to get the resource and planet data. If null, no new resource is added.
 * @returns {undefined}
 */
function addResource(element: HTMLInputElement | undefined = undefined) {
	const resources: ResourceAndCreatureLinks = (links.resources as ResourceAndCreatureLinks) ??= {};
	if (element) {
		const value = element.value;
		const planet = element.dataset.destNoauto as string;
		const id = element.id;

		resources[planet] ??= {};
		resources[planet][id] = sanitiseString(value);
	}

	const usedResources: Set<string> = new Set();
	const linkedResources = sortObj(structuredClone(resources), true) as ResourceAndCreatureLinks;
	for (const planetName in linkedResources) {
		const planet = linkedResources[planetName];
		for (const key in planet) {
			const resource = planet[key];
			if (resource && !usedResources.has(resource)) {
				linkedResources[planetName][key] = `[[${resource}]]`;
				usedResources.add(resource);
			}
		}
	}

	for (const key in linkedResources) {
		const output = Object.values(linkedResources[key]).filter(resource => resource).join('<br>');
		(globalElements.output[key] as HTMLOutputElement).innerText = output;
	}
}

/**
 * Generates links to biomes based on given element's value and destination planet number.
 *
 * @param {HTMLElement} element - The HTML element that triggered the function.
 * @returns {void}
 */
function biomeLinks(element: HTMLSelectElement) {
	const value = element.value;
	const planet = element.dataset.destNoauto as string;

	const biomes: StdObj = (links.biomes as StdObj) ??= {};
	biomes[planet] = sanitiseString(value);

	const usedBiomes: Set<string> = new Set();
	const linkedBiomes = sortObj(structuredClone(biomes), true) as StdObj;
	for (const planetName in linkedBiomes) {
		const biome = linkedBiomes[planetName];
		if (biome && !usedBiomes.has(biome)) {
			linkedBiomes[planetName] = `{{Biome|${biome}}}`;
			usedBiomes.add(biome);
		}
	}
	setBiomeText(linkedBiomes);
}

/**
 * Adds or removes links to the infested biome page depending on whether they are checked or not.
 * @param {string} dest - The name of the destination of the link.
 * @param {boolean} bool - Whether the link is checked or not.
 * @returns {void}
 */
function infestedBiomeLinks(dest: string, bool: boolean) {
	const infestedBiomes = (links.infestedBiomes as BiomeLinks) ??= {};
	infestedBiomes[dest] = bool;

	let infestedBiomeLink = false;
	const linkedBiomes = sortObj(structuredClone(infestedBiomes) as SortObj, true) as StdObj;
	for (const planetName in linkedBiomes) {
		const checked = linkedBiomes[planetName];
		if (checked && !infestedBiomeLink) {
			linkedBiomes[planetName] = `<br>([[Biome Subtype - Infested|Infested]])`;
			infestedBiomeLink = true;
		} else if (!checked) {
			linkedBiomes[planetName] = '';
			delete infestedBiomes[planetName];
		} else {
			linkedBiomes[planetName] = ` (Infested) `;
		}
	}
	setBiomeText(linkedBiomes);
}

/**
 * Set the text of specified elements with data from an array of values.
 * @param {Array} array - An array of values to use for setting the text.
 * @returns {void}
 */
function setBiomeText(obj: StdObj) {
	for (const [key, output] of Object.entries(obj)) {
		(globalElements.output[key] as HTMLOutputElement).innerText = output;
	}
}

/**
 * Updates the output element to display the expected hub tag for the current system, based on its region and glyphs.
 *
 * @function
 * @name expectedHubTagSentence
 * @returns {void}
 */
export function expectedHubTagSentence() {
	const outputElement = globalElements.output.expectedHubTag as HTMLOutputElement;
	const systemName = pageData.name as string;
	const region = pageData.region as string;
	const glyphs = pageData.portalglyphs as string;
	if (!systemName || !region) {
		outputElement.innerHTML = '';
		return;
	};
	const nr = getHubNumber(region);
	const index = (() => {
		const systemIndex = glyphs.substring(1, 4);		// NoSonar index 1-3 is the system index
		// this removes leading zeros
		const SIV = Number('0x' + systemIndex).toString(16).toUpperCase();		// NoSonar this is dec to hex conversion
		return SIV.replace('69', '68+1');	// replace 69 with 68+1, because the profanity filter flags it
	})();
	const expected = `HUB${nr}-${index}`;

	outputElement.innerHTML = '';
	if (systemName.includes(expected)) return;

	outputElement.innerText = `The expected HUB Tag for this system is ${expected}.` + '\n\n';
}

/**
 * Creates a section for a space station based on the input data.
 *
 * @function
 * @returns {Object} An object containing the structure and faction of the section.
 *
 * @example
 * const section = spaceStationSection();
 * // section = {
 * //     structure: ['img', 'note', 'terminal'],
 * //     faction: 'abandoned'
 * // }
 */
export function spaceStationSection() {
	// define notes
	const notes: StdObj = {
		uncharted: 'This system is uncharted and has no [[Space Station]].',
		abandoned: 'This space station is abandoned.' + '\n\n',
	}

	// define structure
	const sectionDefinition = {
		normal: ['img', 'terminal', 'merchant', 'scrapDealer'],
		pirate: ['img', 'scrapDealer'],
		abandoned: ['img', 'note', 'terminal'],
		uncharted: ['note'],
	}

	// define faction
	const faction = (() => {
		const input = pageData.faction as string;
		const wealth = pageData.wealth as string;
		const conflict = pageData.conflict as string;
		if (input == 'Uncharted') return 'uncharted';
		if (input.includes('Abandoned')) return 'abandoned';
		if (wealth.includes('Black Market') || conflict.includes('Pirate')) return 'pirate';
		return 'normal';
	})();

	// get all station sections
	const stationSections: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-station]');
	for (let i = 0; i < stationSections.length; i++) {
		const section = stationSections[i];
		const sectionName = section.dataset.station as string;
		if (sectionDefinition[faction].includes(sectionName)) {
			if ((sectionName == 'merchant' || sectionName == 'scrapDealer') && defaultDisplay(section)) {
				i++;	// NoSonar triggered by row with button, skip row with checkboxes
			}

			const isScrapDealer = section.id == 'scrapDealer' && !pageData.SDMerchant;
			section.style.display = isScrapDealer ? 'none' : '';
		} else {
			section.style.display = 'none';
		}
	}
	if (!notes[faction]) return;

	const outputElement = document.querySelector('[data-station="note"]') as HTMLDivElement;
	outputElement.innerText = notes[faction];

	/**
	 * Determines if the default display should be used for a space station section.
	 *
	 * @function
	 * @param {Object} section - The space station section HTML element.
	 * @returns {Boolean} Returns true if the default display should be used, false otherwise.
	 */
	function defaultDisplay(section: HTMLDivElement) {
		const button = section.querySelector('button:not(.tooltip)') as HTMLButtonElement;
		if (!button) return;
		const buttonId = button.dataset.buttonId;
		if (!buttonId) return;
		const displayId = 'display' + buttonId;
		const displayValue = button.dataset[displayId];
		return displayValue;
	}
}

/* utility stuff here */
/**
 * Autofills the color input with 'Black Hole' if the SIV is 79.
 *
 * @function
 * @name autoBH
 * @returns {undefined}
 */
export function autoBH() {
	const glyphs = pageData.portalglyphs as string;
	const colorInput = globalElements.input.colorInput as HTMLSelectElement;
	const SIV = glyphs.substring(2, 4);		// NoSonar gets the last two characters of the SIV, because only those are relevant for checking for black holes

	// Hides the input if SIV is 79, otherwise shows it and sets its value to an empty string.
	if (SIV == '79') {
		hideInput(colorInput, 'none');
		colorInput.value = 'Black Hole';
	} else {
		hideInput(colorInput, '');
	}

	// Calls the wikiCode function with the colorInput as the argument.
	wikiCode(colorInput);
}

/**
 * Autofills `conflictInput` and `wealthInput` if `Pirate` is selected on either.
 *
 * @param {Element} element - The element that triggered the function call.
 */
export function autoPirate(element: HTMLSelectElement) {
	const value = element.value;
	const conflict = globalElements.input.conflictInput as HTMLSelectElement;
	const wealth = globalElements.input.wealthInput as HTMLSelectElement;
	const inputs = [wealth, conflict];
	for (const input of inputs) {
		const pirate = (input.querySelector('optgroup[label="Pirate"] option') as HTMLOptionElement).value;
		if (value.includes('Black Market') || value.includes('Pirate Controlled')) input.value = pirate;
		wikiCode(input);
	}
	spaceStationSection();
}

/**
 * Autofills conflict/economy/wealth if faction includes 'Abandoned' or 'Uncharted'
 * @function
 * @returns {void}
 */
export function combineEconConf() {
	const faction = pageData.faction as string;

	const wealth = globalElements.input.wealthInput as HTMLSelectElement;
	const economy = globalElements.input.economyInput as HTMLSelectElement;
	const conflict = globalElements.input.conflictInput as HTMLSelectElement;

	const inputs = [wealth, economy, conflict];

	if (faction.includes('Abandoned') || faction == 'Uncharted') {
		for (const input of inputs) {
			const value = (input.querySelector('optgroup:last-child option') as HTMLOptionElement).value;
			input.value = value;
			wikiCode(input);
			hideInput(input, 'none');
		}
		return;
	}

	for (const input of inputs) {
		hideInput(input, '');
	}
}

/**
 * Adds or removes a template element depending on the checked status of the supplied checkbox.
 * If no checkbox is supplied, adds element for all system extras checkboxes.
 * @param {HTMLInputElement} [element=null] - The checkbox element to check.
*/
export function addTemplate(element: HTMLInputElement | undefined = undefined) {
	if (!element) {
		const checkboxes = document.getElementsByName('systemExtras') as NodeListOf<HTMLInputElement>;
		for (const checkbox of Array.from(checkboxes)) {
			addTemplate(checkbox);
		}
		return;
	}

	const outputElement = globalElements.output[element.value] as HTMLOutputElement;
	outputElement.style.display = element.checked ? '' : 'none';
}

export function civCatalog() {
	const civ = shortenGHub(pageData.civShort as string);
	wikiCode(civ, 'civShorter');
}

/**
 * Generates an array for the page gallery based on the faction of the current page.
 * If the faction is 'Uncharted' or includes 'Abandoned', the last element is removed.
 *
 * @function
 * @name generateGalleryArray
 * @returns {void}
 */
export function generateGalleryArray() {
	const array: Array<string> = [
		'',
		'System Exploration Guide',
		'System Page',
		'Default SS Multi-Tool',
	];

	if (pageData.faction == 'Uncharted' || (pageData.faction as string).includes('Abandoned')) {
		array.pop();
	}

	pageData.galleryArray = array;
}

/**
 * Searches for and highlights checkboxes based on a search term.
 *
 * @param {HTMLInputElement} element - The input element to search with.
 * @returns {void}
 */
export function searchUpgrades(element: HTMLInputElement) {
	const checkboxes = element.parentElement!.getElementsByClassName('checkbox') as HTMLCollectionOf<HTMLLabelElement>;
	const checkboxData: StdObj = {};
	for (const checkbox of Array.from(checkboxes)) {
		const { id } = checkbox.querySelector('input') as HTMLInputElement;
		const value = checkbox.innerText.toLowerCase();
		checkboxData[id] = value;
		checkbox.classList.remove('mark');
	}
	const searchTerm = element.value.trim().toLowerCase();
	if (!searchTerm) return;
	const matches = Object.entries(checkboxData)
		.filter(([, value]) => value.includes(searchTerm))
		.map(([key]) => key);
	for (const match of matches) {
		const matchedCheckbox = document.getElementById(match);
		matchedCheckbox?.closest('.checkbox')?.classList.add('mark');
	}
}