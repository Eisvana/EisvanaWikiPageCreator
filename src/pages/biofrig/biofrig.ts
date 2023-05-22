/**
 * @fileoverview Provides functions which can be used by the Organic Frigate page creator.
 */

function startupFunctions() {
	numberStats();
	locHubNr();
	locGalaxy();
	generateCatalogue();
	addInfo();
	albumFunctions();
}

const frigateElementFunctions = {
	civ: ['locGalaxy(); addInfo(); appearance(); locHubNr(); generateCatalogue()', null, true],
	nameInput: ['albumName(); appearance()'],
	costInput: ['numberStats(this)'],
	combatInput: ['numberStats(this)'],
	explorationInput: ['numberStats(this)'],
	industrialInput: ['numberStats(this)'],
	tradeInput: ['numberStats(this)'],
	fuelInput: ['numberStats(this)'],
	portalglyphsInput: ['locHubNr()', null, true],
	mainColourInput: ['appearance()'],
	secColourInput: ['appearance()'],
	tentacleInput: ['appearance()'],
	researchTeam: ['addInfo()'],
	classInput: ['albumOther()'],
}
assignElementFunctions(frigateElementFunctions);

function locHubNr() {
	globalElements.output.HubNr.innerText = regNr(pageData.region);
}

/**
 * Adds region to location sentence.
 * @function
 * @name locGalaxy
 * @returns {undefined}
 */
function locGalaxy() {
	const civ = pageData.civShort;
	const text = HubGal(civ);
	wikiCode(text, 'locGalaxy');
}

/**
 * Adds information to globalElements.output based on pageData.catalogue and research team code.
 * @function
 * @returns {void}
 */
function addInfo() {
	const researchteam = docByResearchteam('GHSH');
	const catalogue = pageData.catalogue;

	globalElements.output.addInfo.innerText = `[[${catalogue}]]${researchteam}`;
}

/**
 * Generates a catalogue of organic frigates based on the civilization data in `pageData`.
 * @function
 * @returns {void}
 */
function generateCatalogue() {
	const { civShort, civilized: civ } = pageData;
	const catalogueCiv = (() => {
		switch (civShort) {
			case 'GHub':
			case 'EisHub':
				return shortenGHub(civShort);

			case 'CalHub':
				return civ;
		}
	})();
	pageData.catalogue = `${catalogueCiv} Organic Frigate Catalog`;
}

/**
 * Sets the appearance of the organic frigate.
 *
 * @function appearance
 * @returns {void}
 */
function appearance() {
	// Extract data from pageData object.
	const { name, mainColour: colour1, secColour: colour2, tentacles } = pageData;

	// Get the appearance input from globalElement object.
	const appearance = globalElements.input.appearanceInput;

	// Return if no colors were provided.
	if (!(colour1.trim() || colour2.trim() || tentacles.trim())) return;

	// Set the main color with prefix if applicable.
	const mainColour = (() => {
		if (colour1.trim()) return `${enPrefix(colour1)} ${colour1.trim()}`;
		return '';
	})();

	// Set the accent color.
	const accentColour = (() => {
		if (colour2.trim()) return ` with ${colour2} accents`;
		return '';
	})();

	// Set the output for the appearance.
	const output = `${name} is ${mainColour} organic frigate${accentColour} with ${tentacles}.`;

	// Set the value of appearance input to the output.
	appearance.value = output;

	// Call wikiCode function to update the wiki code.
	wikiCode(appearance);
}

function albumOtherExternal() {
	return `{{Class|${pageData.class}}}`;
}

function albumItemTypeExternal() {
	return 'Organic Frigate Catalog';
}

function generateGalleryArray() {
	const array = [
		'',
		'Rear view of frigate',
		'Interaction screen',
		'System Page'
	];

	pageData.galleryArray = array;
}

function galleryExplanationExternal() {
	return `There is a preferred order of gallery pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Rear view of frigate</li>
			<li>Interaction screen</li>
			<li>System Page</li>
		</ol>
 	</div>`
}