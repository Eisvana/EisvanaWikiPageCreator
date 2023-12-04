import { robotSentences } from './diet';

const creaturePassiveTemperamentSentences = {
	UI_CREA_DESC_PASSIVE1: [
		'Their search for food drags them far and wide across the planet, their journey never ending.',
		'Their natural high stamina serves them well as they wander, walking countless miles in their search for food and shelter.',
		'Remarkably high endurance means they rarely stop moving, able to gaze endlessly as they migrate across the planet.',
		'Migratory in nature, their seasonal wanders take them from one pole to the other, moving as the light levels change.',
		"Their search for a mate takes them countless miles across the planet's surface, an arduous and long-distance journey for love."
	],
	UI_CREA_DESC_PASSIVE2: [
		'Tough, hardy wanderers, they spend their lives on the move. Their existence is a constant, slow-moving race against predators and starvation.',
		'Drawn by magnetic forces on long journeys across the planet, their lives are spent in constant motion.',
		'Always on the move, these nomadic grazers search far and wide for the perfect grazing sites.',
		'Weaker than their appearance suggests, they make up for the many who die on their nomadic wanderings with frequent and rapid breeding.',
		"Their soul responds to some rhythm deep within the planet's core, causing them to wander endlessly to its slow marching beat."
	],
	UI_CREA_DESC_PASSIVE3: [
		'Possessing a calm intelligence, their piercing eyes never forget a face.',
		'A remarkable fusion between their optic nerve and hippocampus means visual data is instantaneously and perfectly stored. An adaptation for navigation, perhaps. But it ensures they will never forget you.',
		'Highly social and with a complex herd hierarchy, their remarkable memory ensures they never forget the face of another creature, be they friend or foe.',
		'Highly intelligent, they remember every encounter they ever have with another species.',
		'A higher order intelligence lives within its skull. The analysis process reveals an eidetic memory, though some brain functions appear resistant to the scanner.',
	],
	UI_CREA_DESC_PASSIVE4: [
		'Submissive without being timid, these gentle creatures know no fear, only curiosity.',
		'Gentle animals at heart, they wish only to be left in peace to roam.',
		'Powerful but submissive, they have evolved to avoid confrontation.',
		'Yielding quickly in direct confrontation, their non-threatening nature is a successful counter-strategy in an aggressive world.',
		'Submissive and gentle in their relationships with one another, they nonetheless respond forcefully when threatened by other creatures.'
	],
	UI_CREA_DESC_PASSIVE5: [
		'Unusually intelligent, they are highly perceptive of their sensory environment, reacting to patterns and signal beyond the observation of most species.',
		"Scans reveal an unusual 'double brain' structure, where extra lobes run in parallel and increase decision making speed.",
		'High growth hormone levels in their brains have caused an unusually dense neuron structure. What this extra neural power is used for is unclear.',
		'Scans reveal small neural clusters growing all over their nervous system, creating a highly complex distributed brain network.',
		'Brain scans reveal unusually developed language centres within the supramarginal gyrus. The method by which they use this power is unclear.'
	],
	UI_CREA_DESC_PASSIVE6: [
		'Gentle, passive creatures. Dull and unintelligent in attitude, they are nonetheless content and unworried.',
		'Poor sensory systems leave this typically passive creature unable to perceive much of the external world. However, brain scans reveal a deep, rich inner life.',
		'Brain scans reveal unusually structured hypothalamus. It appears they perceive time on a different scale to most life, leading to their unflustered, passive temperament.',
		'Passive, they are happy to ignore most animal life unless forced by circumstance to pay attention.',
		'Slow moving, passive creatures, they are content to focus only on plantlife.'
	],
	UI_CREA_DESC_PASSIVE7: [
		'Friendly and curious by nature, they will take a keen interest in any new lifeforms they encounter.',
		'Gentle creatures, they are governed by a friendly and highly trusting temperament.',
		'Scans reveal them to be highly intelligent. However, they are easily tamed and appear content to follow the whims of other creatures.',
		'Highly docile. This behaviour appears to be instinctive, as if they have evolved to serve the whims of a complex herding predator.',
		'Brain scans are unable to capture the true essence of their simple happiness.'
	],
	UI_CREA_DESC_PASSIVE8: ['Possessed of a tremendous natural strength, they fear no other creature that walks upon this world.'],
	UI_CREA_DESC_PASSIVE9: ['Long-lived and gentle, their rich lives and complex society hierarchy allow them to develop wisdom that rivals technologically advanced species.']
}

const temperamentSentences: { [key: string]: { [key: string]: string[] } } = {
	None: {
		Unintelligent: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE1,
		Migratory: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE2,
		Hibernator: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE3,
		Distinctive: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE4,
		Active: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE5,
		Erratic: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE6,
		Unpredictable: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE7,
		Bold: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE8,
		Sedate: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE9,
	},
	Predator: {
		'Careful hunter': [
			'Predatory in habit, they stalk their prey with a great degree of care.',
			'A vicious predator, they take great care as they hunt down their prey.',
			'A natural predator, they stalk their prey with great care.',
			'An intelligent predator, they hunt with skill and stealth.',
			'A sharp intelligence flashes in their eyes. They are careful, methodical hunters.'
		],
		'Patient hunter': [
			'Patient by nature, they watch their prey carefully before striking, wasting no energy on failed hunts.',
			'A well-regulated digestive system means they need only feed very occasionally. They are free to be patient in their search for prey.',
			'Calm in spirit, they appear almost serene. This surface impression belies the cruelty latent in this vicious hunter.',
			'A slow but relentless predator. Once they have begun their hunt there is little that will stop them.',
			'A patient predator, they are willing to wait for days on end for the perfect moment to strike.'
		],
		Cautious: [
			'Nervous in habit, despite their predatory nature. They too are prey.',
			'Cautious and deliberate, they skitter from hunt to hunt, always on the lookout for those who would steal their prey.',
			'An unkind, jealous predator. They would sooner steal food from their own family than undertake a difficult hunt.',
			"Always on the lookout, their cautious nature reflects the sudden and violent cruelty of their own crude 'society'.",
			'Cautious by nature, they stalk their prey carefully. Once they have selected a target, this methodical hunter rarely fails to make a kill.'
		],
		Impulsive: [
			'An impulsive hunter, they are quick to lash out at any creature unfortunate enough to wander into their territory.',
			'Mindless and quick to rush into action, these predatory beasts have evolved fast-healing skin as a response to the frequent beatings they endure in poorly judged fights.',
			'An ancient predator, its mind has evolved impulsive hunting instincts. With no higher brain function, they simply follow the aggressive impulses that flash across their synapses.',
			'Impulsive and unpredictable, these vicious predators are as quick to pick a fight with their own kin as they are to hunt prey or attack a rival.',
			'Predatory in habit, they choose their prey impulsively, lashing out with an unpredictable ferocity.'
		],
		Reckless: [
			'A vicious predator, they chase their prey with reckless abandon.',
			'A reckless predator, they charge into fights, caring little for stealth or ambush.',
			'A reckless predator, they happily hunt creatures far larger than themselves.',
			"Adrenaline glands embedded throughout the dermal layer suppress this beast's awareness of pain.",
			'Driven by blind fury, this predator is oblivious to all but their prey during a hunt.'
		],
		Aggressive: [
			'An efficient hunter with high energy reserves. Deters other predators with untiring aggression.',
			'Highly territorial, this predator continually marks their hunting grounds with scent. Pheromones are undetectable by herbivore species.',
			'This species has a constantly shifting social structure, with dominance established by physical strength and aggression.',
			'A crafty hunter, known to kill the young of competing species.',
			'This predator will attack anything within proximity. Their sheer aggression intimidates prey and competitors alike.'
		],
		Unafraid: [
			'This brain of this creature produces no stress-related hormones, resulting in a predator entirely uninhibited by fear.',
			'A fearless, highly specialised hunter. Shortened neural pathways allow for near-instant cognitive processing, eliminating the need for base emotion.',
			'A desperate, ravenous hunter. Inefficient energy processing means this creature is forever seeking their next meal, hunger overriding any sense of danger.',
			'The flesh of these creatures is poisonous to most other species. They have no natural predators, and hunt totally unafraid.',
			'This predator is naturally curious, and will eat most other species. An internal array of beak-like protrusions help digest unusual food.'
		],
		'Cold-blooded': [
			'This species lives communally in deep underground burrows, huddled to preserve warmth. They drag their prey deep into the earth before feeding.',
			'This predator moves slowly and deliberately, preserving their energy for the hunt. They pursue their prey in short, intense sprints.',
			'This creature has an especially slow digestive cycle, eating one meal a week and hibernating between hunts.',
			'A cold-blooded killer, this creature will spend days hunting for an ideal target, ignoring the effects of starvation.',
			'An endothermic predator, this creature maintains a low body temperature while resting. The scent of prey accelerates their metabolism, warming their blood for the hunt.'
		],
		'Does not fear death': [
			'This predator will kill and often cannibalise their young, eliminating the weak. Only the hardiest creatures reach maturity, and are completely without fear.',
			"Gripped by bloodlust during a hunt. Released from their frenzy only when their prey's heartbeat goes still.",
			'This dangerous predator is alerted to their own injuries only by scent, and cannot feel pain.',
			'Lacking a central nervous system, this primitive predator responds to stimuli by reflex only. They are barely conscious, and cannot feel fear.',
			'This solo hunter is optimised for killing and eating. Their nervous system is focused purely on survival.'
		],
		Intelligent: [
			"This predator studies their prey's behaviour from afar, determining points of weakness and calculating the best time to strike.",
			'An oversized frontal lobe enables this predator to form elaborate plans of attack, ensnaring their prey with cunning rather than force.',
			'This predator fashions tools from their environment, conserving energy by automating their hunting process where possible.',
			'These predators collaborate to attack in groups, communicating via a sophisticated combination of scents and vibrations.',
			'Mostly nocturnal, this predator memorises complex mental maps of their territory, anticipating the likely paths their prey might take.'
		],
		Calm: [
			'Secure in their own strength, this predator often appears calm and docile. They will only snap into action when provoked, or hungry.',
			'An accomplished hunter, this creature attacks effortlessly, almost lazily.',
			'This predator dominates any region they choose to occupy. They enjoy a relaxed, unchallenged existence.',
			'Unthreatened for generations, this predator no longer produces anxiety hormones. They are driven to hunt only when hungry.',
			'Unusual adrenal glands allow this creature to metabolise steroid hormones more efficiently, reducing impact on cognition and resulting in an exceptionally calm killer.'
		],
		'Enjoys the hunt': [
			'A vicious killer, there is a spark of malice lurking behind its cold, intelligent eyes.',
			'A dangerous hunter, their sense organs appear to swell as they detect the stress hormones of their prey.',
			'A clever and ruthless predator, they frequently make a kill and leave the carcass uneaten, as if hunting purely for pleasure.',
			'By day, this is a calm and efficient predator. But at night they appear prone to fits of bloodlust, striking out even when not hungry.',
			'Highly intelligent, this calm and methodical hunter shows no signs of empathy to accompany its complex problem solving skills.'
		],
		Bold: [
			'Bold in temperament, this predator is unafraid of even the largest prey.',
			'This predator appears to have evolved in symbiosis with a brain parasite that encourages it to take large risks while hunting.',
			'Bold in their habits, competition with their rivals frequently drives them to engage in high-risk hunting behaviour.',
			'A foolhardy beast, it rampages towards its prey without caution or subtlety.',
			'Relentless in its hunt, it charges ahead, paying scant regard to the threats or counterattacks of its victims.'
		],
		'Stalks prey for days': [
			'Methodical and patient, they stalk their prey for hours on end, waiting for the perfect moment to strike.',
			'A careful hunter, they stalk their prey along long-distance migration routes. The weak are picked off as the journey wears them down.',
			'A patient hunter, their highly evolved sense organs allow them to detect prey at extreme distances.',
			'They have evolved the ability to sleep while moving, allowing them to hunt their prey over colossal distances.',
			'Intelligent, calm, and methodical, this relentless hunter stalks their prey to the point of exhaustion.'
		],
		Unpredictable: ['Jerky and unbalanced in its movements, its unusual brain chemistry leaves it prone to sudden outbursts of aggression.']
	},
	PlayerPredator: {
		Dangerous: [
			'This dangerous beast has sensitive magnetoreceptors embedded in their nostrils, evolved to detect and hunt down anomalous lifeforms.',
			'A lethal predator, this creature reuptakes all inhibitory neurotransmitters when stalking a chosen target.',
			"This creature's fine muscle control allows it to track its prey completely silently.",
			'An indiscriminate killer, this creature will rarely disengage from a conflict while its opponent still lives.',
			'Soon after birth, they fight to the death with their siblings; only the strongest and most vicious survive infancy.'
		],
		'Wildly aggressive': ['Soon after birth, they fight to the death with their siblings; only the strongest and most vicious survive infancy.'],
		Vicious: ['A vicious beast, it attracts a mate by creating a grisly display from the bones of its prey.'],
		Cruel: ['A cruel and dangerous predator, it has evolved a remarkably muscular jaw. It occasionally crushes even its own teeth.'],
		Hyperviolent: ['Sense organs appear unusually undeveloped for an apex predator. It seems to compensate by lashing out with extreme and indiscriminate violence.'],
		'Excited by violence': ['Exceptionally strong, they appear to take delight in dismembering their prey. Is this emotion an illusion, or a sign of deeper intelligence?'],
		Angry: ['They appear to possess some sort of genetic or collective memory, harbouring deep grudges against species that wronged them in the distance{{sic}} past.'],
		'Easily enraged': ['A dangerous predator, their fast-response adrenal glands allow them to go from rest to rage in mere moments.'],
		'Warlike': ['A highly territorial predator, their excellent memory and long-range vision allow them to hunt across vast distances.'],
		'Apex predator': ['A tireless predator, they have no natural enemies. Their ferocity knows no bounds.'],
	},
	Prey: {
		Watchful: ['They are cautious, watchful creatures; their sharp eyes always pointed to the horizon.'],
		Nervous: ['Nervous and flighty, these creatures exist in a constant state of nervous excitement, ready to flee at the first sign of danger.'],
		Skittish: ['Tense and easily startled, these creatures show a heightened sense of fear; they are alert to danger with every step.'],
		Timid: ['Gentle creatures, though timid. They are reluctant to approach strangers, but display complex social behaviours within their herd.'],
		Shy: ['They are shy creatures, cowed by years of constant predation by more aggressive beasts.'],
		'Highly observant': ['They seem aware of the constant danger in which they live, always scanning the horizon for new threats.'],
		'Slow grazer': ['Patient and slow, they nibble and graze in perpetuity as they loll across the plains.'],
		'Tends plants': ['Once secure in a territory, they appear to tend to local plantlife, bolstering their own food supply.'],
		'Seeks company': ['Gregarious, wide-roaming creatures. They are occasionally found alone, but such animals are unhappy, lost from their herd.'],
		Wary: ['They display an uneasy caution in the face of novelty, untrusting of strangers and strange situations.'],
		'Easily startled': ['Their muscles are held in a state of constant tension, ready to flee at the smallest sign of danger.'],
		Vigilant: ['Collaborative herd animals, they work together to spot incoming predators, hundreds of eyes scanning the horizon in unison.'],
		Inattentive: ['Bumbling and inattentive, they frequently find themselves trapped by both geological hazards and local predators.'],
		'Constantly moving': ['Nomadic in habit, their search for food takes them on a never-ending journey across this world.'],
		Hasty: ['Quick, darting eyes reveal their nervous habit; they are quick to make decisions and even quicker to take flight.'],
		Fidgety: ['Their movements are fidgety, darting this way and that in their desperation to eat but not be eaten.'],
		Anxious: ['Their lives seem spent in constant anxiety; they are tense and fearful even on a genetic level.'],
	},
	Passive: {
		'Long-distance migration': creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE1,
		Nomadic: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE2,
		'Remembers faces': creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE3,
		Submissive: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE4,
		'Highly intelligent': creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE5,
		Passive: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE6,
		Docile: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE7,
		Unafraid: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE8,
		Wise: creaturePassiveTemperamentSentences.UI_CREA_DESC_PASSIVE9,
		Prudent: ['Cautious by nature. Even when facing starvation, they do all they can to avoid straying into unknown territory.'],
		'Far-sighted': ['Long lives and a deep genetic memory give them an uncanny ability to predict future events. No famine or drought ever catches them by surprise.'],
		'Always foraging': ['Flighty, busy creatures, they are always on the move, always foraging for their next meal.'],
		Methodical: ['Calm and methodical creatures, they graze the planet with an air of gentle, unflustered serenity.'],
		Friendly: ['Gentle, friendly creatures, they are always happy to interact with other living beings.'],
		Cheerful: ['They interact with their fellow beasts with a cheerful confidence, secure in the hierarchy of the herd.'],
		Gentle: ['Social animals, they show great care in tending to their young and their sick.'],
		Peaceful: ['They appear to be peaceful creatures, happily socialising both within their species and without.'],
	},
	Bird: {
		Flighty: [
			'Fluttery and flighty, this creature spends its life airborne, too afraid to ever set down on land.',
			'Once they emerge from the nest, they never again touch the ground. Their lives are spent on the wing, their stamina unrivalled.'
		],
		'Collects shiny objects': ['Curious and intelligent, their nests are stuffed with brightly coloured rocks and slivers of metal. Some build elaborate metal structures, showing remarkable artistry.'],
		'Builds large nests': [
			'Steadfast, with a strong sense of place, they pick a roost and will not abandon their home unless facing certain death.',
			'Once they have selected a nesting site, they remain there for the rest of their lives. As they continuously build, the nests of a mature adult are frequently colossal.'
		],
		'Easily scared': ['Powerful lateral muscles allow them to take off with remarkable speed, taking to the air faster than any ground predator could possibly lunge.'],
		Migratory: ['Long-distance fliers, their migratory routes take them from pole-to-pole in their search for food.'],
		'Highly observant': ['Sharp eyed and attentive, their vision is tuned to pick out the slightest movement on the ground beneath them.'],
		'Easily startled': ['Nervous on the wing, they wheel and turn in endless loops, hoping to throw off any predators that might attempt to track them.'],
		'Very cautious': ['These cautious fliers only take to the open sky when it is unavoidable, preferring to hug the terrain and flit between the cover of bushes and trees.'],
		'Sings at dusk': ['When the light begins to fade and the shadows stretch out across the hills, this soulful and intelligent being takes to the sky to sing, their sweet music tumbling down behind them.'],
		Wise: ['Long lives, large brains, and canny, well-honed instincts give this creature the unmistakable air of wisdom.'],
		'Long-sighted': ['Their eyes have evolved to scan the horizon, able to pick out movement at vast distances. Up close, however, they are entirely unable to focus.'],
		'Ever-moving': ['Inexhaustible, their wings never stop flapping. Their flight around the planet is never-ending.'],
		Cautious: ['Shy, cautious beings, they will only descend from the sky to eat and drink in the dead of night.'],
		Intelligent: ['Highly intelligent, their brains are swollen, large out of all proportion to their body.'],
		Unpredictable: ['Temperamental, effervescent creatures. They swirl through the air with a wild and beautiful unpredictability.']
	},
	FishPrey: {
		Instinctive: ['Without a centralised nervous system, these creatures know nothing but swim, fight, flee, consume.'],
		Desperate: ['Their lives are brief; their existence a blip, nothing but a single desperate thrash against great global currents that carry them.'],
		'Food-seeking': ['These salt-water fish are pulled around the oceans by a gnawing hunger, a never-ending search for fresh food.'],
		'Mate-seeking': ['Their lives are short, and these saltwater fish spend their days in a desperate swim to find a willing mate.'],
		'Ever-moving': ['Carried by the currents as much as by their fins, their lives know no order, no system. They simply exist wherever greater forces have placed them.'],
		'Never sleeps': ['Their eyes never close, for they never sleep. Their swim is endless, unbroken by rest or respite.'],
		Melancholy: ['Highly intelligent, these fish appear aware of the world beyond their waters. They seem haunted by this realisation, of a land of wonders they will never visit.'],
		Lonely: ['No matter the size of their shoal, the lack of any communicative organs leaves these fish with a profound sense of loneliness.'],
		Observant: ['Large-eyed and with a swollen brain-sac, these fish appear to possess a wisdom that few sea creatures ever obtain.'],
		'Easily scared': ['Nervous and fast-moving, they shimmer and dart as they swim, desperate to avoid the lurching snap of jaws from the deep.'],
		Migratory: ['Inexhaustible, their fins never stop moving. Even a few moments of calm would rob their gills of the flow they need to live.'],
		'Drifts on currents': ['Without a centralised nervous system, these creatures know nothing but swim, fight, flee, consume.'],
		'Deep-diving': ['Their lives are brief; their existence a blip, nothing but a single desperate thrash against great global currents that carry them.'],
		'Seeks cold': ['These salt-water fish are pulled around the oceans by a gnawing hunger, a never-ending search for fresh food.'],
		'Seeks warmth': ['Their lives are short, and these saltwater fish spend their days in a desperate swim to find a willing mate.'],
		'Bioelectric Defenses': ['Carried by the currents as much as by their fins, their lives know no order, no system. They simply exist wherever greater forces have placed them.'],
		'Can inflate quickly': ['Their eyes never close, for they never sleep. Their swim is endless, unbroken by rest or respite.'],
		Lost: ['Highly intelligent, these fish appear aware of the world beyond their waters. They seem haunted by this realisation, of a land of wonders they will never visit.'],
		'Haunted by unheard sound': ['No matter the size of their shoal, the lack of any communicative organs leave these fish with a profound sense of loneliness.'],
		'Uses sonar': ['Large-eyed and with a swollen brain-sac, these fish appear to possess a wisdom that few sea creatures ever obtain.'],
		'Effectively blind': ['Nervous and fast-moving, they shimmer and dart as they swim, desperate to avoid the lurching snap of jaws from the deep.'],
		'Pressure sensitive': ['Inexhaustible, their fins never stop moving. Even a few moments of calm would rob their gills of the flow they need to live.'],
		Photophobic: ['Without a centralised nervous system, these creatures know nothing but swim, fight, flee, consume.'],
		'Only sees up': ['Their lives are brief; their existence a blip, nothing but a single desperate thrash against great global currents that carry them.'],
		Chromatophoric: ['These salt-water fish are pulled around the oceans by a gnawing hunger, a never-ending search for fresh food.'],
		'Forms schools': ['Their lives are short, and these saltwater fish spend their days in a desperate swim to find a willing mate.'],
		'Frequent shoaling': ['Carried by the currents as much as by their fins, their lives know no order, no system. They simply exist wherever greater forces have placed them.'],
	},
	FishPredator: {
		'Smells blood': ['Their eyes never close, for they never sleep. Their swim is endless, unbroken by rest or respite.'],
		'Silent stalker': ['Highly intelligent, these fish appear aware of the world beyond their waters. They seem haunted by this realisation, of a land of wonders they will never visit.'],
		'Never sleeps': ['No matter the size of their shoal, the lack of any communicative organs leave these fish with a profound sense of loneliness.'],
		Aggressive: ['Large-eyed and with a swollen brain-sac, these fish appear to possess a wisdom that few sea creatures ever obtain.'],
		Hostile: ['Nervous and fast-moving, they shimmer and dart as they swim, desperate to avoid the lurching snap of jaws from the deep.'],
		'Ambush predation': ['Inexhaustible, their fins never stop moving. Even a few moments of calm would rob their gills of the flow they need to live.'],
		'Shoots neurotoxic spines': ['Their lives are short, and these saltwater fish spend their days in a desperate swim to find a willing mate.'],
		'Strikes from below': ['Carried by the currents as much as by their fins, their lives know no order, no system. They simply exist wherever greater forces have placed them.'],
		'Pack hunter': ['Their eyes never close, for they never sleep. Their swim is endless, unbroken by rest or respite.'],
		'Lone predator': ['Highly intelligent, these fish appear aware of the world beyond their waters. They seem haunted by this realisation, of a land of wonders they will never visit.'],
		Angry: ['No matter the size of their shoal, the lack of any communicative organs leave these fish with a profound sense of loneliness.'],
		Threatening: ['Large-eyed and with a swollen brain-sac, these fish appear to possess a wisdom that few sea creatures ever obtain.'],
	},
	Butterfly: {
		Transcendent: ['Scans reveal a nervous system of pure light; the inner lives are radiant beyond compare.'],
		'Self-aware': ['Highly intelligent for such a small animal, they appear to be entirely aware of their physical limitations.'],
		Desperate: ['Their lives are brief; their existence a blip, nothing but a single desperate flight.'],
		'Food-seeking': ['These flying insects are drawn ever onwards by a terrible hunger, their hunt is never ending.'],
		'Mate-seeking': ['Their lives are painfully short, and these flying insects spend their handful of days in a furious quest to mate.'],
		Flighty: ['These simple insects barely have a brain at all and react to external stimuli only via localised reflexes.'],
		Skittish: ['Carried by the wind as much as their wings, these small insects live a scattered and chaotic existence.'],
		Hungry: ['Their gentle wingbeats belie their desperate hunger, their never-ending hunt.'],
		Afraid: ['Near the bottom of the food chain, their world is one of constant threat and terror. There is very little in existence that might not kill them.'],
		Instinctive: ['Without a centralised nervous system, these are creatures of pure instinct, pure reaction.'],
	},
	Robot: {
		'01100001 01101110 01100111 01110010 01111001': robotSentences,
		'01110011 01100001 01100100': robotSentences,
		'01100001 01101100 01101111 01101110 01100101': robotSentences,
		'01101000 01100101 01101100 01110000': robotSentences,
		'01100110 01110010 01101001 01100101 01101110 01100100': robotSentences,
		'01110111 01100001 01101001 01110100': robotSentences,
		'01101000 01110101 01101110 01110100': robotSentences,
		'01101011 01101001 01101100 01101100': robotSentences,
		'01100110 01100001 01101001 01101100': robotSentences,
	}
}

function getTemperamentSentences(temperament: string): string[] {
	const temperamentObjects = Object.values(temperamentSentences);
	const possibleTemperamentSentences = new Set<string>();

	const validTemperamentCategories = temperamentObjects.filter(item => temperament in item);
	for (const category of validTemperamentCategories) {
		category[temperament]?.forEach(sentence => possibleTemperamentSentences.add(sentence));
	}
	return Array.from(possibleTemperamentSentences);
}

export default getTemperamentSentences;