/**
 * @fileoverview Provides location focused functions
 */

import { sanitiseString } from "../common";
import { globalElements, pageData } from "../variables/objects";
import { regions } from "../variables/regions";

/**
 * Returns the type of celestial body based on whether a moon is present or not.
 *
 * @param {boolean} [moon=pageData.moon] - A boolean indicating whether a moon is present.
 * @returns {string} - A string indicating whether the celestial body is a moon or planet.
 */
export function planetMoon(moon = pageData.moon) {
	return moon ? 'Moon' : 'Planet';
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
export function planetMoonSentence(planet: string = pageData.planet as string, moon: string = pageData.moon as string, link: boolean = false) {
	const dest = globalElements.output.celestialBody as HTMLOutputElement;
	const body = planetMoon(moon);
	const text = body == 'Moon' ? `moon [[${sanitiseString(moon)}]]` : `planet [[${sanitiseString(planet)}]]`;
	const linkedText = link ? `[[${text.split(' ')[0]}]] ${text.split(' ').slice(1).join(' ')}` : text;

	if (!dest) return linkedText;
	dest.innerText = linkedText;
	return '';
}

/**
 * Returns the region number of a region.
 * @param {string} regionName - The name of the region.
 * @returns {(number|string)} The region number of the region.
 */
export function getRegNumber(regionName: string): string {
	const index = Object.values(regions).indexOf(regionName);
	if (index !== -1) return (index + 1).toString();
	return '';
}

/**
 * Returns the sentence part for the location section including the region number.
 *
 * @param {string} regionName - The name of the region
 * @returns {string} - The sentence part for the location section including the region number
 */
export function regNr(regionName: string): string {
	const regNr = getRegNumber(regionName);
	return ` (EV${regNr})`;
}