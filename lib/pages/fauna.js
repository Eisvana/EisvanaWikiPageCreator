function startupFunctions() {
	genusDropdown();
	albumDropdown();
	hideOrgName();
	pageName();
	specialNotes();
	specialNotesTextFunc();
	genusProduces();
	addInfo();
	addInfoBullet();
	hideSecGenderProps();
	hideCreaturePrio();
	bundlePropFunctions();
	planetMoonSentence();
	hideAlbumEntry();
	albumFunctions();
	noLineBreak();
}

const creatureElements = {
	input: {
		gender: 'Gender',
	}
}
updateGlobalElements(creatureElements);

const creatureElementFunctions = {
	nameInput: ['pageName(); albumName()'],
	oldNameInput: ['hideOrgName(); pageName(); albumName()'],
	planetInput: ['planetMoonSentence()'],
	moonInput: ['planetMoonSentence()'],
	ecosystemInput: ['genusDropdown(); albumDropdown(); genusProduces()'],
	genusInput: ['genusProduces()'],
	civ: ['albumDropdown(); hideAlbumEntry();', null, true],
	notesInput: ['specialNotes(); specialNotesTextFunc()'],
	specialNotesInput: ['specialNotesTextFunc()'],
	catalogInput: ['addInfo(); addInfoBullet(); albumTitle(); hideAlbumEntry()'],
	researchTeam: ['addInfo()', null, true],
	genderInput: ['hideSecGenderProps(); hideCreaturePrio(); genderProps("gender", "gender2")'],
	gender2Input: ['hideSecGenderProps(); hideCreaturePrio(); genderProps("gender", "gender2")'],
	heightInput: ['genderProps("height", "height2"); albumOther(); numberError(this)'],
	weightInput: ['genderProps("weight", "weight2"); numberError(this)'],
	height2Input: ['genderProps("height", "height2"); albumOther(); numberError(this)'],
	weight2Input: ['genderProps("weight", "weight2"); numberError(this)'],
	gender: ['bundlePropFunctions(); albumOther()'],
	discoveredInput: ['albumDiscoverer()'],
	discoveredlinkInput: ['albumDiscoverer()'],
	dmInput: ['noLineBreak()'],
}
assignElementFunctions(creatureElementFunctions);

// sets genus dropdown
function genusDropdown() {
	const creatureData = getCreatureData();
	const ecosystem = pageData.ecosystem;
	const genera = Object.keys(creatureData.ecosystems[ecosystem])

	const commonNames = new Array;
	for (const genus of genera) {
		commonNames.push(`${genus} (${creatureData.ecosystems[ecosystem][genus].commonName})`);
	}

	setDropdownOptions(globalElements.input.genusInput, genera, commonNames);
	wikiCode(globalElements.input.genusInput);
}

// generates dropdowns for album names
function albumDropdown() {
	const creatureData = getCreatureData();
	// if civ is GHub, use GHEC instead. Otherwise use the Civ shortname
	const civ = (pageData.civShort == "GHub") ? "GHEC" : pageData.civShort;
	const ecosystem = pageData.ecosystem;
	const catalogInput = globalElements.input.catalogInput;
	const galaxy = pageData.galaxy;

	const albums = creatureData.catalogs[galaxy][ecosystem];
	const albumValues = [albums[0]];
	const albumTexts = [albums[0]];
	// ignore first index (empty option)
	for (let i = 1; i < albums.length; i++) {
		const text = `${civ} ${albums[i]}`;
		albumValues.push(`${text} Album`);
		albumTexts.push(text);
	}
	setDropdownOptions(catalogInput, albumValues, albumTexts);
	storeData(catalogInput);
}

// generates additional information sentence
function addInfo() {
	const outputElement = globalElements.output.addInfo;

	// only accept GHEC as researchteam and construct sentence based on that
	const chapter = docByResearchteam('GHEC');
	const catalog = pageData.catalog;

	if (!catalog) {
		outputElement.style.display = 'none';
		return;
	}
	outputElement.style.display = ''

	const output = '[[' + catalog + ']]' + chapter

	outputElement.innerText = `Featured in the ${output}`;
	addInfoBullet();
}

// generates name to use for wikilink
function pageName() {
	const newName = globalElements.input.nameInput.value;
	const orgName = globalElements.input.oldNameInput.value;
	const name = (() => {
		if (orgName) {
			return orgName;
		} else {
			return newName;
		}
	})();
	wikiCode(name, 'name');
	return name;
}

// sets produces parm value or dropdown
function genusProduces() {
	const genus = pageData.genus;
	const creatureData = getCreatureData();
	const ecosystems = Object.keys(creatureData.ecosystems);
	const producesElement = globalElements.input.producesInput;
	for (const ecosystem of ecosystems) {
		if (!Object.keys(creatureData.ecosystems[ecosystem]).includes(genus)) continue;

		const food = creatureData.ecosystems[ecosystem][genus].produces;
		setDropdownOptions(producesElement, food);

		if (food.length > 1) {
			hideInput(producesElement, '');
		} else {
			hideInput(producesElement, 'none');
		}
		wikiCode(producesElement);
	}
}

// hides weight and height of second gender if none is given or equal to first gender
function hideSecGenderProps() {
	const gen1 = pageData.gender;
	const gen2 = pageData.gender2;

	const gen2Weight = globalElements.input.weight2Input;
	const gen2Height = globalElements.input.height2Input;
	const gen2Input = globalElements.input.gender2Input;

	if (gen2 != '' && gen1 != gen2) {
		hideInput(gen2Weight, '');
		hideInput(gen2Height, '');
	} else {
		hideInput(gen2Weight, 'none');
		hideInput(gen2Height, 'none');
		gen2Weight.value = ''
		gen2Height.value = ''
		gen2Input.value = ''
		storeData(gen2Weight);
		storeData(gen2Height);
		storeData(gen2Input);
	}
}

// syncs notes value to the discovery menu notes input or makes visible for certain keywords
function specialNotes() {
	const notes = pageData.notes;
	const specialNotesElement = globalElements.input.specialNotesInput
	specialNotesElement.value = notes;
	if (notes == 'Evil' || notes == 'Sheds and regrows bones') {
		hideInput(specialNotesElement, '');
	} else {
		hideInput(specialNotesElement, 'none');
	}
	storeData(specialNotesElement);
}

// handles additional observations that don't have the additional observations text
function specialNotesTextFunc() {
	const notes = pageData.notes;
	const specialNotes = pageData.addObservation;
	const notesElement = globalElements.input.notesInput;
	const addObservationElement = globalElements.output.addObservation;
	wikiCode(notesElement, notesElement.dataset.destNoauto);
	if (!notes) {
		addObservationElement.innerText = "'''Additional Observations''': ";
		return;
	}
	const noteText = (() => {
		if (specialNotes == notes || specialNotes == '') {
			return "'''Additional Observations''': " + notes;
		} else {
			return specialNotes;
		}
	})();
	addObservationElement.innerText = noteText;
}

// shows or hides the creature priority radio buttons
function hideCreaturePrio() {
	const radio = globalElements.input.gender1;
	if (pageData.gender2) {
		hideInput(radio, '');
	} else {
		hideInput(radio, 'none');
	}
}

// get text from creature prio radio
function creaturePrio() {
	const genderRadios = globalElements.input.gender;
	for (const radio of genderRadios) {
		if (radio.checked) return radio.value;
	}
}

// provides creature height and weight formatting
function genderProps(property1Name, property2Name) {
	const prioritise = creaturePrio();
	const gender2 = pageData.gender2;
	const property1Value = pageData[property1Name];
	const property2Value = pageData[property2Name];

	// adds .0
	let property1Number, property2Number;
	if (property1Name != 'gender') {
		property1Number = parseFloat(property1Value) ? parseFloat(property1Value).toFixed(1) : '';
		property2Number = parseFloat(property2Value) ? parseFloat(property2Value).toFixed(1) : '';
	}

	const property1Data = property1Number ?? property1Value;
	const property2Data = property2Number ?? property2Value;
	pageData[property1Name] = property1Data;
	pageData[property2Name] = property2Data;

	const result = (() => {
		if (gender2) {
			if (property1Data == property2Data || !property2Data) {
				return property1Data;
			} else if (!property1Data) {
				return property2Data;
			} else {
				if (prioritise == 'gender1') {
					return property1Data + ' - ' + property2Data;
				} else {
					return property2Data + ' - ' + property1Data;
				}
			}
		} else {
			return property1Data;
		}
	})();

	globalElements.output[property1Name].innerText = result;
}

function bundlePropFunctions() {
	genderProps("height", "height2");
	genderProps("weight", "weight2");
	genderProps("gender", "gender2");
}

function hideAlbumEntry() {
	const displayState = { true: '', false: 'hidden' };
	const boolString = Boolean(pageData.catalog).toString();
	const display = displayState[boolString];
	globalElements.output.albumEntry.style.visibility = display;
	globalElements.output.albumActions.style.visibility = display;
}

// puts primary height into album entry
function albumOtherExternal() {
	const heights = [pageData.height, pageData.height2];
	const prio = creaturePrio();
	const index = (() => {
		const numString = extractNumber(prio);
		return parseInt(numString) - 1;
	})();
	const output = `(${heights[index]}m)`;
	return output;
}

function albumLinkGen() {
	const catalog = pageData.catalog;
	if (!catalog) return;
	const link = wikiLink + catalog;
	return link;
}

function albumTitle() {
	globalElements.output.album.innerText = pageData.catalog;
}

function albumCivExternal() {
	return '';
}

function noLineBreak() {
	const element = globalElements.input.dmInput;
	const dest = element.dataset.destNoauto;
	const value = element.value;
	const noBreak = value.replaceAll('\n', ' ');
	element.value = noBreak;

	wikiCode(element, dest);
}

function galleryExplanationExternal() {
	return `There is a preferred order of pictures:
	<div class='is-flex is-justify-content-center'>
		<ol class='has-text-left'>
			<li>Gender 1</li>
			<li>Gender 2</li>
			<li>Gender 1 scan</li>
			<li>Gender 2 scan</li>
			<li>Discovery Menu</li>
			<li>Planet/Moon DM</li>
			<li>System DM</li>
			<li>Galaxy Map</li>
		</ol>
	</div>`
}