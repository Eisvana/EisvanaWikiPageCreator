/**
 * @fileoverview Provides functions which can be used by the Derelict Freighter page creator.
 */

import { wikiCode } from "../../common";
import { glyphs2Coords } from "../../modules/portalglyphs";
import { dataIntegrityObj, pageData } from "../../variables/objects";

export const galaxyTableEntry = `| [[File:<output name="image"></output>|150px]] || [[<output name="system"></output>]] || <output name="rooms"></output> || <output name="enemies"></output> || {{gl/Small|<output name="portalglyphs"></output>}} || <output name="discoverer"></output><br>
|-`;

export function enemyCheckboxes() {
	const checkboxes = document.getElementsByName('enemiesInput') as NodeListOf<HTMLInputElement>;
	const enemies: Array<string> = [];
	for (const checkbox of Array.from(checkboxes)) {
		if (checkbox.checked) enemies.push(checkbox.value);
	}
	wikiCode(enemies.join(', '), 'enemies');
}

export function albumLinkGen() {
	const type = dataIntegrityObj.link;
	const { class: freighterClass } = pageData;
	if (type === 'album') return `${pageData.name}`;
	return `Eisvana Starship Album - Derelict Freighter#${freighterClass}-Class`;
}

export function processGlyphs(element: HTMLInputElement) {
	const glyphs = element.value;
	const regionGlyphs = glyphs.substring(4);	// NoSonar this is the beginning of the region in the glyph sequence

	const regioncoords = glyphs2Coords(glyphs).slice(0, -5);	// NoSonar this is the system index in the coord string

	wikiCode(regionGlyphs, 'regionglyphs');
	wikiCode(regioncoords, 'coordinates');
}

export function discoverer() {
	const { discovered, discoveredlink } = pageData;
	const dest = 'discoverer';

	const discovererString = discovered || `{{Profile|${discoveredlink}}}`;
	wikiCode(discovererString as string, dest);
}