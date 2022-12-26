function startupFunctions() {
	genusDropdown();
	albumDropdown();
	hideOrgName();
	specialNotes();
	specialNotesTextFunc();
	addInfo();
	addInfoBullet();
}

const creatureElementFunctions = {
	ecosystemInput: ['genusDropdown(); albumDropdown()'],
	civ: ['albumDropdown()', null, true],
	oldNameInput: ['hideOrgName()'],
	notesInput: ['specialNotes(); specialNotesTextFunc()'],
	specialNotesInput: ['specialNotesTextFunc()'],
	catalogInput: ['addInfo(); addInfoBullet()'],
	researchTeam: ['addInfo()', null, true],
}
assignElementFunctions(creatureElementFunctions);

function getCreatureData() {
	return {
		ecosystems: {
			Ground: {
				Anastomus: {
					commonName: 'Striders',
					produces: ['Tall Eggs']
				},
				Anomalous: {
					commonName: 'Exotic Biome Creatures',
					produces: ['', 'Fiendish Roe', 'Hexaberry', 'Latticed Sinew']
				},
				Bos: {
					commonName: 'Beetles',
					produces: ["Crab 'Apple'"]
				},
				Bosoptera: {
					commonName: 'Flying Beetles',
					produces: ['Craw Milk']
				},
				Felidae: {
					commonName: 'Cats',
					produces: ['Leopard-Fruit']
				},
				Felihex: {
					commonName: 'Sixlegged Cats',
					produces: ['Leopard-Fruit']
				},
				Hexungulatis: {
					commonName: 'Sixlegged Cows',
					produces: ['Fresh Milk']
				},
				Lok: {
					commonName: 'Blobs',
					produces: ["Sticky 'Honey'"]
				},
				Mechanoceris: {
					commonName: 'Robots',
					produces: ['Chewy Wires']
				},
				Mogara: {
					commonName: 'Proto-Gek',
					produces: ['Warm Proto-Milk']
				},
				Osteofelidae: {
					commonName: 'Bonecat',
					produces: ['Bone Nuggets']
				},
				Prionterrae: {
					commonName: 'Ploughs',
					produces: ['Dirty Meat']
				},
				Procavya: {
					commonName: 'Rodents',
					produces: ['Wild Milk']
				},
				Protosphaeridae: {
					commonName: 'Protoroller',
					produces: ['Bone Nuggets']
				},
				Prototerrae: {
					commonName: 'Protodiggers',
					produces: ['Dirty Meat']
				},
				Rangifae: {
					commonName: 'Diplos',
					produces: ['Giant Egg']
				},
				Reococcyx: {
					commonName: 'Bipedal Antelopes',
					produces: ['Wild Milk']
				},
				Spiralis: {
					commonName: 'Drills',
					produces: ['Latticed Sinew']
				},
				Talpidae: {
					commonName: 'Moles',
					produces: ['Foraged Mushrooms']
				},
				Tetraceris: {
					commonName: 'Antelopes',
					produces: ['Wild Milk']
				},
				Theroma: {
					commonName: 'Triceratops',
					produces: ['Creature Egg']
				},
				Tyranocae: {
					commonName: 'Tyrannosaurus',
					produces: ['Regis Grease']
				},
				Ungulatis: {
					commonName: 'Cow',
					produces: ['Fresh Milk']
				}
			},
			Flying: {
				Agnelis: {
					commonName: 'Birds',
					produces: ['Craw Milk']
				},
				Cycromys: {
					commonName: 'Dragons',
					produces: ['Craw Milk']
				},
				Oxyacta: {
					commonName: 'Flying Snakes',
					produces: ['Craw Milk']
				},
				Protocaeli: {
					commonName: 'Protoflyers',
					produces: ['Craw Milk']
				},
				Rhopalocera: {
					commonName: 'Butterflies',
					produces: ['Craw Milk']
				}
			},
			Underwater: {
				Procavaquatica: {
					commonName: 'Swimming Rodents',
					produces: ['Wild Milk']
				},
				Bosaquatica: {
					commonName: 'Underwater Crabs',
					produces: ["Crab 'Apple'"]
				},
				Chrysaora: {
					commonName: 'Jellyfish',
					produces: ['Wild Milk']
				},
				Ictaloris: {
					commonName: 'Fish',
					produces: ['']
				},
				Prionace: {
					commonName: 'Sharks',
					produces: ['Wild Milk']
				},
				Prionacefda: {
					commonName: 'Swimming cows',
					produces: ['Wild Milk']
				}
			},
			Underground: {
				Bos: {
					commonName: 'Beetles',
					produces: ["Crab 'Apple'"]
				},
				Lok: {
					commonName: 'Blobs',
					produces: ["Sticky 'Honey'"]
				},
				Procavya: {
					commonName: 'Rodents',
					produces: ['Wild Milk']
				},
				Prototerrae: {
					commonName: 'Protodiggers',
					produces: ['Dirty Meat']
				}
			}
		},
		catalogs: {
			Euclid: {
				Ground: ['', 'Diplo', '8m+ Fauna', 'Mushroom Beetle', 'T-Rex', 'Strider', 'Bonecat', 'Robot Antelope', 'Flying Beetle', 'Blob', 'Mogara', 'Protoroller'],
				Flying: ['', 'Butterfly', 'Sporefly', 'Biggerfly', 'Protoflyer', 'Prospects'],
				Underwater: ['', 'Prionace', 'Jellyfish', 'Prospects'],
				Underground: ['', 'Mushroom Beetle', 'Blob']
			},
			Calypso: {
				Ground: ['', 'Diplo', 'Mushroom Beetle', 'Rare Fauna'],
				Flying: ['', 'Rare Fauna'],
				Underwater: ['', 'Rare Fauna'],
				Underground: ['', 'Mushroom Beetle', 'Rare Fauna']
			},
			Eissentam: {
				Ground: ['', '8m+ Fauna', 'Mushroom Beetle', 'Anastomus', 'Anomalous', 'Bos', 'Bosoptera', 'Felidae', 'Felihex', 'Hexungulatis', 'Lok', 'Mechanoceris', 'Mogara', 'Osteofelidae', 'Prionterrae', 'Procavya', 'Protosphaeridae', 'Prototerrae', 'Rangifae', 'Reococcyx', 'Spiralis', 'Talpidae', 'Tetraceris', 'Theroma', 'Tyranocae', 'Ungulatis'],
				Flying: ['', 'Cycromys', 'Oxyacta', 'Protocaeli', 'Butterfly', 'Sporefly', 'Goliath Butterfly'],
				Underwater: ['', 'Bosaquatica', 'Chrysaora', 'Prionace', 'Prionacefda', 'Procavaquatica'],
				Underground: ['', 'Mushroom Beetle', 'Bos', 'Lok', 'Procavya', 'Prototerrae']
			}
		}
	}
}

let prioritise = '';

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
}

// generates additional information sentence
function addInfo() {
	const outputElement = globalElements.output.addInfo;

	// only accept GHEC as researchteam and construct sentence based on that
	const chapter = (pageData.researchTeam == 'GHEC') ? ' and documented by the [[Galactic Hub Exobiology Corps]]' : '';

	// adds 'Album' after the catalog if one is selected
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
			name = orgName
		} else {
			name = newName
		}
	})();
	pageData.pageName = name;
	return name;
}

// sets produces parm value or dropdown
function genusProduces() {
	const genus = pageData.genus;
	const creatureData = getCreatureData();
	const ecosystems = Object.keys(creatureData.ecosystems);
	const producesElement = globalElements.input.producesInput;
	for (const ecosystem of ecosystems) {
		if (Object.keys(creatureData.ecosystems[ecosystem]).includes(genus)) {
			const food = creatureData.ecosystems[ecosystem][genus].produces;
			setDropdownOptions(producesElement, food);

			if (food.length > 1) {
				hideInput(producesElement, '');
			} else {
				hideInput(producesElement, 'none');
			}
			return;
		}
	}
}

// hides original name in wikicode if not given
function hideOrgName() {
	const orgName = pageData.oldName;
	const aliascElement = globalElements.output.oldName.parentElement;
	if (orgName) {
		aliascElement.style.display = ''
	} else {
		aliascElement.style.display = 'none'
	}
}

// hides weight and height of second gender if none is given or equal to first gender
function hideSecGenderProps() {
	const gen1 = pageData.gender1;
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
		addObservationElement.innerText = '';
		return;
	}
	const noteText = (() => {
		if (specialNotes == notes || specialNotes == '') {
			return notes;
		} else {
			return specialNotes;
		}
	})();
	addObservationElement.innerText = noteText;
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

// extracts height from wikitext and puts it into the album entry
function albumHeight(height_codeId, output) {
	const height = getCodeValue(height_codeId);
	height.split(' ')[0];
	setOutput(output, height.split(' ')[0])
}