const GroundGenera = {
	'Anastomus (Striders)': ['Tall Eggs'],
	'Anomalous (Exotic Biome Creatures)': ['', 'Fiendish Roe', 'Hexaberry', 'Latticed Sinew'],
	'Bos (Beetles)': ["Crab 'Apple'"],
	'Bosoptera (Flying Beetles)': ['Craw Milk'],
	'Felidae (Cats)': ['Leopard-Fruit'],
	'Felihex (Sixlegged Cats)': ['Leopard-Fruit'],
	'Hexungulatis (Sixlegged Cows)': ['Fresh Milk'],
	'Lok (Blobs)': ["Sticky 'Honey'"],
	'Mechanoceris (Robot)': ['Chewy Wires'],
	'Mogara (Proto-Gek)': ['Warm Proto-Milk'],
	'Osteofelidae (Bonecat)': ['Bone Nuggets'],
	'Prionterrae (Ploughs)': ['Dirty Meat'],
	'Procavya (Rodents)': ['Wild Milk'],
	'Protosphaeridae (Protoroller)': ['Bone Nuggets'],
	'Prototerrae (Protodiggers)': ['Dirty Meat'],
	'Rangifae (Diplos)': ['Giant Egg'],
	'Reococcyx (Bipedal Antelopes)': ['Wild Milk'],
	'Spiralis (Drills)': ['Latticed Sinew'],
	'Talpidae (Moles)': ['Foraged Mushrooms'],
	'Tetraceris (Antelopes)': ['Wild Milk'],
	'Theroma (Triceratops)': ['Creature Egg'],
	'Tyranocae (Tyrannosaurus)': ['Regis Grease'],
	'Ungulatis (Cow)': ['Fresh Milk']
};

const FlyingGenera = {
	'Agnelis (Birds)': ['Craw Milk'],
	'Cycromys (Dragons)': ['Craw Milk'],
	'Oxyacta (Flying Snakes)': ['Craw Milk'],
	'Protocaeli (Protoflyers)': ['Craw Milk'],
	'Rhopalocera (Butterflies)': ['Craw Milk']
};

const UnderwaterGenera = {
	'Procavaquatica (Swimming Rodents)': ['Wild Milk'],
	'Bosaquatica (Underwater Crabs)': ["Crab 'Apple'"],
	'Chrysaora (Jellyfish)': ['Wild Milk'],
	'Ictaloris (Fish)': [''],
	'Prionace (Sharks)': ['Wild Milk'],
	'Prionacefda (Swimming cows)': ['Wild Milk']
};

const UndergroundGenera = {
	'Bos (Beetles)': ["Crab 'Apple'"],
	'Lok (Blobs)': ["Sticky 'Honey'"],
	'Procavya (Rodents)': ['Wild Milk'],
	'Prototerrae (Protodiggers)': ['Dirty Meat'],
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

	const genusValues = [];
	for (const genus of genera) {
		genusValues.push(genus.split(' ')[0])
	}

	setDropDownOptions(genera, genusValues, genus_inputId);
}

// generates dropdowns for album names
function albumDropdown(civ_input, ecosystem_inputId, catalog_inputId) {
	let civ = document.getElementById(civ_input).value;
	let ecosystem = document.getElementById(ecosystem_inputId).value;
	document.getElementById(catalog_inputId).innerHTML = '';
	if (ecosystem == 'Underground') {
		ecosystem = 'Ground'
	}

	const Euclid = {
		Ground: ['', 'Diplo', '8m+ Fauna', 'Mushroom Beetle', 'T-Rex', 'Strider', 'Bonecat', 'Robot Antelope', 'Flying Beetle', 'Blob', 'Mogara', 'Protoroller'],
		Flying: ['', 'Butterfly', 'Sporefly', 'Biggerfly', 'Protoflyer', 'Prospects'],
		Underwater: ['', 'Prionace', 'Jellyfish', 'Prospects']
	};

	const Calypso = {
		Ground: ['', 'Diplo', 'Mushroom Beetle', 'Rare Fauna'],
		Flying: ['', 'Rare Fauna'],
		Underwater: ['', 'Rare Fauna']
	};

	const Eissentam = {
		Ground: ['', '8m+ Fauna', 'Mushroom Beetle', 'Anastomus', 'Anomalous', 'Bos', 'Bosoptera', 'Felidae', 'Felihex', 'Hexungulatis', 'Lok', 'Mechanoceris', 'Mogara', 'Osteofelidae', 'Prionterrae', 'Procavya', 'Protocaeli', 'Protosphaeridae', 'Prototerrae', 'Rangifae', 'Reococcyx', 'Spiralis', 'Talpidae', 'Tetraceris', 'Theroma', 'Tyranocae', 'Ungulatis'],
		Flying: ['', 'Cycromys', 'Oxyacta', 'Butterfly', 'Sporefly', 'Goliath Butterfly'],
		Underwater: ['', 'Bosaquatica', 'Chrysaora', 'Prionace', 'Prionacefda', 'Procavaquatica']
	};

	let catalogArr, galaxy;
	let album = civ + ' ';
	switch (civ) {
		case "GHub":
			galaxy = Euclid
			album = 'GHEC '
			break;

		case "CalHub":
			galaxy = Calypso
			break;

		case "EisHub":
			galaxy = Eissentam
			break;
	}

	catalogArr = galaxy[ecosystem];
	for (let catalog of catalogArr) {
		if (!catalog == '') {
			let i = catalogArr.indexOf(catalog)
			catalogArr[i] = album + catalog
		}
	}
	setDropDownOptions(catalogArr, catalog_inputId)
}

// generates additional information sentence
function addInfo(catalog_inputId, researchTeam_codeId, codeId) {
	let catalog = document.getElementById(catalog_inputId).value;
	let chapter = document.getElementById(researchTeam_codeId).innerHTML;

	if (!catalog == '') {
		document.getElementById(codeId).style.display = ''

		if (chapter == 'GHEC') {
			chapter = ' and documented by the [[Galactic Hub Exobiology Corps]]'
		} else {
			chapter = ''
		}
		catalog = catalog + ' Album'
		const output = '[[' + catalog + ']]' + chapter

		setOutput(codeId, `Featured in the ${output}.`);
	}
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
	const gen1 = document.getElementById(gender1_inputId).value;
	const gen2 = document.getElementById(gender2_inputId).value;

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

// Sets the labels of the creature priority selection to the currently selected genders
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