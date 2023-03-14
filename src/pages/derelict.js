function startupFunctions() {
	researchTeamDropdown();
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
		galaxyInput: ['setGalaxy(this.value); researchTeamDropdown()'],
		roomInput: ['numberStats(this)'],
		hyperdriveInput: ['numberStats(this)'],
		fuelInput: ['numberStats(this)'],
		enemies: ['enemyCheckboxes()'],
	}
	assignElementFunctions(derelictElementFunctions);
})();

function updateGalaxyTableEntry() {
	const galaxyTableEntryElement = globalElements.output.galaxyTableEntry;
	const tables = ['euclid', 'calypso', 'eissentam'];
	const galaxy = pageData.galaxy.toLowerCase();
	const unusedGalaxies = tables.filter(table => table != galaxy);
	const galaxyTable = globalElements.output[galaxy];

	const galaxyTableEntry = `| [[File: ${pageData.file}|150px]] || [[${pageData.name}]] || ${pageData.rooms || '?'} || ${pageData.enemies.join(', ') || '?'} || {{gl/Small|${pageData.glyphs}}} || ${pageData.discoverer}
								|-`;

	galaxyTableEntryElement.innerText = galaxyTableEntry;
	galaxyTable.innerText = galaxyTableEntry;
	galaxyTable.style.display = '';

	for (const table of unusedGalaxies) {
		globalElements.output[table].style.display = 'none';
		globalElements.output[table].innerText = '';
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
	pageData.civShort = civShort;
	pageData.galaxy = galaxies[civShort];
}