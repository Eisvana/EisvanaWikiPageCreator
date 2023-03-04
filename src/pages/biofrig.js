function startupFunctions() {
	numberStats();
	locHubNr();
	locGalaxy();
	addInfo();
	albumFunctions();
}

const frigateElementFunctions = {
	nameInput: ['albumName(); appearance()'],
	costInput: ['numberStats(this)'],
	combatInput: ['numberStats(this)'],
	explorationInput: ['numberStats(this)'],
	industrialInput: ['numberStats(this)'],
	tradeInput: ['numberStats(this)'],
	fuelInput: ['numberStats(this)'],
	portalglyphsInput: ['locHubNr()', null, true],
	civ: ['locGalaxy(); addInfo(); appearance(); locHubNr()', null, true],
	mainColourInput: ['appearance()'],
	secColourInput: ['appearance()'],
	tentacleInput: ['appearance()'],
	researchTeam: ['addInfo()'],
	classInput: ['albumOther()'],
}
assignElementFunctions(frigateElementFunctions);

function locHubNr() {
	globalElements.output.HubNr.innerText = regNr(pageData.region);
}

// adds region to location sentence
function locGalaxy() {
	const civ = pageData.civShort;
	const text = HubGal(civ);
	wikiCode(text, 'locGalaxy');
}

function addInfo() {
	const researchteam = docByResearchteam('GHSH');
	const civShort = pageData.civShort;
	const civ = pageData.civilized;
	const catalogue = {
		GHub: () => civ.split(' ').slice(0, -1).join(' '),
		CalHub: () => civ,
		EisHub: () => civShort,
	}

	globalElements.output.addInfo.innerText = `[[${catalogue[civShort]()} Organic Frigate Catalog]]${researchteam}`;
}

function appearance() {
	const name = pageData.name;
	const colour1 = pageData.mainColour;
	const colour2 = pageData.secColour;
	const tentacles = pageData.tentacles;
	const appearance = globalElements.input.appearanceInput;

	if (!(colour1.trim() || colour2.trim() || tentacles.trim())) return;

	const mainColour = (() => {
		if (colour1.trim()) return `${enPrefix(colour1)} ${colour1.trim()}`;
		return '';
	})();

	const accentColour = (() => {
		if (colour2.trim()) return ` with ${colour2} accents`;
		return '';
	})();

	const output = `${name} is ${mainColour} organic frigate${accentColour} with ${tentacles}.`;
	appearance.value = output;
	wikiCode(appearance);
}

function albumOtherExternal() {
	return `{{Class|${pageData.class}}}`;
}

function albumItemTypeExternal() {
	return 'Organic Frigate Catalog';
}

function generateGalleryArray() {
	const array = [
		'',
		'Rear view of frigate',
		'Interaction screen',
		'System Page'
	];

	pageData.galleryArray = array;
}

function galleryExplanationExternal() {
	return `There is a preferred order of gallery pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Rear view of frigate</li>
			<li>Interaction screen</li>
			<li>System Page</li>
		</ol>
 	</div>`
}