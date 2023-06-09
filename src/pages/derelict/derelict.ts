/**
 * @fileoverview Provides functions which can be used by the Derelict Freighter page creator.
 */

import { StdObj } from "../../types/objects";
import { globalElements, pageData } from "../../variables/objects";

export function updateGalaxyTableEntry() {
	const galaxyTableEntryElement = globalElements.output.galaxyTableEntry as HTMLDivElement;
	const tables = ['euclid', 'calypso', 'eissentam'];
	const galaxy = (pageData.galaxy as string).toLowerCase();
	const unusedGalaxies = tables.filter(table => table != galaxy);
	const galaxyTable = globalElements.output[galaxy] as HTMLDivElement;
	const galaxyTableOutput = galaxyTable.querySelector('output') as HTMLOutputElement;

	const galaxyTableEntry = `| [[File: ${pageData.file}|150px]] || [[${pageData.name}]] || ${pageData.rooms || '?'} || ${(pageData.enemies as Array<string>).join(', ') || '?'} || {{gl/Small|${pageData.glyphs}}} || ${pageData.discoverer}
	|-`;

	galaxyTableEntryElement.innerText = galaxyTableEntry;
	galaxyTableOutput.innerText = galaxyTableEntry;
	galaxyTable.style.display = '';

	for (const table of unusedGalaxies) {
		(globalElements.output[table] as HTMLDivElement).style.display = 'none';
	}
}

export function enemyCheckboxes() {
	const checkboxes = document.getElementsByName('enemies') as NodeListOf<HTMLInputElement>;
	const enemies: Array<string> = [];
	for (const checkbox of Array.from(checkboxes)) {
		if (checkbox.checked) enemies.push(checkbox.value);
	}
	pageData.enemies = enemies;
}

export function setGalaxy(civShort: string) {
	const galaxies: StdObj = {
		GHub: 'Euclid',
		CalHub: 'Calypso',
		EisHub: 'Eissentam',
	}

	const hubs: StdObj = {
		GHub: 'Galactic Hub Project',
		CalHub: 'Galactic Hub Calypso',
		EisHub: 'Galactic Hub Eissentam',
	}
	pageData.civShort = civShort;
	pageData.civilized = hubs[civShort];
	pageData.galaxy = galaxies[civShort];
}