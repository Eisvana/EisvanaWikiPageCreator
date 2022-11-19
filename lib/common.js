const GHubRegions = {
	'F9556C30': 'The Arm of Vezitinen',
	'F9555C30': 'Canthian',
	'F9555C31': 'Dexterf Sector',
	'F9556C31': 'The Arm of Katteus',
	'F9557C31': 'Nugsdor Adjunct',
	'F9557C30': 'Uefert Nebula',
	'F9557C2F': 'Widraik',
	'F9556C2F': 'Airnaka Conflux',
	'F9555C2F': 'Sivess Instability',
	'FA556C30': 'Savenix Instability',
	'F8556C30': 'Nonlopsi Instability'
};
const CalHubRegions = {
	'F9556C30': 'Uisaor Spur',
	'F9555C30': 'The Arm of Kiffeyn',
	'F9555C31': 'Ilongl Cloud',
	'F9556C31': 'The Arm of Taticale',
	'F9557C31': 'Egerap Anomaly',
	'F9557C30': 'Wakestones Expanse',
	'F9557C2F': 'Erhahn Fringe',
	'F9556C2F': 'Imrikians Terminus',
	'F9555C2F': 'Imedeili',
	'FA556C30': 'Kovasu Adjunct',
	'F8556C30': 'Lossians Boundary'
};
const EisHubRegions = {
	'F9556C30': 'Riwala',
	'F9555C30': 'Omskio Instability',
	'F9555C31': 'Marcki',
	'F9556C31': 'Anolamga Spur',
	'F9557C31': 'Sea of Zonyayp',
	'F9557C30': 'Rayuyar Band',
	'F9557C2F': 'Umaton Instability',
	'F9556C2F': 'Exramb Adjunct',
	'F9555C2F': 'Ologowe Fringe',
	'FA556C30': 'Yatrifex',
	'FA555C30': 'Yeiada Sector',
	'FA555C31': 'Iptrevs Fringe',
	'FA556C31': 'Yamiraith Sector',
	'FA557C31': 'Wedragi Spur',
	'FA557C30': 'Rezhensk',
	'FA557C2F': 'Sobert Cloud',
	'FA556C2F': 'Umtats Anomaly',
	'FA555C2F': 'Tavill',
	'F8556C30': 'Qangew Expanse',
	'F8555C30': 'Nijhwal Boundary',
	'F8555C31': 'Usband Cluster',
	'F8556C31': 'Ejongaa Anomaly',
	'F8557C31': 'Zahrel Expanse',
	'F8557C30': 'The Arm of Fupand',
	'F8557C2F': 'Cuculta',
	'F8556C2F': 'Etmarao',
	'F8555C2F': 'Otreie Void'
};

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

const civData = new Object;


// define IDs for elements that are consistent across multiple pages
const globalElements = {
	input: {
		version: 'versionInput',
		civ: 'civInput',
	},
	output: {
		civStub: 'civStub',
		civilized: 'civilized',
		galaxy: 'galaxy',
	}
}

for (const section in globalElements) {
	for (const element in globalElements[section]) {
		globalElements[section][element] = document.getElementById(globalElements[section][element]);
	}
}

const inputs = document.querySelectorAll('[data-dest]');

function versionDropdown() {
	const texts = structuredClone(versions);
	const index = texts.indexOf('SentinelUp');
	texts.splice(index, 1, 'Sentinel');
	addDropdownOptions(globalElements.input.version, versions, texts);
}

// take element and array of values and array of corresponding text. First item will be at the bottom.
function addDropdownOptions(element, values, texts = values) {
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
}

function showAll() {
	for (const input of inputs) {
		wikiCode(input);
	}
}

function wikiCode(element) {
	const dest = element.getAttribute('data-dest')
	const destElements = document.getElementsByName(dest);
	if (destElements.length == 0) destElements.push(document.getElementById(dest));

	for (const destElement of destElements) {
		destElement.innerText = element.value;
	}
}

function civ() {
	const input = globalElements.input.civ.value;
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
		globalElements.output[key].innerText = civData[key];
	}
}