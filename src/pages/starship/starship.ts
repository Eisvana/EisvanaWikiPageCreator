/**
 * @fileoverview Provides functions which can be used by the Starship page creator.
 */

import { docByResearchteam, enPrefix, hideInput, setDropdownOptions, triggerEvent, wikiCode } from "../../common";
import { regNr, planetMoonSentence } from "../../miscLogic/locationLogic";
import type { StdObj } from "../../types/objects";
import type { Sections, ShipProp } from "../../types/starshipDataObjects";
import { globalElements, pageData } from "../../variables/objects";
import shipData from "./shipData";

/**
 * Set subtype dropdown options based on selected ship type.
 * @function
 * @returns {void}
 */
export function subtypeDropdown() {
	const type = pageData.type as string;
	const subtype = globalElements.input.subtypeInput as HTMLSelectElement;

	if (Array.isArray(shipData[type].subtypes)) {
		setDropdownOptions(subtype, shipData[type].subtypes as Array<string>);
	} else {
		setDropdownOptions(subtype, Object.keys(shipData[type].subtypes));
	}
	wikiCode(subtype);
}

/**
 * Calculates the spawn chance of an S class ship based on the economy rating and type of the system
 *
 * @function
 * @returns {undefined}
 */
export function calcS() {
	const econ = (pageData.economy as string).split(' ');
	const type = pageData.type as string;
	let chance;
	let chanceSentence = 'always spawns';
	const exceptions = ['Exotic', 'Living Ship'];
	if (!exceptions.includes(type)) {
		switch (econ[0]) {
			case '★★★':
				chance = '2%';
				break;

			case '★★':
				chance = '1%';
				break;

			case '★':
			case 'Data':
				chance = '0%';
				break;

			default:
				chance = '5%';
		}
		chanceSentence = `has a ${chance} chance to spawn`;
	}
	(globalElements.output.sChance as HTMLOutputElement).innerText = chanceSentence;
}

// assigns starship stats macro
export function shipStats() {
	const type = (pageData.type as string).split(' ')[0];
	(globalElements.output.stats as HTMLOutputElement).innerText = type + 'Ship';
}

/**
 * Shows and hides section based on other input.
 *
 * @function
 * @returns {void}
 */
export function showHideStarshipSelects() {
	const showState: StdObj = {
		show: '',
		hide: 'none'
	}

	const type = pageData.type as string;
	invDropdown();

	for (const input of Object.keys(shipData[type].sections)) {
		const data = shipData[type].sections[input];
		const inputElement = globalElements.input[input] as HTMLSelectElement | HTMLInputElement;
		hideInput(inputElement, showState[data[0]]);
		if (data.length > 1) {
			inputElement.value = data[1];
		} else if (inputElement.tagName.toLowerCase() === 'select') {
			inputElement.value ||= (inputElement as HTMLSelectElement).options?.[0]?.value;
		}
		wikiCode(inputElement);
	}
	toggleHaulerInvDropdown();
	calcInv();
}

/**
 * Sets the dropdown options for the inventory input based on the page data and ship data.
 * @function
 * @name invDropdown
 * @returns {void}
 */
export function invDropdown() {
	const type = pageData.type as string;
	const subtype = pageData.subtype as string;
	const inventory = globalElements.input.inventoryInput as HTMLSelectElement;
	if (type === 'Hauler') {
		const subtypes = shipData.Hauler.subtypes as Sections;
		setDropdownOptions(inventory, subtypes[subtype]);
		if (subtypes[subtype].length === 1) inventory.value = subtypes[subtype][0];
	} else {
		setDropdownOptions(inventory, ['Small', 'Medium', 'Large']);
	}
	wikiCode(inventory);
}

export function toggleHaulerInvDropdown() {
	const type = pageData.type as string;
	if (type !== 'Hauler') return;
	const subtype = pageData.subtype as string;
	const inventory = globalElements.input.inventoryInput as HTMLSelectElement;
	const subtypes = shipData.Hauler.subtypes as Sections;
	if (subtypes[subtype].length === 1) {
		hideInput(inventory, 'none');
	} else {
		hideInput(inventory, '');
	}
}

/**
 * Calculates inventory size based on type and subtype.
 * @function
 * @returns {void}
 */
export function calcInv() {
	const subtype = pageData.subtype as string;
	const type = pageData.type as string;
	const inventoryElement = globalElements.input.inventoryInput as HTMLSelectElement;
	let inventory;
	switch (type) {
		case "Freighter":
			if ((shipData[type].subtypes as Array<string>).indexOf(subtype) > 5) {		// NoSonar up to index 4 the freighters are capital. System freighters start at index 5.
				inventory = 'Small'
			} else {
				inventory = 'Large'
			}
			break;

		case "Shuttle":
			if ((shipData[type].subtypes as Array<string>).indexOf(subtype) > 1) {
				inventory = 'Medium'
			} else {
				inventory = 'Small'
			}
			break;
	}
	if (inventory) inventoryElement.value = inventory;
	wikiCode(inventoryElement);
	costSlotCalc();
}

/**
 * Calculates the cost and slot count required for the current pageData.
 * @function
 * @returns {void}
 */
export function costSlotCalc() {
	const type = pageData.type as string;
	const inventory = pageData.inventory as string;
	const propArray = ["cost", "slots", "techslots"];

	for (const prop of propArray) {
		(globalElements.output[prop] as HTMLOutputElement).innerText = (shipData[type][prop] as ShipProp)[inventory] as string;
	}
}

export function introType() {
	wikiCode(shipType(), 'archetype');
}

function shipType() {
	if (pageData.type === 'Freighter') {
		return 'freighter';
	} else {
		return 'starship';
	}
}

/**
 * Constructs a location sentence for a discovered ship.
 * @function loc
 * @return {string} The completed location sentence.
 */
export function loc() {
	const { class: shipClass, system: systemName, region: regionName, type } = pageData;

	// this output has a linebreak. This is intended, because we use .innerText to display this. If we used <br>, it would display '<br>', not the linebreak.
	const output = `This ${shipType()} was discovered in the [[${systemName}]] [[star system]] in the [[${regionName}]] [[region]]${regNr(regionName as string)} of [[Eisvana]], in the [[Eissentam]] [[galaxy]].

	${type === 'Interceptor' ? 'The {{Class|' + shipClass + '}} class version of this starship' : 'It'} can be found ${locText()}.`;

	(globalElements.output.location as HTMLOutputElement).innerText = output;

	/**
	 * Determines whether the discovered ship is a capital ship based on inventory size
	 * @function capitalDetection
	 * @return {string} If ship is a capital ship, returns the string 'Capital'; otherwise returns undefined.
	 */
	function capitalDetection(): string | void {
		const inventory = pageData.inventory;
		if (inventory === 'Large') return 'Capital';
	}

	/**
	 * Determines the method of freighter spawn
	 * @function freighterSpawn
	 * @return {string} Returns a sentence describing the freighter spawn location.
	 */
	function freighterSpawn() {
		if (capitalDetection() === 'Capital') {
			return 'after warping into the star system if a space battle is triggered'
		} else {
			return 'randomly while pulsing around in the star system'
		}
	}

	/**
	 * Determines the method of living ship spawn
	 * @function livingShipSpawn
	 * @return {string} Returns a sentence describing the living ship spawn location and coordinates.
	 */
	function livingShipSpawn() {
		const axes = pageData.axes;
		const celestialBody = planetMoonSentence();
		return `on the ${celestialBody} at the coordinates ${axes}`
	}

	/**
	 * Constructs the location sentence based on ship type
	 * @function locText
	 * @return {string} Returns the location sentence.
	 */
	function locText() {
		switch (type) {
			case 'Freighter':
				return freighterSpawn();

			case 'Interceptor':
			case 'Living Ship':
				return livingShipSpawn();

			default:
				return 'at either the [[Space Station]] or any [[Trade Outpost]]s available in the star system';
		}
	}
}

/**
 * Constructs additional information sentence that includes the catalogue and research team
 * @function
 * @returns {string} - The additional information sentence
 */
export function addInfo() {
	const catalogue = albumLinkGen();
	const researchteam = docByResearchteam();

	const output = '[[' + catalogue + ']]' + researchteam;

	(globalElements.output.addInfo as HTMLOutputElement).innerText = output;
}

/**
 * Adds items to the part dropdowns based on the selected ship type.
 * @function
 * @returns {void}
 */
export function appearanceDropdowns() {
	const type = pageData.type as string;	// this was an element.value document call, maybe this was important, idk
	const { secPartsInput: secParts, accessoriesInput: accessories, miscPartsInput: miscParts } = globalElements.input;
	const parts = { secParts, accessories, miscParts };

	for (const [part, input] of Object.entries(parts)) {
		setDropdownOptions(input as HTMLSelectElement, shipData[type][part] as Array<string>);
	}
}

/**
 * Sets the actual appearance sentence of the specified creature, using the information provided in the input fields.
 * @function appearanceSentence
 * @returns {void}
 */
export function appearanceSentence() {
	// I would really like to use object destructuring here, but I can't type my stuff in there. And without proper types, TS complains everywhere.
	const textarea = globalElements.input.appearanceInput as HTMLTextAreaElement;

	const mainColour = (globalElements.input.mainColourInput as HTMLSelectElement).value;
	const secColour = (globalElements.input.secColourInput as HTMLSelectElement).value;
	const secParts = (globalElements.input.secPartsInput as HTMLSelectElement).value;
	const accessories = (globalElements.input.accessoriesInput as HTMLSelectElement).value;
	const miscParts = (globalElements.input.miscPartsInput as HTMLSelectElement).value;

	if (!(mainColour.trim() || secColour.trim() || secParts || accessories || miscParts)) return;

	const type = pageData.type as string;
	const subtype = pageData.subtype as string;
	const exotic = pageData.exotic as string;
	const name = pageData.name as string;

	const accentColour = (() => {
		if (secColour.trim()) return ` with ${secColour} accents`;
		return '';
	})();

	const addParts = (() => {
		let partList = '';
		if (secParts || accessories || miscParts) partList = 'It features ';
		const partArray: Array<string> = [secParts.toLowerCase(), accessories.toLowerCase(), miscParts.toLowerCase()];
		const usedParts: Array<string> = [];
		for (const part of partArray) {
			if (part) usedParts.push(part);
		}
		for (let i = 0; i < usedParts.length; i++) {
			let prefix;
			if (i === 0) {
				prefix = '';
			} else if (i !== usedParts.length - 1) {
				prefix = ', ';
			} else {
				prefix = ' and ';
			}
			partList += prefix + usedParts[i];
		}
		if (partList) partList += '.';
		return partList;
	})();

	const primaryColour = (() => {
		if (mainColour.trim()) return `${enPrefix(mainColour)} ${mainColour}`;
		return enPrefix(type);
	})();

	const output = `${name} is ${primaryColour} ${type.toLowerCase()} of the ${subtype.toLowerCase() || exotic.toLowerCase()} subtype${accentColour}. ${addParts}`;
	textarea.value = output;
	wikiCode(textarea);
}

/**
 * Fills economy, race, and coords for the "other" parameter on starship album entries.
 * @function
 * @returns {string} Returns a string that includes the filled-out properties.
 */
export function albumOtherExternal() {
	const { planet, moon, type } = pageData;
	const economyRaw = pageData.economy as string;
	const axes = '(' + pageData.axes + ')';
	const faction = '- ' + pageData.pilot;

	const loc = moon ? `[[${moon}]]` : `[[${planet}]]`;
	const economy = (() => {
		if (economyRaw.includes('Black')) return '{{BlackMarket}}';
		if (economyRaw === 'Data Unavailable') return '★ Economy (Abandoned)';
		return economyRaw.split(' ')[0] + ' Economy';
	})();

	let prop1 = economy;
	let prop2 = '';
	switch (type) {
		case 'Freighter':
			prop2 = faction;
			break;

		case 'Interceptor':
			prop1 = `${economy}<br>${loc}`;
			prop2 = axes;
			break;

		case 'Living Ship':
			prop1 = loc;
			prop2 = axes;
			break;
	}
	const output = `<br>${prop1} ${prop2}`;
	return output;
}

/**
 * Generates a link to a starship album based on the properties of the pageData object.
 * @function albumLinkGen
 * @returns {string} The link to the appropriate starship album.
 */
export function albumLinkGen() {
	const { type } = pageData;

	/**
	 * Returns the appropriate album name based on the properties of the pageData object.
	 * @function getCatalog
	 * @returns {string} The name of the corresponding starship album.
	 */
	function getCatalog() {
		return `Eisvana Starship Album - ${type}`;
	}

	return getCatalog();
}

export function albumTypeExternal() {
	return 'Album';
}

/**
 * Creates an array of gallery images based on the current page data.
 *
 * @function
 * @returns {void}
 */
export function generateGalleryArray() {
	// Array of default gallery images
	const array = [
		'',
		'Rear view of ship',
		'Rear view of freighter',
		'Inventory screen',
		'NPC freighter captain',
		'NPC ship pilot',
		'Analysis Visor Scan',
		'Crash site',
		'Moon Page',
		'Planet Page',
		'System Page',
	];

	// Locations which apply to a living ship
	const common = ['moon', 'planet', 'crash'];
	const crash = ['npc', 'freighter'];

	// Images to deactivate based on the type of page data
	const deactivate: {
		[key: string]: Array<string>;
	} = {
		'Living Ship': crash,
		'Interceptor': crash,
		'Freighter': ['ship', ...common],
		'default': ['freighter', ...common],
	}

	// Remove 'Moon Page' from the array if there is no moon in the page data
	if (!pageData.moon) {
		const index = array.findIndex(item => item.toLowerCase().includes('moon'));
		array.splice(index, 1);
	}

	// Loop through the array and remove images based on the type of page data
	const type = pageData.type as string;
	const deactivateArray = deactivate[type] ?? deactivate.default;
	const lowerCase = structuredClone(array).map((item: string) => item.toLowerCase());
	for (let i = array.length - 1; i >= 0; i--) {
		const element = lowerCase[i];
		if (deactivateArray.some(item => element.includes(item))) {
			array.splice(i, 1);
		}
	}

	// Update page data with the new gallery array
	pageData.galleryArray = array;
}

/**
 * Redirects to a new page if the page name contains any Greek letters.
 * @function
 * @returns {(boolean|string)} Either false if the page name doesn't contain Greek letters or a string with the name containing Greek letters replaced with their English transliterations.
 */
export function redirectPage() {
	const name = pageData.name as string;
	const greekLetters: {
		[key: string]: string;
	} = {
		α: 'Alpha',
		β: 'Beta',
		γ: 'Gamma',
		δ: 'Delta',
		ε: 'Epsilon',
		ζ: 'Zeta',
		η: 'Eta',
		θ: 'Theta',
		ι: 'Iota',
		κ: 'Kappa',
		λ: 'Lambda',
		μ: 'Mu',
		ν: 'Nu',
		ξ: 'Xi',
		ο: 'Omicron',
		π: 'Pi',
		ρ: 'Rho',
		σ: 'Sigma',
		ς: 'Sigma',
		ϲ: 'Sigma',
		τ: 'Tau',
		υ: 'Upsilon',
		φ: 'Phi',
		χ: 'Chi',
		ψ: 'Psi',
		ω: 'Omega',
	}
	const containsGreekLetter = Object.keys(greekLetters).some(letter => name.includes(letter));
	if (!containsGreekLetter) return false;
	const regex = new RegExp(`[${Object.keys(greekLetters).join('')}]`, 'g');
	const newName = name.replace(regex, letter => greekLetters[letter]);

	return newName;
}

export function resetExternal() {
	triggerEvent(globalElements.input.typeInput as HTMLSelectElement, 'change');
	triggerEvent(globalElements.input.systemInput as HTMLInputElement, 'input');
}