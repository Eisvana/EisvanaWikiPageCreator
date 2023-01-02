function startupFunctions() {
	wormName();
	catalog();
	autoSpawn();
}

const sandwormElements = {
	input: {
		autoSpawn: 'autoSpawn',
	}
}
updateGlobalElements(sandwormElements);

const sandwormElementFunctions = {
	civ: ['catalog()'],
	planetInput: ['wormName()'],
	moonInput: ['wormName()'],
	autoSpawn: ['autoSpawn()'],
	researchTeam: ['catalog()'],
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
	const spawn = document.querySelector(`[id^='autoSpawnInput']:checked`).value;
	const output = `This creature ${spawn} automatically spawn on a game reload.`;
	if (spawn) {
		globalElements.output.autoSpawn.style.display = '';
		setOutput(codeId, output);
	} else {
		globalElements.output.autoSpawn.style.display = 'none';
	}
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

	globalElements.output.addInfo.innerText = output;
	addInfoBullet();
}
