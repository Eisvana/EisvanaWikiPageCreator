import type { Sections, ShipType } from "../../types/starshipDataObjects";

const defaultSections: Sections = {
	subtypeInput: ['show'],
	exoticInput: ['hide', ''],
	pilotInput: ['hide', ''],
	inventoryInput: ['show'],
	classInput: ['hide', ''],
	maneuverBInput: ['hide', ''],
	damageBInput: ['hide', ''],
	shieldBInput: ['hide', ''],
	warpBInput: ['hide', ''],
	economyInput: ['show'],
	planetInput: ['hide', ''],
	moonInput: ['hide', ''],
	axesInput: ['hide', '']
}

const shipData: {
	[key: string]: ShipType;
} = {
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
			classInput: ['hide', ''],
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
		accessories: ['', 'Side Wings', 'Side Booster', 'V-Wings'],
		miscParts: ['', 'Hexagon', 'Acanthus', 'Geometric Plate', 'Circles', 'Sergeant Stripes'],
		sections: {
			subtypeInput: ['hide', ''],
			exoticInput: ['show'],
			pilotInput: ['hide', ''],
			inventoryInput: ['hide', 'Small'],
			classInput: ['hide', 'S'],
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
			classInput: ['hide', ''],
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
		miscParts: [],
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
		secParts: ['', 'Short Cab', 'Mack', 'Duck', 'Robot', 'Turret', 'Box Nose'],
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
			classInput: ['hide', ''],
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
			classInput: ['hide', 'S'],
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
			subtypeInput: ['hide'],		// TODO subtype and parts (above) need to be revised
			exoticInput: ['hide', ''],
			pilotInput: ['hide', ''],
			inventoryInput: ['hide', 'Large'],
			classInput: ['show'],
			maneuverBInput: ['show'],
			damageBInput: ['show'],
			shieldBInput: ['show'],
			warpBInput: ['show'],
			economyInput: ['show'],
			planetInput: ['show'],
			moonInput: ['show'],
			axesInput: ['show']
		}
	}
}
shipData.Explorer.miscParts = structuredClone(shipData.Explorer.accessories);
shipData.Explorer.miscParts.push('Antenna', 'Spike', 'Dish', 'Sensor');

Object.freeze(shipData);

export default shipData;