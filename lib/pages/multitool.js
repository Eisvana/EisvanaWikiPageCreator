function startupFunctions() {
	locGalaxy();
	acquirement();
	addInfo();
	acquirementGallery();
	autoRoyal();
	showSizeDropdown();
	MTType();
	albumFunctions();
}

// 1. param: string of all functions to add to the element
// 2. param: string of the listener that should be used ('onchange', 'oninput'...)
// 3. param: boolean whether the function string should be inserted before or after existing functions
const MTElementFunctions = {
	civ: ['locGalaxy(); addInfo(); appearance()', null, true],
	typeInput: ['addInfo(); appearance(); autoRoyal(); showSizeDropdown(); MTType()', null, true],
	sizeInput: ['showSizeDropdown(); MTType()'],
	researchTeam: ['addInfo()', null, true],
	locInput: ['acquirement(); acquirementGallery()'],
	planetInput: ['acquirement()'],
	moonInput: ['acquirement()'],
	axesInput: ['acquirement()'],
	srlocInput: ['acquirement()'],
	srInput: ['acquirement(); acquirementGallery()'],
	srImgInput: ['acquirementGallery()'],
	sysImgInput: ['acquirementGallery()'],
	cabInput: ['acquirementGallery()'],
	coordsInput: ['acquirementGallery()'],
	srImgUpload: ['acquirementGallery()', null, true],
	sysImgUpload: ['acquirementGallery()', null, true],
	cabUpload: ['acquirementGallery()', null, true],
	coordsUpload: ['acquirementGallery()', null, true],
	mainColourInput: ['appearance()'],
	secColourInput: ['appearance()'],
}
assignElementFunctions(MTElementFunctions);


// adds region to location sentence
function locGalaxy() {
	const civ = pageData.civShort;
	const text = HubGal(civ);
	wikiCode(text, 'locGalaxy');
}

// constructs the acquirement sentence
function acquirement() {
	const srloc = pageData.srLoc.toLowerCase();		// s/r location (for example planet/moon/space station)
	const srName = pageData.srLocName;				// name of the s/r location (for example a planetname)
	const planet = pageData.planet;					// planet name of the MT
	const moon = pageData.moon;						// moon name of the MT
	const coords = pageData.axes;					// coords of the MT
	const loc = pageData.location.toLowerCase();	// location type of the MT (for example space station/settlement/sentinel pillar)
	const body = planetMoonSentence(planet, moon);
	let instructions, savereload;

	if (loc.split(' ')[0] == 'space') {
		instructions = `fly to the ${loc}`;
		savereload = `the ${srloc}`;

		if (loc == srloc) {
			instructions = 'take from cabinet';
		} else if (srloc.split(' ')[0] != 'space') {
			savereload = `${srloc} [[${srName}]]`;
		}

	} else {	// if not on Station/Anomaly
		savereload = `${srloc} [[${srName}]]`;
		instructions = `fly to ${body} (${coords})`;

		if (srloc.split(' ')[0] == 'space') {
			savereload = `the ${srloc}`;
		} else if ((moon && srloc == 'moon' && srName == moon) || (!moon && srloc == 'planet' && srName == planet)) {
			instructions = `fly to ${coords}`;
		} else if (!srName) {
			savereload = `${body}`;
			instructions = `fly to ${coords}`;
		}
	}

	const sentence = `Save and reload on ${savereload}, then ${instructions}.`;
	wikiCode(sentence, 'acquirement');
}

// constructs additional information sentence
function addInfo() {
	const civ = shortenGHub(pageData.civShort);
	const researchteam = docByResearchteam('GHSH');
	const type = (() => {
		const preType = pageData.type;		// Alien/Experimental/Starter Pistol/Standard/Royal
		if (preType == 'Standard') return 'Standard Multi-Tool';
		return preType;
	})();

	const catalog = (() => {
		if (civ != 'CalHub') {
			return `${civ} Multi-Tool Catalog - ${type}`;
		} else {
			return `${civ} Multi-Tool Catalog`;
		}
	})();

	const output = '[[' + catalog + ']]' + researchteam;

	globalElements.output.addInfo.innerText = output;
}

function appearance() {
	const name = pageData.name;
	const type = pageData.type.toLowerCase();
	const colour1 = pageData.mainColour;
	const colour2 = pageData.secColour;
	const appearance = globalElements.input.appearanceInput;

	if (!(colour1.trim() || colour2.trim())) return;

	const mainColour = (() => {
		if (colour1.trim()) return `${enPrefix(colour1)} ${colour1.trim()}`;
		return enPrefix(type);
	})();

	const accentColour = (() => {
		if (colour2.trim()) return ` with ${colour2} accents`;
		return '';
	})();

	const output = `${name} is ${mainColour} ${type} multi-tool${accentColour}.`;
	appearance.value = output;
	wikiCode(appearance);
}

// handles acquirement gallery images
function acquirementGallery() {
	const srname = pageData.srLocName;
	const srImg = pageData.srPlanetImg;
	const sysImg = pageData.sysImg;
	const cabinetPlanetImg = pageData.cabinetPlanetImg;
	const axesImg = pageData.axesImg;
	const loc = pageData.location;
	const pics = new Object;

	const body = planetMoon();

	const srloc = (() => {
		const preSrloc = pageData.srLoc;
		if (preSrloc != 'Space Station' && preSrloc != 'Space Anomaly' && srname == '') {
			return body;
		}
		return preSrloc;
	})();

	const type = (() => {
		if (loc == 'Sentinel Pillar') return 'Pillar';
		return 'Cabinet';
	})();

	const highlight = (() => {
		if (!loc.includes('Space')) return `(${type} ${body} highlighted)`;
		return '';
	})();

	if (srImg) pics[srImg] = `Save/Reload ${srloc}`;
	if (sysImg) pics[sysImg] = `System ${highlight}`;
	if (!loc.includes('Space')) {
		if (cabinetPlanetImg) pics[cabinetPlanetImg] = `${type} ${body}`;
		if (axesImg) pics[axesImg] = 'Coordinates';
	}

	const codeArray = new Array;
	for (const pic in pics) {
		const desc = pics[pic];
		const gallery = `<div>${pic}|${desc}</div>`;
		codeArray.push(gallery);
	}
	globalElements.output.acquirementGallery.innerHTML = codeArray.join('');
}

// automatically switches to Sentinel Pillar when Royal is selected
function autoRoyal() {
	const type = pageData.type;
	const locElement = globalElements.input.locInput;

	if (type == 'Royal') {
		hideInput(locElement, 'none');
		locElement.value = 'Sentinel Pillar';
		wikiCode(locElement);
	} else {
		hideInput(locElement, '');
	}
}

// shows or hides size dropdown
function showSizeDropdown() {
	const type = pageData.type;
	const size = pageData.size;
	const sizeInput = globalElements.input.sizeInput;
	if (type == 'Experimental') {
		sizeInput.querySelector('option[value="SMG"]').style.display = 'none';
	} else {
		sizeInput.querySelector('option[value="SMG"]').style.display = '';
	}
	if (type == 'Experimental' && size == 'SMG') sizeInput.value = 'Pistol';

	if (type != 'Royal' && type != 'Starter Pistol') {
		hideInput(sizeInput, '');
	} else {
		hideInput(sizeInput, 'none');
	}
}

// determine MT type for infobox
function MTType() {
	const typeElement = globalElements.input.typeInput;
	const type = typeElement.value;
	const typeShort = type.split(' ').slice(-1).join();
	const size = pageData.size;
	const output = (() => {
		if (type == 'Standard' && size == 'SMG') {
			return 'Rifle';
		} else if (type == 'Standard') {
			return size;
		} else {
			return typeShort;
		}
	})();

	enPrefix(output, 'enPrefix');
	wikiCode(output, typeElement.dataset.destNoauto);
}

// determine if MT is SMG for catalog
function catalogMTType() {
	const type = pageData.type;
	const size = pageData.size;
	const output = (() => {
		switch (type) {
			case 'Royal':
			case 'Starter Pistol':
				return '';

			default:
				return size + ' -';
		}
	})();
	return output;
}

function albumTypeExternal() {
	return 'catalog';
}