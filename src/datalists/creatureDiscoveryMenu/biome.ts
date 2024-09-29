function getBiomeSentenceData(biome: string, creatureName: string, planetName: string) {
	if (!biome || !creatureName || !planetName) return;
	const biomeSentences: { [key: string]: { [key: string]: string[] } } = {
		Lush: {
			Ground: [
				`${creatureName} makes its home in the fields of planet ${planetName}.`,
				`Found wandering the temperate grasslands of planet ${planetName}.`,
				`Found primarily on the grassy plains of planet ${planetName}.`,
				`${creatureName} was discovered in the verdant landscapes of planet ${planetName}.`,
				`A grasslands creature, at home in lush plains of planet ${planetName}.`,
				`Drawn to verdant landscapes, ${creatureName} is found on lush, temperate worlds.`,
				`A wide-ranging creature, ${creatureName} was found in the grasslands of planet ${planetName}.`,
				`First discovered roaming the plant-filled landscapes of planet ${planetName}.`,
				`Found on planet ${planetName}, where they roamed both forest and grassland.`,
				`Found on the planet ${planetName}, where the temperate climate and frequent rainfall encourage the rapid evolution of new lifeforms.`,
				`Found on planet ${planetName}, ${creatureName} has adapted to the temperate climate and humid atmosphere.`,
			],
			Air: [
				`${creatureName} makes its home above the fields and trees of planet ${planetName}.`,
				`Found soaring over the temperate grasslands of planet ${planetName}.`,
				`Found primarily in the humid, muggy skies of planet ${planetName}.`,
				`${creatureName} was discovered soaring over the verdant landscapes of planet ${planetName}.`,
				`A forest creature, at home flitting in and above the rich canopies of planet ${planetName}.`,
				`Drawn to verdant landscapes, ${creatureName} is found on lush, temperate worlds.`,
				`A wide-ranging flier, ${creatureName} was recorded above the grasslands of planet ${planetName}.`,
				`First discovered flying over the plant-filled landscapes of planet ${planetName}.`,
				`Found on planet ${planetName}, where they soar freely over both forest and grassland.`,
				`Found on the planet ${planetName}, where the temperate climate and frequent rainfall encourage the rapid evolution of new lifeforms.`,
				`Found on planet ${planetName}, ${creatureName} has adapted to the temperate climate and humid atmosphere.`,
			],
			Water: [
				`Discovered on planet ${planetName}, ${creatureName} swims freely in the temperate, bountiful water of its home seas.`,
				`${creatureName} was found roaming the bustling, bountiful oceans of planet ${planetName}.`,
				`First recorded on planet ${planetName}, where ${creatureName} frolics in the water of its calm and sheltered seas.`,
				`${creatureName} was first encountered swimming in the milk-warm seas of planet ${planetName}.`,
				`${creatureName} was recorded in the pale blue waters of planet ${planetName}.`
			],
		},
		Toxic: {
			Ground: [
				`${creatureName} is at home in the toxic floods of planet ${planetName}.`,
				`Thrives on planet ${planetName}, despite the constant acid rain.`,
				`${creatureName} was first recorded in the corroded landscapes of planet ${planetName}.`,
				`First encountered on the caustic landscapes of planet ${planetName}.`,
				`First recorded on the boiling acid planet ${planetName}.`,
				`Encountered on planet ${planetName}, where they live despite highly toxic conditions.`,
				`Encountered on planet ${planetName}, where they thrive in the chokingly toxic atmosphere.`,
				`Recorded in the poisonous rain and toxic air of planet ${planetName}.`,
				`Highly adapted to the ferocious toxicity of its home, planet ${planetName}.`,
				`Encountered on planet ${planetName}, where they navigate caustic ground and choking acid rain.`,
			],
			Air: [
				`${creatureName} is at home above the toxic floods plain of planet ${planetName}.`,
				`Thrives on planet ${planetName}, despite the constant acid rain.`,
				`${creatureName} was first recorded soaring above the corroded landscapes of planet ${planetName}.`,
				`First encountered in the caustic air of planet ${planetName}.`,
				`First recorded on the boiling acid planet ${planetName}.`,
				`Encountered on planet ${planetName}, where they live despite highly toxic conditions.`,
				`Encountered on planet ${planetName}, where they thrive in the chokingly toxic atmosphere.`,
				`Recorded in the poisonous rain and toxic air of planet ${planetName}.`,
				`Highly adapted to the ferocious toxicity of its home, planet ${planetName}.`,
				`Encountered on planet ${planetName}, where they navigate caustic ground and choking acid rain.`,
			],
			Water: [
				`Encountered in the seas of planet ${planetName}, where ${creatureName} thrives despite the poisonous, punishing water.`,
				`${creatureName} was first recorded swimming in the caustic, doom-brined seas of planet ${planetName}.`,
				`${creatureName} was found deep in the toxic waters of planet ${planetName}.`,
				`First recorded in the oceans of planet ${planetName}, where its strange biology allows it to thrive despite the flesh-stripping toxicity of the water.`,
				`Found in the alkaline seas of planet ${planetName}, ${creatureName} shows no ill-effects from its toxic home waters.`
			]
		},
		Scorched: {
			Ground: [
				`Discovered on the sun-battered surface of planet ${planetName}.`,
				`Found on planet ${planetName}, sweltering in the baking heat.`,
				`From the planet ${planetName}, where they struggle daily against the scorching temperatures.`,
				`${creatureName} was first recorded on planet ${planetName}, surviving despite the extreme temperature.`,
				`Specially adapted to the unimaginable heat, ${creatureName} was first encountered on planet ${planetName}.`,
				`At home in the scorched landscapes of planet ${planetName}.`,
				`Found wandering the scorched plains of the planet ${planetName}.`,
				`Despite the fierce heat, ${creatureName} survives happily on planet ${planetName}.`,
				`Torched by the extreme solar heat, ${creatureName} survives on planet ${planetName}.`,
				`Discovered while exploring the overwhelming heat of planet ${planetName}.`,
			],
			Air: [
				`Discovered on the sun-soaked atmosphere of planet ${planetName}.`,
				`Found on planet ${planetName}, sweltering in the baking heat.`,
				`From the planet ${planetName}, where they struggle daily against the scorching temperatures.`,
				`${creatureName} was first recorded on planet ${planetName}, surviving despite the extreme temperature.`,
				`Specially adapted to the unimaginable heat, ${creatureName} was first encountered on planet ${planetName}.`,
				`At home in the burning air of planet ${planetName}.`,
				`Found soaring over the scorched plains of the planet ${planetName}.`,
				`Despite the fierce heat, ${creatureName} survives happily on planet ${planetName}.`,
				`Torched by the extreme solar heat, ${creatureName} survives on planet ${planetName}.`,
				`Discovered while exploring the overwhelming heat of planet ${planetName}.`,
			],
			Water: [
				`${creatureName} was first recorded swimming in the boiling, inhospitable seas of planet ${planetName}.`,
				`Encountered in the bubbling seas of planet ${planetName}, where ${creatureName} revels in the near-boiling temperatures.`,
				`Found in the super-heated depths of planet ${planetName}.`,
				`${creatureName} swims the steaming oceans of planet ${planetName}, seemingly impervious to the ferocious heat of the water.`,
				`Recorded in the oceans of planet ${planetName}, ${creatureName} thrives despite the painfully hot water.`
			]
		},
		Irradiated: {
			Ground: [
				`Found on the radiation-blasted plains of planet ${planetName}.`,
				`${creatureName} was first recorded in the shattered remains of planet ${planetName}, thriving despite the nuclear storms.`,
				`First recorded on the uranium-soaked landscapes of planet ${planetName}.`,
				`Discovered on ${planetName}, where they survive despite hostile levels of background radiation.`,
				`Found on planet ${planetName}, where ${creatureName} thrives despite the never-ending radioactive glow.`,
				`Found on the gamma-drenched surface of planet ${planetName}.`,
				`First recorded in the irradiated atmosphere of planet ${planetName}.`,
				`Discovered amidst the thermonuclear fog of planet ${planetName}.`,
				`Encountered on ${planetName}, where they have adapted to the nuclear catastrophe that enveloped the planet.`,
				`Found on planet ${planetName}, where they had adapted to the hot, highly-radioactive atmosphere.`,
			],
			Air: [
				`Found in the radiation-blasted skies of planet ${planetName}.`,
				`${creatureName} was first recorded in the shattered remains of planet ${planetName}, thriving despite the nuclear storms.`,
				`First recorded on the uranium-infused atmosphere of planet ${planetName}.`,
				`Discovered on ${planetName}, where they survive despite hostile levels of background radiation.`,
				`Found on planet ${planetName}, where ${creatureName} thrives despite the never-ending radioactive glow.`,
				`Found in the gamma-drenched skies of planet ${planetName}.`,
				`First recorded in the irradiated atmosphere of planet ${planetName}.`,
				`Discovered amidst the thermonuclear fog of planet ${planetName}.`,
				`Encountered on ${planetName}, where they have adapted to the nuclear catastrophe that enveloped the planet.`,
				`Found on planet ${planetName}, where they had adapted to the hot, highly-radioactive atmosphere.`,
			],
			Water: [
				`Recorded in the highly-radioactive seas of planet ${planetName}.`,
				`Encountered in the radioactive seas of planet ${planetName}, where ${creatureName} thrives in the balmy, high-energy water.`,
				`${creatureName} was first encountered in the irradiated seas of planet ${planetName}.`,
				`Found swimming the contaminated oceans of planet ${planetName}.`,
				`${creatureName} was found in the oceans of planet ${planetName}, where the water is as irradiated as its nuclear-blasted surface.`
			]
		},
		Frozen: {
			Ground: [
				`Discovered on planet ${planetName}, where they make their home amidst the ice.`,
				`Found on planet ${planetName}, where they wander the freezing fog and deep snowdrifts.`,
				`From the planet ${planetName}, where they fight for survival amidst permanent sub-zero temperatures.`,
				`${creatureName} is found in the deep snow and icy forests of planet ${planetName}.`,
				`Well-adapted to their home planet, ${creatureName} easily copes with sub-zero temperatures.`,
				`Chemically-adapted blood and an unusual metabolism keep ${creatureName} warm on the snowfields of planet ${planetName}.`,
				`First encountered in the deep frosts of planet ${planetName}.`,
				`Found in the endless winter of planet ${planetName}.`,
				`Encountered in the never-ending ice storms of planet ${planetName}.`,
				`Found on planet ${planetName}, home to harsh freezing winds.`,
			],
			Air: [
				`Discovered on planet ${planetName}, where they make their home in sub-zero air.`,
				`Found on planet ${planetName}, where they fight to fly through the freezing fog and icy winds.`,
				`From the planet ${planetName}, where they fight for survival amidst permanent sub-zero temperatures.`,
				`${creatureName} is found above the deep snow and icy forests of planet ${planetName}.`,
				`Well-adapted to their home planet, ${creatureName} easily copes with sub-zero temperatures.`,
				`Chemically-adapted blood and an unusual metabolism keep ${creatureName} warm on the snowy air of planet ${planetName}.`,
				`First encountered above the deep frosts of planet ${planetName}.`,
				`Found in the endless winter of planet ${planetName}.`,
				`Encountered in the never-ending ice storms of planet ${planetName}.`,
				`Found on planet ${planetName}, home to harsh freezing winds.`,
			],
			Water: [
				`${creatureName} was first encountered in the icy depths of planet ${planetName}.`,
				`Encountered in the icy seas of planet ${planetName}, where ${creatureName} survives despite the punishing cold.`,
				`${creatureName} was first recorded swimming in the unimaginably cold seas of planet ${planetName}.`,
				`${creatureName} swims the waters of planet ${planetName}, an impossible being in a sea of impossible cold.`,
				`Found thriving in the waters of planet ${planetName}, where it seeks deep-sea pockets of warmth, refuges against the relentless cold.`
			]
		},
		Barren: {
			Ground: [
				`Found on the barren plains of planet ${planetName}.`,
				`${creatureName} was first recorded in the dustbowls of planet ${planetName}.`,
				`First recorded on the dusty open landscapes of planet ${planetName}.`,
				`Discovered on ${planetName}, where they survive the dry and barren conditions.`,
				`Found on planet ${planetName}, where ${creatureName} has adapted to the frequent swings in temperature.`,
				`Found in the billowing dust of planet ${planetName}.`,
				`First recorded in the dunes of planet ${planetName}.`,
				`Discovered amidst the grit and dust of planet ${planetName}.`,
				`Encountered on planet ${planetName}, where they survive despite the near-constant drought.`,
				`Found on the wind-blasted plains of planet ${planetName}.`,
			],
			Air: [
				`Found floating above the barren plains of planet ${planetName}.`,
				`${creatureName} was first recorded soaring over the dustbowls of planet ${planetName}.`,
				`First recorded gliding in the dusty winds of planet ${planetName}.`,
				`Discovered on ${planetName}, where they survive the dry and barren conditions.`,
				`Found on planet ${planetName}, where ${creatureName} has adapted to the frequent swings in temperature.`,
				`Found in the billowing dust of planet ${planetName}.`,
				`First recorded in the sand-choked skies of planet ${planetName}.`,
				`Discovered soaring over the grit and dust of planet ${planetName}.`,
				`Encountered on planet ${planetName}, where they survive despite the near-constant drought.`,
				`Found on the wind-blasted plains of planet ${planetName}.`,
			],
			Water: [
				`Recorded in the seas of planet ${planetName}, the watery depths a stark contrast to its dusty, barren surface.`,
				`Found in the seas of planet ${planetName}, the water an oasis in the lifeless desert of the surface world.`,
				`Encountered in the waters of planet ${planetName}, where the water maintains a steady warm in spite of the wild temperature swings of the surface world.`,
				`${creatureName} was found swimming the calm, temperate waters of planet ${planetName}.`,
				`${creatureName} was recorded in the oceans of planet ${planetName}, where the waters teem with an easy abundance denied to the sand-blasted surface.`
			]
		},
		Exotic: {
			Struct: [
				`Encountered amidst the endless confusion of planet ${planetName}.`
			],
			Beam: [
				`First recorded blinking and lost amid the ethereal lights of planet ${planetName}`
			],
			Hex: [
				`${creatureName} makes it home in the harsh, fractal world of ${planetName}.`,
				`Encountered amidst the otherworldly glowing flora and bizarre rock formations of planet ${planetName}.`
			],
			Fract: [
				`Encountered lurking in the endless fractal dreams of planet ${planetName}.`
			],
			Bubble: [
				`Discovered floating among the apparently non-sentient bubbles of planet ${planetName}.`
			],
			Shard: [
				`Encountered roaming the fractured landscapes of planet ${planetName}.`
			],
			Contour: [
				`Emerged on the planet ${planetName}, where it roams the dreamy moonscapes untouched by mortal concerns.`
			],
			Shell: [
				`The host for this strange creature was found on planet ${planetName}, lurking in the endless mounds of discarded shells.`
			],
			Bone: [
				`Discovered amidst the parched and tortured hills of planet ${planetName}.`
			],
			Wire: [
				`This creature was refracted into existence in the broken glasscape of planet ${planetName}.`
			],
			Hydro: [
				`Encountered wandering the remains of an ancient civilisation on planet ${planetName}.`
			]
		},
		'Mega Exotic': {
			Ground: [
				`Found wandering the fevered, dreamlike landscape of planet ${planetName}.`,
			],
			Air: [
				`Found soaring in haunted, mournful skies of planet ${planetName}.`,
			],
			Water: [
				`Found in the haunted depths of planet ${planetName}.`,
				`Found in the anomalous water of planet ${planetName}. It does not drink the water.`,
				`First recorded in the seas of planet ${planetName}, where it fights against the living oceans.`,
				`Encountered in the deep waters of planet ${planetName}, where ${creatureName} is carried by endless looping currents.`,
				`${creatureName} swims the tortured, fractal waters of ${planetName}.`
			]
		},
		Marsh: {
			Ground: [
				`${creatureName} nests in the humid swamps of planet ${planetName}.`,
				`Found wading through the wetlands of planet ${planetName}.`,
				`Endemic to the boggy plains of planet ${planetName}.`,
				`Discovered wandering the dense marshes of planet ${planetName}.`,
				`Preferring a moist climate, ${creatureName} is at home in the swamps of planet ${planetName}.`,
				`Thriving in wet conditions, ${creatureName} is found on humid, swampy worlds.`,
				`A territorial creature, ${creatureName} was first identified in the wetlands of planet ${planetName}.`,
				`Initially discovered inhabiting the foliage-rich landscapes of planet ${planetName}.`,
				`Found wandering the misty swamps of planet ${planetName}.`,
				`Discovered in the rainy marshes of planet ${planetName}.`,
			],
			Air: [
				`${creatureName} lives in the misty skies of planet ${planetName}.`,
				`Preferring to keep dry, ${creatureName} mostly dwells in the skies of its swampy home planet ${planetName}.`,
				`Happy in humid conditions, ${creatureName} is found in the steamy atmosphere of planet ${planetName}.`,
				`${creatureName} was discovered floating over planet ${planetName}'s marshy terrain.`,
				`${creatureName} makes its nests in the mangroves of planet ${planetName}.`,
				`Suited to swamplike conditions, ${creatureName} is found on worlds high in moisture and humidity.`,
				`An air-dwelling creature, ${creatureName} was discovered above the swamps of planet ${planetName}.`,
				`First recorded flying over the sodden wetlands of planet ${planetName}.`,
				`Discovered on planet ${planetName}, gliding happily through the humid skies.`,
				`Native to the skies of planet ${planetName}, where ${creatureName} enjoys plentiful food and water.`
			],
			Water: [
				`Discovered swimming in the murky oceans of planet ${planetName}.`,
				`${creatureName} inhabits the weed-strewn waters of planet ${planetName}.`,
				`Recorded populating the muddy seas of planet ${planetName}.`,
				`${creatureName} thrives in the slimy waters of planet ${planetName}.`,
				`${creatureName} was discovered in the deep waters of planet ${planetName}.`
			]
		},
		Volcanic: {
			Ground: [
				`Discovered treading the surface of planet ${planetName} on thick-skinned feet.`,
				`Found on planet ${planetName}, conserving energy in the oppressive heat.`,
				`Native to planet ${planetName}, where they live brief and sweaty lives.`,
				`The heat-resilient ${creatureName} is from planet ${planetName}.`,
				`Evolved to filter ash and smog from their lungs, ${creatureName} was first recorded on planet ${planetName}.`,
				`${creatureName} has adapted to depend upon the lava flows of planet ${planetName}.`,
				`Encountered roaming the hot and volatile plains of planet ${planetName}.`,
				`${creatureName} thrives on planet ${planetName}, invigorated by the extreme temperatures.`,
				`Taxed by the burning atmosphere, ${creatureName} manages to endure on planet ${planetName}.`,
				`Discovered amongst the volcanic rocks of planet ${planetName}.`,
			],
			Air: [
				`Discovered soaring through the smoky skies of ${planetName}.`,
				`Found flying over planet ${planetName}, weaving between the active volcanoes.`,
				`Originating from planet ${planetName}, drifting on the hot volcanic winds.`,
				`${creatureName} inhabits the ash-filled skies of planet ${planetName}.`,
				`${creatureName} makes its home among the hot-tipped trees of planet ${planetName}.`,
				`Adapted to endure the ash-choked air of planet ${planetName}.`,
				`Spotted gliding above the volcanic plains of planet ${planetName}.`,
				`Impervious to the extreme heat, ${creatureName} flourishes on planet ${planetName}.`,
				`${creatureName} lives a fragile existence in the superheated skies of planet ${planetName}.`,
				`Discovered in the smoke-filled atmosphere of planet ${planetName}.`
			],
			Water: [
				`First discovered diving in the boiling seas of planet ${planetName}.`,
				`Encountered in planet ${planetName}'s hot oceans, the cold-blooded ${creatureName} thrives in the extreme temperatures.`,
				`Discovered diving to the magma-warmed depths of planet ${planetName}.`,
				`In planet ${planetName}'s lava-hot oceans, ${creatureName} makes its underwater habitat.`,
				`Recorded inhabiting ${planetName}'s hot, ash-polluted waters.`
			]
		}
	}
	return biomeSentences;
}

function getBiomeSentence(biome: string, creatureName: string, planetName: string): string[] {
	const biomeSentences = getBiomeSentenceData(biome, creatureName, planetName);
	if (!biomeSentences) return [];
	const biomeValues = biomeSentences[biome];
	const combinedBiomeValues = Object.values(biomeValues).flat();
	const uniqueBiomeValues = new Set(combinedBiomeValues);

	return Array.from(uniqueBiomeValues);
}

export default getBiomeSentence;