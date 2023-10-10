function getBiomeSentence(biome: string, creatureName: string, planetName: string) {
	if (!biome || !creatureName || !planetName) return;
	const biomeSentences: { [key: string]: string[] } = {
		Barren: [
			`${creatureName} was first recorded in the dustbowls of planet ${planetName}.`,
			`${creatureName} was first recorded soaring over the dustbowls of planet ${planetName}.`,
			`${creatureName} was found swimming the calm, temperate waters of planet ${planetName}.`,
			`${creatureName} was recorded in the oceans of planet ${planetName}, where the waters teem with an easy abundance denied to the sand-blasted surface.`,
			`Discovered amidst the grit and dust of planet ${planetName}.`,
			`Discovered on ${planetName}, where they survive the dry and barren conditions.`,
			`Discovered soaring over the grit and dust of planet ${planetName}.`,
			`Encountered in the waters of planet ${planetName}, where the water maintains a steady warm in spite of the wild temperature swings of the surface world.`,
			`Encountered on planet ${planetName}, where they survive despite the near-constant drought.`,
			`First recorded gliding in the dusty winds of planet ${planetName}.`,
			`First recorded in the dunes of planet ${planetName}.`,
			`First recorded in the sand-choked skies of planet ${planetName}.`,
			`First recorded on the dusty open landscapes of planet ${planetName}.`,
			`Found floating above the barren plains of planet ${planetName}.`,
			`Found in the billowing dust of planet ${planetName}.`,
			`Found in the seas of planet ${planetName}, the water an oasis in the lifeless desert of the surface world.`,
			`Found on planet ${planetName}, where ${creatureName} has adapted to the frequent swings in temperature.`,
			`Found on the barren plains of planet ${planetName}.`,
			`Found on the wind-blasted plains of planet ${planetName}.`,
			`Recorded in the seas of planet ${planetName}, the watery depths a stark contrast to its dusty, barren surface.`,
		],
		Exotic: [
			`${creatureName} makes it home in the harsh, fractal world of ${planetName}.`,
			`Discovered amidst the parched and tortured hills of planet ${planetName}.`,
			`Discovered floating among the apparently non-sentient bubbles of planet ${planetName}.`,
			`Emerged on the planet ${planetName}, where it roams the dreamy moonscapes untouched by mortal concerns.`,
			`Encountered amidst the endless confusion of planet ${planetName}.`,
			`Encountered amidst the otherworldly glowing flora and bizarre rock formations of planet ${planetName}.`,
			`Encountered lurking in the endless fractal dreams of planet ${planetName}.`,
			`Encountered roaming the fractured landscapes of planet ${planetName}.`,
			`Encountered wandering the remains of an ancient civilisation on planet ${planetName}.`,
			`First recorded blinking and lost amid the ethereal lights of planet ${planetName}{{sic}}`,
			`The host for this strange creature was found on planet ${planetName}, lurking in the endless mounds of discarded shells.`,
			`This creature was refracted into existence in the broken glasscape of planet ${planetName}.`,
		],
		Frozen: [
			`${creatureName} is found above the deep snow and icy forests of planet ${planetName}.`,
			`${creatureName} is found in the deep snow and icy forests of planet ${planetName}.`,
			`${creatureName} swims the waters of planet ${planetName}, an impossible being in a sea of impossible cold.`,
			`${creatureName} was first encountered in the icy depths of planet ${planetName}.`,
			`${creatureName} was first recorded swimming in the unimaginably cold seas of planet ${planetName}.`,
			`Chemically-adapted blood and an unusual metabolism keep ${creatureName} warm on the snowfields of planet ${planetName}.`,
			`Chemically-adapted blood and an unusual metabolism keep ${creatureName} warm on the snowy air of planet ${planetName}.`,
			`Discovered on planet ${planetName}, where they make their home amidst the ice.`,
			`Discovered on planet ${planetName}, where they make their home in sub-zero air.`,
			`Encountered in the icy seas of planet ${planetName}, where ${creatureName} survives despite the punishing cold.`,
			`Encountered in the never-ending ice storms of planet ${planetName}.`,
			`First encountered above the deep frosts of planet ${planetName}.`,
			`First encountered in the deep frosts of planet ${planetName}.`,
			`Found in the endless winter of planet ${planetName}.`,
			`Found on planet ${planetName}, home to harsh freezing winds.`,
			`Found on planet ${planetName}, where they fight to fly through the freezing fog and icy winds.`,
			`Found on planet ${planetName}, where they wander the freezing fog and deep snowdrifts.`,
			`Found thriving in the waters of planet ${planetName}, where it seeks deep-sea pockets of warmth, refuges against the relentless cold.`,
			`From the planet ${planetName}, where they fight for survival amidst permanent sub-zero temperatures.`,
			`Well-adapted to their home planet, ${creatureName} easily copes with sub-zero temperatures.`,
		],
		Irradiated: [
			`${creatureName} was first encountered in the irradiated seas of planet ${planetName}.`,
			`${creatureName} was first recorded in the shattered remains of planet ${planetName}, thriving despite the nuclear storms.`,
			`${creatureName} was found in the oceans of planet ${planetName}, where the water is as irradiated as its nuclear-blasted surface.`,
			`Discovered amidst the thermonuclear fog of planet ${planetName}.`,
			`Discovered on ${planetName}, where they survive despite hostile levels of background radiation.`,
			`Encountered in the radioactive seas of planet ${planetName}, where ${creatureName} thrives in the balmy, high-energy water.`,
			`Encountered on ${planetName}, where they have adapted to the nuclear catastrophe that enveloped the planet.`,
			`First recorded in the irradiated atmosphere of planet ${planetName}.`,
			`First recorded on the uranium-infused atmosphere of planet ${planetName}.`,
			`First recorded on the uranium-soaked landscapes of planet ${planetName}.`,
			`Found in the gamma-drenched skies of planet ${planetName}.`,
			`Found in the radiation-blasted skies of planet ${planetName}.`,
			`Found on planet ${planetName}, where ${creatureName} thrives despite the never-ending radioactive glow.`,
			`Found on planet ${planetName}, where they had adapted to the hot, highly-radioactive atmosphere.`,
			`Found on the gamma-drenched surface of planet ${planetName}.`,
			`Found on the radiation-blasted plains of planet ${planetName}.`,
			`Found swimming the contaminated oceans of planet ${planetName}.`,
			`Recorded in the highly-radioactive seas of planet ${planetName}.`,
		],
		Lush: [
			`${creatureName} makes its home above the fields and trees of planet ${planetName}.`,
			`${creatureName} makes its home in the fields of planet ${planetName}.`,
			`${creatureName} was discovered in the verdant landscapes of planet ${planetName}.`,
			`${creatureName} was discovered soaring over the verdant landscapes of planet ${planetName}.`,
			`${creatureName} was first encountered swimming in the milk-warm seas of planet ${planetName}.`,
			`${creatureName} was found roaming the bustling, bountiful oceans of planet ${planetName}.`,
			`${creatureName} was recorded in the pale blue waters of planet ${planetName}.`,
			`A forest creature, at home flitting in and above the rich canopies of planet ${planetName}.`,
			`A grasslands creature, at home in lush plains of planet ${planetName}.`,
			`A wide-ranging creature, ${creatureName} was found in the grasslands of planet ${planetName}.`,
			`A wide-ranging flier, ${creatureName} was recorded above the grasslands of planet ${planetName}.`,
			`Discovered on planet ${planetName}, ${creatureName} swims freely in the temperate, bountiful water of its home seas.`,
			`Drawn to verdant landscapes, ${creatureName} is found on lush, temperate worlds.`,
			`First discovered flying over the plant-filled landscapes of planet ${planetName}.`,
			`First discovered roaming the plant-filled landscapes of planet ${planetName}.`,
			`First recorded on planet ${planetName}, where ${creatureName} frolics in the water of its calm and sheltered seas.`,
			`Found on planet ${planetName}, ${creatureName} has adapted to the temperate climate and humid atmosphere.`,
			`Found on planet ${planetName}, where they roamed both forest and grassland.`,
			`Found on planet ${planetName}, where they soar freely over both forest and grassland.`,
			`Found on the planet ${planetName}, where the temperate climate and frequent rainfall encourage the rapid evolution of new lifeforms.`,
			`Found primarily in the humid, muggy skies of planet ${planetName}.`,
			`Found primarily on the grassy plains of planet ${planetName}.`,
			`Found soaring over the temperate grasslands of planet ${planetName}.`,
			`Found wandering the temperate grasslands of planet ${planetName}.`,
		],
		Marsh: [
			`${creatureName} inhabits the weed-strewn waters of planet ${planetName}.`,
			`${creatureName} lives in the misty skies of planet ${planetName}.`,
			`${creatureName} makes its nests in the mangroves of planet ${planetName}.`,
			`${creatureName} thrives in the slimy waters of planet ${planetName}.`,
			`An air-dwelling creature, ${creatureName} was discovered above the swamps of planet ${planetName}.`,
			`Discovered in the rainy marshes of planet ${planetName}.`,
			`Discovered swimming in the murky oceans of planet ${planetName}.`,
			`Endemic to the boggy plains of planet ${planetName}.`,
			`First recorded flying over the sodden wetlands of planet ${planetName}.`,
			`Found wading through the wetlands of ${planetName}.`,
			`Preferring a moist climate, ${creatureName} is at home in the swamps of planet ${planetName}.`,
			`Preferring to keep dry, ${creatureName} mostly dwells in the skies of its swampy home planet ${planetName}.`,
			`Recorded populating the muddy seas of planet ${planetName}.`,
			`Suited to swamplike conditions, ${creatureName} is found on worlds high in moisture and humidity.`,
			`Thriving in wet conditions, ${creatureName} is found on humid, swampy worlds.`,
		],
		'Mega Exotic': [
			`${creatureName} swims the tortured, fractal waters of ${planetName}.`,
			`Encountered in the deep waters of planet ${planetName}, where ${creatureName} is carried by endless looping currents.`,
			`First recorded in the seas of planet ${planetName}, where it fights against the living oceans.`,
			`Found in the anomalous water of planet ${planetName}. It does not drink the water.`,
			`Found in the haunted depths of planet ${planetName}.`,
			`Found soaring in haunted, mournful skies of planet ${planetName}.`,
			`Found wandering the fevered, dreamlike landscape of planet ${planetName}.`,
		],
		Scorched: [
			`${creatureName} swims the steaming oceans of planet ${planetName}, seemingly impervious to the ferocious heat of the water.`,
			`${creatureName} was first recorded on planet ${planetName}, surviving despite the extreme temperature.`,
			`${creatureName} was first recorded swimming in the boiling, inhospitable seas of planet ${planetName}.`,
			`At home in the burning air of planet ${planetName}.`,
			`At home in the scorched landscapes of planet ${planetName}.`,
			`Despite the fierce heat, ${creatureName} survives happily on planet ${planetName}.`,
			`Discovered on the sun-battered surface of planet ${planetName}.`,
			`Discovered on the sun-soaked atmosphere of planet ${planetName}.`,
			`Discovered while exploring the overwhelming heat of planet ${planetName}.`,
			`Encountered in the bubbling seas of planet ${planetName}, where ${creatureName} revels in the near-boiling temperatures.`,
			`Found in the super-heated depths of planet ${planetName}.`,
			`Found on planet ${planetName}, sweltering in the baking heat.`,
			`Found soaring over the scorched plains of the planet ${planetName}.`,
			`Found wandering the scorched plains of the planet ${planetName}.`,
			`From the planet ${planetName}, where they struggle daily against the scorching temperatures.`,
			`Recorded in the oceans of planet ${planetName}, ${creatureName} thrives despite the painfully hot water.`,
			`Specially adapted to the unimaginable heat, ${creatureName} was first encountered on planet ${planetName}.`,
			`Torched by the extreme solar heat, ${creatureName} survives on planet ${planetName}.`,
		],
		Toxic: [
			`${creatureName} is at home above the toxic floods plain of planet ${planetName}.`,
			`${creatureName} is at home in the toxic floods of planet ${planetName}.`,
			`${creatureName} was first recorded in the corroded landscapes of planet ${planetName}.`,
			`${creatureName} was first recorded soaring above the corroded landscapes of planet ${planetName}.`,
			`${creatureName} was first recorded swimming in the caustic, doom-brined seas of planet ${planetName}.`,
			`${creatureName} was found deep in the toxic waters of planet ${planetName}.`,
			`Encountered in the seas of planet ${planetName}, where ${creatureName} thrives despite the poisonous, punishing water.`,
			`Encountered on planet ${planetName}, where they live despite highly toxic conditions.`,
			`Encountered on planet ${planetName}, where they navigate caustic ground and choking acid rain.`,
			`Encountered on planet ${planetName}, where they thrive in the chokingly toxic atmosphere.`,
			`First encountered in the caustic air of planet ${planetName}.`,
			`First encountered on the caustic landscapes of planet ${planetName}.`,
			`First recorded in the oceans of planet ${planetName}, where its strange biology allows it to thrive despite the flesh-stripping toxicity of the water.`,
			`First recorded on the boiling acid planet ${planetName}.`,
			`Found in the alkaline seas of planet ${planetName}, ${creatureName} shows no ill-effects from its toxic home waters.`,
			`Highly adapted to the ferocious toxicity of its home, planet ${planetName}.`,
			`Recorded in the poisonous rain and toxic air of planet ${planetName}.`,
			`Thrives on planet ${planetName}, despite the constant acid rain.`,
		],
		Volcanic: [
			`${creatureName} inhabits the ash-filled skies of planet ${planetName}.`,
			`${creatureName} lives a fragile existence in the superheated skies of planet ${planetName}.`,
			`${creatureName} makes its home among the hot-tipped trees of planet ${planetName}.`,
			`Discovered among the volcanic rocks of planet ${planetName}.`,
			`Encountered in planet ${planetName}'s hot oceans, the cold-blooded ${creatureName} thrives in the extreme temperatures.`,
			`Impervious to the extreme heat, ${creatureName} flourishes on planet ${planetName}.`,
			`Native to planet ${planetName}, where they live brief and sweaty lives.`,
			`Originating from planet ${planetName}, drifting on the hot volcanic winds.`,
			`Taxed by the burning atmosphere, ${creatureName} manages to endure on planet ${planetName}.`,
		]
	}
	return biomeSentences[biome];
}

export default getBiomeSentence;