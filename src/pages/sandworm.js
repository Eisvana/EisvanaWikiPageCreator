function startupFunctions() {
	wormName();
	planetMoonSentence();
	catalog();
	autoSpawn();
	albumFunctions();
}

const sandwormElements = {
	input: {
		autoSpawn: 'autoSpawnInput',
	}
}
updateGlobalElements(sandwormElements);

const sandwormElementFunctions = {
	civ: ['catalog(); albumItemType()', null, true],
	planetInput: ['wormName(); planetMoonSentence(); albumName()'],
	moonInput: ['wormName(); planetMoonSentence(); albumName()'],
	autoSpawn: ['autoSpawn()'],
	researchTeam: ['catalog()', null, true],
	wormclassInput: ['albumName()'],
	wormmaxdepthInput: ['numberStats(this, 1); albumOther()'],
	discoveredInput: ['albumDiscoverer()'],
	discoveredlinkInput: ['albumDiscoverer()'],
}
assignElementFunctions(sandwormElementFunctions);


// assigns planet or moon name dynamically
function wormName() {
	const planet = pageData.planet;
	const moon = pageData.moon;
	if (!planet) {
		pageData.name = '';
		return;
	}

	const body = (() => {
		if (moon) return moon;
		return planet;
	})();

	wikiCode(body, 'bodyName');
	pageData.name = `Immortal Worm ${body}`;
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

			case "CalHub":
				return "CalHub Rare Fauna";

			case "EisHub":
				return "EisHub Shaihuluda";
		}
	})();
	const albumName = `${album} Album`;
	const output = `[[${albumName}]]${research}`;

	wikiCode(output, 'addInfo');
	addInfoBullet();
	pageData.catalog = albumName;
}

//album functions
function albumItemTypeExternal() {
	return pageData.catalog;
}

function albumCivExternal() {
	return '';
}

function albumNameExternal() {
	enableTextMarking();
	const name = pageData.name;
	const wormclass = pageData.wormclass;
	const output = `${name}|${wormclass}`;
	return output;
}

function albumOtherExternal() {
	return `(${pageData.wormmaxdepth}ku)`;
}

function albumLinkGen() {
	return wikiLink + pageData.catalog;
}

function generateGalleryArray() {
	const array = [
		'',
		'Worm scan',
		'Moon Page',
		'Planet Page',
		'System Page',
		'Galaxy Map'
	];

	if (!pageData.moon) {
		const index = array.findIndex(item => item.toLowerCase().includes('moon'));
		array.splice(index, 1);
	}

	pageData.galleryArray = array;
}

function galleryExplanationExternal() {
	return `The preferred order of pictures is as follows:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Worm scan</li>
			<li>Moon Page</li>
			<li>Planet Page</li>
			<li>System Page</li>
			<li>Galaxy Map</li>
		</ol>
	</div>`
}