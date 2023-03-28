/**
 * @fileoverview Provides functions which can be used by the Sandworm page creator.
 */

function startupFunctions() {
	wormName();
	catalogue();
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
	civ: ['catalogue(); albumItemType()', null, true],
	planetInput: ['wormName(); planetMoonSentence(); albumName()'],
	moonInput: ['wormName(); planetMoonSentence(); albumName()'],
	autoSpawn: ['autoSpawn()'],
	researchTeam: ['catalogue()', null, true],
	wormclassInput: ['albumName()'],
	wormmaxdepthInput: ['numberStats(this, 1); albumOther()'],
	discoveredInput: ['albumDiscoverer()'],
	discoveredlinkInput: ['albumDiscoverer()'],
}
assignElementFunctions(sandwormElementFunctions);


/**
 * Assigns a dynamic name to the worm, based on the
 * planet or moon the worm is on.
 *
 * @function wormName
 * @returns {void}
 */
function wormName() {
	const planet = pageData.planet;
	const moon = pageData.moon;

	/*
	 * If there's no planet, set pageData.name to an
	 * empty string and return.
	 */
	if (!planet) {
		pageData.name = '';
		return;
	}

	/*
	 * If there's a moon, set body to moon, otherwise set
	 * it to planet.
	 */
	const body = (() => {
		if (moon) return moon;
		return planet;
	})();

	/*
	 * Use the wikiCode function to generate wiki code
	 * for bodyName and set pageData.name to "Immortal
	 * Worm" plus body.
	 */
	wikiCode(body, 'bodyName');
	pageData.name = `Immortal Worm ${body}`;
}

/**
 * Sets the `autospawn` value according to the user input and updates the `globalEelements.output.autoSpawn` element to reflect changes.
 * @function
 * @name autoSpawn
 * @returns {void}
 */
// sets the autospawn value according to input
function autoSpawn() {
	const spawn = (() => {
		const elements = globalElements.input.autoSpawn;
		for (const element of elements) {
			if (element.checked) return element.value;
		}
	})();
	const output = `This creature ${spawn} automatically spawn on game reload`;
	if (spawn) {
		globalElements.output.autoSpawn.style.display = '';
		globalElements.output.autoSpawn.innerText = output;
	} else {
		globalElements.output.autoSpawn.style.display = 'none';
	}
	addInfoBullet();
}

/**
 * Adds a catalogue entry for the current page.
 * @function catalogue
 * @returns {void} No return value.
 * @description Adds information to the wikiCode for a specific album after checking the pageData's civShort value.
 *              If it's "GHub", it will add information to the "GHEC Sandworm Album".
 *              If it's "CalHub", it will add information to the "CalHub Rare Fauna Album#Sandworm" page.
 *              If it's "EisHub", it will add information to the "EisHub Shaihuluda Album" page.
 *              Also adds a "documented by GHEC" sentence to the output.
 */
function catalogue() {
	const research = docByResearchteam('GHEC');

	const album = (() => {
		switch (pageData.civShort) {
			case "GHub":
				return "GHEC Sandworm";

			case "CalHub":
				return "CalHub Rare Fauna Album#Sandworm|CalHub Rare Fauna";

			case "EisHub":
				return "EisHub Shaihuluda";
		}
	})();
	const albumName = `${album} Album`;
	const output = `[[${albumName}]]${research}`;

	wikiCode(output, 'addInfo');
	addInfoBullet();
	pageData.catalogue = albumName
}

//album functions
function albumItemTypeExternal() {
	return pageData.catalogue.split('|').at(-1);
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
	return pageData.catalogue.split('|')[0];
}

/**
 * Generates an array of gallery items for the page
 * @function generateGalleryArray
 * @returns {Array} - An array of gallery items that are unique to the page
 */
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