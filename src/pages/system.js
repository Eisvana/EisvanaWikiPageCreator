/**
 * @fileoverview Provides functions which can be used by the System page creator.
 */

function startupFunctions() {
	celestialStartupFunctions();
	combineEconConf();
	merchantUpgrades();
	regionLong();
	spaceStationSection();
	planetInputs();
	expectedHubTagSentence();
	civCatalog();
	addTemplate();
	wikiCodePercentage();
	autoPirate(globalElements.input.wealthInput);
}

const systemElements = {
	input: {
		planetInput: 'planetNumInput',
		moonInput: 'moonNumInput',
		terminalInputs: 'terminalInputs',
		systemExtras: 'systemExtras',
	},
	output: {
		tradeTerminal: 'tradeTerminal',
		planets: 'planets',
		Freighters: 'Freighters',
		Derelict: 'Derelict',
		Organic: 'Organic',
		Starships: 'Starships',
		MTs: 'MTs',
	}
}
updateGlobalElements(systemElements);

const systemElementFunctions = {
	civ: ['regionLong(); expectedHubTagSentence(); civCatalog()', null, true],
	portalglyphsInput: ['regionLong(); expectedHubTagSentence(); autoBH()', null, true],
	planetInput: ['numberStats(this); planetInputs()'],
	moonInput: ['numberStats(this); planetInputs()'],
	nameInput: ['expectedHubTagSentence()'],
	factionInput: ['spaceStationSection(); combineEconConf()'],
	economybuyInput: ['wikiCodePercentage(this)'],
	economysellInput: ['wikiCodePercentage(this)'],
	wealthInput: ['autoPirate(this)'],
	conflictInput: ['autoPirate(this)'],
	platformInput: ['docByExternal()'],
	distanceInput: ['numberStats(this)'],
	systemExtras: ['addTemplate(this)'],
}
assignElementFunctions(systemElementFunctions);

/**
 * Immediately invoked function expression (IIFE) that caches HTML files for future use.
 * @function
 * @returns {void}
 */
(() => {
	const files = [
		'tradeableInputs'
	]
	for (const file of files) {
		cachedHTML.files.add(`src/htmlSnippets/${file}.html`);
	}
})();

/**
 * Generates a sentence that describes the location of the page.
 *
 * @function
 */
function locationSentence() {
	const { region, civShort: civ } = pageData;
	const HubNr = regNr(region);
	const galaxy = HubGal(civ);

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
async function planetInputs() {
	const inputTarget = globalElements.input.waterInput.parentElement.previousElementSibling;
	const outputTarget = globalElements.output.planets;
	const { planet: planetNr, moon: moonNr } = pageData;
	const bodies = clamp(parseInt(planetNr) + parseInt(moonNr), 2, 6);
	if (isNaN(bodies)) return;

	/**
	 * Clamps a value between a minimum and maximum value.
	 * @function
	 * @param {number} value - The value to clamp.
	 * @param {number} min - The minimum value to clamp to.
	 * @param {number} max - The maximum value to clamp to.
	 * @returns {number} The clamped value.
	 */
	function clamp(value, min, max) {
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
			const elements = document.querySelectorAll('[data-planet]');
			for (const element of elements) {
				planetIDs.add(element.dataset.planet);
			}
			return planetIDs.size;
		})();
		const diff = bodies - planets;		// positive if we need to add sections, negative if we need to delete sections
		return diff;
	}
	const elementList = document.querySelectorAll('[data-planet]');
	let childIndex = getChildIndex(elementList, 'dataset.planet');

	while (diff() != 0) {
		if (diff() > 0) {
			await addPlanet(childIndex);
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
		const elements = document.querySelectorAll('[data-planet]');
		const planetIDs = new Set();
		for (const element of elements) {
			planetIDs.add(element.dataset.planet);
		}
		const sectionName = Array.from(planetIDs).pop();
		const sections = document.querySelectorAll(`[data-planet="${sectionName}"]`);
		removeSection(sections);
	}

	/**
	 * Adds a new planet section to the planet table.
	 * @function
	 * @param {number} i - The index of the planet section to add.
	 * @returns {void}
	 */
	async function addPlanet(i) {
		const replacementStrings = {
			i,
			oddEvenClass: 'is-' + oddEven(i),
		}

		const inputDom = await loadHTML('src/htmlSnippets/planetInputs.html', replacementStrings);
		const outputDom = await loadHTML('src/htmlSnippets/planetOutputs.html', replacementStrings);
		addAllTooltips(inputDom);

		inputTarget.insertAdjacentHTML('beforebegin', inputDom.body.innerHTML);
		outputTarget.insertAdjacentHTML('beforeend', outputDom.body.innerHTML);

		// adds functionality to the input elements in the new planet section
		initialiseSectionInputs(`[data-planet="planet${i}"]`);

		// updates global elements with new output elements
		const resourceOutputs = { output: {} };
		const outputs = document.querySelectorAll(`#body${i} output`);
		for (const output of outputs) {
			const id = output.id;
			resourceOutputs.output[id] = id;
		}
		updateGlobalElements(resourceOutputs);

		// updates the biome links for the new planet section
		biomeLinks(inputDom.getElementById(`biome_input${i}`));

		// adds resource input elements to the new planet section
		const resourceButton = document.getElementById(`addResourceButton${i}`);
		for (let j = 0; j < 3; j++) {
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
function addResourceInput(element, sectionTarget) {
	const inputSection = element.parentElement;
	const elementList = document.querySelectorAll('[data-resource]');
	const childIndex = getChildIndex(elementList, 'dataset.resource');
	const resource = 'resource' + sectionTarget;
	const resource_input = 'resource_input' + childIndex;
	const oddEvenClass = 'is-' + oddEven(sectionTarget);

	const inputHTML = `<div class="tableCell text removable ${oddEvenClass}" data-section="resource${sectionTarget} planet${sectionTarget}" data-resource="section${childIndex}" data-planet="planet${sectionTarget}">
		<button class="button is-danger is-outlined icon is-small" title="Remove resource" type="button" disabled onclick="removeSpecificSection('section${childIndex}', 'resource'); removeResource('${resource_input}')">&#10006</button>
		<label for="${resource_input}">Resource name:</label>
	</div>
	<div class="tableCell data ${oddEvenClass}" data-section="resource${sectionTarget} planet${sectionTarget}" data-resource="section${childIndex}" data-planet="planet${sectionTarget}">
		<input type="text" list="resources" id="${resource_input}" data-dest-noauto="${resource}" oninput="addResource(this)">
	</div>`;

	inputSection.insertAdjacentHTML('beforebegin', inputHTML);

	// Update the global elements list for the new input element.
	const resourceElements = { input: {} };
	resourceElements.input[resource_input] = resource_input;
	updateGlobalElements(resourceElements);

	// Get all of the current resource input sections, and count them.
	const resourceInputSections = getResourceInputSections(sectionTarget);
	const resourceInputSectionCount = getResourceInputSectionCount(resourceInputSections);

	// enter the number of sections you want to allow behind the ">" operator.
	// If there are more input sections than the maximum (6), disable the "add" button.
	if (resourceInputSectionCount + 1 > 6) {
		element.disabled = true;
	}

	// default state is disabled because that's easier to handle.
	// Enable the "remove" button for every input section if there are more than the minimum (3, because every planet has at least 3 resources).
	if (resourceInputSectionCount > 3) {
		for (const element of resourceInputSections) {
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
function getResourceInputSections(sectionTarget) {
	return document.querySelectorAll(`[data-resource][data-planet="planet${sectionTarget}"]`);
}

/**
 * Returns the count of unique 'resource' input sections in the provided array.
 * @param {HTMLInputElement[]} inputs - Array of input elements containing a dataset property with a 'resource' key.
 * @returns {number} - Count of unique 'resource' input sections.
 */
function getResourceInputSectionCount(inputs) {
	const sections = new Set();
	for (const input of inputs) {
		sections.add(input.dataset.resource);
	}
	return sections.size;
}

/**
 * Removes a specified resource from the page.
 *
 * @param {string} resourceID - The ID of the resource input element to remove.
 * @returns {void}
 */
function removeResource(resourceID) {
	const resourceInput = globalElements.input[resourceID];
	const planet = resourceInput.dataset.destNoauto;
	const id = resourceInput.id;
	const sectionTarget = extractNumber(planet);

	// remove element from resources
	if (resourceInput.value) {
		delete links.resources[planet][id];
		addResource();
	}

	// enable "add resource" button
	document.getElementById(`addResourceButton${sectionTarget}`).disabled = false;

	// disable remove buttons if 3 inputs or less
	const resourceInputSections = getResourceInputSections(sectionTarget);
	const resourceInputSectionCount = getResourceInputSectionCount(resourceInputSections);

	if (resourceInputSectionCount < 4) {
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
function moonSwitch(element) {
	const descriptorDropdown = document.getElementById(element.dataset.destNoauto);
	const i = extractNumber(element.id);
	const planetClass = element.checked ? 'Moon' : 'Planet';

	document.getElementById('planetClass' + i).innerText = planetClass;

	expandDescriptor(descriptorDropdown, planetClass);
}

/**
 * Expand a descriptor from a user input and use it to build output for a specified element.
 *
 * @param {HTMLElement} element - The element containing the user input.
 * @param {string|null} planetClass - The class of planet or moon.
 * @returns {void}
 */
function expandDescriptor(element, planetClass = null) {
	const i = extractNumber(element.id);
	if (!planetClass) {
		planetClass = document.getElementById('moon_input' + i).checked ? 'Moon' : 'Planet';
	}
	const descriptor = element.value;
	const dest = element.dataset.destNoauto;
	const output = buildDescriptor(descriptor, planetClass, '<br>');
	globalElements.output[dest].innerText = output;

	const isInfested = autoInfested(element);		// returns true or false
	infestedBiomeLinks('infested' + i, isInfested)
}

/**
 * Generates a list of upgrades for Space Station Merchants.
 *
 * @param {string|null} group - The ID of the checkbox group to get upgrades for. If not provided, checks all groups.
 * @returns {void}
 */
function merchantUpgrades(group = null) {
	const checkboxes = document.querySelectorAll('[data-dest-checkbox-group]');
	if (group) {
		getCheckedBoxes(group);
		return;
	}

	// if the checkboxes have no onchange event (i.e. at page load), assign them one
	const merchants = new Set();
	for (const checkbox of checkboxes) {
		if (!checkbox.onchange) assignFunction(checkbox, 'merchantUpgrades(this.dataset.destCheckboxGroup)');
		merchants.add(checkbox.dataset.destCheckboxGroup);
	}
	for (const merchant of merchants) {
		getCheckedBoxes(merchant);
	}
	return;

	function getCheckedBoxes(group) {
		const checkboxes = document.querySelectorAll(`[data-dest-checkbox-group="${group}"]`);
		const parm = (group.startsWith('SD')) ? '' : group.substring(0, 2);
		const checked = new Array;
		for (const checkbox of checkboxes) {
			if (checkbox.checked) checked.push(checkbox.value);
		}

		const code = new Array;
		for (let i = 1; i <= checked.length; i++) {
			const output = `| ${parm}${i}=${checked[i - 1]}`;
			code.push(output);
		}
		wikiCode(code.join('\n'), group);
		const wrapper = globalElements.output[group].closest('#scrapDealer');
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
async function tradeables() {
	// Define commonly used elements and variables
	const { input: { terminalInputs: inputSection }, output: { tradeTerminal: outputSection } } = globalElements;
	const elementList = document.querySelectorAll('[data-tradeable]');
	const childIndex = getChildIndex(elementList, 'dataset.tradeable');
	const replacementStrings = {
		childIndex,
		price: 'price' + childIndex,
		text: 'text' + childIndex,
		text_input: 'text_input' + childIndex,
		price_input: 'price_input' + childIndex,
	}

	// Get the HTML for the new tradeable input section
	const inputDom = await loadHTML('src/htmlSnippets/tradeableInputs.html', replacementStrings);

	// Define the HTML for the new tradeable output section
	const codeHTML = `<div data-tradeable="section${childIndex}">|-</div>
	<div data-tradeable="section${childIndex}">| {{ilink|<output id="${replacementStrings.text}"></output>}} || {{Units}} <output id="${replacementStrings.price}"></output></div>`;

	// Assign functions to certain input elements
	const inputs = inputDom.querySelectorAll(`[data-tradeable="section${childIndex}"] input[data-dest]`);
	for (const input of inputs) {
		assignFunction(input, 'wikiCode(this)');
	}
	const noautoInputs = inputDom.querySelectorAll(`[data-tradeable="section${childIndex}"] input[data-dest-noauto]`);
	for (const input of noautoInputs) {
		assignFunction(input, 'storeData(this); numberStats(this)');
	}

	// Add the new tradeable input and output sections to the appropriate elements
	inputSection.insertAdjacentHTML('beforebegin', inputDom.body.innerHTML);
	outputSection.insertAdjacentHTML('beforeend', codeHTML);

	// Count the number of tradeable input sections and disable the "Add Tradeable" button if it exceeds 5 sections
	const tradeableInputSections = document.querySelectorAll('[data-tradeable]');
	const tradeableInputSectionCount = (() => {
		const sections = new Set();
		for (const tradeableInputSection of tradeableInputSections) {
			const section = tradeableInputSection.dataset.tradeable;
			sections.add(section);
		}
		return sections.size;
	})();

	const button = inputSection.querySelector('button');

	// enter the number of sections you want to allow behind the ">" operator.
	if (tradeableInputSectionCount + 1 > 5) {
		button.disabled = true;
	}
}

/**
 * Enables the "add tradeable" button in the terminal input section.
 *
 * @function
 * @returns {void}
 */
function enableTradeableAdd() {
	const inputSection = globalElements.input.terminalInputs;
	const button = inputSection.querySelector('button');

	// enable "add tradeable" button
	button.disabled = false;
}

function resetExternal() {
	const sections = document.querySelectorAll('[data-tradeable], [data-planet]');
	removeSection(sections);
}

/**
 * Sets the text content of the 'regionLong' element to the full name of the region
 * or a modified version of the name if it contains more than one word.
 * @function
 * @returns {void}
 */
function regionLong() {
	const region = pageData.region;
	const output = (() => {
		if (region.split(' ').length == 1) return region + ' region';
		return region;
	})();
	globalElements.output.regionLong.innerText = output;
}

/**
 * Creates or updates the `resources` object with a new resource and generates the output to display.
 *
 * @param {HTMLInputElement|null} element - The input element from which to get the resource and planet data. If null, no new resource is added.
 * @returns {undefined}
 */
function addResource(element = null) {
	const resources = links.resources ??= new Object;
	if (element) {
		const value = element.value;
		const planet = element.dataset.destNoauto;
		const id = element.id;

		resources[planet] ??= new Object;
		resources[planet][id] = sanitiseString(value);
	}

	const usedResources = new Set();
	const linkedResources = sortObj(structuredClone(resources), true);
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
		globalElements.output[key].innerText = output;
	}
}

/**
 * Generates links to biomes based on given element's value and destination planet number.
 *
 * @param {HTMLElement} element - The HTML element that triggered the function.
 * @returns {void}
 */
function biomeLinks(element) {
	const value = element.value;
	const planet = element.dataset.destNoauto;

	const biomes = links.biomes ??= new Object;
	biomes[planet] = sanitiseString(value);

	const usedBiomes = new Set();
	const linkedBiomes = sortObj(structuredClone(biomes), true);
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
function infestedBiomeLinks(dest, bool) {
	const infestedBiomes = links.infestedBiomes ??= new Object;
	infestedBiomes[dest] = bool;

	let infestedBiomeLink = false;
	const linkedBiomes = sortObj(structuredClone(infestedBiomes), true);
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
function setBiomeText(array) {
	for (const key in array) {
		const output = array[key];
		globalElements.output[key].innerText = output;
	}
}

/**
 * Updates the output element to display the expected hub tag for the current system, based on its region and glyphs.
 *
 * @function
 * @name expectedHubTagSentence
 * @returns {void}
 */
function expectedHubTagSentence() {
	const outputElement = globalElements.output.expectedHubTag;
	const systemName = pageData.name;
	if (!systemName) {
		outputElement.innerHTML = '';
		return;
	};
	const { region, portalglyphs: glyphs } = pageData;
	const nr = getHubNumber(region);
	const index = (() => {
		let SIV = glyphs.substring(1, 4);
		while (SIV.startsWith('0') && SIV.length > 1) {
			SIV = SIV.substring(1);
		}
		return SIV;
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
function spaceStationSection() {
	// define notes
	const notes = {
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
		const input = pageData.faction;
		if (input == 'Uncharted') return 'uncharted';
		if (input.includes('Abandoned')) return 'abandoned';
		if (pageData.wealth.includes('Black Market')) return 'pirate';
		return 'normal';
	})();

	// get all station sections
	const stationSections = document.querySelectorAll('[data-station]');
	for (let i = 0; i < stationSections.length; i++) {
		const section = stationSections[i];
		const sectionName = section.dataset.station;
		if (sectionDefinition[faction].includes(sectionName)) {
			if ((sectionName == 'merchant' || sectionName == 'scrapDealer') && defaultDisplay(section)) {
				i++;	// NoSonar (I know what I'm doing, this is to skip the next section)
			}
			if (section.id == 'scrapDealer' && !pageData.SDMerchant) {
				section.style.display = 'none';
			} else {
				section.style.display = '';
			}
		} else {
			section.style.display = 'none';
		}
	}
	if (!notes[faction]) return;

	document.querySelector('[data-station="note"]').innerText = notes[faction];

	/**
	 * Determines if the default display should be used for a space station section.
	 *
	 * @function
	 * @param {Object} section - The space station section HTML element.
	 * @returns {Boolean} Returns true if the default display should be used, false otherwise.
	 */
	function defaultDisplay(section) {
		const button = section.querySelector('button');
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
function autoBH() {
	const glyphs = pageData.portalglyphs;
	const colorInput = globalElements.input.colorInput;
	const SIV = glyphs.substring(2, 4);

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
function autoPirate(element) {
	const value = element.value;
	if (!value.includes('Black Market') && !value.includes('Pirate Controlled')) return;
	const { conflictInput: conflict, wealthInput: wealth } = globalElements.input;
	const inputs = [wealth, conflict];
	for (const input of inputs) {
		const pirate = input.querySelector('optgroup[label="Pirate"] option').value;
		input.value = pirate;
		wikiCode(input);
	}
	spaceStationSection();
}

/**
 * Autofills conflict/economy/wealth if faction includes 'Abandoned' or 'Uncharted'
 * @function
 * @returns {void}
 */
function combineEconConf() {
	const faction = pageData.faction;

	const { wealthInput: wealth, economyInput: economy, conflictInput: conflict } = globalElements.input;

	const inputs = [wealth, economy, conflict];

	if (faction.includes('Abandoned') || faction == 'Uncharted') {
		for (const input of inputs) {
			const value = input.querySelector('optgroup[label="Abandoned/Uncharted"] option').value;
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
function addTemplate(element = null) {
	if (!element) {
		const checkboxes = document.getElementsByName('systemExtras');
		for (const checkbox of checkboxes) {
			addTemplate(checkbox);
		}
		return;
	}

	const outputElement = globalElements.output[element.value];
	outputElement.style.display = element.checked ? '' : 'none';
}

function civCatalog() {
	const civ = shortenGHub(pageData.civShort);
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
function generateGalleryArray() {
	const array = [
		'',
		'System Exploration Guide',
		'System Page',
		'Default SS Multi-Tool',
	];

	if (pageData.faction == 'Uncharted' || pageData.faction.includes('Abandoned')) {
		array.pop();
	}

	pageData.galleryArray = array;
}

function galleryExplanationExternal() {
	return `There is a preferred order of pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>System Exploration Guide</li>
			<li>System Page</li>
			<li>Default SS Multi-Tool</li>
		</ol>
	</div>`
}