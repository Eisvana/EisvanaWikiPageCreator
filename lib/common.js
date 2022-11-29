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
const vowels = 'AEIOUaeiou';

let uploadShown = false;

const pageData = new Object;

// define IDs for elements that are consistent across multiple pages
const globalElements = {
	input: {
		version: 'versionInput',
		civ: 'civInput',
		fileInput: 'fileInput',
		fileUpload: 'fileUpload',
		portalglyphsInput: 'portalglyphsInput',
		researchteamInput: 'researchteamInput',
		galleryUpload: 'galleryUpload',
	},
	output: {
		civStub: 'civStub',
		civilized: 'civilized',
		galaxy: 'galaxy',
		region: 'region',
		image: 'image',
		portalglyphButtons: 'portalglyphButtons',
		portalglyphs: 'portalglyphs',
		researchteam: 'researchteam',
		galleryItems: 'galleryItems',
		galleryCode: 'galleryCode',
		bulletpoint: 'bulletpoint',
		explanation: 'explanation',
		explanationHeading: 'explanationHeading',
		explanationContent: 'explanationContent',
		explanationLink: 'explanationLink',
		explanationImg: 'explanationImg',
		fullArticle: 'fullArticle',
		actions: 'actions',
		footer: 'footer',
	}
}

for (const section in globalElements) {
	for (const element in globalElements[section]) {
		const dest = globalElements[section][element];
		const destElements = Array.from(document.getElementsByName(dest));
		const destElement = document.getElementById(dest)
		if (destElements.length) {
			globalElements[section][element] = destElements;
		} else {
			globalElements[section][element] = destElement;
		}
	}
}

const inputs = document.querySelectorAll('[data-dest]');
const checkboxes = document.querySelectorAll('[data-dest-checkbox]');

function versionDropdown() {
	const texts = structuredClone(versions);
	const index = texts.indexOf('SentinelUp');
	texts.splice(index, 1, 'Sentinel');
	setDropdownOptions(globalElements.input.version, versions, texts);
}

// take element and array of values and array of corresponding text.
function setDropdownOptions(element, values, texts = values) {
	element.innerHTML = '';		// clear dropdown items
	for (i = 0; i < values.length; i++) {
		const value = values[i];
		const text = texts[i];
		const dropdownOption = document.createElement('option');
		dropdownOption.value = value;
		dropdownOption.innerText = text;
		element.appendChild(dropdownOption);
	}
}

function startUp() {
	autoShowAll();
	versionDropdown();
	researchTeamDropdown();
	for (const input of inputs) {
		if (input.value) {
			showAll();
			break;
		}
	}
}

function autoShowAll() {
	for (const input of inputs) {
		if (input.hasAttribute('oninput')) {
			input.setAttribute('oninput', input.getAttribute('oninput') + '; wikiCode(this)');
		} else {
			input.setAttribute('oninput', 'wikiCode(this)');
		}
	}
	for (const checkbox of checkboxes) {
		if (checkbox.hasAttribute('onchange')) {
			checkbox.setAttribute('onchange', checkbox.getAttribute('onchange') + '; checkboxWikiCode(this)');
		} else {
			checkbox.setAttribute('onchange', 'checkboxWikiCode(this)');
		}

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
	glyphInputOnChange(globalElements.input.portalglyphsInput)
	researchTeam();
}

function wikiCode(element) {
	const dest = element.getAttribute('data-dest')
	const destElements = Array.from(document.getElementsByName(dest));
	if (destElements.length == 0) destElements.push(document.getElementById(dest));
	const value = sanitiseString(element.value);
	pageData[dest] = value;
	for (const destElement of destElements) {
		destElement.innerText = value;
	}
}

function checkboxWikiCode(element) {
	const dest = element.getAttribute('data-dest-checkbox');
	const destElement = document.getElementById(dest);
	const checked = element.value;
	const unchecked = element.getAttribute('data-checkbox-unchecked');
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

	for (const key in civData) {
		pageData[key] = civData[key];
		globalElements.output[key].innerText = pageData[key];
	}
	updateCiv();
}

function updateCiv() {
	researchTeamDropdown();
	glyphRegion(pageData.portalglyphs)
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
	globalElements.output.explanationImg.src = img;
	globalElements.output.explanation.showModal();
}

function sanitiseString(input) {
	const doubleWikiMarkup = ['{', '}', '[', ']'];
	const tempReplacement = '<><><>'
	const linkStartReplacement = '####'
	const linkEndReplacement = '****'

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
	globalElements.input.fileInput.value = filename;
	globalElements.output.image.innerText = filename;
	// this section handles an automatic notice about Special:Upload, since this is a big source of confusion for users
	if (uploadShown) return;	// ignore following code if we already alerted user about Special:Upload
	globalElements.input.fileInput?.parentElement?.previousElementSibling?.querySelector('.tooltip')?.click();		// selects adjacent label cell and clicks its tooltip span element to bring up the tooltip
	uploadShown = true;
}

function toggleSection(sectionName, button) {
	const elements = document.getElementsByName(sectionName);
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
	const civ = globalElements.input.civ.value;
	const inputElement = globalElements.input.researchteamInput;
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
	const researchteam_input = globalElements.input.researchteamInput;
	const researchteamValue = researchteam_input.value;
	const dest = researchteam_input.getAttribute('data-dest-noauto');
	const civ = pageData.civilized;
	let researchteam;
	if (researchteamValue.split(' ').length == 2) {
		researchteam = civ + ' ' + researchteamValue.split(' ')[1];
	} else if (researchteamValue == '' && pageData.pageType != 'Base') {
		researchteam = civ;
	} else {
		researchteam = researchteamValue;
	}

	pageData.researchTeam = researchteam;
	document.getElementById(dest).innerText = researchteam;
}

// enables bulletpoint content if more than one sentence
function addInfoBullet() {
	const elements = globalElements.output.bulletpoint;
	const lines = new Array;
	for (const element of elements) {
		if (element.nextElementSibling.style.display == '' && element.nextElementSibling.innerText != '') lines.push(element);
	}
	for (const line of lines) {
		if (lines.length > 1) {
			line.style.display = '';
		} else {
			line.style.display = 'none';
		}
	}
}

function hideDiscoverer(raw, link) {
	const discoveredInput = document.getElementById(raw)
	const discoveredlinkInput = document.getElementById(link)
	if (discoveredlinkInput.value == '') {
		discoveredInput.parentElement.parentElement.style.display = ''
	} else {
		discoveredInput.parentElement.parentElement.style.display = 'None'
	}
	if (discoveredInput.value == '') {
		discoveredlinkInput.parentElement.parentElement.style.display = ''
	} else {
		discoveredlinkInput.parentElement.parentElement.style.display = 'None'
	}
}

// formats a name to conform to wiki standards. Plain name = italicised, link = no formatting
function formatName(documenter) {
	if (documenter == '') return documenter;

	let documented;
	if (documenter.includes('[') || documenter.includes('{')) {
		documented = documenter
	} else {
		documented = "''" + documenter + "''"
	}
	return documented
}

// adjusts the researchteam for display in a sentence
function displayResearch(researchteam_inputId) {
	let chapter = document.getElementById(researchteam_inputId).value;
	if (chapter == '') return chapter;

	const teamIDs = document.getElementById(researchteam_inputId).childNodes;
	const teams = [];
	for (const team of teamIDs) {
		teams.push(team.value);
	}
	const pos = teams.indexOf(chapter);

	if (pos < 4) {
		chapter = '[[' + chapter + ']] researcher'
	} else if (chapter.includes('Scribe')) {
		chapter = 'EisHub [[Galactic Hub Eissentam Scribes|Scribe]]'
	} else if (chapter.includes('Archivist')) {
		chapter = 'CalHub [[Galactic Hub Calypso Archivists|Archivist]]'
	} else {
		chapter = '[[' + chapter + ']] member'
	}
	return chapter
}

// adds documented by information if documenter != discoverer
function docBy(codeId, inputId, discovered_inputId, discoveredlink_inputId, researchteam_inputId) {
	let documenter = document.getElementById(inputId).value;
	let discoverer = document.getElementById(discovered_inputId).value;
	let discoveredlink = document.getElementById(discoveredlink_inputId).value;
	let chapter = displayResearch(researchteam_inputId);
	documenter = formatName(documenter);

	if (documenter != '' && documenter != discoverer && documenter != discoveredlink) {
		document.getElementById(codeId).style.display = '';
		setOutput(codeId, `Documented by ${chapter} ${documenter}`)
	} else {
		document.getElementById(codeId).style.display = 'none';
	}
}