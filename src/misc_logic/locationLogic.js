/**
 * @fileoverview Provides location focused functions
 */

/**
 * Returns the type of celestial body based on whether a moon is present or not.
 *
 * @param {boolean} [moon=pageData.moon] - A boolean indicating whether a moon is present.
 * @returns {string} - A string indicating whether the celestial body is a moon or planet.
 */
function planetMoon(moon = pageData.moon) {
	if (moon) {
		return 'Moon';
	} else {
		return 'Planet';
	}
}

/**
 * Sets the text content of `globalElements.output.celestialBody` to a sentence
 * describing the input `planet` and `moon`. If `globalElements.output.celestialBody`
 * is falsy, returns the description string.
 *
 * @param {string} [planet=pageData.planet] - The name of the planet to describe.
 * @param {string} [moon=pageData.moon] - The name of the moon to describe.
 *
 * @returns {string} - The description sentence, or "" if `globalElements.output.celestialBody`
 *                     is falsy.
 */
function planetMoonSentence(planet = pageData.planet, moon = pageData.moon) {
	const dest = globalElements.output.celestialBody;
	const body = planetMoon(moon);
	const text = (() => {
		if (body == 'Moon') {
			return `moon [[${sanitiseString(moon)}]]`;
		} else {
			return `planet [[${sanitiseString(planet)}]]`;
		}
	})();
	if (!dest) return text;
	dest.innerText = text;
}

/**
 * Generates the galaxy part of a location sentence based on the given civilization.
 *
 * @param {string} civ - The name of the civilization.
 * @returns {string} The location sentence for the given civilization.
 */
function HubGal(civ) {
	switch (civ) {
		case "GHub":
			return '[[Galactic Hub]]';

		case "CalHub":
			return '[[Galactic Hub Calypso]], in the [[Calypso]] [[galaxy]]';

		case "EisHub":
			return '[[Galactic Hub Eissentam]], in the [[Eissentam]] [[galaxy]]';
	}
}

/**
 * Returns the region number of a Hub region.
 * @param {string} regionName - The name of the region.
 * @returns {(number|string)} The region number of the Hub region, or 'Huburb' if the region is in GHub and has an index greater than 10.
 */
function getHubNumber(regionName) {
	for (const Hub in regions) {
		const hubRegions = regions[Hub];
		const index = Object.values(hubRegions).indexOf(regionName);
		if (Hub == 'GHub' && index > 10) return 'Huburb';
		if (index != -1) return index + 1;
	}
}

/**
 * Returns the sentence part for the location section including the region number.
 *
 * @param {string} regionName - The name of the region
 * @returns {string} - The sentence part for the location section including the region number
 */
function regNr(regionName) {
	const hubNr = getHubNumber(regionName);
	if (hubNr == 'Huburb') {
		return ', Huburb';
	} else {
		return ` (HUB${hubNr})`;
	}
}