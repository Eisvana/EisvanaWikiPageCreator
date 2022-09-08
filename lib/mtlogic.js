const GHubHuburbRegions = {
	'FA555C30': 'Wekeram Conflux',
	'FA555C31': 'Ahomas Fringe',
	'FA556C31': 'Nudryorob Fringe',
	'FA557C31': 'Urzews Instability',
	'FA557C30': 'Ercays',
	'FA557C2F': 'Dahiloci Conflux',
	'FA556C2F': 'Rapphosu',
	'FA555C2F': 'Kemurrim Expanse',
	'F8555C30': 'Ardarea Sector',
	'F8555C31': 'Cetrocho Spur',
	'F8556C31': 'Guitat Cloud',
	'F8557C31': 'Unceto Cloud',
	'F8557C30': 'Yamurab Instability',
	'F8557C2F': 'Tenavata Terminus',
	'F8556C2F': 'Menacaro',
	'F8555C2F': 'Ziessuw Mass'
};
// GHub has additional ship and MT hunting grounds
for (let regionCode in GHubHuburbRegions) {
	GHubRegions[regionCode] = GHubHuburbRegions[regionCode];
};

// adds region to location sentence
function locGalaxy(civ, codeId) {
	const hub = document.getElementById(civ).value
	let output;
	switch (hub) {
		case "GHub":
			output = '[[Galactic Hub]]'
			break;

		case "CalHub":
			output = '[[Galactic Hub Calypso]], in the [[Calypso]] [[galaxy]]'
			break;

		case "EisHub":
			output = '[[Galactic Hub Eissentam]], in the [[Eissentam]] [[galaxy]]'
			break;
	}
	setOutput(codeId, output)
}

// constructs the acquirement sentence
function acquirement(location_inputId, planet_inputId, moon_inputId, axes_inputId, sr_inputId, srloc_inputId, codeId) {
	const srloc = document.getElementById(srloc_inputId).value.toLowerCase()	// s/r location (for example planet/moon/space station)
	const sr = document.getElementById(sr_inputId).value						// name of the s/r location (for example a planetname)
	const planet = document.getElementById(planet_inputId).value				// planet name of the MT
	const moon = document.getElementById(moon_inputId).value					// moon name of the MT
	const coords = document.getElementById(axes_inputId).value					// coords of the MT
	const loc = document.getElementById(location_inputId).value.toLowerCase()	// location type of the MT (for example space station/settlement/sentinel pillar)
	let instructions, savereload;
	function planetMoon(planet, moon) {
		if (moon != '') return `moon [[${moon}]]`

		return `planet [[${planet}]]`
	}

	if (loc == 'space station' || loc == 'space anomaly') {
		instructions = `fly to the ${loc}`
		savereload = `the ${srloc}`
		if (loc == srloc) {
			instructions = 'take from cabinet'
		} else if (!(srloc == 'space station' || srloc == 'space anomaly')) {
			savereload = `${srloc} [[${sr}]]`
		}
	} else {	// if not on Station/Anomaly
		savereload = `${srloc} [[${sr}]]`
		instructions = `fly to ${planetMoon(planet, moon)} (${coords})`
		if (srloc == 'space station' || srloc == 'space anomaly') {
			savereload = `the ${srloc}`
		} else if ((moon != '' && srloc == 'moon' && sr == moon) || (moon == '' && srloc == 'planet' && sr == planet)) {
			instructions = `fly to ${coords}`
		} else if (sr == '') {
			savereload = `${planetMoon(planet, moon)}`;
			instructions = `fly to ${coords}`;
		}
	}

	const sentence = `Save and reload on ${savereload}, then ${instructions}.`;
	setOutput(codeId, sentence);
}

// Corrects catalog link for GHub
function catalog(civ_inputId, codeId) {
	const civ = document.getElementById(civ_inputId).value;
	let output = civ;
	if (civ == 'GHub') {
		output = "Galactic Hub"
	}
	setOutput(codeId, output)
}

// adds "documented by the GHSH" sentence
function addInfoChapter(chapter_inputId, codeId) {
	const chapter = document.getElementById(chapter_inputId).value;
	let output = '';
	if (chapter == 'GHSH') {
		output = ' and documented by the [[Galactic Hub Ship Hunters]]'
	}
	document.getElementById(codeId).innerHTML = output;
}

function appearance(name_inputId, type_inputId, colour1_inputId, colour2_inputId, appearance_inputId) {
	let name = document.getElementById(name_inputId).value
	const type = document.getElementById(type_inputId).querySelector(':checked').dataset.type
	const colour1 = document.getElementById(colour1_inputId).value
	const colour2 = document.getElementById(colour2_inputId).value
	const appearance = document.getElementById(appearance_inputId)

	name = sanitiseString(name);

	function secColour(colour2) {
		if (colour2 != ' ') {
			return ` with ${colour2} accents`
		} else {
			return ''
		}
	}

	const output = `${name} is ${enPrefix(colour1)} ${colour1.trim()} ${type} multi-tool${secColour(colour2.trim())}.`
	if (colour1.trim() + colour2.trim() == '') return
	appearance.value = output;
}

// handles acquirement gallery images
function acquirementGallery(sr_img_inputId, sys_img_inputId, cab_img_inputId, coords_img_inputId, loc_inputId, srloc_inputId, srname_inputId, moon_inputId, codeId) {
	const srname = document.getElementById(srname_inputId).value;
	const sr = document.getElementById(sr_img_inputId).value;
	const sys = document.getElementById(sys_img_inputId).value;
	const cab = document.getElementById(cab_img_inputId).value;
	const coords = document.getElementById(coords_img_inputId).value;
	const loc = document.getElementById(loc_inputId).value;
	let srloc = document.getElementById(srloc_inputId).value;
	const moon = document.getElementById(moon_inputId).value;
	document.getElementById(codeId).innerHTML = '';
	const pics = {};

	if (srloc != 'Space Station' && srloc != 'Space Anomaly' && srname == '') {
		if (moon != '') {
			srloc = 'Moon';
		} else {
			srloc = 'Planet';
		}
	}

	let body, highlight, type;

	if (moon != '') {
		body = 'Moon';
	} else {
		body = 'Planet';
	}

	if (loc == 'Sentinel Pillar') {
		type = 'Pillar';
	} else if (loc == 'Minor Settlement') {
		type = 'Cabinet';
	}

	if (!loc.includes('Space')) {
		highlight = ` (${type} ${body} highlighted)`;
	} else {
		highlight = '';
	}

	if (sr != '') pics[sr] = `Save/Reload ${srloc}`;
	if (sys != '') pics[sys] = `System${highlight}`;
	if (!loc.includes('Space')) {
		if (cab != '') pics[cab] = `${type} ${body}`;
		if (coords != '') pics[coords] = 'Coordinates';
	}

	for (let i = 0; i < Object.keys(pics).length; i++) {
		const pic = Object.keys(pics)[i];
		const desc = pics[Object.keys(pics)[i]];
		const gallery = `<div>${pic}|${desc}</div>`;
		document.getElementById(codeId).insertAdjacentHTML('beforeend', gallery);
	}
}

// automatically switches to Sentinel Pillar when Royal is selected
function autoRoyal(type_inputId, loc_inputId) {
	const type = document.getElementById(type_inputId).value;
	const loc = document.getElementById(loc_inputId);

	hideInput(type_inputId, "Royal", loc_inputId);
	if (type == 'Royal') {
		loc.value = 'Sentinel Pillar';
	}
}

// determine if MT is SMG for catalog
function MTType(type_inputId, slots_inputId, codeId) {
	const type = document.getElementById(type_inputId).value;
	const slots = document.getElementById(slots_inputId).value;
	if (type == 'Royal') {
		setOutput(codeId, '')
		return;
	}

	let output;
	if (slots < 11) {
		output = 'Pistol';
	} else if (slots > 16) {
		output = 'Rifle';
	} else {
		output = 'SMG';
	}

	setOutput(codeId, output + ' -');
}