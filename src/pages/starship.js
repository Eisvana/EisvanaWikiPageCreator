/**
 * @fileoverview Provides functions which can be used by the Starship page creator.
 */

function startupFunctions() {
	subtypeDropdown();
	showHideStarshipSelects();
	shipStats();
	calcS();
	introType();
	loc();
	addInfo();
	appearanceDropdowns();
	enPrefix(globalElements.input.typeInput.value, "enPrefix");
	albumFunctions();
}

const starshipElements = {
	input: {
		economyInput: 'wealthInput',
	}
}
updateGlobalElements(starshipElements)

const starshipElementFunctions = {
	nameInput: ['appearanceSentence(); albumName()'],
	civ: ['loc(); addInfo()', null, true],
	systemInput: ['loc()'],
	planetInput: ['loc(); albumOther()'],
	moonInput: ['loc(); albumOther()'],
	portalglyphsInput: ['loc()', null, true],
	axesInput: ['loc(); albumOther()'],
	typeInput: ['introType(); subtypeDropdown(); showHideStarshipSelects(); shipStats(); appearanceDropdowns(); appearanceSentence(); calcS(); loc(); addInfo(); albumOther(); enPrefix(this.value, "enPrefix")'],
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

/**
 * Function to retrieve the ship data object.
 * @function
 * @returns {ShipDataObject} Ship data object containing data related to different types of ships.
 */
function getShipData() {
	/**
	 * Object containing data related to different types of ships. The pattern is repeated for all ship types.
	 * @typedef {Object} ShipDataObject
	 * @property {Object} Freighter - The data related to Freighter ships.
	 * @property {Object} Freighter.cost - The cost of each type of Freighter ship.
	 * @property {string} Freighter.cost.Small - The cost range of small Freighter ships.
	 * @property {string} Freighter.cost.Large - The cost range of large Freighter ships.
	 * @property {Object} Freighter.slots - The number of slots each type of Freighter ship has.
	 * @property {string} Freighter.slots.Small - The number of slots of small Freighter ships.
	 * @property {string} Freighter.slots.Large - The number of slots of large Freighter ships.
	 * @property {Object} Freighter.techslots - The number of tech slots each type of Freighter ship has.
	 * @property {string} Freighter.techslots.Small - The number of tech slots of small Freighter ships.
	 * @property {string} Freighter.techslots.Large - The number of tech slots of large Freighter ships.
	 * @property {string[]} Freighter.subtypes - The different subtypes of Freighter ships.
	 * @property {string[]} Freighter.secParts - The different secondary parts for Freighter ships.
	 * @property {string[]} Freighter.accessories - The different accessories for Freighter ships.
	 * @property {string[]} Freighter.miscParts - The different miscellaneous parts for Freighter ships.
	 * @property {Object} Freighter.sections - The different sections of the Freighter ship builder.
	 * @property {string[]} Freighter.sections.subtypeInput - Controls the visibility of subtype input.
	 * @property {string[]} Freighter.sections.exoticInput - Controls the visibility of exotic input.
	 * @property {string[]} Freighter.sections.pilotInput - Controls the visibility of pilot input.
	 * @property {string[]} Freighter.sections.inventoryInput - Controls the visibility of inventory input.
	 * @property {string[]} Freighter.sections.maneuverBInput - Controls the visibility of maneuverability input.
	 * @property {string[]} Freighter.sections.damageBInput - Controls the visibility of damage input.
	 * @property {string[]} Freighter.sections.shieldBInput - Controls the visibility of shield input.
	 * @property {string[]} Freighter.sections.warpBInput - Controls the visibility of warp input.
	 * @property {string[]} Freighter.sections.economyInput - Controls the visibility of economy input.
	 * @property {string[]} Freighter.sections.planetInput - Controls the visibility of planet input.
	 * @property {string[]} Freighter.sections.moonInput - Controls the visibility of moon input.
	 * @property {string[]} Freighter.sections.axesInput - Controls the visibility of axes input.
	 * @property {Object} Exotic - The data related to Exotic ships.
	 * @property {Object} Solar - The data related to Solar ships.
	 * @property {Object} Fighter - The data related to Fighter ships.
	 * @property {Object} Explorer - The data related to Explorer ships.
	 * @property {Object} Hauler - The data related to Hauler ships.
	 * @property {Object} Shuttle - The data related to Shuttle ships.
	 * @property {Object} "Living Ship" - The data related to Living ships.
	 */

	/**
	 * Ship data object containing data related to different types of ships.
	 * @type {ShipDataObject}
	 */
	const defaultSections = {
		subtypeInput: ['show'],
		exoticInput: ['hide', ''],
		pilotInput: ['hide', ''],
		inventoryInput: ['show'],
		maneuverBInput: ['hide', ''],
		damageBInput: ['hide', ''],
		shieldBInput: ['hide', ''],
		warpBInput: ['hide', ''],
		economyInput: ['show'],
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
				pilotInput: ['show'],
				inventoryInput: ['hide'],
				maneuverBInput: ['hide', ''],
				damageBInput: ['hide', ''],
				shieldBInput: ['hide', ''],
				warpBInput: ['hide', ''],
				economyInput: ['show'],
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
				exoticInput: ['show'],
				pilotInput: ['hide', ''],
				inventoryInput: ['hide', 'Small'],
				maneuverBInput: ['hide', ''],
				damageBInput: ['hide', ''],
				shieldBInput: ['hide', ''],
				warpBInput: ['hide', ''],
				economyInput: ['show'],
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
				economyInput: ['show'],
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
			secParts: ['', 'Curved Cockpit', 'Bubble Cockpit'],
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
				'Aftershock': ['Small'],
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
				economyInput: ['show'],
				planetInput: ['hide', ''],
				moonInput: ['hide', ''],
				axesInput: ['hide', '']
			}
		},
		"Living Ship": {
			cost: {
				'Medium': '',
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
		},
		"Interceptor": {
			cost: {
				'Large': '',
			},
			slots: {
				'Large': '32-40',
			},
			techslots: {
				'Large': '22-28',
			},
			subtypes: [],
			secParts: [],
			accessories: [],
			miscParts: [],
			sections: {
				subtypeInput: ['hide'],		// subtype and parts (above) need to be revised once the naming convention is done
				exoticInput: ['hide', ''],
				pilotInput: ['hide', ''],
				inventoryInput: ['hide', 'Large'],
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
	shipData.Explorer.miscParts = structuredClone(shipData.Explorer.accessories);
	shipData.Explorer.miscParts.push('Antenna', 'Spike', 'Dish', 'Sensor');
	return shipData;
}

/**
 * Set subtype dropdown options based on selected ship type.
 * @function
 * @returns {void}
 */
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

/**
 * Calculates the spawn chance of an S class ship based on the economy rating and type of the system
 *
 * @function
 * @returns {undefined}
 */
function calcS() {
	const econ = pageData.economy.split(' ');
	const type = pageData.type;
	let chance;
	let chanceSentence = 'always spawns';
	const exceptions = ['Exotic', 'Living Ship'];
	if (!exceptions.includes(type)) {
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
		chanceSentence = `has a ${chance} chance to spawn`;
	}
	globalElements.output.sChance.innerText = chanceSentence;
}

// assigns starship stats macro
function shipStats() {
	const type = pageData.type.split(' ')[0];
	globalElements.output.stats.innerText = type + 'Ship';
}

/**
 * Shows and hides section based on other input.
 *
 * @function
 * @returns {void}
 */
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
		if (data.length > 1) {
			inputElement.value = data[1];
		} else if (inputElement.tagName.toLowerCase() == 'select') {
			inputElement.value ||= inputElement.options?.[0]?.value;
		}
		wikiCode(inputElement);
	}
	calcInv();
}

/**
 * Sets the dropdown options for the inventory input based on the page data and ship data.
 * @function
 * @name invDropdown
 * @returns {void}
 */
function invDropdown() {
	const { type, subtype } = pageData;
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

/**
 * Calculates inventory size based on type and subtype.
 * @function
 * @returns {void}
 */
function calcInv() {
	const { type, subtype } = pageData;
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

/**
 * Calculates the cost and slot count required for the current pageData.
 * @function
 * @returns {void}
 */
function costSlotCalc() {
	const type = pageData.type;
	const inventory = pageData.inventory;
	const propArray = ["cost", "slots", "techslots"];
	const shipData = getShipData();

	for (const prop of propArray) {
		globalElements.output[prop].innerText = shipData[type][prop][inventory];
	}
}

function introType() {
	wikiCode(shipType(), 'archetype');
}

function shipType() {
	if (pageData.type == 'Freighter') {
		return 'freighter';
	} else {
		return 'starship';
	}
}

/**
 * Constructs a location sentence for a discovered ship.
 * @function loc
 * @return {string} The completed location sentence.
 */
function loc() {
	const { system: systemName, region: regionName, civShort: civ, type } = pageData;

	// this output has a linebreak. This is intended, because we use .innerText to display this. If we used <br>, it would display '<br>', not the linebreak.
	const output = `This ${shipType()} was discovered in the [[${systemName}]] [[star system]] in the [[${regionName}]] [[region]]${regNr(regionName)} of the ${HubGal(civ)}.

	It can be found ${locText()}.`

	globalElements.output.location.innerText = output;

	/**
	 * Determines whether the discovered ship is a capital ship based on inventory size
	 * @function capitalDetection
	 * @return {string} If ship is a capital ship, returns the string 'Capital'; otherwise returns undefined.
	 */
	function capitalDetection() {
		const inventory = pageData.inventory;
		if (inventory == 'Large') return 'Capital';
	}

	/**
	 * Determines the method of freighter spawn
	 * @function freighterSpawn
	 * @return {string} Returns a sentence describing the freighter spawn location.
	 */
	function freighterSpawn() {
		if (capitalDetection() == 'Capital') {
			return 'after warping into the star system if a space battle is triggered'
		} else {
			return 'randomly while pulsing around in the star system'
		}
	}

	/**
	 * Determines the method of living ship spawn
	 * @function livingShipSpawn
	 * @return {string} Returns a sentence describing the living ship spawn location and coordinates.
	 */
	function livingShipSpawn() {
		const axes = pageData.axes;
		const celestialBody = planetMoonSentence();
		return `on the ${celestialBody} at the coordinates ${axes}`
	}

	/**
	 * Constructs the location sentence based on ship type
	 * @function locText
	 * @return {string} Returns the location sentence.
	 */
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
}

/**
 * Constructs additional information sentence that includes the catalogue and research team
 * @function
 * @returns {string} - The additional information sentence
 */
function addInfo() {
	let catalogue = '';
	const civ = shortenGHub(pageData.civShort);
	const researchteam = docByResearchteam('GHSH');
	const type = pageData.type;

	if (civ != 'CalHub') catalogue = ' - ' + type;

	if (type == 'Freighter' && civ != 'CalHub') {
		catalogue = civ + ' Freighter Catalog';
	} else {
		catalogue = civ + ' Starship Catalog' + catalogue;
	}
	const output = '[[' + catalogue + ']]' + researchteam;

	globalElements.output.addInfo.innerText = output;
}

/**
 * Adds items to the part dropdowns based on the selected ship type.
 * @function
 * @returns {void}
 */
function appearanceDropdowns() {
	const type = globalElements.input.typeInput.value;
	const { secPartsInput: secParts, accessoriesInput: accessories, miscPartsInput: miscParts } = globalElements.input;
	const parts = { secParts, accessories, miscParts };
	const shipData = getShipData();

	for (const part in parts) {
		const input = parts[part];
		setDropdownOptions(input, shipData[type][part]);
	}
}

/**
 * Sets the actual appearance sentence of the specified creature, using the information provided in the input fields.
 * @function appearanceSentence
 * @returns {void}
 */
function appearanceSentence() {
	// this is object destructuring, it may seem a bit chaotic
	const {
		mainColourInput: { value: mainColour },
		secColourInput: { value: secColour },
		secPartsInput: { value: secParts },
		accessoriesInput: { value: accessories },
		miscPartsInput: { value: miscParts },
		appearanceInput: textarea
	} = globalElements.input;

	if (!(mainColour.trim() || secColour.trim() || secParts || accessories || miscParts)) return;

	const { name, type, subtype, exotic } = pageData;

	const accentColour = (() => {
		if (secColour.trim()) return ` with ${secColour} accents`;
		return '';
	})();

	const addParts = (() => {
		let partList = '';
		if (secParts || accessories || miscParts) partList = 'It features ';
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

	const output = `${name} is ${primaryColour} ${type.toLowerCase()} of the ${subtype.toLowerCase() || exotic.toLowerCase()} subtype${accentColour}. ${addParts}`;
	textarea.value = output;
	wikiCode(textarea);
}

/**
 * Fills economy, race, and coords for the "other" parameter on starship album entries.
 * @function
 * @returns {string} Returns a string that includes the filled-out properties.
 */
function albumOtherExternal() {
	const { planet, moon, type } = pageData;
	const axes = '(' + pageData.axes + ')';

	const economyinput = pageData.economy;
	const economy = economyinput.includes('Black') ? '{{BlackMarket}}' : economyinput.split(' ')[0] + ' Economy';
	const faction = '- ' + pageData.pilot;
	const loc = (moon ? `[[${moon}]]` : `[[${planet}]]`);

	let prop1 = economy;
	let prop2 = '';
	switch (type) {
		case 'Freighter':
			prop2 = faction;
			break;

		case 'Interceptor':
		case 'Living Ship':
			prop1 = loc;
			prop2 = axes;
			break;
	}
	const output = `<br>${prop1} ${prop2}`;
	return output;
}

/**
 * Generates a link to a starship catalog based on the properties of the pageData object.
 * @function albumLinkGen
 * @returns {String} The link to the appropriate starship catalog.
 */
function albumLinkGen() {
	// The long version of the civilization name.
	// The shortened version of the civilization name.
	const { civStub: civLong, civShort } = pageData;
	const civ = (() => {
		if (civLong.split(' ').length > 1) return pageData.civShort;
		return pageData.civilized.split(' ').slice(0, 2).join(' ');
	})();	// The civilization name, either the short version or the first two words of the long version.

	const { type, subtype } = pageData;
	const fighterSubtypes = {
		Common: ['Barrel', 'Jet', 'Snowspeeder', 'Viper'],
		Rare: ['Alpha', 'Long', 'Needle', 'Rasa', 'Stubby'],
	}	// An object containing arrays of fighter subtypes, sorted by rarity.

	/**
	 * Returns the appropriate catalog name based on the properties of the pageData object.
	 * @function getCatalog
	 * @returns {String} The name of the corresponding starship catalog.
	 */
	function getCatalog() {
		if (civShort == 'CalHub') return 'CalHub Starship Catalog';										// CalHub Freighter
		if (type == 'Freighter') return civ + ' Freighter Catalog';										// GHub/EisHub Freighter
		if (civShort != 'EisHub' || type != 'Fighter') return civ + ' Starship Catalog - ' + type;		// not EisHub Fighter
		const rarity = (() => {
			for (const rarity in fighterSubtypes) {
				if (fighterSubtypes[rarity].includes(subtype)) return rarity;
			}
		})();	// The rarity of the fighter subtype, determined by checking the fighterSubtypes object.

		return `${civ} Starship Catalog - ${type} (${rarity})`; 										// EisHub Fighter
	}

	return getCatalog();
}

function albumTypeExternal() {
	return 'Catalog';
}

/**
 * Creates an array of gallery images based on the current page data.
 *
 * @function
 * @returns {void}
 */
function generateGalleryArray() {
	// Array of default gallery images
	const array = [
		'',
		'Rear view of ship',
		'Rear view of freighter',
		'Inventory screen',
		'NPC freighter captain',
		'NPC ship pilot',
		'Analysis Visor Scan',
		'Crash site',
		'Moon Page',
		'Planet Page',
		'System Page',
	];

	// Locations which apply to a living ship
	const common = ['moon', 'planet', 'crash'];
	const crash = ['npc', 'freighter'];

	// Images to deactivate based on the type of page data
	const deactivate = {
		'Living Ship': crash,
		'Interceptor': crash,
		'Freighter': ['ship', ...common],
		'default': ['freighter', ...common],
	}

	// Remove 'Moon Page' from the array if there is no moon in the page data
	if (!pageData.moon) {
		const index = array.findIndex(item => item.toLowerCase().includes('moon'));
		array.splice(index, 1);
	}

	// Loop through the array and remove images based on the type of page data
	const type = pageData.type;
	const deactivateArray = deactivate[type] ?? deactivate.default;
	const lowerCase = structuredClone(array).map(item => item.toLowerCase());
	for (let i = array.length - 1; i >= 0; i--) {
		const element = lowerCase[i];
		if (deactivateArray.some(item => element.includes(item))) {
			array.splice(i, 1);
		}
	}

	// Update page data with the new gallery array
	pageData.galleryArray = array;
}

function galleryExplanationExternal() {
	return `There is a preferred order of gallery pictures, depending on ship type:
	<div class='dialog-center is-flex-wrap-wrap mt-2' style='gap: 1rem'>
		<div>
			<div class='has-text-weight-bold'>Normal Ships:</div>
			<ol class='dialog-list mt-1'>
				<li>Rear view of ship</li>
				<li>Inventory screen</li>
				<li>NPC Ship Pilot</li>
				<li>Analysis Visor Scan</li>
				<li>System Page</li>
			</ol>
		</div>
		<div>
			<div class='has-text-weight-bold'>Living Ships/Interceptors:</div>
			<ol class='dialog-list mt-1'>
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
			<ol class='dialog-list mt-1'>
				<li>Rear view of freighter</li>
				<li>Inventory screen</li>
				<li>NPC freighter captain</li>
				<li>Analysis Visor Scan</li>
				<li>System Page</li>
			</ol>
		</div>
	</div>`
}
