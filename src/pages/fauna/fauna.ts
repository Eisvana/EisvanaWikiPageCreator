/**
 * @fileoverview Provides functions which can be used by the Creature page creator.
 */

import { addInfoBullet, docByResearchteam, extractNumber, hideInput, setDropdownOptions, storeData, triggerEvent, wikiCode, wikiCodeSimple } from "../../common";
import { globalElements, pageData } from "../../variables/objects";
import { getGenderData } from "../../datalists/creatureDatalists";
import creatureData from "../../miscLogic/creatureData";

/**
 * Sets the genus dropdown based on creature data and current ecosystem.
 *
 * @function genusDropdown
 * @returns {void}
 */
export function genusDropdown() {
	const ecosystem = pageData.ecosystem as string;
	const genera = Object.keys(creatureData.ecosystems[ecosystem]);

	const commonNames: Array<string> = [];
	for (const genus of genera) {
		commonNames.push(`${genus} (${creatureData.ecosystems[ecosystem][genus].commonName})`);
	}

	const genusInput = globalElements.input.genusInput as HTMLSelectElement;

	setDropdownOptions(genusInput, genera, commonNames);
	wikiCode(genusInput);
}

/**
 * Generates dropdowns for album names
 * @function
 * @returns {void}
 */
export function albumDropdown() {
	const ecosystem = pageData.ecosystem as string;
	const catalogueInput = globalElements.input.catalogueInput as HTMLSelectElement;

	const albums = creatureData.catalogs[ecosystem];
	const albumValues = [albums[0]];
	const albumTexts = [albums[0]];
	// ignore first index (empty option)
	for (let i = 1; i < albums.length; i++) {
		const text = `Eisvana ${albums[i]}`;
		albumValues.push(`${text} Album`);
		albumTexts.push(text);
	}
	setDropdownOptions(catalogueInput, albumValues, albumTexts);
	storeData(catalogueInput);
}

/**
 * Generates an additional information sentence based on selected criteria and displays it in a specified HTML element.
 * @function addInfo
 * @returns {void}
 */
export function addInfo() {
	// get the HTML element where the output will be displayed
	const outputElement = globalElements.output.addInfo as HTMLOutputElement;

	const chapter = docByResearchteam();

	// get the catalogue from the page data
	const catalogue = pageData.catalogue;

	// if no catalogue is found, hide the output element and return
	if (!catalogue) {
		outputElement.style.display = 'none';
		return;
	}

	// if a catalogue is found, show the output element
	outputElement.style.display = '';

	// construct the output sentence based on the catalogue and the chapter
	const output = '[[' + catalogue + ']]' + chapter;

	// display the output sentence in the specified HTML element
	outputElement.innerText = `Featured in the ${output}`;

	// add a bullet point as a decoration
	addInfoBullet();
}

/**
 * Generates a name to use for a wikilink.
 *
 * @function
 * @returns {string} - The name generated for the wikilink.
 */
export function pageName() {
	const newNameInput = globalElements.input.nameInput as HTMLInputElement;
	const orgNameInput = globalElements.input.oldNameInput as HTMLInputElement;

	const newName = newNameInput.value;
	const orgName = orgNameInput.value;

	const name = orgName || newName;
	wikiCode(name, 'name');
	return name;
}

/**
 * Populates the 'Produces' dropdown or text field based on the current genus and ecosystem.
 *
 */
export function genusProduces() {
	const genus = pageData.genus;
	const ecosystems = Object.keys(creatureData.ecosystems);
	const producesInputElement = globalElements.input.producesSelectionInput;
	if (!(typeof genus === 'string' && producesInputElement instanceof HTMLSelectElement)) return;
	for (const ecosystem of ecosystems) {
		if (!Object.keys(creatureData.ecosystems[ecosystem]).includes(genus)) continue;

		const food = creatureData.ecosystems[ecosystem][genus].produces;
		setDropdownOptions(producesInputElement, food);
		hideInput(producesInputElement, food.length > 1 ? '' : 'none');
		wikiCode(producesInputElement);
	}
}

/**
 * Hides the weight and height of the second gender if none is given or if it is equal to the first gender.
 *
 * @function
 * @name hideSecGenderProps
 * @returns {void}
 */
export function hideSecGenderProps() {
	const { gender: gen1, gender2: gen2 } = pageData;
	const { weight2Input: gen2Weight, height2Input: gen2Height, gender2Input: gen2Input } = globalElements.input;
	const gen2Props = [gen2Weight, gen2Height] as Array<HTMLInputElement | HTMLSelectElement>;

	if (gen2 && gen1 !== gen2) {
		gen2Props.forEach(prop => hideInput(prop, ''));
	} else {
		gen2Props.forEach(prop => hideInput(prop, 'none'));
		gen2Props.push(gen2Input as HTMLSelectElement);
		gen2Props.forEach(prop => {
			prop.value = '';
			storeData(prop);
		})
	}
}

/**
 * Syncs the `notes` value to the discovery menu notes input or makes it visible for certain keywords.
 *
 * @function
 * @name specialNotes
 * @returns {void}
 *
 * @example
 * // Example usage:
 * specialNotes();
 */
export function specialNotes() {
	const notes = pageData.notes as string;
	const specialNotesElement = globalElements.input.specialNotesInput as HTMLInputElement;
	const isMechanoceris = pageData.genus === 'Mechanoceris';
	specialNotesElement.value = isMechanoceris ? '' : notes;
	const hasDifferentSpecialNote = notes === 'Evil' || notes === 'Sheds and regrows bones' || isMechanoceris;
	hideInput(specialNotesElement, hasDifferentSpecialNote ? '' : 'none');
	storeData(specialNotesElement);
}

/**
 * Handles additional observations that don't have the additional observations text.
 *
 * @function
 * @returns {void}
 */
export function specialNotesTextFunc() {
	const { genus, notes } = pageData;
	const specialNotes = pageData.addObservation as string;
	const notesElement = globalElements.input.notesInput as HTMLInputElement;
	const addObservationElement = globalElements.output.addObservation as HTMLOutputElement;

	wikiCodeSimple(notesElement, notesElement.dataset.destNoauto);
	if (!notes) {
		addObservationElement.innerText = "'''Additional Observations''': ";
		return;
	}

	const noteText = (() => {
		if (genus === 'Mechanoceris') {
			return specialNotes;
		} else if (!specialNotes || specialNotes === notes) {
			return `'''Additional Observations''': ${notes}`;
		} else {
			return specialNotes;
		}
	})();
	addObservationElement.innerText = noteText;
}

/**
 * Shows or hides the creature priority radio buttons.
 *
 * @function
 * @global
 */
export function hideCreaturePrio() {
	const radio = globalElements.input.gender1 as HTMLInputElement;
	if (pageData.gender2) {
		hideInput(radio, '');
	} else {
		radio.checked = true;
		hideInput(radio, 'none');
	}
}

/**
 * Returns the selected value from the 'creature priority' radio buttons.
 * @function
 * @returns {string} The value of the checked radio button.
 */
function creaturePrio(): string {
	const genderRadios = globalElements.input.gender as Array<HTMLInputElement>;
	for (const radio of Array.from(genderRadios)) {
		if (radio.checked) return radio.value;
	}
	return '';
}

/**
 * Provides creature height and weight formatting.
 *
 * @function
 * @param {string} property1Name - The name of the first property to format.
 * @param {string} property2Name - The name of the second property to format.
 * @returns {void}
 */
export function genderProps(property1Name: string, property2Name: string) {
	const prioritise = creaturePrio();
	const gender2 = pageData.gender2 as string;
	const property1Value = pageData[property1Name] as string;
	const property2Value = pageData[property2Name] as string;

	// adds .0
	let property1Number, property2Number;
	if (property1Name !== 'gender') {
		const prependString1 = property1Value.startsWith('-') && !parseFloat(property1Value) ? '-' : '';
		const prependString2 = property2Value.startsWith('-') && !parseFloat(property2Value) ? '-' : '';
		property1Number = isNaN(parseFloat(property1Value)) ? '' : prependString1 + parseFloat(property1Value).toFixed(1);
		property2Number = isNaN(parseFloat(property2Value)) ? '' : prependString2 + parseFloat(property2Value).toFixed(1);
	}

	const property1Data = property1Number ?? property1Value;
	const property2Data = property2Number ?? property2Value;
	pageData[property1Name] = property1Data;
	pageData[property2Name] = property2Data;

	const result = (() => {
		if (gender2) {
			if (property1Data === property2Data || !property2Data) {
				return property1Data;
			} else if (!property1Data) {
				return property2Data;
			} else if (prioritise === 'gender1') {
				return property1Data + ' - ' + property2Data;
			} else {
				return property2Data + ' - ' + property1Data;
			}

		} else {
			return property1Data;
		}
	})();

	const outputElement = globalElements.output[property1Name] as HTMLOutputElement;
	if (!outputElement) return;
	outputElement.innerText = result;
}

/**
 * Bundles property functions for gender, height, and weight.
 * @function
 * @returns {void}
 */
export function bundlePropFunctions() {
	genderProps("height", "height2");
	genderProps("weight", "weight2");
	genderProps("gender", "gender2");
}

/**
 * Hides the album entry code and album actions buttons if `pageData.catalogue` is falsy,
 * or shows them otherwise.
 * @returns {void}
 */
export function hideAlbumEntry() {
	const display = pageData.catalogue ? '' : 'hidden';
	(globalElements.output.albumEntry as HTMLOutputElement).style.visibility = display;
	(globalElements.output.albumActions as HTMLOutputElement).style.visibility = display;
}

/**
 * This function puts the primary height of an album into the album entry.
 * @function
 * @returns {string} Returns the primary height with an "m" appended to it.
 */
export function albumOtherExternal() {
	const heights = [pageData.height, pageData.height2];
	const prio = creaturePrio();
	const index = (() => {
		const numString = extractNumber(prio) as number;
		return numString - 1;
	})();
	const output = `(${heights[index]}m)`;
	return output;
}

export function albumTitle() {
	(globalElements.output.album as HTMLOutputElement).innerText = pageData.catalogue as string;
}

/**
 * Replaces line breaks in an input element's value with a single space.
 * Then passes it to wikiCode function to generate wiki code.
 * @function
 * @global
 */
export function noLineBreak() {
	const element = globalElements.input.dmInput as HTMLTextAreaElement;
	const { value, dataset: { destNoauto: dest } } = element;
	const noBreak = value.replaceAll('\n', ' ');
	element.value = noBreak;

	wikiCode(element, dest);
}

/**
 * Generates an array of strings representing the different pages in the gallery.
 * If pageData.gender2 is defined, the function sets the genders according to the creaturePrio() system.
 *
 * @function
 * @returns {Array<string>} An array of strings representing the different pages in the gallery.
 */
export function generateGalleryArray() {
	let gender1, gender2;
	if (pageData.gender2) {
		const prio = creaturePrio();
		if (prio === 'gender2') {
			gender1 = pageData.gender2;
			gender2 = pageData.gender;
		} else {
			gender1 = pageData.gender;
			gender2 = pageData.gender2;
		}
	}

	const array = [
		'',
		`${gender1} gender`,
		`${gender1} gender scan`,
		`${gender2} gender`,
		`${gender2} gender scan`,
		'Creature scan',
		'Discovery Menu',
		'Moon Page',
		'Planet Page',
		'System Page',
		'Galaxy Map'
	];

	if (!pageData.moon) {
		const index = array.findIndex(item => item.toLowerCase().includes('moon'));
		array.splice(index, 1);
	}

	const lowerCase = structuredClone(array).map((item: string) => item.toLowerCase());
	for (let i = array.length - 1; i >= 0; i--) {
		const element = lowerCase[i];
		if (element.includes(gender2 ? 'creature' : 'gender')) array.splice(i, 1);
	}

	pageData.galleryArray = array;
}

/**
 * Gives the pagename of the redirect if it is not equal the real pagename.
 *
 * @function
 * @returns {string|undefined} Returns the updated page name if the page has been renamed, otherwise returns undefined.
 */
export function redirectPage(): string {
	if (pageData.oldName && pageData.oldName !== pageData.newName) return pageData.newName as string;
	return '';
}

export function genderDropdown() {
	const genus = pageData.genus as string;
	const genderInput = globalElements.input.genderInput as HTMLSelectElement;
	const gender2Input = globalElements.input.gender2Input as HTMLSelectElement;
	const genderArray = getGenderData(genus) as Array<string>;
	const gender2Array = ['', ...genderArray];
	setDropdownOptions(genderInput, genderArray);
	setDropdownOptions(gender2Input, gender2Array);
	for (const input of [genderInput, gender2Input]) {
		triggerEvent(input, 'change');
	}
}

export function resetExternal() {
	triggerEvent(globalElements.input.genderInput as HTMLSelectElement, 'change');
	triggerEvent(globalElements.input.ecosystemInput as HTMLSelectElement, 'change');
}