const GroundGenera = {
	'Anastomus': ['Tall Eggs'],
	'Anomalous': ['', 'Fiendish Roe', 'Hexaberry', 'Latticed Sinew'],
	'Bos': ["Crab 'Apple'"],
	'Bosoptera': ['Craw Milk'],
	'Felidae': ['Leopard-Fruit'],
	'Felihex': ['Leopard-Fruit'],
	'Hexungulatis': ['Fresh Milk'],
	'Lok': ["Sticky 'Honey'"],
	'Mechanoceris': ['Chewy Wires'],
	'Mogara': ['Warm Proto-Milk'],
	'Osteofelidae': ['Bone Nuggets'],
	'Prionterrae': ['Dirty Meat'],
	'Procavya': ['Wild Milk'],
	'Protosphaeridae': ['Bone Nuggets'],
	'Prototerrae': ['Dirty Meat'],
	'Rangiafe': ['Giant Egg'],
	'Reococcyx': ['Wild Milk'],
	'Spiralis': ['Latticed Sinew'],
	'Talpidae': ['Foraged Mushrooms'],
	'Tetraceris': ['Wild Milk'],
	'Theroma': ['Creature Egg'],
	'Tyranocae': ['Regis Grease'],
	'Ungulatis': ['Fresh Milk']
};

const FlyingGenera = {
	'Agnelis': ['Craw Milk'],
	'Cycromys': ['Craw Milk'],
	'Oxyacta': ['Craw Milk'],
	'Protocaeli': ['Craw Milk'],
	'Rhopalocera': ['Craw Milk']
};

const UnderwaterGenera = {
	'Procavaquatica': ['Wild Milk'],
	'Bosaquatica': ["Crab 'Apple'"],
	'Chrysaora': ['Wild Milk'],
	'Ictaloris': [''],
	'Prionace': ['Wild Milk'],
	'Prionacefda': ['Wild Milk']
};

const UndergroundGenera = {
	'Bos': ["Crab 'Apple'"],
	'Lok': ["Sticky 'Honey'"],
	'Procavya': ['Wild Milk'],
	'Prototerrae': ['Dirty Meat'],
};

let prioritise = '';

// sets genus dropdown
function genusDropdown(ecosystem_inputId, genus_inputId) {
	let genera;
	let ecosystem = document.getElementById(ecosystem_inputId).value
	document.getElementById(genus_inputId).innerHTML = '';
	switch (ecosystem) {
		case "Ground":
			genera = GroundGenera;
			break;
		
		case "Flying":
			genera = FlyingGenera;
			break;
		
		case "Underwater":
			genera = UnderwaterGenera;
			break;
		
		case "Underground":
			genera = UndergroundGenera;
			break;
	}
	genera = Object.keys(genera);
	setDropDownOptions(genera, genus_inputId);
}

// generates additional information sentence
function addInfo(genus_inputId, civ_inputId, researchTeam_codeId, codeId) {
	let catalog = '';
	let chapter = document.getElementById(researchTeam_codeId).innerHTML;
	let civ = document.getElementById(civ_inputId).value;
	let genus = document.getElementById(genus_inputId).value;
	
	if (civ == 'GHub') {
			civ = 'Galactic Hub'
			catalog = 'GHEC '
	}
	
	if (chapter.length > 4) {
		chapter = ''
	} else {
		chapter = ' and documented by the [[Galactic Hub Exobiology Corps]]'
	}
	
	catalog = civ + genus + ' Album'
	const output = '[[' + catalog + ']]' + chapter

	setOutput(codeId, output);
}

// generates name to use for wikilink
function pageName(orgName_inputId, newName_inputId) {
	let orgName = document.getElementById(orgName_inputId).value
	let name;
	if (!orgName == '') {
		name = orgName_inputId
	} else {
		name = newName_inputId
	}
	return name;
}

// sets produces parm value
function genusProduces(genus_inputId, produces_inputId) {
	let genus = document.getElementById(genus_inputId).value
	const ecosystems = [GroundGenera, FlyingGenera, UnderwaterGenera];
	for (const ecosystem of ecosystems) {
		if (ecosystem.hasOwnProperty(genus)) {
			document.getElementById(produces_inputId).innerHTML = ''
			setDropDownOptions(ecosystem[genus], produces_inputId)

			if (ecosystem[genus].length > 1) {
				document.getElementById(produces_inputId).parentElement.parentElement.style.display = ''
			} else {
				document.getElementById(produces_inputId).parentElement.parentElement.style.display = 'none'
			}
		}
	}
}

// hides original name in wikicode if not given
function hideOrgName(orgName_inputId, codeId) {
	let orgName = document.getElementById(orgName_inputId).value
	if (!orgName == '') {
		document.getElementById(codeId).parentElement.style.display = ''
		textFunction(codeId, orgName_inputId);
	} else {
		document.getElementById(codeId).parentElement.style.display = 'none'
	}
}

// hides weight and height of second gender if none is given or equal to first gender
function hideSecGenderProps(gender1_inputId, gender2_inputId, weight2_inputId, height2_inputId) {
	gen1 = document.getElementById(gender1_inputId).value;
	gen2 = document.getElementById(gender2_inputId).value;

	if (gen2 != '' && gen1 != gen2) {
		document.getElementById(weight2_inputId).parentElement.parentElement.style.display = ''
		document.getElementById(height2_inputId).parentElement.parentElement.style.display = ''
	} else {
		document.getElementById(weight2_inputId).parentElement.parentElement.style.display = 'none'
		document.getElementById(height2_inputId).parentElement.parentElement.style.display = 'none'
		document.getElementById(weight2_inputId).value = ''
		document.getElementById(height2_inputId).value = ''
		document.getElementById(gender2_inputId).value = ''
	}
}

// syncs notes value to the discovery menu notes input or makes visible for certain keywords
function specialNotes(notes_input, specialNotes_input) {
	let notes = document.getElementById(notes_input).value
	let specialNotes = document.getElementById(specialNotes_input).value
	document.getElementById(specialNotes_input).value = notes
	if (notes == 'Evil' || notes == 'Sheds and regrows bones') {
		document.getElementById(specialNotes_input).parentElement.parentElement.style.display = ''
	} else {
		document.getElementById(specialNotes_input).parentElement.parentElement.style.display = 'none'
	}
}

// handles additional observations that don't have the additional observations text
function specialNotesTextFunc(notes_input, specialNotes_input, addObservation) {
	let notes = document.getElementById(notes_input).value
	let specialNotes = document.getElementById(specialNotes_input).value
	if (specialNotes == notes) {
		document.getElementById(addObservation).innerHTML = "'''Additional Observations''': " + specialNotes
	} else {
		document.getElementById(addObservation).innerHTML = specialNotes
	}
}

// picks planet or moon input
function planetMoon(planet_inputId, moon_inputId, codeId) {
	let body, text;
	moon = document.getElementById(moon_inputId).value;
	planet = document.getElementById(planet_inputId).value;
	if (!moon == '') {
		text = `moon [[${moon}]]`;
	} else {
		text = `planet [[${planet}]]`;
	}
	setOutput(codeId, text)
}

function creaPrioRadioName(gender1_inputId, gender2_inputId, prio1_labelId, prio2_labelId) {
	if (document.getElementById(gender2_inputId).value == '') {
		document.getElementById(prio1_labelId).parentElement.parentElement.style.display = 'none'
	} else {
		document.getElementById(prio1_labelId).parentElement.parentElement.style.display = ''
	}
	document.getElementById(prio1_labelId).innerHTML = document.getElementById(gender1_inputId).value
	document.getElementById(prio2_labelId).innerHTML = document.getElementById(gender2_inputId).value
}

// get text from creature prio radio
function creaturePrio(inputId) {
prioritise = document.querySelector(`[id^=${inputId}]:checked`).value
}

// provides creature height and weight formatting
function genderProps(gender2_inputId, property1_inputId, property2_inputId, property_codeId) {
	const gender2 = document.getElementById(gender2_inputId).value;
	let property1 = document.getElementById(property1_inputId).value.split(' ')[0]
	let property2 = document.getElementById(property2_inputId).value.split(' ')[0]
	const properties = [property1, property2];
	// adds .0 if variable is full int and doesn't have it already
	if (!isNaN(property1) && property1 != '') {
		property1 = parseFloat(property1).toFixed(1)
	}
	if (!isNaN(property2) && property2 != '') {
		property2 = parseFloat(property2).toFixed(1)
	}

	let result;
	if (!gender2 == '') {
		if (property1 == property2 || property2 == '') {
			result = property1
		} else {
			if (prioritise == 'gender1') {
				result = property1 + ' - ' + property2
			} else {
				result = property2 + ' - ' + property1
			}
		}
	} else {
		result = property1
	}
	setOutput(property_codeId, result)
}