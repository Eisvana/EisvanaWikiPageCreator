/**
 * @fileoverview Provides functions which can be used by the Creature page creator.
 */

function startupFunctions() {
	genusDropdown();
	albumDropdown();
	hideOrgName();
	pageName();
	specialNotes();
	specialNotesTextFunc();
	genusProduces();
	addInfo();
	addInfoBullet();
	hideSecGenderProps();
	hideCreaturePrio();
	bundlePropFunctions();
	hideAlbumEntry();
	noLineBreak();
	albumFunctions();
}

const creatureElements = {
	input: {
		gender: 'Gender',
	}
}
updateGlobalElements(creatureElements);

const creatureElementFunctions = {
	nameInput: ['pageName(); albumName()'],
	oldNameInput: ['hideOrgName(); pageName(); albumName()'],
	planetInput: ['planetMoonSentence()'],
	moonInput: ['planetMoonSentence()'],
	ecosystemInput: ['genusDropdown(); albumDropdown(); genusProduces()'],
	genusInput: ['genusProduces()'],
	civ: ['albumDropdown(); hideAlbumEntry();', null, true],
	notesInput: ['specialNotes(); specialNotesTextFunc()'],
	specialNotesInput: ['specialNotesTextFunc()'],
	catalogueInput: ['addInfo(); addInfoBullet(); albumTitle(); hideAlbumEntry()'],
	researchTeam: ['addInfo()', null, true],
	genderInput: ['hideSecGenderProps(); hideCreaturePrio(); genderProps("gender", "gender2")'],
	gender2Input: ['hideSecGenderProps(); hideCreaturePrio(); genderProps("gender", "gender2")'],
	heightInput: ['genderProps("height", "height2"); albumOther(); numberError(this)'],
	weightInput: ['genderProps("weight", "weight2"); numberError(this)'],
	height2Input: ['genderProps("height", "height2"); albumOther(); numberError(this)'],
	weight2Input: ['genderProps("weight", "weight2"); numberError(this)'],
	gender: ['bundlePropFunctions(); albumOther()'],
	discoveredInput: ['albumDiscoverer()'],
	discoveredlinkInput: ['albumDiscoverer()'],
	dmInput: ['noLineBreak()'],
}
assignElementFunctions(creatureElementFunctions);

/**
 * Sets the genus dropdown based on creature data and current ecosystem.
 *
 * @function genusDropdown
 * @returns {void}
 */
function genusDropdown() {
	const creatureData = getCreatureData();
	const ecosystem = pageData.ecosystem;
	const genera = Object.keys(creatureData.ecosystems[ecosystem])

	const commonNames = new Array;
	for (const genus of genera) {
		commonNames.push(`${genus} (${creatureData.ecosystems[ecosystem][genus].commonName})`);
	}

	setDropdownOptions(globalElements.input.genusInput, genera, commonNames);
	wikiCode(globalElements.input.genusInput);
}

/**
 * Generates dropdowns for album names
 * @function
 * @returns {void}
 */
function albumDropdown() {
	const creatureData = getCreatureData();
	// if civ is GHub, use GHEC instead. Otherwise use the Civ shortname
	const civ = (pageData.civShort == "GHub") ? "GHEC" : pageData.civShort;
	const { ecosystem, galaxy } = pageData;
	const catalogueInput = globalElements.input.catalogueInput;

	const albums = creatureData.catalogs[galaxy][ecosystem];
	const albumValues = [albums[0]];
	const albumTexts = [albums[0]];
	// ignore first index (empty option)
	for (let i = 1; i < albums.length; i++) {
		const text = `${civ} ${albums[i]}`;
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
function addInfo() {
	// get the HTML element where the output will be displayed
	const outputElement = globalElements.output.addInfo;

	// only accept GHEC as researchteam and construct sentence based on that
	const chapter = docByResearchteam('GHEC');

	// get the catalogue from the page data
	const catalogue = pageData.catalogue;

	// if no catalogue is found, hide the output element and return
	if (!catalogue) {
		outputElement.style.display = 'none';
		return;
	}

	// if a catalogue is found, show the output element
	outputElement.style.display = ''

	// construct the output sentence based on the catalogue and the chapter
	const output = '[[' + catalogue + ']]' + chapter

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
function pageName() {
	const { nameInput: { value: newName }, oldNameInput: { value: orgName } } = globalElements.input;

	const name = (() => {
		if (orgName) {
			return orgName;
		} else {
			return newName;
		}
	})();
	wikiCode(name, 'name');
	return name;
}

/**
 * Populates the 'Produces' dropdown or text field based on the current genus and ecosystem.
 *
 */
function genusProduces() {
	const genus = pageData.genus;
	const creatureData = getCreatureData();
	const ecosystems = Object.keys(creatureData.ecosystems);
	const producesInputElement = globalElements.input.producesInput;
	for (const ecosystem of ecosystems) {
		if (!Object.keys(creatureData.ecosystems[ecosystem]).includes(genus)) continue;

		const food = creatureData.ecosystems[ecosystem][genus].produces;
		setDropdownOptions(producesInputElement, food);

		if (food.length > 1) {
			hideInput(producesInputElement, '');
		} else {
			hideInput(producesInputElement, 'none');
		}
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
function hideSecGenderProps() {
	const { gender: gen1, gender2: gen2 } = pageData;
	const { weight2Input: gen2Weight, height2Input: gen2Height, gender2Input: gen2Input } = globalElements.input;
	const gen2Props = [gen2Weight, gen2Height];

	if (gen2 && gen1 != gen2) {
		gen2Props.forEach(prop => hideInput(prop, ''));
	} else {
		gen2Props.forEach(prop => hideInput(prop, 'none'));
		gen2Props.push(gen2Input);
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
function specialNotes() {
	const notes = pageData.notes;
	const specialNotesElement = globalElements.input.specialNotesInput
	specialNotesElement.value = notes;
	if (notes == 'Evil' || notes == 'Sheds and regrows bones') {
		hideInput(specialNotesElement, '');
	} else {
		hideInput(specialNotesElement, 'none');
	}
	storeData(specialNotesElement);
}

/**
 * Handles additional observations that don't have the additional observations text.
 *
 * @function
 * @returns {void}
 */
function specialNotesTextFunc() {
	const { notes, addObservation: specialNotes } = pageData;
	const { input: { notesInput: notesElement }, output: { addObservation: addObservationElement } } = globalElements;

	wikiCode(notesElement, notesElement.dataset.destNoauto);
	if (!notes) {
		addObservationElement.innerText = "'''Additional Observations''': ";
		return;
	}
	const noteText = (() => {
		if (!specialNotes || specialNotes == notes) {
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
function hideCreaturePrio() {
	const radio = globalElements.input.gender1;
	if (pageData.gender2) {
		hideInput(radio, '');
	} else {
		hideInput(radio, 'none');
	}
}

/**
 * Returns the selected value from the 'creature priority' radio buttons.
 * @function
 * @returns {string} The value of the checked radio button.
 */
function creaturePrio() {
	const genderRadios = globalElements.input.gender;
	for (const radio of genderRadios) {
		if (radio.checked) return radio.value;
	}
}

/**
 * Provides creature height and weight formatting.
 *
 * @function
 * @param {string} property1Name - The name of the first property to format.
 * @param {string} property2Name - The name of the second property to format.
 * @returns {void}
 */
function genderProps(property1Name, property2Name) {
	const prioritise = creaturePrio();
	const gender2 = pageData.gender2;
	const property1Value = pageData[property1Name];
	const property2Value = pageData[property2Name];

	// adds .0
	let property1Number, property2Number;
	if (property1Name != 'gender') {
		property1Number = parseFloat(property1Value) ? parseFloat(property1Value).toFixed(1) : '';
		property2Number = parseFloat(property2Value) ? parseFloat(property2Value).toFixed(1) : '';
	}

	const property1Data = property1Number ?? property1Value;
	const property2Data = property2Number ?? property2Value;
	pageData[property1Name] = property1Data;
	pageData[property2Name] = property2Data;

	const result = (() => {
		if (gender2) {
			if (property1Data == property2Data || !property2Data) {
				return property1Data;
			} else if (!property1Data) {
				return property2Data;
			} else {
				if (prioritise == 'gender1') {
					return property1Data + ' - ' + property2Data;
				} else {
					return property2Data + ' - ' + property1Data;
				}
			}
		} else {
			return property1Data;
		}
	})();

	globalElements.output[property1Name].innerText = result;
}

/**
 * Bundles property functions for gender, height, and weight.
 * @function
 * @returns {void}
 */
function bundlePropFunctions() {
	genderProps("height", "height2");
	genderProps("weight", "weight2");
	genderProps("gender", "gender2");
}

/**
 * Hides the album entry and album actions elements on the page based on the presence of pageData.catalogue.
 * @function
 * @returns {void}
 * @description This function modifies the visibility style property of globalElements.output.albumEntry and globalElements.output.albumActions
 * based on the presence of the pageData.catalogue property. If pageData.catalogue is falsy, then the elements are hidden. Otherwise, they are visible.
 * @example
 * // Example usage:
 * hideAlbumEntry();
 */
function hideAlbumEntry() {
	const displayState = { true: '', false: 'hidden' };
	const boolString = Boolean(pageData.catalogue).toString();
	const display = displayState[boolString];
	globalElements.output.albumEntry.style.visibility = display;
	globalElements.output.albumActions.style.visibility = display;
}

/**
 * This function puts the primary height of an album into the album entry.
 * @function
 * @returns {string} Returns the primary height with an "m" appended to it.
 */
function albumOtherExternal() {
	const heights = [pageData.height, pageData.height2];
	const prio = creaturePrio();
	const index = (() => {
		const numString = extractNumber(prio);
		return parseInt(numString) - 1;
	})();
	const output = `(${heights[index]}m)`;
	return output;
}

function albumTitle() {
	globalElements.output.album.innerText = pageData.catalogue;
}

function albumCivExternal() {
	return '';
}

/**
 * Replaces line breaks in an input element's value with a single space.
 * Then passes it to wikiCode function to generate wiki code.
 * @function
 * @global
 */
function noLineBreak() {
	const element = globalElements.input.dmInput;
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
 * @returns {Array<String>} An array of strings representing the different pages in the gallery.
 */
function generateGalleryArray() {
	let gender1, gender2;
	if (pageData.gender2) {
		const prio = creaturePrio();
		if (prio == 'gender2') {
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

	const lowerCase = structuredClone(array).map(item => item.toLowerCase());
	for (let i = array.length - 1; i >= 0; i--) {
		const element = lowerCase[i];
		if (gender2) {
			if (element.includes('creature')) array.splice(i, 1);
		} else {
			if (element.includes('gender')) array.splice(i, 1);
		}
	}

	pageData.galleryArray = array;
}

function galleryExplanationExternal() {
	return `There is a preferred order of pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Gender 1</li>
			<li>Gender 2</li>
			<li>Gender 1 scan</li>
			<li>Gender 2 scan</li>
			<li>Discovery Menu</li>
			<li>Moon Page</li>
			<li>Planet Page</li>
			<li>System Page</li>
			<li>Galaxy Map</li>
		</ol>
	</div>`
}