/**
 * @fileoverview Provides data for planet datalists
 */
interface Sentinel {
  [key: string]: string;
}

interface Sentinels {
  [key: string]: Sentinel;
}

export function getSentinelData(): Sentinels {
  const sentinels: Sentinels = {
      low: {
          'Absent': 'Ausentes',
          'Few':'Exiguo',
          'Infrequent':'Poco frecuente',
          'Intermittent':'Intermitente',
          'Irregular Patrols':'Patrullas irregulares',
          'Isolated':'Aislado',
          'Limited':'Limitados',
          'Low':'Bajo',
          'Low Security':'Seguridad baja',
          'Minimal':'Mínimo',
          'Missing':'Desaparecido',
          'None':'Ninguno',
          'None Present':'Ninguno presente',
          'Not Present':'No presente',
          'Remote':'Remoto',
          'Sparse':'Disperso',
          'Spread Thin':'Abarca demasiado',
          // Agrega aquí el resto de tus traducciones para la categoría 'low'
      },
      high: {
        'Attentive':'Atento',
        'Enforcing':'Ejecutor',
        'Ever-present':'Constante',
        'Frequent':'Frecuente',
        'Observant':'Observador',
        'Regular Patrols':'Patrullas regulares',
        'Require Obedience':'Requieren obediencia',
        'Require Orthodoxy':'Requieren ortodoxia',
        'Unwavering':'Inquebrantable',
          // Agrega aquí tus traducciones para la categoría 'high'
      },
      aggressive: {
        'Aggressive':'Agresivo',
        'Frenzied':'Enloquecido',
        'Hateful':'Detestable',
        'High Security':'Seguridad alta',
        'Hostile Patrols':'Patrullas hostiles',
        'Inescapable':'Inevitable',
        'Malicious':'Malicioso',
        'Threatening':'Amenazante',
        'Zealous':'Fervoroso',
          // Agrega aquí tus traducciones para la categoría 'aggressive'
      },
      corrupted: {
        'Corrupted':'Corrupto',
        'Forsaken':'Abandonado',
        'Rebellious':'Rebelde',
        'Answer To None':'Responder a nadie',
        'Sharded from the Atlas':'Fragmentado del Atlas',
        'Dissonant':'Disonante',
        'De-Harmonised':'Desarmonizado',
          // Agrega aquí tus traducciones para la categoría 'corrupted'
      }
      // Agrega aquí cualquier otra categoría que necesites
  };

  return sentinels;
}

export function getResourceData() {
	const resources: {
		[key: string]: string
	} = {
		'Cobre': 'Cu',
		'Cadmio': 'Cd',
		'Emerilio': 'Em',
		'Indio': 'In',
		'Cobre Activado': 'Cu+',
		'Cadmio Activado': 'Cd+',
		'Emerilio Activado': 'Em+',
		'Indio Activado': 'In+',
		'Amonio': 'NH3',
		'Dioxita': 'CO2',
		'Parafinio': 'Pf',
		'Fósforo': 'P',
		'Pirita': 'Py',
		'Uránio': 'U',
		'Plata': 'Ag',
		'Oro': 'Au',
		'Ferrita Imantada': 'Fe++',
		'Sodio': 'Na',
		'Cobalto': 'Co',
		'Sal': 'NaCl',
		'Bulbo estelar': 'Sb',
		'Carne de cactus': 'Cc',
		'Raíz de gamma': 'Gr',
		'Moho fúngico': 'Ml',
		'Cristal de escarcha': 'Fc',
		'Solanio': 'So',
		'Mordita': 'Mo',
		'Hecesio': 'Fa',
		'Huesos antiguos': 'Ab',
		'Chatarra recuperable': 'Sa',
		'Metal oxidado': 'Jn',
		'Basalto': 'B',
	}
	return resources;
};

export function getDescriptorData() {
	const planetDescriptors: {
		[key: string]: {
			[key: string]: Array<string>;
		}
	} = {
		Dead: {		// DEAD1, 2 ...
			suffix: [
				'Dead',
				'Empty',
				'Desolate',
				'Lifeless',
				'Forsaken',
				'Life-Incompatible',
				'Low Atmosphere',
				'Airless',
				'Abandoned',
			],
			none: [
				'Terraforming Catastrophe',
			]
		},
		Lush: {		// LUSH1, 2 ...
			suffix: [
				'Rainy',
				'Verdant',
				'Tropical',
				'Viridescent',
				'Grassy',
				'Temperate',
				'Humid',
				'Overgrown',
				'Flourishing',
				'Bountiful',
				'Paradise',		// UI_PARADISE_PLANET
			]
		},
		Exotic: {	// WIRECELLSBIOME1, CONTOURBIOME1, BONESPIREBIOME1, IRRISHELLSBIOME1, HYDROGARDENBIOME1, MSTRUCTBIOME1, BEAMSBIOME1, HEXAGONBIOME1, FRACTCUBEBIOME1, BUBBLEBIOME1, SHARDSBIOME1
			suffix: [
				'Shattered',
				'Fractured',
				'Fragmented',
				'Contoured',
				'Cabled',
				'Webbed',
				'Rattling',
				'Spined',
				'Skeletal',
				'Finned',
				'Bladed',
				'Shell-Strewn',
				'Fungal',
				'Sporal',
				'Capped',
				'Ossified',
				'Petrified',
				'Calcified',
				'Fissured',
				'Breached',
				'Hexagonal',
				'Plated',
				'Scaly',
				'Mechanical',
				'Metallic',
				'Metallurgic',
				'Bubbling',
				'Frothing',
				'Foaming',
				'Columned',
				'Sharded',
				'Pillared',
			],
			prefix: [
				'of Light',
			]
		},
		Glitch: {	// GLITCHBIOME1, 2, ...
			suffix: [
				'Crimson',
				'Malfunctioning',
				'Breached',
				'Infected',
				'[REDACTED]',
				'Glassy',
				'Thirsty',
				'Doomed',
				'Erased',
				'Temporary',
				'Corrupted',
			],
			none: [
				'Planetary Anomaly',
			]
		},
		Scorched: {	// SCORCHED1, 2 ...
			suffix: [
				'Charred',
				'Arid',
				'Scorched',
				'Hot',
				'Fiery',
				'Boiling',
				'High Temperature',
				'Torrid',
				'Incandescent',
				'Scalding',
			]
		},
		Frozen: {	// FROZEN1, 2 ...
			suffix: [
				'Frozen',
				'Icebound',
				'Arctic',
				'Glacial',
				'Sub-zero',
				'Icy',
				'Frostbound',
				'Freezing',
				'Hiemal',
				'Hyperborean',
			]
		},
		Irradiated: {	// IRRADIATED1, 2 ...
			suffix: [
				'Irradiated',
				'Radioactive',
				'Contaminated',
				'Nuclear',
				'Isotopic',
				'Decaying Nuclear',
				'Gamma-Intensive',
				'High Radio Source',
				'Supercritical',
				'High Energy',
			]
		},
		Toxic: {	// TOXIC1, 2 ...
			suffix: [
				'Toxic',
				'Poisonous',
				'Noxious',
				'Corrosive',
				'Acidic',
				'Caustic',
				'Acrid',
				'Blighted',
				'Miasmatic',
				'Rotting',
			]
		},
		Barren: {	// BARREN1, 2 ...
			suffix: [
				'Barren',
				'Desert',
				'Rocky',
				'Bleak',
				'Parched',
				'Abandoned',
				'Dusty',
				'Desolate',
				'Wind-swept',
			]
		},
		Marsh: {	// SWAMPBIOME1, 2 ...
			suffix: [
				'Marshy',
				'Swamp',
				'Tropical',
				'Foggy',
				'Misty',
				'Boggy',
				'Quagmire',
				'Hazy',
				'Cloudy',
				'Vapour',
				'Reeking',
				'Murky',
				'Damp',
			],
			none: [
				'Endless Morass',
			]
		},
		Volcanic: {	// LAVA1, 2 ...
			suffix: [
				'Lava',
				'Magma',
				'Erupting',
				'Volcanic',
				'Ash-Shrouded',
				'Ashen',
				'Tectonic',
				'Unstable',
				'Violent',
				'Molten',
				'Flame-Ruptured',
				'Basalt',
			],
			none: [
				'Imminent Core Detonation',
				'Obsidian Bead',
			]
		},
		MegaExotic: {	// REDBIOME1, GREENBIOME1, BLUEBIOME1, 2 ...
			suffix: [
				'Crimson',
				'Lost Red',
				'[REDACTED]',
				'Chromatic Fog',
				'Scarlet',
				'Blood',
				'Wine Dark',
				'Lost Green',
				'Doomed Jade',
				'Haunted Emeril',


				'Lost Blue',
				'Azure',
				'Cerulean',
				'Ultramarine',
			],
			none: [
				'Planetary Anomaly',
				'Stellar Corruption Detected',
				'Vermillion Globe',
				'Vile Anomaly',
				'Toxic Anomaly',
				'Deathly Green Anomaly',
				'Harsh Blue Globe',
				'Frozen Anomaly',
			]
		},
		Water: {	// WATERWORLD1, 2 ...
			suffix: [
				'Drowning',
				'Oceanic',
				'Tidal',
				'Waterlocked',
				'Aquatic',
				'Marine',
			],
			none: [
				'Waterworld',
				'Endless Seas',
			]
		},
		Infested: {	// INFESTED*1, 2 ...
			suffix: [
				'Infested',
				'Worm-ridden',
				'Tainted',
				'Mutated',
				'Corrupted',
			],
			none: [
				'Infested Paradise',
				'Toxic Horror',
				'Boiling Doom',
				'Radioactive Abomination',
				'Icy Abhorrence',
				'Xeno-Colony',
				'Caustic Nightmare',
				'Fiery Dreadworld',
				'Frozen Hell',
				'Infected Dustbowl',
				'The Nest',
				'Terrorsphere',
			]
		}
	}
	return planetDescriptors;
}


const planetDatalists: {
	[key: string]: Array<string>;
} = {
	weatherData: [
		'Tropical Storms',
		'Occasional Boiling Fog',
		'Superheated Mists',
		'Painful Mist',
		'Infrequent Torrents',
		'Oppressive',
		'Soggy Danger',
		'Sticky Heat',
		'Clammy Menace',
		'Hazardous Moisture',
		'Gentle Mist',
		'Humid',
		'Tropical Winds',
		'Warm Fog',
		'Temperate Murk',
		'Mild Damp',
		'Warm Dewdrops',
		'Tepid Damp',
		'Sweaty Drizzle',
		'Muggy Haze',
		'Death Fog',
		'Sultry Disaster',
		'Cataclysmic Monsoons',
		'Mists of Annihilation',
		'All-Consuming Fog',
		'Liquid Hell',
		'Storms of Desolation',
		'Melting Deluges',
		'Boiling Catastrophe',
		'Damp Misery',
		'Heated Gas Pockets',
		'Occasional Firestorms',
		'Incendiary Winds',
		'Unpredictable Conflagrations',
		'Drifting Firestorms',
		'Pillars of Flame',
		'Magma Geysers',
		'Plumes of Fire',
		'Molten Rain',
		'Tectonic Storms',
		'Smothering Ash',
		'Sulphurous Haze',
		'Ash Wisps',
		'Drifting Smog',
		'Cinderfalls',
		'Ash Plumes',
		'Choking Ash',
		'Burning Mists',
		'Sulfur Fumes',
		'Enveloping Ash',
		'Ashen Winds',
		'Frequent Firestorms',
		'Walls of Flame',
		'Clouds of Fire',
		'Ashen Destruction',
		'Magma Rain',
		'Basalt Hail',
		'Explosive Gas Eruptions',
		'Lethal Ash Storms',
		'Sulphurous Inferno',
		'Colossal Firestorms',
		'Obsidian Doom',
		'Infrequent Heat Storms',
		'Rare Firestorms',
		'Superheated Gas Pockets',
		'Wandering Hot Spots',
		'Atmospheric Heat Instabilities',
		'Direct Sunlight',
		'Heated Atmosphere',
		'Occasional Ash Storms',
		'Dangerously Hot',
		'Burning Air',
		'Parched',
		'Overly Warm',
		'Sunny',
		'Dehydrated',
		'Unending Sunlight',
		'Sweltering',
		'Extreme Heat',
		'Burning Gas Clouds',
		'Intense Heat',
		'Superheated Air',
		'Scalding Heat',
		'Inferno Winds',
		'Firestorms',
		'Combustible Dust',
		'Incendiary Dust',
		'Self-Igniting Storms',
		'Howling Blizzards',
		'Intense Cold',
		'Icy Tempests',
		'Supercooled Storms',
		'Raging Snowstorms',
		'Ice Storms',
		'Deep Freeze',
		'Roaring Ice Storms',
		'Frequent Blizzards',
		'Hazardous Whiteouts',
		'Frozen Clouds',
		'Occasional Snowfall',
		'Infrequent Blizzards',
		'Outbreaks of Frozen Rain',
		'Harsh, Icy Winds',
		'Drifting Snowstorms',
		'Migratory Blizzards',
		'Icy Blasts',
		'Wandering Frosts',
		'Powder Snow',
		'Wintry',
		'Snowy',
		'Icy',
		'Crisp',
		'Frost',
		'Freezing',
		'Permafrost',
		'Frequent Toxic Floods',
		'Toxic Superstorms',
		'Acidic Deluges',
		'Corrosive Cyclones',
		'Caustic Floods',
		'Corrosive Storms',
		'Torrential Acid',
		'Noxious Gas Storms',
		'Toxic Monsoons',
		'Bone-Stripping Acid Storms',
		'Corrosive Rainstorms',
		'Pouring Toxic Rain',
		'Occasional Acid Storms',
		'Atmospheric Corruption',
		'Poison Flurries',
		'Toxic Outbreaks',
		'Acidic Dust Pockets',
		'Passing Toxic Fronts',
		'Caustic Winds',
		'Alkaline Cloudbursts',
		'Dangerously Toxic Rain',
		'Corrosive Sleet Storms',
		'Lethal Atmosphere',
		'Infrequent Toxic Drizzle',
		'Acid Rain',
		'Toxic Clouds',
		'Poison Rain',
		'Choking Clouds',
		'Caustic Moisture',
		'Poisonous Gas',
		'Stinging Atmosphere',
		'Toxic Damp',
		'Corrosive Damp',
		'Stinging Puddles',
		'Extreme Radioactivity',
		'Irradiated Thunderstorms',
		'Planet-Wide Radiation Storms',
		'Extreme Atmospheric Decay',
		'Roaring Nuclear Wind',
		'Gamma Cyclones',
		'Contaminated Squalls',
		'Extreme Thermonuclear Fog',
		'Frequent Particle Eruptions',
		'Enormous Nuclear Storms',
		'Particulate Winds',
		'Energetic Storms',
		'Irradiated Downpours',
		'Radioactive Dust Storms',
		'Volatile Windstorms',
		'Occasional Radiation Outbursts',
		'Irradiated Storms',
		'Unstable Fog',
		'Reactive Rain',
		'Radioactive Humidity',
		'Radioactive Damp',
		'Irradiated Winds',
		'Contaminated Puddles',
		'Volatile Winds',
		'Unstable Atmosphere',
		'Gamma Dust',
		'Nuclidic Atmosphere',
		'Boiling Superstorms',
		'Intense Heatbursts',
		'Superheated Rain',
		'Boiling Monsoons',
		'Broiling Humidity',
		'Painfully Hot Rain',
		'Torrential Heat',
		'Blistering Floods',
		'Scalding Rainstorms',
		'Torrid Deluges',
		'Boiling Puddles',
		'Sweltering Damp',
		'Superheated Drizzle',
		'Dangerously Hot Fog',
		'Choking Humidity',
		'Mostly Calm',
		'Occasional Scalding Cloudbursts',
		'Usually Mild',
		'Blistering Damp',
		'Lethal Humidity Outbreaks',
		'Temperate',
		'Light Showers',
		'Mild Rain',
		'Refreshing Breeze',
		'Pleasant',
		'Balmy',
		'Mellow',
		'Beautiful',
		'Blissful',
		'Billowing Dust Storms',
		'Choking Sandstorms',
		'Hazardous Temperature Extremes',
		'Lung-Burning Night Wind',
		'Extreme Wind Blasting',
		'Planetwide Desiccation',
		'Sand Blizzards',
		'Howling Gales',
		'Dead Wastes',
		'Occasional Sandstorms',
		'Infrequent Dust Storms',
		'Intermittent Wind Blasting',
		'Parched Sands',
		'Sporadic Grit Storms',
		'Dust-Choked Winds',
		'Highly Variable Temperatures',
		'Blasted Atmosphere',
		'Freezing Night Winds',
		'Ceaseless Drought',
		'Moistureless',
		'Baked',
		'Sterile',
		'Unclouded Skies',
		'Dry Gusts',
		'Withered',
		'Icy Nights',
		'Perfectly Clear',
		'Absent',
		'No Atmosphere',
		'Utterly Still',
		'Peaceful',
		'Eerily Calm',
		'Airless',
		'Silent',
		'Inert',
		'Clear',
		'Invisible Mist',
		'Internal Rain',
		'Lost Clouds',
		'Crimson Heat',
		'Winds of Glass',
		'Thirsty Clouds',
		'Obsidian Heat',
		'Memories of Frost',
		'Haunted Frost',
		'Indetectable Burning',
		'[REDACTED]',
		'Anomalous',
		'Burning Crimson',
		'Scarlet Rain',
		'Fevered Clouds',
		'Carmine Winds',
		'Red Mist',
		'Flaming Hail',
		'Vermillion Storms',
		'Rain of Atlas',
		'Angered Clouds',
		'Blood Rain',
		'Bilious Storms',
		'Deadly Pressure Variations',
		'Harsh Toxic Wind',
		'Corrupted Blood',
		'Infinite Toxic Mist',
		'Echoes of Acid',
		'Poison Cyclones',
		'Inescapable Toxins',
		'Clouds of Haunted Green',
		'Invisible Jade Winds',
		'Frozen Mists',
		'Electric Rain',
		'Azure Storms',
		'Extreme Low Pressure',
		'All-Consuming Cold',
		'Winds from Beyond',
		'Unfathomable Storms',
		'Unimaginable Blue',
		'Ultramarine Wind',
		'Inverted Superstorms',
		'Coastal Storms'
	],
};


interface Rareza {
  [key: string]: string;
}

interface Rarezas {
  [key: string]: Rareza;
}

export function getRarezaData(): Rarezas {
  const rarezas: Rarezas = {
	rarity: {
		'Abundant':'Abundante',
		'High':'Alta',
		'Ample':'Rebosante',
		'Frequent':'Frecuente',
		'Full':'Lleno',
		'Generous':'Generoso',
		'Average':'Medio',
		'Regular':'Regular',
		'Common':'Común',
		'Typical':'Típico',
		'Ordinary':'Corriente',
		'Occasional':'Ocasional',
		'Low':'Bajo',
		'Scarce':'Escaso',
		'Infrequent':'Poco frecuente',
		'Rare':'Raro',
		'Limited':'Limitado',
		'Sporadic':'Esporádico',
		'None':'Nulo',
		'Deficient':'Deficiente',
		'Undetected':'No detectado',
		'Lacking':'Carente',
		'Absent':'Ausente',
		'Nonexistent':'Inexistente',
		'Unusual':'Inusual',
		'Lost':'Perdido',
		'Displaced':'Desplazado',
		'From Elsewhere':'De otro lugar',
		'Uprooted':'Desarraigado',
		'Misplaced':'Extraviado',
		'Forfeited':'Abandonado',
		'Between Worlds':'Entre mundos',
		'Infected':'Infectado',
		'Diseased':'Enfermo',
		'Twisted':'Retorcido',
		'Screaming':'Chillón',
		'Viral':'Viral',
		'Invasive':'Invasivo',
		'Bountiful':'Profusa',
		'Copious':'Copioso',
		'Rich':'Rico',
		'Numerous':'Numeroso',
		'Moderate':'Moderado',
		'Fair':'Frugal',
		'Medium':'Habitual',
		'Intermittent':'Intermitente',
		'Uncommon':'Atípico',
		'Few':'Exiguo',
		'Sparse':'Disperso',
		'Empty':'Vacío',
		'Not Present':'Agotado',
		'Devoid':'Falto',
		'Barren':'Seco',
  }
};
  return rarezas;
}

interface Rareza2 {
  [key: string]: string;
}

interface Rarezas2 {
  [key: string]: Rareza2;
}

export function getRareza2Data(): Rarezas2 {
  const rarezas2: Rarezas2 = {
	rarity: {
		'Abundant':'Abundante',
		'High':'Alta',
		'Ample':'Rebosante',
		'Frequent':'Frecuente',
		'Full':'Lleno',
		'Generous':'Generoso',
		'Average':'Medio',
		'Regular':'Regular',
		'Common':'Común',
		'Typical':'Típico',
		'Ordinary':'Corriente',
		'Occasional':'Ocasional',
		'Low':'Bajo',
		'Scarce':'Escaso',
		'Infrequent':'Poco frecuente',
		'Rare':'Raro',
		'Limited':'Limitado',
		'Sporadic':'Esporádico',
		'None':'Nulo',
		'Deficient':'Deficiente',
		'Undetected':'No detectado',
		'Lacking':'Carente',
		'Absent':'Ausente',
		'Nonexistent':'Inexistente',
		'Unusual':'Inusual',
		'Lost':'Perdido',
		'Displaced':'Desplazado',
		'From Elsewhere':'De otro lugar',
		'Uprooted':'Desarraigado',
		'Misplaced':'Extraviado',
		'Forfeited':'Abandonado',
		'Between Worlds':'Entre mundos',
		'Infected':'Infectado',
		'Diseased':'Enfermo',
		'Twisted':'Retorcido',
		'Screaming':'Chillón',
		'Viral':'Viral',
		'Invasive':'Invasivo',
		'Bountiful':'Profusa',
		'Copious':'Copioso',
		'Rich':'Rico',
		'Numerous':'Numeroso',
		'Moderate':'Moderado',
		'Fair':'Frugal',
		'Medium':'Habitual',
		'Intermittent':'Intermitente',
		'Uncommon':'Atípico',
		'Few':'Exiguo',
		'Sparse':'Disperso',
		'Empty':'Vacío',
		'Not Present':'Agotado',
		'Devoid':'Falto',
		'Barren':'Seco',
  }
};
  return rarezas2;
}


// Populates `planetDatalists.sentinels` with the data from `getSentinelData()`.
planetDatalists.sentinels = [];
const sentinels = getSentinelData();
const keyToValueMap: Record<string, string> = {};

for (const level in sentinels) {
    for (const key in sentinels[level]) {
        const value = sentinels[level][key];
        if (value) {
            planetDatalists.sentinels.push(key);
            keyToValueMap[key] = value;
        }
    }
}

export function datalists5(object: { [key: string]: string; }): string {
  let selectedValue = '';
  const datalist = document.createElement('datalist');
  datalist.id = 'sentinelsDatalist';
  for (const id in object) {
    const optionElement = document.createElement('option');
    optionElement.value = object[id];
    datalist.appendChild(optionElement);
  }
  document.body.appendChild(datalist);
const input = document.querySelector('input[list="sentinelsDatalist"]');
if (input) {
  input.addEventListener('input', function(e) {
    const selectedOption = Object.keys(object).find(key => object[key] === (e.target as HTMLInputElement).value);
    if (selectedOption) {
      e.preventDefault();
      (e.target as HTMLInputElement).value = selectedOption;
      selectedValue = selectedOption;
    }
  });
}
return selectedValue;
}

datalists5(keyToValueMap);

// Populates `planetDatalists.planetDescriptors` with the unique descriptors in `getDescriptorData()`.
const descriptors: Set<string> = new Set()
const planetDescriptors = getDescriptorData();
for (const biome in planetDescriptors) {
	for (const list in planetDescriptors[biome]) {
		planetDescriptors[biome][list].forEach(descriptor => descriptors.add(descriptor));
	}
}
planetDatalists.planetDescriptors = Array.from(descriptors);

// Populates `planetDatalists.resources` with the keys from `getResourceData()`.
planetDatalists.resources = Object.keys(getResourceData());




// Populates `planetDatalists.sentinels` with the data from `getSentinelData()`.
planetDatalists.rarezas = [];
const rarezas = getRarezaData();
const keyToValueMap2: Record<string, string> = {};

for (const level in rarezas) {
    for (const key in rarezas[level]) {
        const value = rarezas[level][key];
        if (value) {
            planetDatalists.rarezas.push(key);
            keyToValueMap2[key] = value;
        }
    }
}
export function datalists6(object: { [key: string]: string; }): string {
  let selectedValue = '';
  const datalist = document.createElement('datalist');
  datalist.id = 'rarezasDatalist';
  for (const id in object) {
    const optionElement = document.createElement('option');
    optionElement.value = object[id];
    datalist.appendChild(optionElement);
  }
  document.body.appendChild(datalist);
const input = document.querySelector('input[list="rarezasDatalist"]');
if (input) {
  input.addEventListener('input', function(e) {
    const selectedOption = Object.keys(object).find(key => object[key] === (e.target as HTMLInputElement).value);
    if (selectedOption) {
      e.preventDefault();
      (e.target as HTMLInputElement).value = selectedOption;
      selectedValue = selectedOption;
    }
  });
}
return selectedValue;
}

datalists6(keyToValueMap2);


// Populates `planetDatalists.sentinels` with the data from `getSentinelData()`.
planetDatalists.rarezas2 = [];
const rarezas2 = getRareza2Data();
const keyToValueMap3: Record<string, string> = {};

for (const level in rarezas2) {
    for (const key in rarezas2[level]) {
        const value = rarezas2[level][key];
        if (value) {
            planetDatalists.rarezas2.push(key);
            keyToValueMap3[key] = value;
        }
    }
}

export function datalists7(object: { [key: string]: string; }): string {
  let selectedValue = '';
  const datalist = document.createElement('datalist');
  datalist.id = 'rarezas2Datalist';
  for (const id in object) {
    const optionElement = document.createElement('option');
    optionElement.value = object[id];
    datalist.appendChild(optionElement);
  }
  document.body.appendChild(datalist);
const input = document.querySelector('input[list="rarezas2Datalist"]');
if (input) {
  input.addEventListener('input', function(e) {
    const selectedOption = Object.keys(object).find(key => object[key] === (e.target as HTMLInputElement).value);
    if (selectedOption) {
      e.preventDefault();
      (e.target as HTMLInputElement).value = selectedOption;
      selectedValue = selectedOption;
    }
  });
}
return selectedValue;
}

datalists7(keyToValueMap3);



export default planetDatalists;