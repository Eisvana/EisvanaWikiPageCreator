function startupFunctions() {
	wormName();
	catalog();
	autoSpawn();
}

const sandwormElements = {
	input: {
		autoSpawn: 'autoSpawnInput',
	}
}
updateGlobalElements(sandwormElements);

const sandwormElementFunctions = {
	civ: ['catalog()', null, true],
	planetInput: ['wormName()'],
	moonInput: ['wormName()'],
	autoSpawn: ['autoSpawn()'],
	researchTeam: ['catalog()', null, true],
}
assignElementFunctions(sandwormElementFunctions);


// assigns planet or moon name dynamically
function wormName() {
	const planet = pageData.planet;
	const moon = pageData.moon;

	const body = (() => {
		if (moon) return moon;
		return planet;
	})();

	wikiCode(body, 'bodyName');
}

// sets the autospawn value according to input
function autoSpawn() {
	const spawn = (() => {
		const elements = globalElements.input.autoSpawn;
		for (const element of elements) {
			if (element.checked) return element.value;
		}
	})();
	const output = `This creature ${spawn} automatically spawn on a game reload.`;
	if (spawn) {
		globalElements.output.autoSpawn.style.display = '';
		globalElements.output.autoSpawn.innerText = output;
	} else {
		globalElements.output.autoSpawn.style.display = 'none';
	}
	addInfoBullet();
}

// adds "documented by GHEC" sentence
function catalog() {
	const research = docByResearchteam('GHEC');

	const album = (() => {
		switch (pageData.civShort) {
			case "GHub":
				return "GHEC Sandworm";
				break;

			case "CalHub":
				return "CalHub Rare Fauna";
				break;

			case "EisHub":
				return "EisHub Shaihuluda";
				break;
		}
	})();

	const output = `[[${album} Album]]${research}`;

	wikiCode(output, 'addInfo');
	addInfoBullet();
}
