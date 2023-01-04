function startupFunctions() {
	subtypeDropdown();
	showHideStarshipSelects();
	shipStats();
	calcS();
	loc();
	addInfo();
	appearanceDropdowns();
	albumFunctions();
}

const starshipElementFunctions = {
	nameInput: ['appearanceSentence(); albumName()'],
	civ: ['loc(); addInfo()', null, true],
	systemInput: ['loc()'],
	planetInput: ['loc(); albumOther()'],
	moonInput: ['loc(); albumOther()'],
	portalglyphsInput: ['loc()', null, true],
	axesInput: ['loc(); albumOther()'],
	typeInput: ['subtypeDropdown(); showHideStarshipSelects(); shipStats(); appearanceSentence(); calcS(); loc(); addInfo(); albumOther()'],
	subtypeInput: ['invDropdown(); calcInv(); appearanceSentence(), loc()'],
	inventoryInput: ['costSlotCalc(); loc()'],
	economyInput: ['calcS(); albumOther()'],
	pilotInput: ['albumOther()'],
	maneuverBInput: ['numberStats(this, 1)'],
	damageBInput: ['numberStats(this, 1)'],
	shieldBInput: ['numberStats(this, 1)'],
	warpBInput: ['numberStats(this, 1)'],
	discoveredInput: ['albumDiscoverer()'],
	discoveredlinkInput: ['albumDiscoverer()'],
	researchTeam: ['addInfo()', null, true],
	mainColourInput: ['appearanceSentence()'],
	secColourInput: ['appearanceSentence()'],
	secPartsInput: ['appearanceSentence()'],
	accessoriesInput: ['appearanceSentence()'],
	miscPartsInput: ['appearanceSentence()'],
}
assignElementFunctions(starshipElementFunctions);

function getShipData() {
	const defaultSections = {
		subtypeInput: ['show'],
		exoticInput: ['hide', ''],
		pilotInput: ['hide', ''],
		inventoryInput: ['show'],
		maneuverBInput: ['hide', ''],
		damageBInput: ['hide', ''],
		shieldBInput: ['hide', ''],
		warpBInput: ['hide', ''],
		economyInput: ['show', '★★★ (Advanced)'],
		planetInput: ['hide', ''],
		moonInput: ['hide', ''],
		axesInput: ['hide', '']
	}

	const shipData = {
		Freighter: {
			cost: {
				'Small': '5,000,000 - 23,000,000',
				'Large': '26,150,000 - 178,000,000',
			},
			slots: {
				'Small': '15-19',
				'Large': '24-34',
			},
			techslots: {
				'Small': '8-12',
				'Large': '12-20',
			},
			subtypes: ['Dreadnought', 'Battleship', 'Sentinel', 'Resurgent', 'Imperial', 'Venator', 'Blade', 'Cargo', 'Centrifuge', 'Enterprise', 'Galleon', 'Hammerhead', 'Iris', 'Oculus', 'Revolver'],
			secParts: ['', 'Tower', 'Elevated', 'Spoiler', 'Keiser'],
			accessories: ['', 'Keel', 'Bottom Fin', 'Top Fin', 'W-Wings', 'Wedge', 'Nacelle'],
			miscParts: ['', 'Cargo Boxes', 'Cargo Pods'],
			sections: {
				subtypeInput: ['show'],
				exoticInput: ['hide', ''],
				pilotInput: ['show', 'Gek'],
				inventoryInput: ['hide'],
				maneuverBInput: ['hide', ''],
				damageBInput: ['hide', ''],
				shieldBInput: ['hide', ''],
				warpBInput: ['hide', ''],
				economyInput: ['show', '★★★ (Advanced)'],
				planetInput: ['hide', ''],
				moonInput: ['hide', ''],
				axesInput: ['hide', '']
			}
		},
		Exotic: {
			cost: {
				'Small': '20,900,000 - 41,000,000',
			},
			slots: {
				'Small': '24-30',
			},
			techslots: {
				'Small': '20-28',
			},
			subtypes: [],
			secParts: ['', 'Small Double Thruster', 'Large Double Thruster', 'Clam Shell Thruster', 'Single Thruster'],
			accessories: ['', 'Side Wings', 'Side Booster'],
			miscParts: ['', 'Hexagon', 'Acanthus', 'Geometric Plate', 'Circles', 'Sergeant Stripes'],
			sections: {
				subtypeInput: ['hide', ''],
				exoticInput: ['show', 'Squid'],
				pilotInput: ['hide', ''],
				inventoryInput: ['hide', 'Small'],
				maneuverBInput: ['hide', ''],
				damageBInput: ['hide', ''],
				shieldBInput: ['hide', ''],
				warpBInput: ['hide', ''],
				economyInput: ['show', '★★★ (Advanced)'],
				planetInput: ['hide', ''],
				moonInput: ['hide', ''],
				axesInput: ['hide', '']
			}
		},
		Solar: {
			cost: {
				'Small': '4,000,000 - 14,000,000',
			},
			slots: {
				'Small': '24-30',
			},
			techslots: {
				'Small': '13-18',
			},
			subtypes: ['Falcon', 'Grouper', 'Jackal', 'Marlin', 'Raven', 'Spider'],
			secParts: ['', 'Razor', 'Shielded', 'Double Blade', 'Starburst', 'Talon', 'Grapple'],
			accessories: ['', 'Hex', 'Crescent', 'Rectangle'],
			miscParts: ['', 'Horza', 'Verta', 'Tristar', 'Torpedo', 'Drill'],
			sections: {
				subtypeInput: ['show'],
				exoticInput: ['hide', ''],
				pilotInput: ['hide', ''],
				inventoryInput: ['hide'],
				maneuverBInput: ['hide', ''],
				damageBInput: ['hide', ''],
				shieldBInput: ['hide', ''],
				warpBInput: ['hide', ''],
				economyInput: ['show', '★★★ (Advanced)'],
				planetInput: ['hide', ''],
				moonInput: ['hide', ''],
				axesInput: ['hide', '']
			}
		},
		Fighter: {
			cost: {
				'Small': '4,050,000 - 15,650,000',
				'Medium': '4,050,000 - 27,650,000',
				'Large': '10,500,000 - 57,500,000',
			},
			slots: {
				'Small': '24-28',
				'Medium': '24-32',
				'Large': '30-38',
			},
			techslots: {
				'Small': '14-19',
				'Medium': '14-24',
				'Large': '19-30',
			},
			subtypes: ['Alpha', 'Barrel', 'Jet', 'Long', 'Needle', 'Rasa', 'Snowspeeder', 'Stubby', 'Viper'],
			secParts: ['', 'Heavy', 'Starjumper', 'Horizon', 'Vector', 'Tie', 'Halo', 'Bowie-H', 'Bowie-V', 'Gull', 'Quasar', 'Vulture', 'Droid', 'Mecha-3', 'Mecha-5', 'Mecha-7', 'E-Wings', 'Aftershock', 'Shockwave', 'Starscream'],
			accessories: ['', 'Box Thruster', 'Single Thruster', 'Triple Thruster'],
			miscParts: ['', 'Serenity', 'Firefly'],
			sections: defaultSections,
		},
		Explorer: {
			cost: {
				'Small': '3,450,000 - 11,900,000',
				'Medium': '3,450,000 - 18,300,000',
				'Large': '9,200,000 - 39,000,000',
			},
			slots: {
				'Small': '24-29',
				'Medium': '24-32',
				'Large': '30-38',
			},
			techslots: {
				'Small': '14-19',
				'Medium': '19-24',
				'Large': '24-30',
			},
			subtypes: ['Hopper', 'Firespray'],
			secParts: ['', 'Curved Cockpit', 'Bubbble Cockpit'],
			accessories: ['', 'Ajairu', 'Arc', 'Chick', 'Curved-Tie', 'Dagger', 'Dragonfly', 'Glider', 'Lance', 'No Wings', 'Nucleo', 'Proteus', 'Solar Fins', 'Solar Pods', 'Solar Tie', 'T3 Pods', 'Wraith', 'Xenia', 'Xtara', 'X-Wing'],
			sections: defaultSections,
		},
		Hauler: {
			cost: {
				'Small': '9,700,000 - 37,500,000',
				'Medium': '20,850,000 - 58,500,000',
				'Large': '32,500,000 - 126,000,000',
			},
			slots: {
				'Small': '30-36',
				'Medium': '36-40',
				'Large': '40-48',
			},
			techslots: {
				'Small': '12-18',
				'Medium': '18-24',
				'Large': '20-30',
			},
			subtypes: {
				'Aftershock': ['Small', 'Large'],
				'Ball': ['Small', 'Large'],
				'Body only': ['Small'],
				'Box': ['Small', 'Large'],
				'C-Wing': ['Small'],
				'Bent Wing': ['Small'],
				'D-Flect Wing': ['Medium'],
				'E-Wing': ['Small'],
				'Fan Wing': ['Large'],
				'V-Wing': ['Small'],
				'Thrusters only': ['Small'],
				'W-Wing': ['Medium'],
				'Shield': ['Small'],
				'Tie-Shield': ['Small'],
				'Split Shield': ['Small']
			},
			secParts: ['', 'Mack', 'Duck', 'Robot', 'Turret', 'Box Nose'],
			accessories: ['', 'Short Tail', 'Long Tail', 'Box Tail'],
			miscParts: ['', 'High Wings', 'Serenity', '2rpedo', 'Sabre', 'V-Blade', 'Tilt'],
			sections: defaultSections,
		},
		Shuttle: {
			cost: {
				'Small': '2,070,000 - 12,650,000',
				'Medium': '4,400,000 - 22,500,000',
			},
			slots: {
				'Small': '24-32',
				'Medium': '28-36',
			},
			techslots: {
				'Small': '12-19',
				'Medium': '18-26',
			},
			subtypes: ['Single Tube', 'Small Box Body', 'Double Tube', 'Large Box Body'],
			secParts: ['', 'Voyager', 'Grill Wings', 'Y-Wings', 'Bent Wings', 'Drop-Wings', 'X-Wings', 'Low Wings', 'Glider', 'V-Wings'],
			accessories: ['', 'Straight Turbine', 'Tapered Turbine', 'Omega Cap', 'Retro Booster', 'Fatboy', 'Magnatreme Adapter', 'Afterburner', 'Hover Fan', 'Magnatreme Dome', 'Magnatreme Ring', 'Magnatreme Shield', 'Wing Turbine'],
			miscParts: ['', 'Micro Thruster', 'Vertical Intake', 'Solar Panel', 'Keg', 'Mr. Fusion', 'R2 Unit', 'Fuel Port', 'Antenna', 'Lunch Box', 'Cargo Vent', 'Cooling Channel', 'Exhaust Cooling Channel', 'Angled Vent', 'Fuel Compressor', 'Coolant Ports'],
			sections: {
				subtypeInput: ['show'],
				exoticInput: ['hide', ''],
				pilotInput: ['hide', ''],
				inventoryInput: ['hide'],
				maneuverBInput: ['hide', ''],
				damageBInput: ['hide', ''],
				shieldBInput: ['hide', ''],
				warpBInput: ['hide', ''],
				economyInput: ['show', '★★★ (Advanced)'],
				planetInput: ['hide', ''],
				moonInput: ['hide', ''],
				axesInput: ['hide', '']
			}
		},
		"Living Ship": {
			cost: {
				'Medium': '21,850,000',
			},
			slots: {
				'Medium': '36',
			},
			techslots: {
				'Medium': '30',
			},
			subtypes: ['Anvil', 'Hammerhead', 'Shark', 'Tusked', 'Compact'],
			secParts: ['', 'Long Arm', 'Short Arm'],
			accessories: ['', 'Bigfoot', 'Fruitbowl Feet', 'Pedestal Feet'],
			miscParts: ['', 'Single Thruster', 'Triple Thruster'],
			sections: {
				subtypeInput: ['show'],
				exoticInput: ['hide', ''],
				pilotInput: ['hide', ''],
				inventoryInput: ['hide', 'Medium'],
				maneuverBInput: ['show'],
				damageBInput: ['show'],
				shieldBInput: ['show'],
				warpBInput: ['show'],
				economyInput: ['hide', ''],
				planetInput: ['show'],
				moonInput: ['show'],
				axesInput: ['show']
			}
		}
	}
	shipData.Explorer.miscParts = shipData.Explorer.accessories;
	return shipData;
}

// subtype dropdowns for different ship types
function subtypeDropdown() {
	const type = pageData.type;
	const subtype = globalElements.input.subtypeInput
	const shipData = getShipData();

	if (Array.isArray(shipData[type].subtypes)) {
		setDropdownOptions(subtype, shipData[type].subtypes);
	} else {
		setDropdownOptions(subtype, Object.keys(shipData[type].subtypes));
	}
	wikiCode(subtype);
}

// calculates S class spawn chance
function calcS() {
	const econ = pageData.economy.split(' ');
	const type = pageData.type;
	let chance;
	let chanceSentence = 'always spawns';
	if (type != 'Exotic' && type != 'Living Ship') {
		switch (econ[0]) {
			case "★★★":
				chance = '2%';
				break;

			case "★★":
				chance = '1%';
				break;

			case "★":
				chance = '0%';
				break;

			default:
				chance = '5%';
		}
		chanceSentence = 'has a ' + chance + ' chance to spawn'
	}
	globalElements.output.sChance.innerText = chanceSentence
}

// assigns starship stats macro
function shipStats() {
	const type = pageData.type.split(' ')[0];
	globalElements.output.stats.innerText = type + 'Ship';
}

// shows and hides section based on other input
function showHideStarshipSelects() {
	const shipData = getShipData();
	const showState = {
		show: '',
		hide: 'none'
	}

	const type = pageData.type;
	invDropdown();

	for (const input of Object.keys(shipData[type].sections)) {
		const data = shipData[type].sections[input];
		const inputElement = globalElements.input[input];
		hideInput(inputElement, showState[data[0]]);
		if (data.length > 1) inputElement.value = data[1];
		wikiCode(inputElement);
	}
	calcInv();
}

function invDropdown() {
	const type = pageData.type;
	const subtype = pageData.subtype;
	const inventory = globalElements.input.inventoryInput;
	const shipData = getShipData();
	if (type == 'Hauler') {
		setDropdownOptions(inventory, shipData.Hauler.subtypes[subtype]);
		if (shipData.Hauler.subtypes[subtype].length == 1) {
			inventory.value = shipData.Hauler.subtypes[subtype][0];
			hideInput(inventory, 'none');
		} else {
			hideInput(inventory, '');
		}
	} else {
		setDropdownOptions(inventory, ['Small', 'Medium', 'Large']);
	}
	wikiCode(inventory);
}

// calculates inventory size based on type or subtype
function calcInv() {
	const type = pageData.type
	const subtype = pageData.subtype
	const inventoryElement = globalElements.input.inventoryInput;
	const shipData = getShipData();
	let inventory;
	switch (type) {
		case "Freighter":
			if (shipData[type].subtypes.indexOf(subtype) > 5) {
				inventory = 'Small'
			} else {
				inventory = 'Large'
			}
			break;

		case "Shuttle":
			if (shipData[type].subtypes.indexOf(subtype) > 1) {
				inventory = 'Medium'
			} else {
				inventory = 'Small'
			}
			break;
	}
	if (inventory) inventoryElement.value = inventory;
	wikiCode(inventoryElement);
	costSlotCalc();
}

// calculates cost and slot count
function costSlotCalc() {
	const type = pageData.type;
	const inventory = pageData.inventory;
	const shipData = getShipData();

	globalElements.output.cost.innerText = shipData[type].cost[inventory];
	globalElements.output.slots.innerText = shipData[type].slots[inventory];
	globalElements.output.techslots.innerText = shipData[type].techslots[inventory];
}

// constructs location sentence
function loc() {
	const systemName = pageData.system;
	const regionName = pageData.region;
	const civ = pageData.civShort;
	const type = pageData.type;
	function shipType() {
		if (type == 'Freighter') {
			return 'freighter';
		} else {
			return 'starship';
		}
	}

	function capitalDetection() {
		const inventory = pageData.inventory;
		if (inventory == 'Large') return 'Capital';
	}

	function freighterSpawn() {
		if (capitalDetection() == 'Capital') {
			return 'after warping into the star system if a space battle is triggered'
		} else {
			return 'randomly while pulsing around in the star system'
		}
	}

	function livingShipSpawn() {
		const axes = pageData.axes;
		const celestialBody = planetMoonSentence();
		return `on the ${celestialBody} at the coordinates ${axes}`
	}

	function locText() {
		switch (type) {
			case 'Freighter':
				return freighterSpawn();

			case 'Living Ship':
				return livingShipSpawn();

			default:
				return 'at either the [[Space Station]] or any [[Trade Outpost]]s available in the star system';
		}
	}
	// this output has a linebreak. This is intended, because we use .innerText to display this. If we used <br>, it would display '<br>', not the linebreak.
	const output = `This ${shipType()} was discovered in the [[${systemName}]] [[star system]] in the [[${regionName}]] [[region]]${regNr(regionName)} of the ${HubGal(civ)}.

	It can be found ${locText()}.`

	globalElements.output.location.innerText = output;
}

// constructs additional information sentence
function addInfo() {
	let catalog = '';
	const civ = shortenGHub(pageData.civShort);
	const researchteam = docByResearchteam('GHSH');
	const type = pageData.type;

	if (civ != 'CalHub') catalog = ' - ' + type;

	if (type == 'Freighter' && civ != 'CalHub') {
		catalog = civ + ' Freighter Catalog';
	} else {
		catalog = civ + ' Starship Catalog' + catalog;
	}
	const output = '[[' + catalog + ']]' + researchteam;

	globalElements.output.addInfo.innerText = output;
}

// adds items to the part dropdowns
function appearanceDropdowns() {
	const type = globalElements.input.typeInput.value;
	const secParts = globalElements.input.secPartsInput;
	const accessories = globalElements.input.accessoriesInput;
	const miscParts = globalElements.input.miscPartsInput;
	const shipData = getShipData();

	setDropdownOptions(secParts, shipData[type].secParts);
	setDropdownOptions(accessories, shipData[type].accessories);
	setDropdownOptions(miscParts, shipData[type].miscParts);
}

// sets the actual appearance sentence
function appearanceSentence() {
	const mainColour = globalElements.input.mainColourInput.value;
	const secColour = globalElements.input.secColourInput.value;

	const secParts = globalElements.input.secPartsInput.value;
	const accessories = globalElements.input.accessoriesInput.value;
	const miscParts = globalElements.input.miscPartsInput.value;

	if (!(mainColour.trim() || secColour.trim() || secParts || accessories || miscParts)) return;

	const name = pageData.name;
	const type = pageData.type;
	const subtype = pageData.subtype;
	const exotic = pageData.exotic;

	const textarea = globalElements.input.appearanceInput;

	const accentColour = (() => {
		if (secColour.trim()) return ` with ${secColour} accents`;
		return '';
	})();

	const addParts = (() => {
		let partList = '';
		if (secParts || accessories || miscParts) partList += 'It features ';
		const partArray = [secParts.toLowerCase(), accessories.toLowerCase(), miscParts.toLowerCase()];
		const usedParts = new Array;
		for (const part of partArray) {
			if (part) usedParts.push(part);
		}
		for (let i = 0; i < usedParts.length; i++) {
			let prefix;
			if (i == 0) {
				prefix = '';
			} else if (i != usedParts.length - 1) {
				prefix = ', ';
			} else {
				prefix = ' and ';
			}
			partList += prefix + usedParts[i];
		}
		if (partList) partList += '.';
		return partList;
	})();

	const primaryColour = (() => {
		if (mainColour.trim()) return `${enPrefix(mainColour)} ${mainColour}`;
		return enPrefix(type);
	})();

	const output = `${name} is ${primaryColour} ${type.toLowerCase()} of the ${subtype.toLowerCase() || exotic.toLowerCase()} subtype${accentColour}. ${addParts}`
	textarea.value = output;
	wikiCode(textarea);
}

// fills economy/race/coords for the "other" parm on starship album entries
function albumOtherExternal() {
	const planet = pageData.planet;
	const moon = pageData.moon;
	const axes = '(' + pageData.axes + ')';
	const type = pageData.type;

	const economyinput = pageData.economy;
	const economy = economyinput.includes('Black') ? '{{BlackMarket}}' : economyinput.split(' ')[0] + ' Economy';
	const faction = '- ' + pageData.pilot;
	const loc = (moon ? `[[${moon}]]` : `[[${planet}]]`);

	let prop1 = economy;
	let prop2 = '';
	switch (type) {
		case "Freighter":
			prop2 = faction;
			break;

		case "Living Ship":
			prop1 = loc;
			prop2 = axes;
			break;
	}
	const output = `<br>${prop1} ${prop2}`;
	return output;
}

function albumLinkGen() {
	const civLong = pageData.civStub;
	const civShort = pageData.civShort;
	const civ = (() => {
		if (civLong.split(' ').length > 1) return pageData.civShort;
		return pageData.civilized.split(' ').slice(0, 2).join(' ');
	})();
	const type = pageData.type;
	const subtype = pageData.subtype;
	const fighterSubtypes = {
		Common: ['Barrel', 'Jet', 'Snowspeeder', 'Viper'],
		Rare: ['Alpha', 'Long', 'Needle', 'Rasa', 'Stubby'],
	}

	function getCatalog() {
		if (civShort == 'CalHub') return 'CalHub Starship Catalog';										// CalHub Freighter
		if (type == 'Freighter') return civ + ' Freighter Catalog';										// GHub/EisHub Freighter
		if (civShort != 'EisHub' || type != 'Fighter') return civ + ' Starship Catalog - ' + type;		// not EisHub Fighter
		const rarity = (() => {
			for (const rarity in fighterSubtypes) {
				if (fighterSubtypes[rarity].includes(subtype)) return rarity;
			}
		})();
		return `${civ} Starship Catalog - ${type} (${rarity})`; 										// EisHub Fighter
	}

	const catalog = getCatalog();
	const link = wikiLink + catalog;
	return link;
}

function albumTypeExternal() {
	return 'Catalog';
}

function galleryExplanationExternal() {
	return `There is a preferred order of gallery pictures, depending on ship type:
	<div class='is-flex is-flex-wrap-wrap is-justify-content-center mt-2' style='gap: 1rem'>
		<div>
			<div class='has-text-weight-bold'>Normal Ships:</div>
			<ol class='has-text-left mt-1'>
				<li>Rear view of ship</li>
				<li>Inventory screen</li>
				<li>NPC Ship Pilot</li>
				<li>Analysis Visor Scan</li>
				<li>System Page</li>
			</ol>
		</div>
		<div>
			<div class='has-text-weight-bold'>Living Ships:</div>
			<ol class='has-text-left mt-1'>
				<li>Rear view of ship</li>
				<li>Inventory screen</li>
				<li>Analysis Visor Scan</li>
				<li>Crash site</li>
				<li>Planet/Moon Page</li>
				<li>System Page</li>
			</ol>
		</div>
		<div>
			<div class='has-text-weight-bold'>Freighters:</div>
			<ol class='has-text-left mt-1'>
				<li>Rear view of freighter</li>
				<li>Inventory screen</li>
				<li>NPC freighter captain</li>
				<li>Analysis Visor Scan</li>
				<li>System Page</li>
			</ol>
		</div>
	</div>`
}