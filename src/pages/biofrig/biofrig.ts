/**
 * @fileoverview Provides functions which can be used by the Organic Frigate page creator.
 */

import { docByResearchteam, enPrefix, shortenGHub, wikiCode } from "../../common";
import { HubGal, regNr } from "../../miscLogic/locationLogic";
import { globalElements, pageData } from "../../variables/objects";

export function locHubNr() {
	const region = pageData.region as string;
	const outputElement = globalElements.output.HubNr as HTMLOutputElement;
	outputElement.innerText = regNr(region);
}

/**
 * Adds region to location sentence.
 * @function
 * @name locGalaxy
 * @returns {undefined}
 */
export function locGalaxy() {
	const civ = pageData.civShort as string;
	const text = HubGal(civ);
	wikiCode(text, 'locGalaxy');
}

/**
 * Adds information to globalElements.output based on pageData.catalogue and research team code.
 * @function
 * @returns {void}
 */
export function addInfo() {
	const researchteam = docByResearchteam('GHSH');
	const catalogue = pageData.catalogue;

	const outputElement = globalElements.output.addInfo as HTMLOutputElement;
	outputElement.innerText = `[[${catalogue}]]${researchteam}`;
}

/**
 * Generates a catalogue of organic frigates based on the civilization data in `pageData`.
 * @function
 * @returns {void}
 */
export function generateCatalogue() {
	const { civShort, civilized: civ } = pageData;
	const catalogueCiv = (() => {
		switch (civShort) {
			case 'GHub':
			case 'EisHub':
				return shortenGHub(civShort);

			case 'CalHub':
				return civ;
		}
		return '';
	})();
	pageData.catalogue = `${catalogueCiv} Organic Frigate Catalog`;
}

/**
 * Sets the appearance of the organic frigate.
 *
 * @function appearance
 * @returns {void}
 */
export function appearance() {
	// Extract data from pageData object.
	const name = pageData.name as string;
	const tentacles = pageData.tentacles as string;
	const colour1 = pageData.mainColour as string;
	const colour2 = pageData.secColour as string;

	// Get the appearance input from globalElement object.
	const appearance = globalElements.input.appearanceInput as HTMLTextAreaElement;

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

export function albumOtherExternal() {
	return `{{Class|${pageData.class}}}`;
}

export function albumItemTypeExternal() {
	return 'Organic Frigate Catalog';
}

export function generateGalleryArray() {
	const array = [
		'',
		'Rear view of frigate',
		'Interaction screen',
		'System Page'
	];

	pageData.galleryArray = array;
}