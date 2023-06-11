/**
 * @fileoverview Provides functions which can be used by the Multi-Tool page creator.
 */

import { docByResearchteam, enPrefix, errorMessage, hideInput, shortenGHub, triggerEvent, validateCoords, wikiCode } from "../../common";
import { HubGal, planetMoon, planetMoonSentence, regNr } from "../../miscLogic/locationLogic";
import { albumDesc } from "../../modules/albumactions";
import { PicObj, StdObj } from "../../types/objects";
import { globalElements, pageData } from "../../variables/objects";

export function locHubNr() {
	const outputElement = globalElements.output.HubNr as HTMLOutputElement;
	outputElement.innerText = regNr(pageData.region as string);
}

/**
 * Adds region to location sentence
 * @function
 * @name locGalaxy
 * @returns {void}
 */
export function locGalaxy() {
	const civ = pageData.civShort as string;	// The civilization short name
	const text = HubGal(civ);	// The location galaxy text
	wikiCode(text, 'locGalaxy');	// Adds the location galaxy text to the page with the section name 'locGalaxy'
}

/**
 * Constructs additional information sentence.
 * @function
 * @returns {undefined}
 */
export function addInfo() {
	const civ = shortenGHub(pageData.civShort as string);
	const researchteam = docByResearchteam('GHSH');
	const type = (() => {
		const preType = pageData.type;		// Alien/Experimental/Starter Pistol/Standard/Royal/Sentinel
		if (preType == 'Standard') return 'Standard Multi-Tool';
		return preType;
	})();

	const catalogue = (() => {
		if (civ == 'CalHub') {
			return `${civ} Multi-Tool Catalog`;
		} else {
			return `${civ} Multi-Tool Catalog - ${type}`;
		}
	})();

	const output = '[[' + catalogue + ']]' + researchteam;

	const outputElement = globalElements.output.addInfo as HTMLOutputElement;
	outputElement.innerText = output;
}

/**
 * Calculate the appearance of a multi-tool based on pageData and assigns it to a given input element.
 *
 * @function
 * @param {Object} pageData - An object containing multi-tool data such as name, type, and colors.
 * @param {HTMLElement} input - The input element to assign the calculated appearance to.
 */
export function appearance() {
	const colour1 = pageData.mainColour as string;
	const colour2 = pageData.secColour as string;
	const name = pageData.name as string;
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
	const output = `${name} is ${mainColour} ${type} multi-tool${accentColour}.`;
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
	const { srLocName: srName, planet, moon, axes: coords } = pageData

	const loc = (pageData.location as string).toLowerCase();	// location type of the MT (for example space station/settlement/sentinel pillar)
	const body = planetMoonSentence(planet as string, moon as string);
	let instructions, savereload;

	const srloc = (() => {
		const preSrloc = pageData.srLoc as string;
		if (preSrloc.includes('Space') || srName) return preSrloc;
		if (loc.includes('Space')) return loc;
		return body;
	})();

	if (loc.includes('space')) {
		instructions = `fly to the ${loc}`;
		savereload = `the ${srloc}`;

		if (loc == srloc || !srName) {
			instructions = 'take from cabinet';
		} else if (!srloc.includes('space')) {
			savereload = `${srloc} [[${srName}]]`;
		}

	} else {	// if not on Station/Anomaly
		savereload = `${srloc} [[${srName}]]`;
		instructions = `fly to ${body} (${coords})`;

		if (srloc.includes('space')) {
			savereload = `the ${srloc}`;
		} else if ((moon && srloc == 'moon' && srName == moon) || (!moon && srloc == 'planet' && srName == planet)) {
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
		if (loc == 'Sentinel Pillar') return 'Pillar';
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
 * Automatically switches to Sentinel Pillar when Royal is selected.
 * @function
 * @returns {void}
 */
export function autoMTType() {
	const type = pageData.type as string;
	const locElement = globalElements.input.locInput as HTMLSelectElement;

	const locsByType: StdObj = {
		Royal: 'Sentinel Pillar',
		Sentinel: 'Harmonic Camp',
	}

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

// shows or hides size dropdown
export function showSizeDropdown() {
	const type = pageData.type as string;
	const size = pageData.size as string;
	const sizeInput = globalElements.input.sizeInput as HTMLSelectElement;

	(sizeInput.querySelector('option[value="SMG"]') as HTMLOptionElement).style.display = type == 'Experimental' ? 'none' : '';

	if (type == 'Experimental' && size == 'SMG') sizeInput.value = 'Pistol';

	const hideSize = ['Royal', 'Starter Pistol', 'Sentinel'];
	if (hideSize.includes(type)) {
		hideInput(sizeInput, 'none');
	} else {
		hideInput(sizeInput, '');
	}
}

/**
 * Shows or hides the size dropdown based on the type of page being displayed and the selected size.
 * @function
 * @global
 * @returns {void}
 */
export function MTType() {
	const typeElement = globalElements.input.typeInput as HTMLSelectElement;
	const type = typeElement.value;
	const typeShort = type.split(' ').slice(-1).join();
	const size = pageData.size as string;
	const output = (() => {
		if (type == 'Standard' && size == 'SMG') {
			return 'Rifle';
		} else if (type == 'Standard') {
			return size;
		} else {
			return typeShort;
		}
	})();

	enPrefix(output, 'enPrefix');
	const dest = typeElement.dataset.destNoauto as string;
	wikiCode(output, dest);
	pageData[dest] = type;		// setting this manually to avoid errors down the line. The auto function uses the provided output, which is not unique per option.
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
	const isFree = location == 'Sentinel Pillar' || location == 'Harmonic Camp';
	hideInput(costElement, isFree ? 'none' : '');
	if (isFree) {
		costElement.value = '';
		triggerEvent(costElement, 'input');
	}
}

/**
 * Hides the crystal addons input box if the page type is 'Royal' or 'Sentinel'
 * @function
 * @returns {void}
 */
export function hideAddons() {
	// Gets the page type from the pageData object
	const type = pageData.type as string;

	// Gets the crystal addons input box element
	const addonInput = globalElements.input.crystalsInput as HTMLInputElement;

	// If the MT type is 'Royal' or 'Sentinel'
	if (type == 'Royal' || type == 'Sentinel') {
		// Gets all checkboxes in the same container as the addonInput
		const checkboxes: NodeListOf<HTMLInputElement> = addonInput.closest('.checkboxes')!.querySelectorAll('input[type="checkbox"]');

		// Hides the addonInput box

		hideInput(addonInput, 'none');
		// Unchecks all checkboxes and triggers their onchange event
		checkboxes.forEach(checkbox => {
			checkbox.checked = false;
			triggerEvent(checkbox, 'change');
		})
		// If the MT type is not 'Royal' or 'Sentinel'
	} else {
		// Shows the addonInput box
		hideInput(addonInput, '');
	}
}

/**
 * Automatically sets the type input of a global element to 'Sentinel'
 * and hides certain input elements depending on the value of 'input'.
 *
 * @function
 * @param {object} input - The input element to be checked.
 * @returns {undefined}
 */
export function autoSentinel(input: HTMLSelectElement) {
	if (input.value != 'Harmonic Camp') return;
	const typeInput = globalElements.input.typeInput as HTMLSelectElement;
	typeInput.value = 'Sentinel';
	triggerEvent(typeInput, 'change');
	hideInput(typeInput, 'none');
	hideInput(input, '');
}

// album functions
export function albumTypeExternal() {
	return 'Catalog';
}

export function albumItemTypeExternal() {
	return pageData.type as string;
}

export function albumOtherExternal() {

	// determine if MT is SMG for catalogue
	function catalogMTType() {
		const type = pageData.type as string;
		const size = pageData.size as string;
		const noSize = ['Royal', 'Starter Pistol', 'Sentinel'];
		if (noSize.includes(type)) return '';
		return size + ' -';
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
 * Generates a link for the multi-tool catalog album based on the pageData properties.
 *
 * @function
 * @returns {string} - Link for the multi-tool catalog album.
 */
export function albumLinkGen() {
	const civ = shortenGHub(pageData.civShort as string);
	const type = pageData.type;

	const catalogName = (() => {
		if (civ == 'CalHub') return civ + ' Multi-Tool Catalog';
		const longType = (type == 'Standard') ? `${type} Multi-Tool` : type;
		return civ + ' Multi-Tool Catalog - ' + longType;
	})();

	return catalogName;
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
		'Tool in hand',
		'First Person View'
	];

	const location = pageData.location as string;
	const locs = ['Minor Settlement', 'Sentinel Pillar', 'Harmonic Camp'];
	if (locs.includes(location)) {
		const rmLocs = locs.filter(loc => loc != location);
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