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

var Freighter = {
	'CostSmall': '5,000,000 - 23,000,000',
	'CostLarge': '26,150,000 - 178,000,000',
	'SlotsSmall': '15-19',
	'SlotsLarge': '24-34',
	'TechSlotsSmall': '3-6',
	'TechSlotsLarge': '5-9',
	'CargoSlotsSmall': '',
	'CargoSlotsLarge': ''
}

var Exotic = {
	'CostSmall': '5,000,000 - 12,000,000',
	'SlotsSmall': '15-20',
	'TechSlotsSmall': '4-6',
	'CargoSlotsSmall': '3-6'
}

var Solar = {
	'CostSmall': '1,210,000 - 3,750,000',
	'SlotsSmall': '15-19',
	'TechSlotsSmall': '3-6',
	'CargoSlotsSmall': '3-4'
}

var Fighter = {
	'CostSmall': '550,000 - 3,000,000',
	'CostMedium': '1,865,000 - 3,000,000',
	'CostLarge': '26,150,000 - 18,200,000',
	'SlotsSmall': '15-19',
	'SlotsMedium': '20-29',
	'SlotsLarge': '30-38',
	'TechSlotsSmall': '2-4',
	'TechSlotsMedium': '3-5',
	'TechSlotsLarge': '5-12',
	'CargoSlotsSmall': '2-4',
	'CargoSlotsMedium': '3-6',
	'CargoSlotsLarge': '4-8'
}

var Explorer = {
	'CostSmall': '445,000 - 1,875,000',
	'CostMedium': '1,565,000 - 11,900,000',
	'CostLarge': '9,200,000 - 39,000,000',
	'SlotsSmall': '15-19',
	'SlotsMedium': '20-29',
	'SlotsLarge': '30-38',
	'TechSlotsSmall': '3-5',
	'TechSlotsMedium': '5-8',
	'TechSlotsLarge': '8-12',
	'CargoSlotsSmall': '2-5',
	'CargoSlotsMedium': '3-8',
	'CargoSlotsLarge': '4-10'
}

var Hauler = {
	'CostSmall': '4,500,000 - 20,000,000',
	'CostMedium': '12,700,000 - 52,500,000',
	'CostLarge': '32,500,000 - 126,000,000',
	'SlotsSmall': '25-31',
	'SlotsMedium': '32-39',
	'SlotsLarge': '40-48',
	'TechSlotsSmall': '2-4',
	'TechSlotsMedium': '4-6',
	'TechSlotsLarge': '6-8',
	'CargoSlotsSmall': '4-6',
	'CargoSlotsMedium': '6-8',
	'CargoSlotsLarge': '8-12'
}

var Shuttle = {
	'CostSmall': '510,000 - 2,525,000',
	'CostMedium': '660,000 - 6,600,000',
	'SlotsSmall': '18-23',
	'SlotsMedium': '19-28',
	'TechSlotsSmall': '3-6',
	'TechSlotsMedium': '5-8',
	'CargoSlotsSmall': '3-6',
	'CargoSlotsMedium': '4-8'
}

var Living = {
	'CostMedium': '2,980,000',
	'SlotsMedium': '22',
	'TechSlotsMedium': '21',
	'CargoSlotsMedium': '8-14'
}


const FighterSubtype = ['Alpha', 'Barrel', 'Jet', 'Long', 'Needle', 'Rasa', 'Snowspeeder', 'Stubby', 'Viper'];
const ExplorerSubtype = ['Hopper', 'Firespray'];
const HaulerSubtype = {
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
};

const ShuttleSubtype = ['Single Tube', 'Small Box Body', 'Double Tube', 'Large Box Body'];
const LivingShipSubtype = ['Anvil', 'Hammerhead', 'Shark', 'Tusked', 'Compact'];
const SolarSubtype = ['Falcon', 'Grouper', 'Jackal', 'Marlin', 'Raven', 'Spider'];
const FreighterSubtype = ['Dreadnought', 'Battleship', 'Sentinel', 'Resurgent', 'Imperial', 'Venator', 'Blade', 'Cargo', 'Centrifuge', 'Enterprise', 'Galleon', 'Hammerhead', 'Iris', 'Oculus', 'Revolver'];

// subtype dropdowns for different ship types
function subtypeDropdown(type, subtype) {
	const check = document.getElementById(type).value;
	document.getElementById(subtype).innerHTML = "";

	switch (check) {
		case "Fighter":
			setDropDownOptions(FighterSubtype, subtype);
			break;

		case "Explorer":
			setDropDownOptions(ExplorerSubtype, subtype);
			break;

		case "Hauler":
			setDropDownOptions(Object.keys(HaulerSubtype), subtype);
			break;

		case "Shuttle":
			setDropDownOptions(ShuttleSubtype, subtype);
			break;

		case "Living Ship":
			setDropDownOptions(LivingShipSubtype, subtype);
			break;

		case "Solar":
			setDropDownOptions(SolarSubtype, subtype);
			break;

		case "Freighter":
			setDropDownOptions(FreighterSubtype, subtype);
			break;
	}
}

// calculates S class spawn chance
function calcS(econ_input, codeId, type_input) {
	const econ = document.getElementById(econ_input).value.split(' ');
	const type = document.getElementById(type_input).value;
	let chance
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
	document.getElementById(codeId).innerHTML = 'This starship ' + chanceSentence + ' in S-class.'
}

// assigns starship stats macro
function shipStats(inputId, codeId) {
	let type = document.getElementById(inputId).value
	if (type == 'Living Ship') {
		type = 'Living'
	}
	setOutput(codeId, type + 'Ship')
}

// calculates inventory size based on type or subtype
function calcInv(type_inputId, subtype_inputId, inventory_inputId) {
	let type = document.getElementById(type_inputId).value
	let subtype = document.getElementById(subtype_inputId).value
	let inventory = document.getElementById(inventory_inputId).value
	switch (type) {
		case "Freighter":
			if (FreighterSubtype.indexOf(subtype) > 5) {
				inventory = 'Small'
			} else {
				inventory = 'Large'
			}
			break;

		case "Shuttle":
			if (ShuttleSubtype.indexOf(subtype) > 1) {
				inventory = 'Medium'
			} else {
				inventory = 'Small'
			}
			break;

		case "Solar":
			inventory = 'Small'
			break;
	}
	document.getElementById(inventory_inputId).value = inventory
}

function invDropdown(type_inputId, subtype_inputId, inventory_inputId) {
	let type = document.getElementById(type_inputId).value;
	let subtype = document.getElementById(subtype_inputId).value;
	document.getElementById(inventory_inputId).innerHTML = "";
	if (type == 'Hauler') {
		setDropDownOptions(HaulerSubtype[subtype], inventory_inputId);
		if (HaulerSubtype[subtype].length == 1) {
			document.getElementById(inventory_inputId).value = HaulerSubtype[subtype][0];
			document.getElementById(inventory_inputId).parentElement.parentElement.style.display = 'none';
		} else {
			document.getElementById(inventory_inputId).parentElement.parentElement.style.display = '';
		}
	} else {
		setDropDownOptions(['Small', 'Medium', 'Large'], inventory_inputId);
	}
}

// shows and hides section based on other input
function showHideStarshipSelects(type_inputId, subtype_inputId, exotic_inputId, pilot_inputId, maneuver_inputId, damage_inputId, shield_inputId, warp_inputId, inventory_inputId, planet_inputId, moon_inputId, axes_inputId, economy_inputId) {
	const yes = ''
	const no = 'none'

	let type = document.getElementById(type_inputId).value
	let subtype = document.getElementById(subtype_inputId)
	let exotic = document.getElementById(exotic_inputId)
	let pilot = document.getElementById(pilot_inputId)
	let inventory = document.getElementById(inventory_inputId)
	let maneuver = document.getElementById(maneuver_inputId)
	let damage = document.getElementById(damage_inputId)
	let shield = document.getElementById(shield_inputId)
	let warp = document.getElementById(warp_inputId)
	let economy = document.getElementById(economy_inputId)
	let planet = document.getElementById(planet_inputId)
	let moon = document.getElementById(moon_inputId)
	let axes = document.getElementById(axes_inputId)

	let subtypetr = subtype.parentElement.parentElement
	let exotictr = exotic.parentElement.parentElement
	let pilottr = pilot.parentElement.parentElement
	let inventorytr = inventory.parentElement.parentElement
	let maneuvertr = maneuver.parentElement.parentElement
	let damagetr = damage.parentElement.parentElement
	let shieldtr = shield.parentElement.parentElement
	let warptr = warp.parentElement.parentElement
	let economytr = economy.parentElement.parentElement
	let planettr = planet.parentElement.parentElement
	let moontr = moon.parentElement.parentElement
	let axestr = axes.parentElement.parentElement

	switch (type) {
		case "Freighter":
			subtypetr.style.display = yes
			exotictr.style.display = no
			pilottr.style.display = yes
			inventorytr.style.display = no
			maneuvertr.style.display = no
			damagetr.style.display = no
			shieldtr.style.display = no
			warptr.style.display = no
			economytr.style.display = yes
			planettr.style.display = no
			moontr.style.display = no
			axestr.style.display = no

			//			subtype.value = ''
			exotic.value = ''
			pilot.value = 'Gek'
			//			inventory.value = ''
			maneuver.value = ''
			damage.value = ''
			shield.value = ''
			warp.value = ''
			economy.value = '★★★ (Advanced)'
			planet.value = ''
			moon.value = ''
			axes.value = ''

			break;

		case "Living Ship":
			subtypetr.style.display = yes
			exotictr.style.display = no
			pilottr.style.display = no
			inventorytr.style.display = no
			maneuvertr.style.display = yes
			damagetr.style.display = yes
			shieldtr.style.display = yes
			warptr.style.display = yes
			economytr.style.display = no
			planettr.style.display = yes
			moontr.style.display = yes
			axestr.style.display = yes

			//			subtype.value = ''
			exotic.value = ''
			pilot.value = ''
			inventory.value = 'Medium'
			//			maneuver.value = ''
			//			damage.value = ''
			//			shield.value = ''
			//			warp.value = ''
			economy.value = ''
			//			planet.value = ''
			//			moon.value = ''
			//			axes.value = ''

			break;

		case "Exotic":
			subtypetr.style.display = no
			exotictr.style.display = yes
			pilottr.style.display = no
			inventorytr.style.display = no
			maneuvertr.style.display = no
			damagetr.style.display = no
			shieldtr.style.display = no
			warptr.style.display = no
			economytr.style.display = no
			planettr.style.display = no
			moontr.style.display = no
			axestr.style.display = no

			subtype.value = ''
			exotic.value = 'Squid'
			pilot.value = ''
			inventory.value = 'Small'
			maneuver.value = ''
			damage.value = ''
			shield.value = ''
			warp.value = ''
			economy.value = ''
			planet.value = ''
			moon.value = ''
			axes.value = ''

			break;

		case "Shuttle":
		case "Solar":
			subtypetr.style.display = yes
			exotictr.style.display = no
			pilottr.style.display = no
			inventorytr.style.display = no
			maneuvertr.style.display = no
			damagetr.style.display = no
			shieldtr.style.display = no
			warptr.style.display = no
			economytr.style.display = yes
			planettr.style.display = no
			moontr.style.display = no
			axestr.style.display = no

			//			subtype.value = ''
			exotic.value = ''
			pilot.value = ''
			//			inventory.value = ''
			maneuver.value = ''
			damage.value = ''
			shield.value = ''
			warp.value = ''
			economy.value = '★★★ (Advanced)'
			planet.value = ''
			moon.value = ''
			axes.value = ''

			break;

		default:
			subtypetr.style.display = yes
			exotictr.style.display = no
			pilottr.style.display = no
			inventorytr.style.display = yes
			maneuvertr.style.display = no
			damagetr.style.display = no
			shieldtr.style.display = no
			warptr.style.display = no
			economytr.style.display = yes
			planettr.style.display = no
			moontr.style.display = no
			axestr.style.display = no

			//			subtype.value = ''
			exotic.value = ''
			pilot.value = ''
			//			inventory.value = ''
			maneuver.value = ''
			damage.value = ''
			shield.value = ''
			warp.value = ''
			economy.value = '★★★ (Advanced)'
			planet.value = ''
			moon.value = ''
			axes.value = ''
	}
	invDropdown(type_inputId, subtype_inputId, inventory_inputId)
	calcInv(type_inputId, subtype_inputId, inventory_inputId)
}

function resetShip(galleryDesc, type_inputId, subtype_inputId, exotic_inputId, pilot_inputId, maneuver_inputId, damage_inputId, shield_inputId, warp_inputId, inventory_inputId, planet_inputId, moon_inputId, axes_inputId, economy_inputId) {
	document.getElementById('form').reset()
	resetAll(galleryDesc)
	document.getElementById(type_inputId).value = 'Fighter';
	showHideStarshipSelects(type_inputId, subtype_inputId, exotic_inputId, pilot_inputId, maneuver_inputId, damage_inputId, shield_inputId, warp_inputId, inventory_inputId, planet_inputId, moon_inputId, axes_inputId, economy_inputId);
	subtypeDropdown(type_inputId, subtype_inputId);
}

// calculates cost and slot count
function costSlotCalc(type_inputId, inventory_codeId, cost_codeId, slots_codeId, techslots_codeId, cargoslots_codeId) {
	let type = document.getElementById(type_inputId).value.split(' ');
	type = type[0];
	let inventory = document.getElementById(inventory_codeId).innerHTML //this is not an error, we're getting the data from the output code to include functions like showHideStarshipSelects.
	switch (inventory) {
		case "Small":
			setOutput(cost_codeId, window[type].CostSmall)
			setOutput(slots_codeId,window[type].SlotsSmall)
			setOutput(techslots_codeId, window[type].TechSlotsSmall)
			setOutput(cargoslots_codeId, window[type].CargoSlotsSmall)
			break;

		case "Medium":
			setOutput(cost_codeId, window[type].CostMedium)
			setOutput(slots_codeId, window[type].SlotsMedium)
			setOutput(techslots_codeId, window[type].TechSlotsMedium)
			setOutput(cargoslots_codeId, window[type].CargoSlotsMedium)
			break;

		case "Large":
			setOutput(cost_codeId, window[type].CostLarge)
			setOutput(slots_codeId, window[type].SlotsLarge)
			setOutput(techslots_codeId, window[type].TechSlotsLarge)
			setOutput(cargoslots_codeId, window[type].CargoSlotsLarge)
			break;
	}
}

// constructs location sentence
function loc(system_inputId, type_inputId, civ_inputId, moon_inputId, planet_inputId, axes_inputId, region_codeId, inventory_codeId, codeId) {
	let systemName = document.getElementById(system_inputId).value
	let regionName = document.getElementById(region_codeId).innerHTML
	let type = document.getElementById(type_inputId).value;
	function regNr(region_codeId) {
		let hubNr
		if (getHubNumber(region_codeId) == 'Huburb') {
			hubNr = ', Huburb'
		} else {
			hubNr = ` (HUB${getHubNumber(region_codeId)})`
		}
		return hubNr
	}
	
	function shipType() {
		let shipClass = type.toLowerCase();
		if (!shipClass == 'freighter') {
			shipClass = 'starship'
		}
		return shipClass
	}
	
	function HubGal(civ_inputId) {
		let text;
		let civilization = document.getElementById(civ_inputId).value;
		switch (civilization) {
			case "GHub":
				text = '[[Galactic Hub]]'
				break;
				
			case "CalHub":
				text = '[[Galactic Hub Calypso]], in the [[Calypso]] [[galaxy]]'
				break;
				
			case "EisHub":
				text = 'the [[Galactic Hub Eissentam]], in the [[Eissentam]] [[galaxy]]'
				break;
		}
		return text
	}
	
	function capitalDetection(inventory_codeId) {
		let inventory = document.getElementById(inventory_codeId).innerHTML
		let size
		if (inventory == 'Large') {
			size = 'Capital'
		}
		return size
	}
	
	function freighterSpawn(inventory_codeId) {
		let text;
		if (capitalDetection(inventory_codeId) == 'Capital') {
			text = 'after warping into the star system if a space battle is triggered'
		} else {
			text = 'randomly while pulsing around in the star system'
		}
		return text
	}
	
	function livingShipSpawn(planet_inputId, moon_inputId, axes_inputId) {
		let planetName, celestialBody;
		let axes = document.getElementById(axes_inputId).value;
		
		if (document.getElementById(moon_inputId).value == '') {
			celestialBody = 'planet';
		} else {
			celestialBody = 'moon';
		}

		if (celestialBody == 'planet') {
			planetName = document.getElementById(planet_inputId).value;
		} else {
			planetName = document.getElementById(moon_inputId).value;
		}
		return `on the [[${planetName}]] ${celestialBody} at the coordinates ${axes}`
	}
	
	function locText(inventory_codeId, moon_inputId, planet_inputId, axes_inputId) {
		let locationText;
		switch (type) {
			case 'Freighter':
				locationText = freighterSpawn(inventory_codeId);
				break;

			case 'Living Ship':
				locationText = livingShipSpawn(planet_inputId, moon_inputId, axes_inputId);
				break;

			default:
				locationText = 'at either the [[Space Station]] or any [[Trade Outpost]]s available in the star system'
		}
		return locationText
	}

	const output = `This ${shipType()} was discovered in the [[${systemName}]] [[star system]] in the [[${regionName}]] [[region]]${regNr(region_codeId)} of the ${HubGal(civ_inputId)}.
	<br><br>
	It can be found ${locText(inventory_codeId, moon_inputId, planet_inputId, axes_inputId)}.`

	setOutput(codeId, output);
}

// constructs additional information sentence
function addInfo(type_inputId, civ_inputId, researchTeam_codeId, codeId) {
	let catalog = '';
	let chapter = document.getElementById(researchTeam_codeId).innerHTML;
	let civ = document.getElementById(civ_inputId).value;
	let type = document.getElementById(type_inputId).value;
	
	switch (civ) {
		case "GHub":
			civ = 'Galactic Hub'
			catalog = ' - ' + type
			break;
		
		case "EisHub":
			civ = 'Galactic Hub Eissentam'
			catalog = ' - ' + type
			break;
			
		case "CalHub":
			catalogType = ''
	}
	
	if (chapter.length > 4) {
		chapter = ''
	} else {
		chapter = ' and documented by the [[Galactic Hub Ship Hunters]]'
	}
	
	catalog = civ + ' Starship Catalog' + catalog
	const output = '[[' + catalog + ']]' + chapter

	setOutput(codeId, output);
}

// preloads an appearance sentence
function appearanceDropdowns(name_inputId, type_inputId, secParts_inputId, accessories_inputId, miscParts_inputId, appearance_inputId) {

	const ExplorerSecParts = ['', 'Curved Cockpit', 'Bubbble Cockpit'];
	const ExplorerAccessories = ['', 'Ajairu', 'Arc', 'Chick', 'Curved-Tie', 'Dagger', 'Dragonfly', 'Glider', 'Lance', 'No Wings', 'Nucleo', 'Proteus', 'Solar Fins', 'Solar Pods', 'Solar Tie', 'T3 Pods', 'Wraith', 'Xenia', 'Xtara', 'X-Wing'];
	const ExplorerMiscParts = ExplorerAccessories;

	const FighterSecParts = ['', 'Heavy', 'Starjumper', 'Horizon', 'Vector', 'Tie', 'Halo', 'Bowie-H', 'Bowie-V', 'Gull', 'Quasar', 'Vulture', 'Droid', 'Mecha-3', 'Mecha-5', 'Mecha-7', 'E-Wings', 'Aftershock', 'Shockwave', 'Starscream'];
	const FighterAccessories = ['', 'Box Thruster', 'Single Thruster', 'Triple Thruster'];
	const FighterMiscParts = ['', 'Serenity', 'Firefly'];

	const HaulerSecParts = ['', 'Mack', 'Duck', 'Robot', 'Turret', 'Box Nose'];
	const HaulerAccessories = ['', 'Short Tail', 'Long Tail', 'Box Tail'];
	const HaulerMiscParts = ['', 'High Wings', 'Serenity', '2rpedo', 'Sabre', 'V-Blade', 'Tilt'];

	const ShuttleSecParts = ['', 'Voyager', 'Grill Wings', 'Y-Wings', 'Bent Wings', 'Drop-Wings', 'X-Wings', 'Low Wings', 'Glider', 'V-Wings'];
	const ShuttleAccessories = ['', 'Straight Turbine', 'Tapered Turbine', 'Omega Cap', 'Retro Booster', 'Fatboy', 'Magnatreme Adapter', 'Afterburner', 'Hover Fan', 'Magnatreme Dome', 'Magnatreme Ring', 'Magnatreme Shield', 'Wing Turbine'];
	const ShuttleMiscParts = ['', 'Micro Thruster', 'Vertical Intake', 'Solar Panel', 'Keg', 'Mr. Fusion', 'R2 Unit', 'Fuel Port', 'Antenna', 'Lunch Box', 'Cargo Vent', 'Cooling Channel', 'Exhaust Cooling Channel', 'Angled Vent', 'Fuel Compressor', 'Coolant Ports'];

	const SolarSecParts = ['', 'Razor', 'Shielded', 'Double Blade', 'Starburst', 'Talon', 'Grapple'];
	const SolarAccessories = ['', 'Hex', 'Crescent', 'Rectangle'];
	const SolarMiscParts = ['', 'Horza', 'Verta', 'Tristar', 'Torpedo', 'Drill'];

	const ExoticSecParts = ['', 'Small Double Thruster', 'Large Double Thruster', 'Clam Shell Thruster', 'Single Thruster'];
	const ExoticAccessories = ['', 'Side Wings', 'Side Booster'];
	const ExoticMiscParts = ['', 'Hexagon', 'Acanthus', 'Geometric Plate', 'Circles', 'Sergeant Stripes'];

	const LivingSecParts = ['', 'Long Arm', 'Short Arm'];
	const LivingAccessories = ['', 'Bigfoot', 'Fruitbowl Feet', 'Pedestal Feet'];
	const LivingMiscParts = ['', 'Single Thruster', 'Triple Thruster'];

	const FreighterSecParts = ['', 'Tower', 'Elevated', 'Spoiler', 'Keiser'];
	const FreighterAccessories = ['', 'Keel', 'Bottom Fin', 'Top Fin', 'W-Wings', 'Wedge', 'Nacelle'];
	const FreighterMiscParts = ['', 'Cargo Boxes', 'Cargo Pods'];


	let type = document.getElementById(type_inputId).value;
	document.getElementById(secParts_inputId).innerHTML = ''
	document.getElementById(accessories_inputId).innerHTML = ''
	document.getElementById(miscParts_inputId).innerHTML = ''
	switch (type) {
		case "Fighter":
			setDropDownOptions(FighterSecParts, secParts_inputId)
			setDropDownOptions(FighterAccessories, accessories_inputId)
			setDropDownOptions(FighterMiscParts, miscParts_inputId)
			break;

		case "Explorer":
			setDropDownOptions(ExplorerSecParts, secParts_inputId)
			setDropDownOptions(ExplorerAccessories, accessories_inputId)
			setDropDownOptions(ExplorerMiscParts, miscParts_inputId)
			break;

		case "Hauler":
			setDropDownOptions(HaulerSecParts, secParts_inputId)
			setDropDownOptions(HaulerAccessories, accessories_inputId)
			setDropDownOptions(HaulerMiscParts, miscParts_inputId)
			break;

		case "Shuttle":
			setDropDownOptions(ShuttleSecParts, secParts_inputId)
			setDropDownOptions(ShuttleAccessories, accessories_inputId)
			setDropDownOptions(ShuttleMiscParts, miscParts_inputId)
			break;

		case "Solar":
			setDropDownOptions(SolarSecParts, secParts_inputId)
			setDropDownOptions(SolarAccessories, accessories_inputId)
			setDropDownOptions(SolarMiscParts, miscParts_inputId)
			break;

		case "Exotic":
			setDropDownOptions(ExoticSecParts, secParts_inputId)
			setDropDownOptions(ExoticAccessories, accessories_inputId)
			setDropDownOptions(ExoticMiscParts, miscParts_inputId)
			break;

		case "Living Ship":
			setDropDownOptions(LivingSecParts, secParts_inputId)
			setDropDownOptions(LivingAccessories, accessories_inputId)
			setDropDownOptions(LivingMiscParts, miscParts_inputId)
			break;

		case "Freighter":
			setDropDownOptions(FreighterSecParts, secParts_inputId)
			setDropDownOptions(FreighterAccessories, accessories_inputId)
			setDropDownOptions(FreighterMiscParts, miscParts_inputId)
			break;
	}
}

// sets the actual appearance sentence
function appearanceSentence(name_inputId, type_inputId, subtype_inputId, exotic_inputId, mainColour_inputId, secColour_inputId, secParts_inputId, accessories_inputId, miscParts_inputId, appearance_inputId) {
	let name = document.getElementById(name_inputId).value;
	let type = document.getElementById(type_inputId).value;
	let subtype = document.getElementById(subtype_inputId).value;
	let exotic = document.getElementById(exotic_inputId).value;

	let mainColour = document.getElementById(mainColour_inputId).value;
	let secColour = document.getElementById(secColour_inputId).value;

	let secParts = document.getElementById(secParts_inputId).value;
	let accessories = document.getElementById(accessories_inputId).value;
	let miscParts = document.getElementById(miscParts_inputId).value;

	if (subtype == '') {
		subtype = exotic
	}
	
	name = sanitizeString(name)
	
	const output = `${name} is ${enPrefix(mainColour)} ${mainColour.toLowerCase()} ${type.toLowerCase()} of the ${subtype.toLowerCase()} subtype with ${secColour.toLowerCase()} accents. It features ${secParts.toLowerCase()}, ${accessories.toLowerCase()} and ${miscParts.toLowerCase()}.`
	if (mainColour + secColour + secParts + accessories + miscParts != '') {
		document.getElementById(appearance_inputId).value = output;
	}
}