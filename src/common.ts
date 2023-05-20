/**
 * @fileoverview Provides general functions which can be used by all pages.
 */

import 'bulma';
import './scss/styles.scss';
import { wikiLink } from './variables/simple';
import { GHubHuburbRegions, regions } from "./variables/regions";
import { Regions } from "./types/regions";
import { readDefaultValues } from './modules/footer';
import { cachedHTML, dataIntegrityObj, globalElements, pageData } from './variables/objects';
import { uploadShown, galleryUploadShown } from './variables/sessionstorage';
import { getDestElements } from './elementFrontends/elementBackend/elementStore';
import { versions } from './variables/versions';
import { assignFunction } from './elementFrontends/elementBackend/elementFunctions';
import { glyphRegion } from './modules/portalglyphs';
import { explanation } from './modules/tooltip';
import './startup/';

/**
 * Adds Galactic Hub huburb regions to an object.
 * GHub has additional ship and MT hunting grounds
 * @param {Object} object - The object to add Galactic Hub regions to
 * @returns {void}
 */
export function addHuburbs(object: Regions) {
	// If the object has no GHub property, create one
	object.GHub ??= {};
	// Add each region code and name pair to the GHub property
	for (const regionCode in GHubHuburbRegions) {
		object.GHub[regionCode] = GHubHuburbRegions[regionCode];
	}
}
// If the 'huburbs' variable is defined and truthy, add Galactic Hub regions to 'regions'
const huburbs = sessionStorage.getItem('huburbs');
if (huburbs) addHuburbs(regions);

// Make 'regions' read-only
Object.freeze(regions);






/**
 * Executes functions on page load.
 * Adds inputs and outputs to the page, updates global elements, and assigns element functions.
 * Applies external links to wiki pages and adds tooltips to elements.
 * Toggles sections on the page.
 */
toggleSection();

/**
 * Returns an object containing references to input elements on the page.
 * @returns {Object} An object with properties "inputs", "checkboxes", "stores", "defaults", "simple", and "lists", each containing an array of relevant input elements.
 */
function getInputData() {
	const inputData = {
		inputs: document.querySelectorAll('[data-dest]'),
		checkboxes: document.querySelectorAll('[data-dest-checkbox]'),
		stores: document.querySelectorAll('[data-dest-noauto]'),
		defaults: document.querySelectorAll('[data-default]'),
		simple: document.querySelectorAll('[data-dest-simple]'),
		lists: document.querySelectorAll('[list]'),
	}
	return inputData;
}

/**
 * Runs various startup functions when the page loads.
 */
export function startUp() {
	autoShow();
	readDefaultValues();
	versionDropdown();
	uploadShown(true);
	galleryUploadShown(true);		// NoSonar (defined by gallery.js - isn't used by anything else, an if statement would just hurt performance)
	showAll();
	if (!pageData.debug) {
		uploadShown(false);
		galleryUploadShown(false);
	}
	enableTextMarking();
	// the order of the touch and mouse events MUST NOT BE CHANGED!!!
	// it will not work the other way around. Touch must be before mouse
	// globalElements.output.output.ontouchstart = () => preventCopy();		// this must be first		// this is commented out because it had bad scroll UX on mobile. It should be triggered when tapped, but not when swiped.
	(globalElements.output.output as HTMLElement).onmousedown = () => preventCopy();		// this must be second
	(globalElements.output.fullArticle as HTMLElement).onmouseup = (e) => getSelectedText(e.target);
	(globalElements.output.fullArticle as HTMLElement).ontouchend = (e) => getSelectedText(e.target);
	if (globalElements.output.albumText) {
		(globalElements.output.albumText as HTMLElement).ontouchend = (e) => getSelectedText(e.target);
		(globalElements.output.albumText as HTMLElement).onmouseup = (e) => getSelectedText(e.target);
	}
	preloadHTML();
}

/**
 * Preloads HTML files from the `cachedHTML` object
 * @function
 * @returns {void}
 */
function preloadHTML() {
	const files = cachedHTML.files;
	files.forEach(file => loadHTML(file));
}

/**
 * Creates a version dropdown menu in the app UI with custom text labels for certain options.
 *
 * @function
 * @name versionDropdown
 * @returns {void}
 */
export function versionDropdown() {
	const texts = structuredClone(versions);
	const index = texts.indexOf('SentinelUp');
	texts.splice(index, 1, 'Sentinel');
	const dropdownElement = globalElements.input.version;
	if (!dropdownElement) return;

	setDropdownOptions(dropdownElement as HTMLSelectElement, versions, texts);
}

// take element and array of values and array of corresponding text.
/**
 * Sets the options in a dropdown element based on an array
 * of values and corresponding text.
 *
 * @param {HTMLElement} element - The dropdown element to update.
 * @param {Array} values - An array of values to use for each option.
 * @param {Array} [texts=values] - An optional array of text to use
 * for each option. If no text is provided, the value will be used instead.
 *
 * @returns {undefined}
 */
export function setDropdownOptions(element: HTMLElement, values: Array<string>, texts: Array<string> = values) {
	const dropdown = new Array;
	for (let i = 0; i < values.length; i++) {
		const value = values[i];
		const text = texts[i];
		const dropdownOption = document.createElement('option');
		dropdownOption.value = value;
		dropdownOption.innerText = text;
		dropdown.push(dropdownOption.outerHTML);
	}
	const dropdownHTML = dropdown.join('');
	// dont't update the dropdown if content is identical
	if (element.innerHTML != dropdownHTML) element.innerHTML = dropdownHTML;
}

/**
 * Automatically sets up input fields, checkboxes, stores, and datalists with appropriate functions.
 *
 * @returns {void} Nothing is returned by this function.
 */
export function autoShow(): void {
	const inputData = getInputData();
	for (const element of Array.from(inputData.defaults)) {
		assignFunction({ element: element as HTMLElement, func: function () { assignDefaultValue(this as unknown as HTMLElement) } });
	}

	for (const input of Array.from(inputData.inputs)) {
		assignFunction({ element: input as HTMLElement, func: function () { wikiCode(this as unknown as HTMLElement) } });
	}

	for (const checkbox of Array.from(inputData.checkboxes)) {
		assignFunction({ element: checkbox as HTMLInputElement, func: function () { checkboxWikiCode(this as unknown as HTMLElement) } });
	}

	for (const store of Array.from(inputData.stores)) {
		assignFunction({ element: store as HTMLElement, func: function () { storeData(this as unknown as HTMLElement) } });
	}

	for (const simple of Array.from(inputData.simple)) {
		assignFunction({ element: simple as HTMLElement, func: function () { wikiCodeSimple(this as unknown as HTMLElement) } });
	}

	for (const list of Array.from(inputData.lists)) {
		assignFunction({ element: list as HTMLInputElement, handler: 'change', func: function () { forceDatalist(this as unknown as HTMLInputElement) } });
	}
}

/**
 * Displays all input fields, checkboxes, dropdowns, and other relevant elements to the webpage.
 * @function
 * @returns {void}
 */
export function showAll() {
	const inputData = getInputData();
	for (const input of Array.from(inputData.inputs)) {
		wikiCode(input);
	}
	for (const checkbox of Array.from(inputData.checkboxes)) {
		checkboxWikiCode(checkbox);
	}
	for (const store of Array.from(inputData.stores)) {
		storeData(store);
	}

	for (const element of Array.from(inputData.defaults)) {
		assignDefaultValue(element);
	}

	for (const simple of Array.from(inputData.simple)) {
		wikiCodeSimple(simple);
	}

	numberStats();
	civ();
	image(globalElements.input.fileUpload);
	if (typeof galleryUpload == 'function') galleryUpload();
	try { glyphInputOnChange(globalElements.input.portalglyphsInput) } catch (error) { /*do nothing*/ }
	try { researchTeam() } catch (error) { /*do nothing*/ }
	try { planetMoonSentence() } catch (error) { /*do nothing*/ }
	hideDiscoverer();
	try { startupFunctions() } catch (error) { console.warn(error) }
}

/**
 * Updates a destination element with the sanitized value of a source element's value or content.
 *
 * @param {Object} element - The source element to retrieve value or content from.
 * @param {string} dest - The ID of the destination element(s) to update, specified in a data attribute on the source element.
 */
export function wikiCode(element, dest = element.dataset.dest) {
	const destElements = getDestElements(dest);

	// sanitize the source value or content
	const value = sanitiseString(element.value ?? element);

	// update the pageData with the sanitized value
	if (dest) {
		pageData[dest] = value;
	} else {	// no destination given, trying to store value in pageData without transferring it into code
		pageData[element.dataset.destNoauto] = value;
		return;
	}

	// update the destination element(s) with the sanitized value
	for (const destElement of destElements) {
		try {
			destElement.innerText = value;
		} catch (error) {
			console.error('destElement is null. Element:', element, 'Value:', value, 'Stacktrace:', error);
			continue;
		}
	}
}

/**
 * Handles the change event for a checkbox and updates a DOM element's text and page data accordingly.
 *
 * @param {Object} element - The checkbox element that triggered the event.
 */
function checkboxWikiCode(element) {
	const dest = element.dataset.destCheckbox;
	const destElement = document.getElementById(dest);
	const checked = element.value;
	const unchecked = element.dataset.checkboxUnchecked ?? '';
	if (element.checked) {
		destElement.innerText = checked;
		pageData[dest] = checked;
	} else {
		destElement.innerText = unchecked;
		pageData[dest] = unchecked;
	}
}

/**
 * Stores the value of a DOM element in the page data object.
 *
 * @param {Object} element - The DOM element whose value will be stored.
 * @param {string} [key=element.dataset.destNoauto] - The key under which the value will be stored in the page data object. Defaults to the value of the element's `dest-noauto` attribute.
 */
function storeData(element, key = element.dataset.destNoauto) {
	pageData[key] = sanitiseString(element.value);
}

/**
 * Adds target and rel attributes to all external links on the page.
 *
 * @function externalLinks
 * @return {void}
 */
export function externalLinks() {
	const isExternalURL = (url) => new URL(url).origin !== location.origin;
	const a = document.getElementsByTagName('a');
	for (const link of a) {
		if (!isExternalURL(link.href)) continue;
		link.target ||= '_blank';
		link.rel ||= 'noopener noreferrer';
	}
}

/**
 * Update all wiki links on the page to open in a new tab.
 * @function openWikiLinksExternally
 * @returns {void}
 */
export function openWikiLinksExternally() {
	const a = document.querySelectorAll('a[data-wiki]');
	for (const link of a) {
		link.target ||= '_blank';
		link.rel ||= 'noopener noreferrer';
		delete link.dataset.wiki;
		const pagename = link.getAttribute('href');
		if (pagename.startsWith('http')) continue;
		link.href = wikiLink + pagename;
	}
}

/**
 * Places a value from an element into an output element. Does not sanitize wikitext. Can also handle one-to-many relationships.
 *
 * @param {HTMLElement} element - The input element to source the value from.
 */
export function wikiCodeSimple(element, dest = element.dataset.destSimple) {
	const outputs = Array.from(document.getElementsByName(dest));
	if (!outputs.length) outputs.push(document.getElementById(dest));
	for (const output of outputs) {
		output.innerText = element.value;
	}
}

/**
 * Adds static page data to the pageData object. This data is read-only and cannot be changed or deleted.
 *
 * @param {string} key - The key of the data to add.
 * @param {*} value - The value of the data to add.
 */
export function addStaticPageData(key, value) {
	Object.defineProperty(pageData, key, { configurable: false, writable: false, value: value });
}

/**
 * Extracts information based on the user's input about the civilization and saves it as an object.
 */
export function civ() {
	// Get the user's input from the DOM.
	const input = globalElements?.input?.civ?.value;

	// If the input is empty, exit the function.
	if (!input) return;

	// Create a new object to hold the civilization data.
	const civData = new Object;

	// Based on the input, set the values for the civData object.
	switch (input) {
		case 'GHub':
			civData.galaxy = 'Euclid';
			civData.civilized = 'Galactic Hub Project';
			civData.civStub = 'GHub';
			break;

		case 'CalHub':
			civData.galaxy = 'Calypso';
			civData.civilized = 'Galactic Hub Calypso';
			civData.civStub = 'GHub Calypso';
			break;

		case 'EisHub':
			civData.galaxy = 'Eissentam';
			civData.civilized = 'Galactic Hub Eissentam';
			civData.civStub = 'GHub Eissentam';
			break;
	}

	// Add the civData object to the main pageData object and generate the wikiCode for each property.
	pageData.civShort = input;
	for (const key in civData) {
		pageData[key] = civData[key];
		if (getDestElements(key).length) wikiCode(pageData[key], key);
	}

	// Update the research team dropdown and glyph region.
	try {
		updateCiv();
	} catch (error) {
		console.warn(error);
	}
}

/**
 * Updates the research team and glyph region based on the current page data.
 */
function updateCiv() {
	researchTeamDropdown();
	glyphRegion(pageData.portalglyphs);
	docBy();
}

/**
 * Sanitizes a given string by removing all non-link wiki markup, and trimming the result.
 *
 * @param {string} input - The string to sanitize. Must contain only wiki links, templates, and external links in wiki markup.
 * @returns {string} The sanitized string with all non-link wiki markup removed.
 *
 * @example
 * // returns "this [[is]] a test [[with some extra markup mixed in]]crazy[http://test-link.com]link[http://another-link.net]abc[[d]]efghijklmnopqrstuv^w_x[[yz[http://nested-link.com]"
 * const inputString = "this [[is]] a {test} [[with] some {extra} {markup} {mixed [in}]}]crazy[http://test-link.com]link[http://another-link.net][a][b][c][[d]]e{f}g{hi}jkl[m]nop[qrs]t[u]v^w_x[[y]z{[http://nested-link.com]}";
 * const outputString = sanitiseString(inputString);
 */
export function sanitiseString(input: string) {
	const doubleWikiMarkup = ['{', '}', '[', ']'];
	const outputArray = new Array;

	// split text into sections that contain only wiki links in wiki markup and only non-wiki-linked text.
	const markupSections = input.split('[http');

	// remove all wiki markup except for wiki links in each section.
	for (let i = 0; i < markupSections.length; i++) {
		const noMarkupText = removeAllMarkup(markupSections[i], i != 0);
		outputArray.push(noMarkupText);
	}

	// join sections back together and return trimmed string.
	const regex = /\n{3,}/g;					// This regex searches for three or more consecutive new lines.
	const text = outputArray.join('[http')		// Join the sections together with [http in between.
		.replace(regex, "\n\n")					// Replace the three or more consecutive new lines with just two new lines.
		.trim();								// Trim any leading or trailing white space.
	return text;


	// This function removes all wiki markup from a given string. Returns a string.
	function removeAllMarkup(str, ignoreFirstBracket = false) {
		let noMarkupString = str;
		for (const markup of doubleWikiMarkup) {
			if (ignoreFirstBracket && markup == ']') {
				noMarkupString = skipFirst(noMarkupString, markup);
			} else {
				noMarkupString = removeSpecificMarkup(noMarkupString, markup);
			}
		}
		return noMarkupString;
	}

	/**
	 * Removes all instances of a specific wiki markup character from a given string.
	 *
	 * @param {string} string - The string to remove markup from.
	 * @param {string} markup - The wiki markup character to remove.
	 * @returns {string} The string with all instances of the markup character removed.
	 */
	function removeSpecificMarkup(string, markup) {
		const doubleMarkup = markup.repeat(2);
		const noMarkupString = string.split(doubleMarkup)	// split based on double markup (isolate valid markup)
			.map(part => part.replaceAll(markup, ''))		// remove all invalid markup
			.join(doubleMarkup);							// join back together using double markup
		return noMarkupString;
	}

	/**
	 * Removes the first occurrence of a given character in every occurrence of a double-wiki-markup-separated string.
	 *
	 * @param {string} string - The string to modify.
	 * @param {string} char - The character to remove.
	 * @returns {string} The modified string with the character removed.
	 */
	function skipFirst(string, char) {
		// get all indices of the character we want to strip out, except the first one
		const firstBracketIndex = string.indexOf(char);
		const noMarkupString = removeSpecificMarkup(string, char);
		const stringArray = noMarkupString.split('');
		// put a character at the character at the first bracket indices
		stringArray.splice(firstBracketIndex, 0, char);
		// join the array of modified strings with the wiki markup
		return stringArray.join('');
	}
}

/**
 * Handles a file input change event, sanitizes the filename, and generates wiki code.
 * Throws an error if the file size is larger than 10MB.
 *
 * @param {HTMLInputElement} element - The file input element to process.
 * @returns {void}
 */
function image(element: HTMLInputElement) {
	const filename = element?.files?.[0]?.name;
	if (!filename) return;
	// throw error if file is bigger than 10MB (wiki upload limit)
	if (element.files![0].size > 10000000) {
		errorMessage(element, 'This file is too big to be uploaded to the wiki. Maximum filesize is 10MB.');
	} else {
		errorMessage(element);
	}
	const fileInput = element.previousElementSibling as HTMLInputElement;
	const sanitisedName = sanitiseString(filename);
	fileInput.value = sanitisedName;
	wikiCode(fileInput);
	// this section handles an automatic notice about Special:Upload, since this is a big source of confusion for users
	if (uploadShown()) return;	// ignore following code if we already alerted user about Special:Upload
	explanation('Upload your picture to the wiki!', `Don't forget to upload your picture to the wiki on <a href="https://nomanssky.fandom.com/wiki/Special:Upload?multiple=true" target="_blank" rel="noopener noreferrer">Special:Upload</a>.
	The upload button only auto-filled the image name into the code, it is not automatically uploaded to the wiki.
	<div class="mt-3"><span class="has-text-weight-bold">NOTE</span>: You can access this popup at any time by clicking on the "?" next to the main image upload button.</div>`);
	uploadShown(true);
}

/**
 * Toggles the visibility of all elements with a matching `data-${attributeName}` attribute
 * based on the given `sectionName`. If called without arguments, initializes button element `data-display${id}`
 * attributes for all buttons with class 'sectionToggle'.
 *
 * @param {string} sectionName - The value of the `data-${attributeName}` attribute to match.
 * @param {HTMLElement} button - The button element that triggered the toggle action.
 * @param {string} [attributeName='section'] - The name of the data attribute to match against.
 */
function toggleSection(sectionName, button, attributeName = 'section') {
	const elements = document.querySelectorAll(`[data-${attributeName}~="${sectionName}"]`);
	const buttons = document.querySelectorAll('[data-button-id]');
	const childindex = getChildIndex(buttons, 'dataset.buttonId');

	if (arguments.length == 0) {
		const buttonElements = document.querySelectorAll('.sectionToggle button');
		for (let i = 0; i < buttonElements.length; i++) {
			const button = buttonElements[i];
			button.dataset.buttonId ??= childindex + i;
			const id = button.dataset.buttonId;
			button.dataset[`display${id}`] = button.dataset.displayDefault ?? '';
		}
		return;
	}

	button.dataset.buttonId ??= childindex;
	const id = button.dataset.buttonId;
	const displayID = `display${id}`;
	const state = button.dataset[displayID];

	for (const element of elements) {
		const object = element.dataset;
		let hide = false;
		for (const key in object) {
			if (!key.includes('display') || key == displayID) continue;
			if (object[key] == 'none') {
				hide = true;
				break;
			}
		}
		if (hide) continue;

		if (state) {
			element.style.display = '';
			element.dataset[displayID] = '';
		} else {
			element.style.display = 'none';
			element.dataset[displayID] = `none`;
		}
	}
	button.innerText = state ? 'Hide' : 'Show';
	button.dataset[displayID] = state ? '' : 'none';
}

/**
 * Generates a dropdown for selecting a research team.
 *
 * @param {HTMLInputElement} [inputElement=globalElements.input.researchTeam] - The input element to generate the dropdown for.
 * @param {string} [civ=pageData.civShort] - The civilization to generate the dropdown for. Defaults to the current civilization.
 * @returns {void}
 */
export function researchTeamDropdown(inputElement: HTMLSelectElement = globalElements.input.researchTeam as HTMLSelectElement, civ = pageData.civShort) {
	if (!inputElement) return;
	const prevSelect = inputElement.value;
	const teams = ['', 'GHGS', 'GHEC', 'GHSH', 'GHDF', 'GHBG', 'GHSL', 'GHTD', 'HBS'];

	switch (civ) {
		case "CalHub":
			teams.push('CalHub Archivists');
			break;

		case "EisHub":
			teams.push('EisHub Scribes', 'EPC', 'The Eissentimes Press');
			break;
	}
	setDropdownOptions(inputElement, teams);
	inputElement.value = prevSelect;
	if (!arguments.length) researchTeam();
}

/**
 * Adds a "researchteam" value to `pageData`, and displays it on the page.
 *
 * If no "researchteam" value is given, this function will add a default value based on the "civilized" value in `pageData`.
 *
 * Additionally, this function expands some "civilized" specific "researchteam" values, and updates the displayed value on the page.
 *
 * @function
 * @returns {void}
 */
export function researchTeam() {
	const researchteamInput = globalElements.input.researchTeam;
	const { value: researchteamValue, dataset: { destNoauto: dest } } = researchteamInput;
	pageData[dest] = researchteamValue;
	const civ = pageData.civilized;
	const exceptions = ['Base', 'Racetrack'];
	const researchteam = (() => {
		if (researchteamValue.split(' ').length == 2) {
			return civ + ' ' + researchteamValue.split(' ')[1];
		} else if (!researchteamValue && !exceptions.includes(pageData.pageType)) {
			return civ;
		} else {
			return researchteamValue;
		}
	})();
	globalElements.output[dest].innerText = researchteam;
}

/**
 * Adds documentation to a page if the documenter is not the same as the discoverer.
 * If docByExternal is defined, it will call that function instead.
 *
 * @return {void}
 */
export function docBy() {
	if (typeof docByExternal == 'function') {
		docByExternal();
		return;
	}

	const docByElement = globalElements.input.docbyInput;
	if (!docByElement) return;
	const documenter = sanitiseString(docByElement.value);
	const discoverer = pageData.discovered ?? pageData.builder;
	const discoveredlink = pageData.discoveredlink ?? pageData.builderlink;
	const dest = docByElement.dataset.destNoauto;
	const chapter = displayResearch();
	const formattedDocumenter = formatName(documenter);
	const discArray = [discoverer, discoveredlink];

	if (documenter && !discArray.includes(documenter)) {
		globalElements.output[dest].style.display = '';
		globalElements.output[dest].innerText = `Documented by ${chapter} ${formattedDocumenter}`;
	} else {
		globalElements.output[dest].style.display = 'none';
	}
	addInfoBullet();
}

/**
 * Adjusts the researchteam for display in a sentence.
 *
 * @function
 * @returns {string} Returns a string that describes the research team
 */
function displayResearch() {
	const chapter = pageData.researchteam;
	if (!chapter) return chapter;

	const teamIDs = globalElements.input.researchTeam.children;
	const teams = new Array;
	for (const team of teamIDs) {
		teams.push(team.value);
	}
	const pos = teams.indexOf(chapter);

	const chapterSentence = (() => {
		if (pos < 4) {
			return `[[${chapter}]] researcher`;
		} else if (chapter.includes('Scribe')) {
			return 'EisHub [[Galactic Hub Eissentam Scribes|Scribe]]';
		} else if (chapter.includes('Archivist')) {
			return 'CalHub [[Galactic Hub Calypso Archivists|Archivist]]';
		} else {
			return `[[${chapter}]] member`;
		}
	})();
	return chapterSentence;
}

/**
 * Formats a name to conform to wiki standards.
 * Plain name is italicised, while a linked name has no formatting.
 *
 * @param {string} documenter - The name to be formatted.
 * @returns {string} - The formatted name.
 */
// formats a name to conform to wiki standards. Plain name = italicised, link = no formatting
function formatName(documenter) {
	if (!documenter) return documenter;

	const documented = (() => {
		if (documenter.includes('[') || documenter.includes('{')) {
			return documenter;
		} else {
			return `''${documenter}''`;
		}
	})();
	return documented
}

/**
 * Hides the discoverer input fields for a set of paired inputs if one input is populated.
 * If no input IDs are specified, shows all input fields.
 *
 * @param {string} [keepId] - ID of paired input to keep visible.
 * @param {string} [removeId] - ID of paired input to hide.
 * @returns {undefined}
 */
export function hideDiscoverer(keepId: string = '', removeId: string = '') {
	if (!keepId && !removeId) {			// show everything if no inputs are given
		// I wrote this, but I have no idea how it works
		const elements: NodeListOf<HTMLInputElement> = document.querySelectorAll('[oninput*="hideDiscoverer"], [onchange*="hideDiscoverer"]');
		const usedElements: Set<HTMLInputElement> = new Set();		// holds already done elements so we don't get duplicates
		const inputPairs = new Array;		// holds our new pairs
		// builds the pair arrays and pushes them to inputPairs
		for (const element of Array.from(elements)) {
			if (usedElements.has(element)) continue;
			const tableCell = element.closest('.tableCell');
			const prev = tableCell?.previousElementSibling?.previousElementSibling?.querySelector('input');
			const next = tableCell?.nextElementSibling?.nextElementSibling?.querySelector('input');
			const siblingArray = [prev, next];
			const adjacentInput = siblingArray.find(input => Array.from(elements).includes(input as HTMLInputElement));
			const pair = [element, adjacentInput];
			usedElements.add(adjacentInput as HTMLInputElement);
			inputPairs.push(pair);
		}
		for (const pair of inputPairs) {
			const input1 = pair[0];
			const input2 = pair[1];

			if (input1.value) {
				hideDiscoverer(input1.id, input2.id);
			} else if (input2.value) {
				hideDiscoverer(input2.id, input1.id);
			} else {
				pair.forEach(input => hideInput(input, ''));
			}
		}
		return;
	}
	const keepInput = document.getElementById(keepId) as HTMLInputElement;
	const removeInput = document.getElementById(removeId) as HTMLInputElement;

	const showStatus = (() => {
		if (keepInput.value) {
			return 'none';	// remove
		} else {
			return '';		// keep all
		}
	})();
	hideInput(removeInput, showStatus);
	removeInput.value = '';
	wikiCode(removeInput);
}

/**
 * Enables bulletpoint content if more than one sentence.
 *
 * @function
 * @name addInfoBullet
 * @returns {void}
 */
function addInfoBullet() {
	const elements = document.querySelectorAll('[data-add-info]');
	const lines = new Array;
	for (const element of elements) {
		if (!element.nextElementSibling.style.display && element.nextElementSibling.innerText) lines.push(element);
		element.innerHTML = '';
	}

	for (const line of lines) {
		if (lines.length > 1) {
			const content = line.dataset.addInfo;
			line.innerHTML = content;
		} else {
			line.innerHTML = '';
		}
	}
}

/**
 * Displays an error message for a given input element in a table cell.
 *
 * @param {HTMLElement} element - The input element for which to display the error.
 * @param {string|null} [msg=null] - The error message to display. If null, any existing error message is removed.
 * @returns {void}
 */
export function errorMessage(element: HTMLElement, msg: string = '') {
	const tableCell = element.closest('.data');
	tableCell?.querySelector('.error')?.remove();
	element.style.backgroundColor = '';
	tableCell.previousElementSibling.style.alignItems = '';
	if (!msg) return;
	element.style.backgroundColor = 'red';
	const div = document.createElement('div');
	div.innerHTML = msg;
	div.className = 'error';
	tableCell.appendChild(div);
	tableCell.previousElementSibling.style.alignItems = 'baseline';
}

/**
 * Validates input coordinates in the format "+/-ddd.dd, +/-ddd.dd". Throws an error message if the input is invalid.
 *
 * @param {Boolean} [error=true] - Whether to display an error message if the input is invalid. Defaults to true.
 *
 * @returns {string} - Returns "error" if the input is invalid, otherwise returns undefined.
 *
 * @example
 * // The following input would be considered invalid: "12.34, 56.78"
 * validateCoords();
 */
export function validateCoords(error: boolean = true) {
	const element = globalElements.input.axesInput;
	const axes = element.value;
	const axesRegex = new RegExp(/[+-](?:[0-9]{1,3})\.(?:[0-9]{2}), [+-](?:[0-9]{1,3})\.(?:[0-9]{2})/);
	if (!axes || regexMatch(axes, axesRegex)) {
		errorMessage(element);
		return;
	}
	if (error) errorMessage(element, 'Invalid coordinate format');
	return 'error';
}

/**
 * Hides an input cell and its label cell.
 * @param {HTMLElement} element - The input element to be hidden.
 * @param {string} [displayValue=null] - The CSS display value to apply to the input and label cells. Defaults to an empty string if not specified.
 * @returns {void}
 */
export function hideInput(element: HTMLElement, displayValue: string = '') {
	const inputCell = element.closest('.tableCell') as HTMLElement;
	const labelCell = inputCell.previousElementSibling as HTMLElement;
	const inputRow = [labelCell, inputCell];

	for (const cell of inputRow) {
		if (cell.style.display) {
			cell.style.display = displayValue ?? '';
		} else {
			cell.style.display = displayValue ?? 'none';
		}
	}
}

/**
 * Returns the English article "a" or "an" which should be used before a given word.
 *
 * @param {string} text - The word to prefix with an article.
 * @param {string} [dest=null] - The destination to write the output to using `wikiCode()`. Optional.
 * @returns {string} The article to use before `text`.
 */
function enPrefix(text, dest = null) {
	const firstLetter = text?.match(/[a-zA-Z]/)?.[0]?.toLowerCase();
	const output = (() => {
		if (vowels.includes(firstLetter)) {
			return 'an';
		} else {
			return 'a';
		}
	})();
	if (dest) wikiCode(output, dest);
	return output;
}

/**
 * Returns true if a string matches a given regular expression.
 *
 * @param {string} string - The string to match.
 * @param {RegExp} regex - The regular expression to match against.
 * @returns {boolean} - True if the string matches the regex, false otherwise.
 */
function regexMatch(string, regex) {
	const stringMatches = string.match(regex);
	return stringMatches?.length == 1 && stringMatches[0]?.length == string.length;
}

/**
 * Returns documentation text for a discovery page based on the research team that documented it.
 *
 * @param {string} expected - The expected research team abbreviation (e.g., 'GHSH' or 'GHEC').
 * @returns {string} - The documentation text, including the research team name if it matches the expected abbreviation.
 */
function docByResearchteam(expected) {
	const researchteam = pageData.researchteam;
	const researchteamData = {
		GHSH: 'Ship Hunters',
		GHEC: 'Exobiology Corps',
	}
	if (researchteam == expected) {
		return ` and documented by the [[Galactic Hub ${researchteamData[expected]}]]`;
	} else {
		return '';
	}
}

/**
 * Shortens a civilization name if it matches a specific abbreviation.
 *
 * @param {string} civ - The civilization name to shorten.
 * @returns {string} - The shortened civilization name, or the original name if it doesn't match an abbreviation.
 */
function shortenGHub(civ) {
	if (civ == 'GHub' || civ == 'Galactic Hub Project') return 'Galactic Hub';
	return civ;
}

/**
 * This function calculates the sum, average, minimum, and maximum of a set of numbers, and formats the results for display on a web page. If no arguments are provided, the function will automatically find and calculate the numbers for all elements with the `numberStats` property.
 *
 * @param {HTMLElement} element - The HTML element to calculate statistics for.
 * @param {number} [decimals=null] - The number of decimal places to use in formatted results. If `null`, the function will use the default number of decimal places.
 * @param {boolean} [outputRaw=false] - Whether to output the raw calculation values along with the formatted results. If `true`, the function will return an object with `formatted` and `raw` properties; if `false`, it will return only the formatted string.
 * @returns {string|Object} The formatted statistics string (and optionally, the raw calculation values).
 */
function numberStats(element, decimals = null, outputRaw = false) {
	if (arguments.length == 0) {
		const numbers = document.querySelectorAll('[oninput*="numberStats"]');
		for (const element of numbers) {
			numberStats(element);
		}
		return;
	}

	const dest = element.dataset.destNoauto
	const propertyValue = pageData[dest];
	const propertyData = numberError(element, propertyValue, decimals, outputRaw);
	if (getDestElements(dest)[0]) {
		wikiCode(propertyData, dest);
	} else {
		pageData[dest] = propertyData;
	}
}

/**
 * Validates that a given input element contains only numeric characters, and displays an error message if it doesn't.
 * @param {Element} element - The input element to validate.
 * @param {string} [value=element.value] - The value to validate (defaults to the value of the input element).
 * @param {number} [decimals=null] - The number of decimal places to use when formatting the input value (if outputRaw is false).
 * @param {boolean} [outputRaw=false] - If true, returns the raw input value without formatting.
 * @returns {string|number} - The input value, parsed as a number (if valid) or an empty string (if not valid).
 */
function numberError(element, value = element.value, decimals = null, outputRaw = false) {
	const number = getNumber(value, decimals, outputRaw);
	const allowedSymbols = ['+', '-'];
	if (number || !value || allowedSymbols.includes(value)) {
		errorMessage(element);
	} else {
		errorMessage(element, 'Must only contain numbers');
	}
	return number;
}

/**
 * Parses a string containing a number and returns it as a formatted number string or numeric value.
 * @param {string} number - The string to parse as a number.
 * @param {number} [decimals=null] - The number of decimal places to use when formatting the output value.
 * @param {boolean} [outputRaw=false] - If true, returns the raw parsed value without formatting.
 * @returns {string|number} - The parsed number, formatted with commas and the specified number of decimal places (if decimals is non-null), or the raw parsed value (if outputRaw is true).
 */
function getNumber(number, decimals = null, outputRaw = false) {
	const raw = parseFloat(number.replaceAll(',', ''));
	const output = (() => {
		if ((!raw && raw != 0) || isNaN(raw)) return '';
		if (decimals) return parseFloat(raw).toFixed(decimals);
		return raw;
	})();
	if (outputRaw || !output) return output.toString();
	return new Intl.NumberFormat('en-UK', { minimumFractionDigits: decimals }).format(output);
}

/**
 * Creates HTML5 datalists with the provided entries and appends them to the <body> tag.
 * @param {Object} object - An object containing datalist IDs as keys with an array of entries as values.
 * @example
 * // Creates a datalist with ID datalist1 and two entries, "entry1" and "entry2"
 * datalists({datalist1: ["entry1", "entry2"]});
 */
function datalists(object) {
	for (const Id in object) {
		const datalist = document.createElement('datalist');
		datalist.id = Id;
		for (const option of object[Id]) {
			const optionElement = document.createElement('option');
			optionElement.value = option;
			datalist.appendChild(optionElement);
		}
		document.body.appendChild(datalist);
	}
}

/**
 * Validates the option selected in a datalist element.
 * @param {HTMLInputElement} element - The input element with the datalist.
 * @returns {void}
 */
export function forceDatalist(element) {
	const option = element.list.querySelector(`[value="${element.value}"]`);
	if (!option && element.value && element.id != 'currencyInput') {
		errorMessage(element, 'Not a valid option. If you believe this is an error, submit a <a href="https://docs.google.com/forms/d/e/1FAIpQLSdXFIaHbeCWVsiaeIvcJL0A3aWiB5tQQFf2ofg0dr7lOkDChQ/viewform" rel="noreferrer noopener" target="_blank">bug report</a>.');
	} else {
		errorMessage(element);
	}
}

/**
 * Checks the integrity of the page data and returns an error message if there's an issue.
 * @param {HTMLElement} [element=null] - The HTML element related to the data check.
 * @param {boolean} [simple=false] - Indicates whether to perform a simple data check.
 * @returns {string|false} A string with an error message if a data integrity issue was found, or false otherwise.
 */
function checkDataIntegrity(element: HTMLElement | null = null, simple: boolean = false) {
	if (pageData.debug) return '';
	const currentText = JSON.stringify(pageData);
	const savedText = dataIntegrityObj.text;

	const { name, portalglyphs: glyphs, region } = pageData;

	if (name && glyphs && region && ((currentText == savedText && dataIntegrityObj.copy === element?.dataset?.link) || simple)) {
		dataIntegrityObj.copy = false;
		return '';
	} else if (!name) {
		return 'Missing Name!';
	} else if ((!glyphs || !region)) {
		return 'Wrong Glyphs!';
	} else {
		return 'Copy Code First!';
	}
}

/**
 * Removes all newlines from a given string.
 *
 * @param {string} text - The text string to remove newlines from.
 * @return {string} - A modified string with all newlines replaced by empty spaces.
 */
function removeNewlines(text) {
	const newlineRegex = /\r?\n|\r/g;
	const textString = text.replace(newlineRegex, '');
	return textString;
}

/**
 * Returns the selected text within a given section of the wiki page, after performing some preprocessing to remove unwanted text.
 * @function
 * @param {Object} section - The HTML element representing the section to search for selected text.
 * @returns {string} - The selected text as a trimmed string, with any button text removed.
 */
function getSelectedText(section) {
	// this is some stupid BS: Chrome selects the button text, despite it having user-select:none. #chromesucks
	// I have no idea how to fix this, so I will just remove the button text from the string :shrug:
	const buttonText = document.getElementById('switchTheme').innerText;

	const sectionText = removeNewlines(section.closest('.wikiText').innerText).trim();
	const selected = (() => {
		const text = removeNewlines(window.getSelection().toString()).trim();
		if (text.endsWith(buttonText)) return text.replace(buttonText, '').trim();
		return text;
	})();

	dataIntegrityObj.text = JSON.stringify(pageData);
	dataIntegrityObj.copy = (sectionText == selected)
}

/**
 * Enables text marking on the page. If in debug mode, marks all text. Otherwise, marks only text that has errors.
 * @function
 * @returns {void}
 */
export function enableTextMarking() {
	document.body.dataset.mark = pageData.debug ? true : !checkDataIntegrity(null, true);
}

/**
 * Checks data integrity and displays an error message if data is missing or incorrect
 * @function preventCopy
 * @returns {void}
 */
function preventCopy() {
	const error = checkDataIntegrity(null, true);
	if (error) {
		explanation('Missing/Incorrect Data', error);
		enableTextMarking();
	}
}

/**
 * Assigns a default value to an element if it is empty
 * @function assignDefaultValue
 * @param {HTMLElement} element - The element to assign a default value to
 * @param {string} [value=element.dataset.default] - The default value to assign (if no value is provided, the element's "data-default" attribute will be used)
 * @returns {void}
 */
function assignDefaultValue(element, value = element.dataset.default) {
	if (element.value.trim()) return;
	const dest = element.dataset.dest ?? element.dataset.destNoauto;
	wikiCode(value, dest);
}

/**
 * Removes all sections in a given array
 * @function removeSection
 * @param {Array.<HTMLElement>} array - The array of elements to remove
 * @returns {void}
 */
function removeSection(array) {
	for (const section of array) {
		section.remove();
	}
}

/**
 * Removes a specific section based on its name and an attribute
 * @function removeSpecificSection
 * @param {string} sectionName - The name of the section to remove
 * @param {string} [attribute='section'] - The data-attribute to search for (defaults to "section")
 * @returns {void}
 */
function removeSpecificSection(sectionName, attribute = 'section') {
	const sections = document.querySelectorAll(`[data-${attribute}="${sectionName}"]`);
	removeSection(sections);
}

/**
 * Hides the original name in wikicode if not provided
 * @function hideOrgName
 * @returns {void}
 */
function hideOrgName() {
	const orgName = pageData.oldName;
	const aliascElement = globalElements.output.oldName.parentElement;
	aliascElement.style.display = orgName ? '' : 'none';
}

/**
 * Returns the next available child index of an array of objects, based on a given property.
 *
 * @param {Array} array - The array of objects to check.
 * @param {string} data - The path to the property to check for an index, in dot notation (e.g. 'dataset.planet').
 * @returns {number} - The next available child index.
 */
function getChildIndex(array, data: string) {
	const IDs = [0];	// dummy element to avoid if statement
	for (const element of array) {
		const idNumber = extractNumber(fetchFromObject(element, data));	// get all numbers of the string into an array, then join that array
		IDs.push(parseInt(idNumber));
	}
	function compareNumbers(a: number, b: number) {
		return a - b;
	}
	IDs.sort(compareNumbers);
	return IDs[IDs.length - 1] + 1;

	// necessary to access properties of different depths of an element
	// takes an object and a string representing the path to the property in dot notation ('dataset.planet')
	// code from https://stackoverflow.com/questions/4255472/javascript-object-access-variable-property-by-name-as-string
	function fetchFromObject(obj, prop) {
		//property not found
		if (typeof obj === 'undefined') return false;

		//index of next property split
		const index = prop.indexOf('.');

		//property split found; recursive call
		if (index > -1) {
			//get object at property (before split), pass on remainder
			return fetchFromObject(obj[prop.substring(0, index)], prop.substr(index + 1));
		}

		//no split; get property
		return obj[prop];
	}
}

/**
 * Sorts an object alphabetically by keys.
 * @param {Object} obj - The object to be sorted.
 * @param {boolean} [number=false] - A flag indicating whether numbers should be sorted correctly (i.e. by numerical value)
 * or not (i.e. by string value). Default is false.
 * @returns {Object} - A new object with the same key-value pairs as the input object, but with the keys sorted alphabetically.
 */
function sortObj(obj, number: boolean = false) {
	if (!number) {
		return Object.keys(obj).sort().reduce((result, key) => {
			result[key] = obj[key];
			return result;
		}, {});
	}
	const keys = Object.keys(sortObj(obj));
	const numbers = keys.map(key => extractNumber(key)).map(Number).sort((a, b) => {
		return a - b;
	});
	const result = {};
	for (const number of numbers) {
		const keyIndex = keys.findIndex(element => extractNumber(element) == number)
		const key = keys[keyIndex];
		keys.splice(keyIndex, 1);
		result[key] = obj[key];
	}
	return result;
}

/**
 * Returns a string containing all the integers in a given string.
 * This function only works for integers.
 *
 * @param {string} string - The string to extract integers from.
 * @returns {string} A string containing all the integers in the input string.
 */
function extractNumber(string: string): string {
	return string?.match(/[0-9]/g)?.join('') ?? '';
}

/**
 * Returns a string indicating whether a given number is even or odd.
 *
 * @param {number} number - The number to check.
 * @returns {string} A string indicating whether the number is 'even' or 'odd'
 */
function oddEven(number: number) {
	if (number % 2 == 0) return 'even';
	return 'odd';
}

/**
 * Load and parse HTML from a given URL and replace specified variables.
 * @async
 * @param {string} url - The URL of the HTML file to load.
 * @param {Object} [varObj] - An object containing key-value pairs to replace in the loaded HTML.
 * @returns {Promise<Document>} - A promise that resolves with the parsed HTML DOM of the loaded file.
 * The loaded HTML is cached in the `cachedHTML` object to improve performance on subsequent calls.
 */
export async function loadHTML(url: string, varObj = {}) {
	let html = await (async () => {
		if (cachedHTML[url]) return cachedHTML[url];

		const response = await fetch(url);
		const html = await response.text();
		cachedHTML[url] = html;		// Add returned value to cachedHTML object
		return html;
	})();

	for (const variable in varObj) {
		html = html.replaceAll('${' + variable + '}', varObj[variable]);
	}
	const parser = new DOMParser();
	const dom = parser.parseFromString(html, 'text/html');
	return dom;
}

export function triggerEvent(element: HTMLElement, evt: string): void {
	const event = new Event(evt);
	element.dispatchEvent(event);
}