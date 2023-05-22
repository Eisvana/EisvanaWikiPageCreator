/**
 * @fileoverview Provides functions which can be used by the Multi-Tool page creator.
 */

import { hideInput, wikiCode } from "../../common";
import { planetMoon, planetMoonSentence } from "../../miscLogic/locationLogic";
import { globalElements, pageData } from "../../variables/objects";

function startupFunctions() {
	locGalaxy();
	acquirementBundle();
	addInfo();
	autoMTType();
	showSizeDropdown();
	MTType();
	bundleNumberStats();
	hideLocName();
	hideSrLocName();
	locHubNr();
	hideCost();
	albumFunctions();
}

// 1. param: string of all functions to add to the element
// 2. param: string of the listener that should be used ('onchange', 'oninput'...)
// 3. param: boolean whether the function string should be inserted before or after existing functions
const MTElementFunctions = {
	nameInput: ['albumName(); appearance()'],
	civ: ['locGalaxy(); addInfo(); appearance(); locHubNr()', null, true],
	typeInput: ['addInfo(); appearance(); autoMTType(); showSizeDropdown(); MTType(); albumItemType(); albumOther()', null, true],
	sizeInput: ['showSizeDropdown(); MTType(); albumOther()'],
	researchTeam: ['addInfo()', null, true],
	locInput: ['acquirementBundle(); hideLocName(); hideCost(); autoSentinel(this)'],
	srlocInput: ['acquirementBundle(); hideSrLocName()'],
	srInput: ['acquirementBundle()'],
	planetInput: ['acquirementBundle()'],
	moonInput: ['acquirementBundle()'],
	axesInput: ['acquirementAlbumBundle()'],
	dmgInput: ['numberStats(this, 1, true)'],
	scanInput: ['numberStats(this, 1, true)'],
	costInput: ['numberStats(this)'],
	slotsInput: ['numberStats(this); albumOther()'],
	classInput: ['albumOther()'],
	srImgInput: ['acquirementGallery()'],
	sysImgInput: ['acquirementGallery()'],
	cabInput: ['acquirementGallery()'],
	coordsInput: ['acquirementGallery()'],
	srImgUpload: ['acquirementGallery()', null, true],
	sysImgUpload: ['acquirementGallery()', null, true],
	cabUpload: ['acquirementGallery()', null, true],
	coordsUpload: ['acquirementGallery()', null, true],
	portalglyphsInput: ['locHubNr()', null, true],
	discoveredInput: ['albumDiscoverer()'],
	discoveredlinkInput: ['albumDiscoverer()'],
	mainColourInput: ['appearance()'],
	secColourInput: ['appearance()'],
}
assignElementFunctions(MTElementFunctions);


function locHubNr() {
	globalElements.output.HubNr.innerText = regNr(pageData.region);
}

/**
 * Adds region to location sentence
 * @function
 * @name locGalaxy
 * @returns {void}
 */
function locGalaxy() {
	const civ = pageData.civShort; // The civilization short name
	const text = HubGal(civ); // The location galaxy text
	wikiCode(text, 'locGalaxy'); // Adds the location galaxy text to the page with the section name 'locGalaxy'
}

/**
 * Constructs additional information sentence.
 * @function
 * @returns {undefined}
 */
function addInfo() {
	const civ = shortenGHub(pageData.civShort);
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

	globalElements.output.addInfo.innerText = output;
}

/**
 * Calculate the appearance of a multi-tool based on pageData and assigns it to a given input element.
 *
 * @function
 * @param {Object} pageData - An object containing multi-tool data such as name, type, and colors.
 * @param {HTMLElement} input - The input element to assign the calculated appearance to.
 */
function appearance() {
	const { name, mainColour: colour1, secColour: colour2 } = pageData;
	const type = pageData.type.toLowerCase();
	const appearance = globalElements.input.appearanceInput;

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

function acquirementAlbumBundle() {
	acquirement();
	albumInitialised ? albumDesc() : document.addEventListener('albumLoaded', () => albumDesc());
}

function acquirementBundle() {
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
function acquirement() {
	// srName: name of the s/r location (for example a planetname)
	// planet: planet name of the MT
	// moon: moon name of the MT
	// coords: coords of the MT
	const { srLocName: srName, planet, moon, axes: coords } = pageData

	const loc = (pageData.location as string).toLowerCase();	// location type of the MT (for example space station/settlement/sentinel pillar)
	const body = planetMoonSentence(planet as string, moon as string) as string;
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
function acquirementGallery() {
	const { srLocName: srName, location: loc } = pageData;
	const srImg = pageData.srPlanetImg || 'nmsMisc_notAvailable.png';
	const sysImg = pageData.sysImg || 'nmsMisc_notAvailable.png';
	const cabinetPlanetImg = pageData.cabinetPlanetImg || 'nmsMisc_notAvailable.png';
	const axesImg = pageData.axesImg || 'nmsMisc_notAvailable.png';

	const InputElementIds = [
		'srImgInput',
		'sysImgInput',
		'cabInput',
		'coordsInput',
	]

	const pics: Array<{
		[key: string]: string;
	}> = [{}, {}, {}, {}];

	const body = planetMoon();

	const srloc = (() => {
		const preSrloc = pageData.srLoc;
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
	function fillPicObj(obj, img, desc) {
		obj.picName = img;
		obj.desc = desc;
	}

	fillPicObj(pics[0], srImg, `Save/Reload ${srloc}`);
	fillPicObj(pics[1], sysImg, `System ${highlight}`);
	const picCondition = !loc.includes('Space');
	if (picCondition) {
		fillPicObj(pics[2], cabinetPlanetImg, `${type} ${body}`);
		fillPicObj(pics[3], axesImg, 'Coordinates');
	}

	const codeArray: Array<string> = [];
	for (let i = 0; i < pics.length; i++) {
		const picObj = pics[i];
		const pic = picObj.picName;
		const desc = picObj.desc;
		const input = InputElementIds[i];
		if (!pic || !desc) {
			hideInput(globalElements.input[input], 'none');
			continue;
		}
		hideInput(globalElements.input[input], '');
		const gallery = document.createElement('span');
		gallery.style.display = 'block';
		gallery.innerText = `${pic}|${desc}`;
		codeArray.push(gallery.outerHTML);
		globalElements.output[input + 'Label'].innerText = desc;
	}
	globalElements.output.acquirementGallery.innerHTML = codeArray.join('');
}

/**
 * Automatically switches to Sentinel Pillar when Royal is selected.
 * @function
 * @returns {void}
 */
function autoMTType() {
	const type = pageData.type;
	const locElement = globalElements.input.locInput;

	const locsByType = {
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
function showSizeDropdown() {
	const { type, size } = pageData;
	const sizeInput = globalElements.input.sizeInput;
	if (type == 'Experimental') {
		sizeInput.querySelector('option[value="SMG"]').style.display = 'none';
	} else {
		sizeInput.querySelector('option[value="SMG"]').style.display = '';
	}
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
function MTType() {
	const typeElement = globalElements.input.typeInput;
	const type = typeElement.value;
	const typeShort = type.split(' ').slice(-1).join();
	const size = pageData.size;
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
	const dest = typeElement.dataset.destNoauto;
	wikiCode(output, dest);
	pageData[dest] = type;		// setting this manually to avoid errors down the line. The auto function uses the provided output, which is not unique per option.
}

function bundleNumberStats() {
	numberStats(globalElements.input.dmgInput, 1);
	numberStats(globalElements.input.scanInput, 1);
	numberStats(globalElements.input.costInput);
	numberStats(globalElements.input.slotsInput);
}

/**
 * Hides location name input fields if the location is in Space.
 * Otherwise, shows the location name input fields.
 */
function hideLocName() {
	const loc = pageData.location;
	const idArray = ['planetInput', 'moonInput', 'axesInput'];
	if (loc.includes('Space')) {
		for (const id of idArray) {
			const element = globalElements.input[id];
			hideInput(element, 'none');
			element.value = '';
			wikiCode(element);
			errorMessage(element);
		}
	} else {
		for (const id of idArray) {
			hideInput(globalElements.input[id], '');
		}
	}
}

/**
 * Hides the input field for the srLoc name if the srLoc includes the word "Space".
 * Otherwise, shows the input field.
 *
 * @function
 */
function hideSrLocName() {
	const srLoc = pageData.srLoc;
	const srLocNameInput = globalElements.input.srInput;
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
function hideCost() {
	const location = pageData.location;
	const costElement = globalElements.input.costInput;
	if (location == 'Sentinel Pillar' || location == 'Harmonic Camp') {
		hideInput(costElement, 'none');
		costElement.value = '';
		costElement.oninput();
	} else {
		hideInput(costElement, '');
	}
}

/**
 * Hides the crystal addons input box if the page type is 'Royal' or 'Sentinel'
 * @function
 * @returns {void}
 */
function hideAddons() {
	// Gets the page type from the pageData object
	const type = pageData.type;

	// Gets the crystal addons input box element
	const addonInput = globalElements.input.crystalsInput;

	// If the MT type is 'Royal' or 'Sentinel'
	if (type == 'Royal' || type == 'Sentinel') {
		// Gets all checkboxes in the same container as the addonInput
		const checkboxes = addonInput.closest('.checkboxes').querySelectorAll('input[type="checkbox"]');

		// Hides the addonInput box

		hideInput(addonInput, 'none');
		// Unchecks all checkboxes and triggers their onchange event
		checkboxes.forEach(checkbox => {
			checkbox.checked = false;
			checkbox.onchange();
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
function autoSentinel(input) {
	if (input.value != 'Harmonic Camp') return;
	const typeInput = globalElements.input.typeInput;
	typeInput.value = 'Sentinel';
	typeInput.onchange();
	hideInput(typeInput, 'none');
	hideInput(input, '');
}

function galleryExplanationExternal() {
	return `There is a preferred order of pictures:
	<div class='is-flex is-justify-content-center'>
		<ol class='has-text-left'>
			<li>Discovery Menu</li>
			<li>Price Page</li>
			<li>Base Stats</li>
			<li>Minor Settlement/Sentinel Pillar/Harmonic Camp</li>
			<li>Tool in Hand</li>
			<li>First Person View</li>
		</ol>
	</div>`
}

// album functions
function albumTypeExternal() {
	return 'Catalog';
}

function albumItemTypeExternal() {
	return pageData.type;
}

function albumOtherExternal() {

	// determine if MT is SMG for catalogue
	function catalogMTType() {
		const { type, size } = pageData
		const noSize = ['Royal', 'Starter Pistol', 'Sentinel']
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
function albumDescExternal() {
	const output = (() => {
		const axes = pageData.axes;
		const sentence = pageData.acquirement.replace('Save and reload', 'S/r');
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
function albumLinkGen() {
	const civ = shortenGHub(pageData.civShort);
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
function generateGalleryArray() {
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

	const location = pageData.location;
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