/**
 * @fileoverview Provides functions which can be used by the Derelict Freighter page creator.
 */

function startupFunctions() {
	setGalaxy(globalElements.input.galaxyInput.value);
	enemyCheckboxes();
	researchTeamDropdown();
	updateGalaxyTableEntry();
}

(() => {
	const derelictElements = {
		input: {
			enemies: 'enemies',
		},
		output: {
			galaxyTableEntry: 'galaxyTableEntry',
			euclid: 'euclid',
			calypso: 'calypso',
			eissentam: 'eissentam',
		}
	}
	updateGlobalElements(derelictElements);

	const derelictElementFunctions = {
		nameInput: ['updateGalaxyTableEntry()'],
		galaxyInput: ['setGalaxy(this.value); researchTeamDropdown(); updateGalaxyTableEntry()'],
		roomInput: ['numberStats(this); updateGalaxyTableEntry()'],
		hyperdriveInput: ['numberStats(this); updateGalaxyTableEntry()'],
		fuelInput: ['numberStats(this); updateGalaxyTableEntry()'],
		enemies: ['enemyCheckboxes(); updateGalaxyTableEntry()'],
		portalglyphsInput: ['updateGalaxyTableEntry()', null, true],
	}
	assignElementFunctions(derelictElementFunctions);
})();

function updateGalaxyTableEntry() {
	const galaxyTableEntryElement = globalElements.output.galaxyTableEntry;
	const tables = ['euclid', 'calypso', 'eissentam'];
	const galaxy = pageData.galaxy.toLowerCase();
	const unusedGalaxies = tables.filter(table => table != galaxy);
	const galaxyTable = globalElements.output[galaxy];
	const galaxyTableOutput = galaxyTable.querySelector('output');

	const galaxyTableEntry = `| [[File: ${pageData.file}|150px]] || [[${pageData.name}]] || ${pageData.rooms || '?'} || ${pageData.enemies.join(', ') || '?'} || {{gl/Small|${pageData.glyphs}}} || ${pageData.discoverer}
	|-`;

	galaxyTableEntryElement.innerText = galaxyTableEntry;
	galaxyTableOutput.innerText = galaxyTableEntry;
	galaxyTable.style.display = '';

	for (const table of unusedGalaxies) {
		globalElements.output[table].style.display = 'none';
	}
}

function enemyCheckboxes() {
	const checkboxes = document.getElementsByName('enemies');
	const enemies = new Array;
	for (const checkbox of checkboxes) {
		if (checkbox.checked) enemies.push(checkbox.value);
	}
	pageData.enemies = enemies;
}

function setGalaxy(civShort) {
	const galaxies = {
		GHub: 'Euclid',
		CalHub: 'Calypso',
		EisHub: 'Eissentam',
	}

	const hubs = {
		GHub: 'Galactic Hub Project',
		CalHub: 'Galactic Hub Calypso',
		EisHub: 'Galactic Hub Eissentam',
	}
	pageData.civShort = civShort;
	pageData.civilized = hubs[civShort];
	pageData.galaxy = galaxies[civShort];
}