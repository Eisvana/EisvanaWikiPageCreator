function startupFunctions() {
	locGalaxy();
	acquirementBundle();
	addInfo();
	autoRoyal();
	showSizeDropdown();
	MTType();
	bundleNumberStats();
	albumFunctions();
	hideLocName();
	hideSrLocName();
	locHubNr();
}

// 1. param: string of all functions to add to the element
// 2. param: string of the listener that should be used ('onchange', 'oninput'...)
// 3. param: boolean whether the function string should be inserted before or after existing functions
const MTElementFunctions = {
	nameInput: ['albumName()'],
	civ: ['locGalaxy(); addInfo(); appearance(); locHubNr()', null, true],
	typeInput: ['addInfo(); appearance(); autoRoyal(); showSizeDropdown(); MTType(); albumItemType(); albumOther()', null, true],
	sizeInput: ['showSizeDropdown(); MTType(); albumOther()'],
	researchTeam: ['addInfo()', null, true],
	locInput: ['acquirementBundle(); hideLocName()'],
	srlocInput: ['acquirementBundle(); hideSrLocName()'],
	srInput: ['acquirementBundle()'],
	planetInput: ['acquirementBundle()'],
	moonInput: ['acquirementBundle()'],
	axesInput: ['acquirementAlbumBundle()'],
	dmgInput: ['numberStats(this, 1)'],
	scanInput: ['numberStats(this, 1)'],
	costInput: ['numberStats(this)'],
	slotsInput: ['numberStats(this); albumOther()'],
	classInput: ['albumOther()'],
	srImgInput: ['acquirementGallery()'],
	sysImgInput: ['acquirementGallery()'],
	cabInput: ['acquirementGallery()'],
	coordsInput: ['acquirementGallery()'],
	srImgUpload: ['acquirementGallery()', null, true],
	sysImgUpload: ['acquirementGallery()', null, true],
	cabUpload: ['acquirementGallery()', null, true],
	coordsUpload: ['acquirementGallery()', null, true],
	portalglyphsInput: ['locHubNr()', null, true],
	discoveredInput: ['albumDiscoverer()'],
	discoveredlinkInput: ['albumDiscoverer()'],
	mainColourInput: ['appearance()'],
	secColourInput: ['appearance()'],
}
assignElementFunctions(MTElementFunctions);


function locHubNr() {
	wikiCode(regNr(pageData.region), 'HubNr');
}

// adds region to location sentence
function locGalaxy() {
	const civ = pageData.civShort;
	const text = HubGal(civ);
	wikiCode(text, 'locGalaxy');
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

function acquirementAlbumBundle() {
	acquirement();
	albumDesc();
}

function acquirementBundle() {
	acquirementAlbumBundle();
	acquirementGallery();
}

// constructs the acquirement sentence
function acquirement() {
	const srName = pageData.srLocName;				// name of the s/r location (for example a planetname)
	const planet = pageData.planet;					// planet name of the MT
	const moon = pageData.moon;						// moon name of the MT
	const coords = pageData.axes;					// coords of the MT
	const loc = pageData.location.toLowerCase();	// location type of the MT (for example space station/settlement/sentinel pillar)
	const body = planetMoonSentence(planet, moon);
	let instructions, savereload;

	const srloc = (() => {
		const preSrloc = pageData.srLoc.toLowerCase();
		if (preSrloc.includes('space') || srName) return preSrloc;
		if (loc.includes('space')) return loc;
		return body;
	})();

	if (loc.includes('space')) {
		instructions = `fly to the ${loc}`;
		savereload = `the ${srloc}`;

		if (loc == srloc || !srName) {
			instructions = 'take from cabinet';
		} else if (!srloc.includes('space')) {
			savereload = `${srloc} [[${srName}]]`;
		}

	} else {	// if not on Station/Anomaly
		savereload = `${srloc} [[${srName}]]`;
		instructions = `fly to ${body} (${coords})`;

		if (srloc.includes('space')) {
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
	pageData.actualSrLoc = srloc;
}

// handles acquirement gallery images
function acquirementGallery() {
	const srname = pageData.srLocName;
	const srImg = pageData.srPlanetImg;
	const sysImg = pageData.sysImg;
	const cabinetPlanetImg = pageData.cabinetPlanetImg;
	const axesImg = pageData.axesImg;
	const loc = pageData.location;
	const pics = [{}, {}, {}, {}];

	const body = planetMoon();

	const srloc = (() => {
		const preSrloc = pageData.srLoc;
		if (preSrloc.includes('Space') || srname) return preSrloc;
		if (loc.includes('Space')) return loc;
		return body;
	})();

	const type = (() => {
		if (loc == 'Sentinel Pillar') return 'Pillar';
		return 'Cabinet';
	})();

	const highlight = (() => {
		if (!loc.includes('Space')) return `(${type} ${body} highlighted)`;
		return '';
	})();

	function fillPicObj(obj, img, desc) {
		obj.picName = img;
		obj.desc = desc;
	}

	if (srImg) fillPicObj(pics[0], srImg, `Save/Reload ${srloc}`);
	if (sysImg) fillPicObj(pics[1], sysImg, `System ${highlight}`);
	if (!loc.includes('Space')) {
		if (cabinetPlanetImg) fillPicObj(pics[2], cabinetPlanetImg, `${type} ${body}`);
		if (axesImg) fillPicObj(pics[3], axesImg, 'Coordinates');
	}

	const codeArray = new Array;
	for (const picObj of pics) {
		const pic = picObj.picName;
		const desc = picObj.desc;
		if (!pic || !desc) continue;
		const gallery = `<span style="display:block">${pic}|${desc}</span>`;
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
	const dest = typeElement.dataset.destNoauto;
	wikiCode(output, dest);
	pageData[dest] = type;		// setting this manually to avoid errors down the line. The auto function uses the provided output, which is not unique per option.
}

function bundleNumberStats() {
	numberStats(globalElements.input.dmgInput, 1);
	numberStats(globalElements.input.scanInput, 1);
	numberStats(globalElements.input.costInput);
	numberStats(globalElements.input.slotsInput);
}

function hideLocName() {
	const loc = pageData.location;
	const idArray = ['planetInput', 'moonInput', 'axesInput'];
	if (loc.includes('Space')) {
		for (const id of idArray) {
			const element = globalElements.input[id];
			hideInput(element, 'none');
			element.value = '';
			wikiCode(element);
			errorMessage(element);
		}
	} else {
		for (const id of idArray) {
			hideInput(globalElements.input[id], '');
		}
	}
}

function hideSrLocName() {
	const srLoc = pageData.srLoc;
	const srLocNameInput = globalElements.input.srInput;
	if (srLoc.includes('Space')) {
		hideInput(srLocNameInput, 'none');
		srLocNameInput.value = '';
		wikiCode(srLocNameInput);
	} else {
		hideInput(srLocNameInput, '');
	}
}

function galleryExplanationExternal() {
	return `There is a preferred order of pictures:
	<div class='is-flex is-justify-content-center'>
		<ol class='has-text-left'>
			<li>Discovery Menu</li>
			<li>Price Page</li>
			<li>Base Stats</li>
			<li>Minor Settlement/Sentinel Pillar</li>
			<li>Tool in Hand</li>
			<li>First Person View</li>
		</ol>
	</div>`
}

// album functions
function albumTypeExternal() {
	return 'Catalog';
}

function albumItemTypeExternal() {
	return pageData.type;
}

function albumOtherExternal() {

	// determine if MT is SMG for catalog
	function catalogMTType() {
		const type = pageData.type;
		const size = pageData.size;
		if (type == 'Royal' || type == 'Starter Pistol') return '';
		return size + ' -';
	}

	const output = `<br>{{Class|${pageData.class}}} - ${catalogMTType()} ${pageData.slots} Slots`
	return output;
}

function albumDescExternal() {
	const output = (() => {
		const axes = pageData.axes;
		const sentence = pageData.acquirement.replace('Save and reload', 'S/r');
		if (axes && !validateCoords(false)) return sentence.replace(pageData.axes, `(${pageData.axes})`);
		return sentence;
	})();
	return output;
}

function albumLinkGen() {
	const civ = shortenGHub(pageData.civShort);
	const type = pageData.type;

	const catalogName = (() => {
		if (civ == 'CalHub') return civ + ' Multi-Tool Catalog';
		const longType = (type == 'Standard') ? `${type} Multi-Tool` : type;
		return civ + ' Multi-Tool Catalog - ' + longType;
	})();

	const link = wikiLink + catalogName;
	return link;
}