/**
 * @fileoverview Provides functions which can be used by the Multi-Tool page creator.
 */

import { docByResearchteam, enPrefix, errorMessage, hideInput, setDropdownOptions, storeData, triggerEvent, validateCoords, wikiCode } from "../../common";
import { planetMoon, planetMoonSentence, regNr } from "../../miscLogic/locationLogic";
import { albumDesc } from "../../modules/albumactions";
import type { PicObj, StdObj } from "../../types/objects";
import { globalElements, locsByType, pageData } from "../../variables/objects";

export function locRegNr() {
	const outputElement = globalElements.output.regNr as HTMLOutputElement;
	outputElement.innerText = regNr(pageData.region as string);
}

/**
 * Constructs additional information sentence.
 * @function
 * @returns {undefined}
 */
export function addInfo() {
	const researchteam = docByResearchteam();
	const outputElement = globalElements.output.addInfo as HTMLOutputElement;

	const catalogue = albumLinkGen();
	const output = '[[' + catalogue + ']]' + researchteam;

	outputElement.innerText = output;
}

/**
 * Calculate the appearance of a multi-tool based on pageData and assigns it to a given input element.
 *
 * @function
 */
export function appearance() {
	const colour1 = pageData.mainColour as string;
	const colour2 = pageData.secColour as string;
	const name = pageData.name as string;
	const subtype = (pageData.subtype as string).toLowerCase();
	const type = (pageData.type as string).toLowerCase();
	const appearance = globalElements.input.appearanceInput as HTMLTextAreaElement;

	// Handles the case where both colors are empty/undefined
	if (!(colour1.trim() || colour2.trim())) return;

	const mainColour = (() => {
		if (colour1.trim()) return `${enPrefix(colour1)} ${colour1.trim()}`;
		return enPrefix(type);
	})();

	const accentColour = (() => {
		if (colour2.trim()) return ` with ${colour2} accents`;
		return '';
	})();

	// Constructs the final appearance string and assigns it to the input element.
	const isStarter = subtype === 'starter pistol';
	const output = `${name} is ${mainColour} ${isStarter ? subtype : type} multi-tool${accentColour}.`;
	appearance.value = output;
	wikiCode(appearance);
}

export function acquirementAlbumBundle() {
	acquirement();
	pageData.albumInitialised ? albumDesc() : document.addEventListener('albumLoaded', () => albumDesc());
}

export function acquirementBundle() {
	acquirementAlbumBundle();
	acquirementGallery();
}

/**
 * Constructs the acquirement sentence.
 *
 * @function
 * @name acquirement
 * @returns {string} The constructed sentence.
 * @throws Will throw an error if page data is missing.
 */
export function acquirement() {
	// srName: name of the s/r location (for example a planetname)
	// planet: planet name of the MT
	// moon: moon name of the MT
	// coords: coords of the MT
	const { srLocName: srName, planet, moon, axes: coords } = pageData;

	const loc = (pageData.location as string).toLowerCase();	// location type of the MT (for example space station/settlement/sentinel pillar)
	const body = planetMoonSentence(planet as string, moon as string);
	let instructions: string, savereload: string;

	const srloc = (() => {
		const preSrloc = pageData.srLoc as string;
		if (srName || preSrloc.includes('Space')) return preSrloc.toLowerCase();
		if (loc.includes('Space')) return loc;
		return body;
	})();

	if (loc.includes('space')) {
		instructions = `fly to the ${loc}`;
		savereload = `the ${srloc}`;

		if (loc === srloc || !srName) {
			instructions = 'take from cabinet';
		} else if (!srloc.includes('space')) {
			savereload = `${srloc} [[${srName}]]`;
		}

	} else {	// if not on Station/Anomaly
		savereload = `${srloc} [[${srName}]]`;
		instructions = `fly to ${body} (${coords})`;

		if (srloc.toLowerCase().includes('space')) {
			savereload = `the ${srloc}`;
		} else if ((moon && srloc === 'moon' && srName === moon) || (!moon && srloc === 'planet' && srName === planet)) {
			instructions = `fly to ${coords}`;
		} else if (!srName) {
			savereload = `${body}`;
			instructions = `fly to ${coords}`;
		}
	}

	const sentence = `Save and reload on ${savereload}, then ${instructions}.`;
	wikiCode(sentence, 'acquirement');
	pageData.actualSrLoc = srloc;
}

/**
 * Handles acquisition gallery images, retrieves type and highlights location, and generates code array.
 * @function
 * @returns {undefined}
 */
export function acquirementGallery() {
	const srName = pageData.srLocName as string;
	const loc = pageData.location as string;
	const srImg = pageData.srPlanetImg as string || 'nmsMisc_notAvailable.png';
	const sysImg = pageData.sysImg as string || 'nmsMisc_notAvailable.png';
	const cabinetPlanetImg = pageData.cabinetPlanetImg as string || 'nmsMisc_notAvailable.png';
	const axesImg = pageData.axesImg as string || 'nmsMisc_notAvailable.png';

	const InputElementIds = [
		'srImgInput',
		'sysImgInput',
		'cabInput',
		'coordsInput',
	]

	const pics: Array<PicObj> = [{}, {}, {}, {}];

	const body = planetMoon();

	const srloc = (() => {
		const preSrloc = pageData.srLoc as string;
		if (preSrloc.includes('Space') || srName) return preSrloc;
		if (loc.includes('Space')) return loc;
		return body;
	})();

	const type = (() => {
		if (loc === 'Sentinel Pillar') return 'Pillar';
		return 'Cabinet';
	})();

	const highlight = (() => {
		if (!loc.includes('Space')) return `(${type} ${body} highlighted)`;
		return '';
	})();

	/**
	 * Fills picture object with image and description.
	 * @param {Object} obj - An object representing pictures.
	 * @param {string} img - An image source.
	 * @param {string} desc - A picture description.
	 * @returns {undefined}
	 */
	function fillPicObj(obj: PicObj, img: string, desc: string) {
		obj.picName = img;
		obj.desc = desc;
	}

	fillPicObj(pics[0], srImg, `Save/Reload ${srloc}`);
	fillPicObj(pics[1], sysImg, `System ${highlight}`);
	const picCondition = !loc.includes('Space');
	if (picCondition) {
		fillPicObj(pics[2], cabinetPlanetImg, `${type} ${body}`);	// NoSonar this is just to access index 2, wtf
		fillPicObj(pics[3], axesImg, 'Coordinates');				// NoSonar this is just to access index 3, wtf
	}

	const codeArray: Array<string> = [];
	for (let i = 0; i < pics.length; i++) {
		const picObj = pics[i];
		const pic = picObj.picName;
		const desc = picObj.desc;
		const input = InputElementIds[i];
		if (!pic || !desc) {
			hideInput(globalElements.input[input] as HTMLInputElement, 'none');
			continue;
		}
		hideInput(globalElements.input[input] as HTMLInputElement, '');
		const gallery = document.createElement('span');
		gallery.style.display = 'block';
		gallery.innerText = `${pic}|${desc}`;
		codeArray.push(gallery.outerHTML);
		(globalElements.output[input + 'Label'] as HTMLOutputElement).innerText = desc;
	}
	const outputElement = globalElements.output.acquirementGallery as HTMLOutputElement;
	outputElement.innerHTML = codeArray.join('');
}

/**
 * Automatically switches location when a specific type is selected.
 * @function
 * @returns {void}
 */
export function autoMTLoc() {
	const type = pageData.type as string;
	const locElement = globalElements.input.locInput as HTMLSelectElement;

	if (type in locsByType) {
		hideInput(locElement, 'none');
		locElement.value = locsByType[type];
		wikiCode(locElement);
	} else {
		hideInput(locElement, '');
	}
	hideCost();
	hideAddons();
	acquirementGallery();
}

/**
 * Automatically switches type when a specific location is selected.
 * @function
 * @returns {void}
 */
export function autoMTType() {
	const location = pageData.location;
	const typeElement = globalElements.input.typeInput;
	const subtypeInput = globalElements.input.subtypeInput;

	if (typeof location !== 'string' || !(typeElement instanceof HTMLSelectElement) || !(subtypeInput instanceof HTMLSelectElement)) return;

	const locsByTypeCopy = structuredClone(locsByType);
	delete locsByTypeCopy.Royal;
	const typeByLocs: StdObj = Object.fromEntries(Object.entries(locsByTypeCopy).map(item => item.reverse()))


	if (location in typeByLocs) {
		hideInput(typeElement, 'none');
		hideInput(subtypeInput, 'none');
		typeElement.value = typeByLocs[location];
		wikiCode(typeElement);
	} else {
		hideInput(typeElement, '');
	}

	hideCost();
	hideAddons();
	acquirementGallery();
}

/**
 * Hides location name input fields if the location is in Space.
 * Otherwise, shows the location name input fields.
 */
export function hideLocName() {
	const loc = pageData.location as string;
	const idArray = ['planetInput', 'moonInput', 'axesInput'];
	for (const id of idArray) {
		const element = globalElements.input[id] as HTMLInputElement;
		const isStation = loc.includes('Space');

		hideInput(element, isStation ? 'none' : '');
		if (isStation) {
			element.value = '';
			wikiCode(element);
			errorMessage(element);
		}
	}
}

/**
 * Hides the input field for the srLoc name if the srLoc includes the word "Space".
 * Otherwise, shows the input field.
 *
 * @function
 */
export function hideSrLocName() {
	const srLoc = pageData.srLoc as string;
	const srLocNameInput = globalElements.input.srInput as HTMLInputElement;
	if (srLoc.includes('Space')) {
		hideInput(srLocNameInput, 'none');
		srLocNameInput.value = '';
		wikiCode(srLocNameInput);
	} else {
		hideInput(srLocNameInput, '');
	}
}

/**
 * Hide cost input element if Sentinel Pillar is selected.
 * If cost element exists, its `value` property will be emptied and it will fire the `oninput` event.
 * @function
 */
export function hideCost() {
	const location = pageData.location as string;
	const costElement = globalElements.input.costInput as HTMLInputElement;
	const isFree = location === 'Sentinel Pillar' || location === 'Harmonic Camp';
	hideInput(costElement, isFree ? 'none' : '');
	if (isFree) {
		costElement.value = '';
		triggerEvent(costElement, 'input');
	}
}

/**
 * Hides the crystal addons input box if the page type is 'Royal', 'Sentinel' or 'Atlantid'
 * @function
 * @returns {void}
 */
export function hideAddons() {
	// Gets the page type from the pageData object
	const type = pageData.type as string;

	// Gets the crystal addons input box element
	const addonInput = globalElements.input.crystalsInput as HTMLInputElement;

	// If the MT type is 'Royal', 'Sentinel' or 'Atlantid'
	if (['Royal', 'Sentinel', 'Atlantid'].includes(type)) {
		// Gets all checkboxes in the same container as the addonInput
		const checkboxes: NodeListOf<HTMLInputElement> = addonInput.closest('.checkboxes')!.querySelectorAll('input[type="checkbox"]');

		// Hides the addonInput box

		hideInput(addonInput, 'none');
		// Unchecks all checkboxes and triggers their onchange event
		checkboxes.forEach(checkbox => {
			checkbox.checked = false;
			triggerEvent(checkbox, 'change');
		})
		// If the MT type is not 'Royal', 'Sentinel' or 'Atlantid'
	} else {
		// Shows the addonInput box
		hideInput(addonInput, '');
	}
}

export function subtypeDropdown() {
	const type = pageData.type as string;
	const dropdown = globalElements.input.subtypeInput as HTMLSelectElement;

	// [[value], [display]]
	const subtypes: {
		[key: string]: string[][];
	} = {
		Pistol: [['Pistol', 'Starter Pistol'], ['Standard', 'Starter Pistol']],
		Rifle: [['Rifle', 'SMG'], ['Standard (Large)', 'SMG (Small)']],
		Experimental: [['Rifle', 'Pistol'], ['Rifle (Large)', 'Pistol (Small)']],
		Alien: [['Rifle', 'SMG', 'Pistol'], ['Rifle (Large)', 'SMG (Medium)', 'Pistol (Small)']],
	}
	const hasSubtypes = Object.keys(subtypes).includes(type);

	hideInput(dropdown, hasSubtypes ? '' : 'none');
	if (hasSubtypes) {
		setDropdownOptions(dropdown, subtypes[type][0], subtypes[type][1]);
	} else {
		dropdown.value = '';
	}
	storeData(dropdown);
}

// album functions
export function albumTypeExternal(): string {
	return 'Album';
}

export function albumItemTypeExternal(): string {
	return 'Multi-Tool';
}

export function albumOtherExternal(): string {

	// determine MT size if needed for catalogue
	function catalogMTType() {
		const subtype = pageData.subtype as string;
		if (!subtype || pageData.isStarter) return '';
		return subtype + ' -';
	}

	const output = `<br>{{Class|${pageData.class}}} - ${catalogMTType()} ${pageData.slots} Slots`
	return output;
}

/**
 * Returns a string that describes the acquisition status of an album in external mode.
 *
 * @function
 * @returns {string} - A string that describes the acquisition status of an album.
 *
 * @property {Object} pageData - An object that holds user input values.
 * @property {string} pageData.axes - The axes of the MT location.
 * @property {string} pageData.acquirement - The acquisition instructions of the MT.
 */
export function albumDescExternal() {
	const output = (() => {
		const axes = pageData.axes as string;
		const acquirement = pageData.acquirement as string;

		const sentence = acquirement.replace('Save and reload', 'S/r');
		if (axes && !validateCoords(false)) return sentence.replace(/[()]/g, '').replace(axes, `(${axes})`);
		return sentence;
	})();
	return output;
}

/**
 * Generates a link for the multi-tool album based on the pageData properties.
 *
 * @function
 * @returns {string} - Link for the multi-tool album.
 */
export function albumLinkGen() {
	const { type } = pageData;
	return `Eisvana Multi-Tool Album - ${type}`;
}

/**
 * Generates an array for use in a gallery. The function uses pageData's location property to determine whether to include
 * the 'Minor Settlement', 'Sentinel Pillar', and 'Harmonic Camp' locations, or remove them from the array.
 *
 * @function
 * @returns {undefined} Returns an array for use in a gallery.
 *
 * @throws {TypeError} If `pageData` object or `location` property is not found, a TypeError is thrown.
 *
 * @example
 * generateGalleryArray();
 */
export function generateGalleryArray() {
	const array = [
		'',
		'Discovery Menu',
		'Price Page',
		'Base Stats',
		'Minor Settlement',
		'Sentinel Pillar',
		'Harmonic Camp',
		'Monolith',
		'Tool in Hand',
		'First Person View'
	];

	const location = pageData.location as string;
	const locs = ['Minor Settlement', 'Sentinel Pillar', 'Harmonic Camp', 'Monolith'];
	if (locs.includes(location)) {
		const rmLocs = locs.filter(loc => loc !== location);
		rmLocs.forEach(loc => {
			const index = array.indexOf(loc);
			array.splice(index, 1);
		})
	} else {
		for (let i = array.length - 1; i >= 0; i--) {
			if (locs.includes(array[i])) array.splice(i, 1);
		}
	}

	pageData.galleryArray = array;
}