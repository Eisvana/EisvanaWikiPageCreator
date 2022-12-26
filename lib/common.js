const regions = {
	GHub: {
		F9556C30: 'The Arm of Vezitinen',
		F9555C30: 'Canthian',
		F9555C31: 'Dexterf Sector',
		F9556C31: 'The Arm of Katteus',
		F9557C31: 'Nugsdor Adjunct',
		F9557C30: 'Uefert Nebula',
		F9557C2F: 'Widraik',
		F9556C2F: 'Airnaka Conflux',
		F9555C2F: 'Sivess Instability',
		FA556C30: 'Savenix Instability',
		F8556C30: 'Nonlopsi Instability'
	},
	CalHub: {
		F9556C30: 'Uisaor Spur',
		F9555C30: 'The Arm of Kiffeyn',
		F9555C31: 'Ilongl Cloud',
		F9556C31: 'The Arm of Taticale',
		F9557C31: 'Egerap Anomaly',
		F9557C30: 'Wakestones Expanse',
		F9557C2F: 'Erhahn Fringe',
		F9556C2F: 'Imrikians Terminus',
		F9555C2F: 'Imedeili',
		FA556C30: 'Kovasu Adjunct',
		F8556C30: 'Lossians Boundary'
	},
	EisHub: {
		F9556C30: 'Riwala',
		F9555C30: 'Omskio Instability',
		F9555C31: 'Marcki',
		F9556C31: 'Anolamga Spur',
		F9557C31: 'Sea of Zonyayp',
		F9557C30: 'Rayuyar Band',
		F9557C2F: 'Umaton Instability',
		F9556C2F: 'Exramb Adjunct',
		F9555C2F: 'Ologowe Fringe',
		FA556C30: 'Yatrifex',
		FA555C30: 'Yeiada Sector',
		FA555C31: 'Iptrevs Fringe',
		FA556C31: 'Yamiraith Sector',
		FA557C31: 'Wedragi Spur',
		FA557C30: 'Rezhensk',
		FA557C2F: 'Sobert Cloud',
		FA556C2F: 'Umtats Anomaly',
		FA555C2F: 'Tavill',
		F8556C30: 'Qangew Expanse',
		F8555C30: 'Nijhwal Boundary',
		F8555C31: 'Usband Cluster',
		F8556C31: 'Ejongaa Anomaly',
		F8557C31: 'Zahrel Expanse',
		F8557C30: 'The Arm of Fupand',
		F8557C2F: 'Cuculta',
		F8556C2F: 'Etmarao',
		F8555C2F: 'Otreie Void'
	}
}

const versions = [
	'Waypoint',
	'Endurance',
	'Outlaws',
	'SentinelUp',
	'Frontiers',
	'Prisms',
	'Expeditions',
	'Companions',
	'NextGen',
	'Origins',
	'Desolation',
	'Crossplay',
	'ExoMech',
	'Living Ship',
	'Synthesis',
	'Beyond',
	'Visions',
	'Abyss',
	'NEXT',
	'Atlas Rises',
	'Pathfinder',
	'Foundation',
	'Release',
]

const validPortalKeys = '0123456789ABCDEF';
const vowels = 'aeiou';

let uploadShown = false;

const pageData = new Object;

// this object stores elements that are consistent across pages. It is filled automatically on page load, combined from other objects like commonElements
const globalElements = {
	input: {},
	output: {},
};

// define IDs and names for elements that are consistent across multiple pages
const commonElements = {
	input: {
		version: 'versionInput',
		civ: 'civInput',
		fileInput: 'fileInput',
		fileUpload: 'fileUpload',
		portalglyphsInput: 'portalglyphsInput',
		researchTeam: 'researchteamInput',
		galleryUpload: 'galleryUpload',
	},
	output: {
		portalglyphButtons: 'portalglyphButtons',
		galleryItems: 'galleryItems',
		galleryCode: 'galleryCode',
		explanation: 'explanation',
		explanationHeading: 'explanationHeading',
		explanationContent: 'explanationContent',
		explanationLink: 'explanationLink',
		explanationImg: 'explanationImg',
		fullArticle: 'fullArticle',
		actions: 'actions',
		albumActions: 'albumActions',
		albumEntry: 'albumEntry',
		footer: 'footer',
	}
}

function addInputs() {
	const inputs = document.querySelectorAll('input, select, textarea');
	const inputElements = Object.values(commonElements.input);
	for (const input of inputs) {
		if (inputElements.includes(input.id)) continue;
		commonElements.input[input.id] = input.id;
	}
}

function addOutputs() {
	const outputs = document.getElementsByTagName('output');
	const outputElements = Object.values(commonElements.output);
	for (const output of outputs) {
		if (outputElements.includes(output.name) || outputElements.includes(output.id)) continue;
		const keyVal = output.name || output.id;
		commonElements.output[keyVal] = keyVal;
	}
}

function updateGlobalElements(object) {
	for (const section in object) {
		for (const element in object[section]) {
			const dest = object[section][element];
			const destElements = Array.from(document.getElementsByName(dest));
			const dataDestElements = document.querySelectorAll(`[data-name=${dest}]`)
			for (const element of dataDestElements) {
				destElements.push(element);
			}
			const destElement = document.getElementById(dest);
			if (destElements.length) {
				object[section][element] = destElements;
			} else {
				object[section][element] = destElement;
			}
		}
	}
	for (const section in object) {
		for (const element in object[section]) {
			globalElements[section][element] = object[section][element];
		}
	}
}
addInputs();
addOutputs();
updateGlobalElements(commonElements);

const elementFunctions = {
	researchTeam: ['researchTeam(); docBy()'],
	civ: ['civ()'],
	planetInput: ['planetMoon()'],
	moonInput: ['planetMoon()'],
	portalglyphsInput: ['glyphInputOnChange(this)'],
	discoveredInput: ['hideDiscoverer("discoveredInput", "discoveredlinkInput"); docBy()'],
	discoveredlinkInput: ['hideDiscoverer("discoveredlinkInput", "discoveredInput"); docBy()'],
	docbyInput: ['docBy()'],
	axesInput: ['validateCoords()', 'onchange'],
}
function assignElementFunctions(object) {
	for (const elementId in object) {
		if (!globalElements.input[elementId]) continue;
		const element = globalElements.input[elementId];
		const functionName = object[elementId][0];
		assignFunction(element, functionName, object[elementId][1], object[elementId][2]);
	}
}
assignElementFunctions(elementFunctions);

// assigns alt attributes to tooltip images
(() => {
	const imgs = document.querySelectorAll('.tooltip img');
	for (const img of imgs) {
		img.alt = 'Help';
	}
})();

const inputs = document.querySelectorAll('[data-dest]');
const checkboxes = document.querySelectorAll('[data-dest-checkbox]');

function startUp() {
	autoShow();
	versionDropdown();
	uploadShown = true;
	galleryUploadShown = true;
	showAll();
	uploadShown = false;
	galleryUploadShown = false;
}

function versionDropdown() {
	const texts = structuredClone(versions);
	const index = texts.indexOf('SentinelUp');
	texts.splice(index, 1, 'Sentinel');
	setDropdownOptions(globalElements.input.version, versions, texts);
}

// take element and array of values and array of corresponding text.
function setDropdownOptions(element, values, texts = values) {
	const dropdown = new Array;
	for (i = 0; i < values.length; i++) {
		const value = values[i];
		const text = texts[i];
		const dropdownOption = document.createElement('option');
		dropdownOption.value = value;
		dropdownOption.innerText = text;
		dropdown.push(dropdownOption.outerHTML);
	}
	const dropdownHTML = dropdown.join('');
	// dont't update the dropdown if content is identical
	if (element.innerHTML != dropdownHTML) element.innerHTML = dropdownHTML;
}

function assignFunction(element, functionName, listener = null, invert = false) {
	const inputType = element.tagName.toLowerCase()
	const changeType = listener ?? (() => {
		if (inputType == 'select') {
			return 'onchange';
		} else {
			return 'oninput';
		}
	})();
	if (element.hasAttribute(changeType)) {
		if (invert) {
			element.setAttribute(changeType, `${element.getAttribute(changeType)}; ${functionName}`);
		} else {
			element.setAttribute(changeType, `${functionName}; ${element.getAttribute(changeType)}`);
		}
	} else {
		element.setAttribute(changeType, functionName);
	}
}

function autoShow() {
	for (const input of inputs) {
		assignFunction(input, 'wikiCode(this)');
	}

	for (const checkbox of checkboxes) {
		assignFunction(checkbox, 'checkboxWikiCode(this)', 'onchange');
	}
}

function showAll() {
	for (const input of inputs) {
		wikiCode(input);
	}
	for (const checkbox of checkboxes) {
		checkboxWikiCode(checkbox);
	}
	civ();
	image(globalElements.input.fileUpload);
	galleryUpload();
	try { glyphInputOnChange(globalElements.input.portalglyphsInput) } catch (error) { /*do nothing*/ };
	try { researchTeam() } catch (error) { /*do nothing*/ };
	try { planetMoonSentence() } catch (error) { /*do nothing*/ };
	hideDiscoverer();
	try { startupFunctions() } catch (error) { /*do nothing*/ };
}

function wikiCode(element) {
	const dest = element.dataset.dest;
	const destElements = Array.from(document.getElementsByName(dest));
	if (destElements.length == 0) destElements.push(document.getElementById(dest));
	const value = sanitiseString(element.value);
	pageData[dest] = value;
	for (const destElement of destElements) {
		destElement.innerText = value;
	}
}

function checkboxWikiCode(element) {
	const dest = element.dataset.destCheckbox;
	const destElement = document.getElementById(dest);
	const checked = element.value;
	const unchecked = element.dataset.checkboxUnchecked;
	if (element.checked) {
		destElement.innerText = checked;
		pageData[dest] = checked;
	} else {
		destElement.innerText = unchecked;
		pageData[dest] = unchecked;
	}
}

function civ() {
	const input = globalElements.input.civ.value;
	const civData = new Object;
	switch (input) {
		case 'GHub':
			civData.galaxy = 'Euclid';
			civData.civilized = 'Galactic Hub Project';
			civData.civStub = 'GHub';
			break;

		case 'CalHub':
			civData.galaxy = 'Calypso';
			civData.civilized = 'Galactic Hub Calypso';
			civData.civStub = 'GHub Calypso';
			break;

		case 'EisHub':
			civData.galaxy = 'Eissentam';
			civData.civilized = 'Galactic Hub Eissentam';
			civData.civStub = 'GHub Eissentam';
			break;
	}

	pageData.civShort = input;
	for (const key in civData) {
		pageData[key] = civData[key];
		globalElements.output[key].innerText = pageData[key];
	}
	updateCiv();
}

function updateCiv() {
	researchTeamDropdown();
	glyphRegion(pageData.portalglyphs)
	researchTeam();
	docBy();
}

// shows an explanation modal and fills text
function explanation(heading, text, img) {
	if (img) {
		globalElements.output.explanationLink.style.display = '';
	} else {
		globalElements.output.explanationLink.style.display = 'none';
	}
	globalElements.output.explanationHeading.innerText = heading;
	globalElements.output.explanationContent.innerHTML = text;
	globalElements.output.explanationLink.href = img;
	globalElements.output.explanationImg.src = '';
	globalElements.output.explanationImg.src = img ?? 'README.md';	// read any random file, just don't throw an error please
	globalElements.output.explanation.showModal();
}

function sanitiseString(input) {
	const doubleWikiMarkup = ['{', '}', '[', ']'];
	const tempReplacement = '<><><>';
	const linkStartReplacement = '####';
	const linkEndReplacement = '****';

	let text = input;

	while (text.includes('[http')) {
		const preString = "[http";
		const searchString = "]";
		const preIndex = text.indexOf(preString);
		const searchIndex = text.indexOf(searchString, preIndex);

		const textArr = Array.from(text);
		if (!(searchIndex < 0)) textArr.splice(searchIndex + 1, 0, linkEndReplacement);
		text = textArr.join('').replace('[http', linkStartReplacement);
	}

	for (const markup of doubleWikiMarkup) {
		text = text.replaceAll(`${markup}${markup}`, tempReplacement)
			.replaceAll(markup, '')
			.replaceAll(tempReplacement, `${markup}${markup}`);
	}
	text = text.replaceAll(linkStartReplacement, '[http')
		.replaceAll(linkEndReplacement, ']')
		.trim();
	return text;
}

function image(element) {
	const filename = element.files[0]?.name;
	if (!filename) return;
	globalElements.input.fileInput.value = sanitiseString(filename);
	globalElements.output.image.innerText = sanitiseString(filename);
	// this section handles an automatic notice about Special:Upload, since this is a big source of confusion for users
	if (uploadShown) return;	// ignore following code if we already alerted user about Special:Upload
	explanation('Upload your picture to the wiki!', `Don't forget to upload your picture to the wiki on <a href="https://nomanssky.fandom.com/Special:Upload" target="_blank" rel="noopener noreferrer">Special:Upload</a>.
		The upload button only auto-filled the image name into the code, it is not automatically uploaded to the wiki.<br><br>
		You can access this popup at any time by clicking on the "?" next to the main image upload button.`);
	uploadShown = true;
}

function toggleSection(sectionName, button) {
	const elements = document.querySelectorAll(`[data-section=${sectionName}]`);
	for (const element of elements) {
		if (element.style.display) {
			element.style.display = '';
			button.innerText = 'Hide';
		} else {
			element.style.display = 'none';
			button.innerText = 'Show';
		}
	}
}

// generates researchteam dropdown
function researchTeamDropdown() {
	const civ = pageData.civShort;
	const inputElement = globalElements.input.researchTeam;
	const prevSelect = inputElement.value;
	const teams = ['', 'GHGS', 'GHEC', 'GHSH', 'GHDF', 'GHBG', 'GHSL', 'GHTD', 'HBS'];
	inputElement.innerHTML = '';

	switch (civ) {
		case "CalHub":
			teams.push('CalHub Archivists');
			break;

		case "EisHub":
			teams.push('EisHub Scribes', 'EPC', 'The Eissentimes Press');
			break;
	}
	setDropdownOptions(inputElement, teams);
	inputElement.value = prevSelect;
	researchTeam();
}

// adds generic civ researchteam if none is given and expands some civ specific teams
function researchTeam() {
	const researchteam_input = globalElements.input.researchTeam;
	const researchteamValue = researchteam_input.value;
	const dest = researchteam_input.dataset.destNoauto;
	const civ = pageData.civilized;
	const researchteam = (() => {
		if (researchteamValue.split(' ').length == 2) {
			return civ + ' ' + researchteamValue.split(' ')[1];
		} else if (researchteamValue == '' && pageData.pageType != 'Base' && pageData.pageType != 'Racetrack') {
			return civ;
		} else {
			return researchteamValue;
		}
	})();
	pageData.researchTeam = researchteamValue;
	document.getElementById(dest).innerText = researchteam;
}

// adds documented by information if documenter != discoverer
function docBy() {
	const docByElement = globalElements.input.docbyInput;
	const documenter = sanitiseString(docByElement.value);
	const discoverer = pageData.discovered ?? pageData.builder;
	const discoveredlink = pageData.discoveredlink ?? pageData.builderlink;
	const dest = docByElement.dataset.destNoauto;
	const chapter = displayResearch();
	const formattedDocumenter = formatName(documenter);

	if (documenter != '' && documenter != discoverer && documenter != discoveredlink) {
		globalElements.output[dest].style.display = '';
		globalElements.output[dest].innerText = `Documented by ${chapter} ${formattedDocumenter}`;
	} else {
		globalElements.output[dest].style.display = 'none';
	}
	addInfoBullet();
}

// adjusts the researchteam for display in a sentence
function displayResearch() {
	let chapter = pageData.researchTeam;
	if (!chapter) return chapter;

	const teamIDs = globalElements.input.researchTeam.children;
	const teams = new Array;
	for (const team of teamIDs) {
		teams.push(team.value);
	}
	const pos = teams.indexOf(chapter);

	if (pos < 4) {
		chapter = `[[${chapter}]] researcher`;
	} else if (chapter.includes('Scribe')) {
		chapter = 'EisHub [[Galactic Hub Eissentam Scribes|Scribe]]';
	} else if (chapter.includes('Archivist')) {
		chapter = 'CalHub [[Galactic Hub Calypso Archivists|Archivist]]';
	} else {
		chapter = `[[${chapter}]] member`;
	}
	return chapter;
}

// formats a name to conform to wiki standards. Plain name = italicised, link = no formatting
function formatName(documenter) {
	if (documenter == '') return documenter;

	const documented = (() => {
		if (documenter.includes('[') || documenter.includes('{')) {
			return documenter;
		} else {
			return `''${documenter}''`;
		}
	})();
	return documented
}

// hide discoveredlink input if discovered is populated and vice versa
function hideDiscoverer(keepId = null, removeId = null) {
	if (!keepId && !removeId) {			// show everything if no inputs are given
		const elements = document.querySelectorAll('[oninput*="hideDiscoverer"], [onchange*="hideDiscoverer"]')
		for (const element of elements) {
			const inputCell = element.closest('.tableCell')
			hideInput(inputCell, '');
			hideInput(inputCell.previousElementSibling, '');
		}
		return;
	}

	const keepInput = document.getElementById(keepId);
	const removeInput = document.getElementById(removeId);
	const removeInputCell = removeInput.parentElement;
	const removeLabelCell = removeInputCell.previousElementSibling;

	const showStatus = (() => {
		if (keepInput.value) {
			return 'none';	// remove
		} else {
			return '';		// keep all
		}
	})();
	removeInputCell.style.display = showStatus;
	removeLabelCell.style.display = showStatus;
	removeInput.value = '';
	wikiCode(removeInput);
}

// enables bulletpoint content if more than one sentence
function addInfoBullet() {
	const elements = document.querySelectorAll('[data-add-info]');
	const lines = new Array;
	for (const element of elements) {
		if (element.nextElementSibling.style.display == '' && element.nextElementSibling.innerText != '') lines.push(element);
	}

	for (const element of elements) {
		element.innerHTML = '';
	}

	for (const line of lines) {
		if (lines.length > 1) {
			const content = line.dataset.addInfo;
			line.innerHTML = content;
		} else {
			line.innerHTML = '';
		}
	}
}

function errorMessage(element, msg = null) {
	element.parentElement?.querySelector('.error')?.remove();
	element.style.backgroundColor = '';
	element.parentElement.previousElementSibling.style.alignItems = '';
	if (!msg) return;
	element.style.backgroundColor = 'red';
	const div = document.createElement('div');
	div.innerHTML = msg;
	div.className = 'error';
	element.parentElement.appendChild(div);
	element.parentElement.previousElementSibling.style.alignItems = 'baseline';
}

function validateCoords() {
	const element = globalElements.input.axesInput;
	const axes = element.value;
	if (!axes) {
		errorMessage(element);
		return;
	}
	const axesComponents = axes.split(', ');		// ['+xx.xx', '-xx.xx']
	if (axesComponents.length == 1) {
		errorMessage(element, 'Missing comma between coords or missing space between comma and second coord set');
		return;
	}
	if (!axesComponents[0].includes('.') || !axesComponents[1].includes('.')) {
		errorMessage(element, 'missing decimal point');
		return;
	}
	const axesValues = new Array;		// ['+xx', 'xx', '-xx', 'xx']
	for (const axesComponent of axesComponents) {
		const axesNumbers = axesComponent.split('.');	// ['+xx', 'xx']
		for (const axesNumber of axesNumbers) {
			axesValues.push(axesNumber);
		}
	}

	for (const value of axesValues) {
		if (/^\d+$/.test(Math.abs(value))) continue;	// regex checks if string only contains numbers. Source: https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
		errorMessage(element, 'Coordinates don\'t have letters');
		return;
	}

	if (axesValues.join().includes(' ')) {
		errorMessage(element, 'Too many empty spaces');
		return;
	}

	if (!(['+', '-'].includes(axesValues[0].substring(0, 1)) && ['+', '-'].includes(axesValues[2].substring(0, 1)))) {
		errorMessage(element, '+/- prefix required');
		return;
	}

	// removes +/- prefixes: ['xx', 'xx', 'xx', 'xx']
	const axesNumbers = new Array;
	for (let i = 0; i < axesValues.length; i++) {
		const value = axesValues[i];
		// directly pushes odd indexes to the new array (1, 3) since they don't have +/- prefixes
		if (i % 2 != 0) {
			axesNumbers.push(value);
			continue;
		}
		const absValue = Math.abs(parseInt(value)).toString();
		axesNumbers.push(absValue);
	}

	if (!(axesNumbers[1].length == 2 && axesNumbers[3].length == 2 && axesNumbers[0].length >= 1 && axesNumbers[0].length <= 3 && axesNumbers[2].length >= 1 && axesNumbers[2].length <= 3)) {
		errorMessage(element, 'Wrong coordinate format');
		return;
	}
	errorMessage(element);
}

// hides an input cell and its label cell. Takes a second argument of a CSS display value (for example '' or 'none')
function hideInput(element, type = null) {
	const inputCell = element.closest('.tableCell')
	const labelCell = inputCell.previousElementSibling;
	const inputRow = [labelCell, inputCell];

	for (const cell of inputRow) {
		if (cell.style.display) {
			cell.style.display = type ?? '';
		} else {
			cell.style.display = type ?? 'none';
		}
	}
}

function enPrefix(text) {
	const firstLetter = text.toLowerCase().substring(0, 1);
	if (vowels.includes(firstLetter)) {
		return 'an';
	} else {
		return 'a';
	}
}