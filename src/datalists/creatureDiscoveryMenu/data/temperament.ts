const temperamentSentences: { [key: string]: string[] } = {
	Aggressive: [
		'A crafty hunter, known to kill the young of competing species.',
		'An efficient hunter with high energy reserves. Deters other predators with untiring aggression.',
		'Highly territorial, this predator continually marks their hunting grounds with scent. Pheromones are undetectable by herbivore species.',
		'Large-eyed and with a swollen brain-sac, these fish appear to possess a wisdom that few sea creatures ever obtain.',
		'This predator will attack anything within proximity. Their sheer aggression intimidates prey and competitors alike.',
		'This species has a constantly shifting social structure, with dominance established by physical strength and aggression.',
	],
	'Always foraging': [
		'Flighty, busy creatures, they are always on the move, always foraging for their next meal.',
	],
	Afraid: [
		'Near the bottom of the food chain, their world is one of constant threat and terror. There is very little in existence that might not kill them.',
	],
	'Ambush predation': [
		'Inexhaustible, their fins never stop moving. Even a few moments of calm would rob their gills of the flow they need to live.'
	],
	Angry: [
		'No matter the size of their shoal, the lack of any communicative organs leave these fish with a profound sense of loneliness.',
		'They appear to possess some sort of genetic or collective memory, harbouring deep grudges against species that wronged them in the distance{{sic}} past.'
	],
	Anxious: [
		'Their lives seem spent in constant anxiety; they are tense and fearful even on a genetic level.',
	],
	'Apex predator': [
		'A tireless predator, they have no natural enemies. Their ferocity knows no bounds.'
	],
	Bold: [
		'A foolhardy beast, it rampages towards its prey without caution or subtlety.',
		'Bold in temperament, this predator is unafraid of even the largest prey.',
		'Bold in their habits, competition with their rivals frequently drives them to engage in high-risk hunting behaviour.',
		'Relentless in its hunt, it charges ahead, paying scant regard to the threats or counterattacks of its victims.',
		'This predator appears to have evolved in symbiosis with a brain parasite that encourages it to take large risks while hunting.',
	],
	'Builds large nests': [
		'Once they have selected a nesting site, they remain there for the rest of their lives. As they continuously build, the nests of a mature adult are frequently colossal.',
		'Steadfast, with a strong sense of place, they pick a roost and will not abandon their home unless facing certain death.'
	],
	Calm: [
		'An accomplished hunter, this creature attacks effortlessly, almost lazily.',
		'Secure in their own strength, this predator often appears calm and docile. They will only snap into action when provoked, or hungry.',
		'This predator dominates any region they choose to occupy. They enjoy a relaxed, unchallenged existence.',
		'Unthreatened for generations, this predator no longer produces anxiety hormones. They are driven to hunt only when hungry.',
		'Unusual adrenal glands allow this creature to metabolise steroid hormones more efficiently, reducing impact on cognition and resulting in an exceptionally calm killer.'
	],
	'Careful hunter': [
		'A natural predator, they stalk their prey with great care.',
		'A sharp intelligence flashes in their eyes. They are careful, methodical hunters.',
		'A vicious predator, they take great care as they hunt down their prey.',
		'An intelligent predator, they hunt with skill and stealth.',
		'Predatory in habit, they stalk their prey with a great degree of care.'
	],
	Cautious: [
		"Always on the lookout, their cautious nature reflects the sudden and violent cruelty of their own crude 'society.'",
		'An unkind, jealous predator. They would sooner steal food from their own family than undertake a difficult hunt.',
		'Cautious by nature, they stalk their prey carefully. Once they have selected a target, this methodical hunter rarely fails to make a kill.',
		'Cautious and deliberate, they skitter from hunt to hunt, always on the lookout for those who would steal their prey.',
		'Nervous in habit, despite their predatory nature. They too are prey.',
		'Shy, cautious beings, they will only descend from the sky to eat and drink in the dead of night.'
	],
	Cheerful: [
		'They interact with their fellow beasts with a cheerful confidence, secure in the hierarchy of the herd.'
	],
	Chromatophoric: [
		'These salt-water fish are pulled around the oceans by a gnawing hunger, a never-ending search for fresh food.'
	],
	'Cold-blooded': [
		'A cold-blooded killer, this creature will spend days hunting for an ideal target, ignoring the effects of starvation.',
		'An endothermic predator, this creature maintains a low body temperature while resting. The scent of prey accelerates their metabolism, warming their blood for the hunt.',
		'This creature has an especially slow digestive cycle, eating one meal a week and hibernating between hunts.',
		'This predator moves slowly and deliberately, preserving their energy for the hunt. They pursue their prey in short, intense sprints.',
		'This species lives communally in deep underground burrows, huddled to preserve warmth. They drag their prey deep into the earth before feeding.',
	],
	'Collects shiny objects': [
		'Curious and intelligent, their nests are stuffed with brightly coloured rocks and slivers of metal. Some build elaborate metal structures, showing remarkable artistry.'
	],
	'Constantly moving': [
		'Nomadic in habit, their search for food takes them on a never-ending journey across this world.'
	],
	Cruel: [
		'A cruel and dangerous predator, it has evolved a remarkably muscular jaw. It occasionally crushes even its own teeth.'
	],
	Dangerous: [
		'A lethal predator, this creature reuptakes all inhibitory neurotransmitters when stalking a chosen target.',
		'An indiscriminate killer, this creature will rarely disengage from a conflict while its opponent still lives.',
		'Soon after birth, they fight to the death with their siblings; only the strongest and most vicious survive infancy.',
		"This creature's fine muscle control allows it to track its prey completely silently.",
		'This dangerous beast has sensitive magnetoreceptors embedded in their nostrils, evolved to detect and hunt down anomalous lifeforms.',
	],
	Desperate: [
		'Their lives are brief; their existence a blip, nothing but a single desperate flight.'
	],
	Docile: [
		'Their lives are brief; their existence a blip, nothing but a single desperate flight.',
		'Brain scans are unable to capture the true essence of their simple happiness.',
		'Friendly and curious by nature, they will take a keen interest in any new lifeforms they encounter.',
		'Gentle creatures, they are governed by a friendly and highly trusting temperament.',
		'Highly docile. This behaviour appears to be instinctive, as if they have evolved to serve the whims of a complex herding predator.',
		'Scans reveal them to be highly intelligent. However, they are easily tamed and appear content to follow the whims of other creatures.',
		'Yielding quickly in direct confrontation, their non-threatening nature is a successful counter-strategy in an aggressive world.',
	],
	'Does not fear death': [
		'Lacking a central nervous system, this primitive predator responds to stimuli by reflex only. They are barely conscious, and cannot feel fear.',
		"Gripped by bloodlust during a hunt. Released from their frenzy only when their prey's heartbeat goes still.",
		'This dangerous predator is alerted to their own injuries only by scent, and cannot feel pain.',
		'This predator will kill and often cannibalise their young, eliminating the weak. Only the hardiest creatures reach maturity, and are completely without fear.',
		'This solo hunter is optimised for killing and eating. Their nervous system is focused purely on survival.'
	],
	'Easily enraged': [
		'A dangerous predator, their fast-response adrenal glands allow them to go from rest to rage in mere moments.'
	],
	'Easily scared': [
		'Nervous on the wing, they wheel and turn in endless loops, hoping to throw off any predators that might attempt to track them.'
	],
	'Easily startled': [
		'Their muscles are held in a state of constant tension, ready to flee at the smallest sign of danger.'
	],
	'Enjoys the hunt': [
		'A clever and ruthless predator, they frequently make a kill and leave the carcass uneaten, as if hunting purely for pleasure.',
		'A dangerous hunter, their sense organs appear to swell as they detect the stress hormones of their prey.',
		'A vicious killer, there is a spark of malice lurking behind its cold, intelligent eyes.',
		'By day, this is a calm and efficient predator. But at night they appear prone to fits of bloodlust, striking out even when not hungry.',
		'Highly intelligent, this calm and methodical hunter shows no signs of empathy to accompany its complex problem solving skills.'
	],
	'Ever-moving': [
		'Carried by the currents as much as by their fins, their lives know no order, no system. They simply exist wherever greater forces have placed them.',
		'Inexhaustible, their wings never stop flapping. Their flight around the planet is never-ending.'
	],
	'Excited by violence': [
		'Exceptionally strong, they appear to take delight in dismembering their prey. Is this emotion an illusion, or a sign of deeper intelligence?'
	],
	'Far-sighted': [
		'Long lives and a deep genetic memory give them an uncanny ability to predict future events. No famine or drought ever catches them by surprise.'
	],
	Fidgety: [
		'Their movements are fidgety, darting this way and that in their desperation to eat but not be eaten.'
	],
	Flighty: [
		'Fluttery and flighty, this creature spends its life airborne, too afraid to ever set down on land.',
		'Once they emerge from the nest, they never again touch the ground. Their lives are spent on the wing, their stamina unrivalled.',
		'These simple insects barely have a brain at all and react to external stimuli only via localised reflexes.',
	],
	'Food-seeking': [
		'These flying insects are drawn ever onwards by a terrible hunger, their hunt is never ending.'
	],
	'Frequent shoaling': [
		'Carried by the currents as much as by their fins, their lives know no order, no system. They simply exist wherever greater forces have placed them.'
	],
	Friendly: [
		'Gentle, friendly creatures, they are always happy to interact with other living beings.'
	],
	Gentle: [
		'Social animals, they show great care in tending to their young and their sick.'
	],
	Hasty: [
		'Quick, darting eyes reveal their nervous habit; they are quick to make decisions and even quicker to take flight.'
	],
	'Haunted by unheard sound': [
		'No matter the size of their shoal, the lack of any communicative organs leave these fish with a profound sense of loneliness.'
	],
	'Highly intelligent': [
		'Brain scans reveal unusually developed language centres within the supramarginal gyrus. The method by which they use this power is unclear.',
		'High growth hormone levels in their brains have caused an unusually dense neuron structure. What this extra neural power is used for is unclear.',
		"Scans reveal an unusual 'double brain' structure, where extra lobes run in parallel and increase decision making speed.",
		'Scans reveal small neural clusters growing all over their nervous system, creating a highly complex distributed brain network.',
		'Unusually intelligent, they are highly perceptive of their sensory environment, reacting to patterns and signal beyond the observation of most species.'
	],
	'Highly observant': [
		'Sharp eyed and attentive, their vision is tuned to pick out the slightest movement on the ground beneath them.',
		'They seem aware of the constant danger in which they live, always scanning the horizon for new threats.'
	],
	Hostile: [
		'Nervous and fast-moving, they shimmer and dart as they swim, desperate to avoid the lurching snap of jaws from the deep.'
	],
	Hungry: [
		'Their gentle wingbeats belie their desperate hunger, their never-ending hunt.'
	],
	Hyperviolent: [
		'Sense organs appear unusually undeveloped for an apex predator. It seems to compensate by lashing out with extreme and indiscriminate violence.'
	],
	Impulsive: [
		'An ancient predator, its mind has evolved impulsive hunting instincts. With no higher brain function, they simply follow the aggressive impulses that flash across their synapses.',
		'An impulsive hunter, they are quick to lash out at any creature unfortunate enough to wander into their territory.',
		'Impulsive and unpredictable, these vicious predators are as quick to pick a fight with their own kin as they are to hunt prey or attack a rival.',
		'Mindless and quick to rush into action, these predatory beasts have evolved fast-healing skin as a response to the frequent beatings they endure in poorly judged fights.',
		'Predatory in habit, they choose their prey impulsively, lashing out with an unpredictable ferocity.'
	],
	Inattentive: [
		'Bumbling and inattentive, they frequently find themselves trapped by both geological hazards and local predators.'
	],
	Instinctive: [
		'Without a centralised nervous system, these are creatures of pure instinct, pure reaction.',
		'Without a centralised nervous system, these creatures know nothing but swim, fight, flee, consume.'
	],
	Intelligent: [
		'An oversized frontal lobe enables this predator to form elaborate plans of attack, ensnaring their prey with cunning rather than force.',
		'Highly intelligent, their brains are swollen, large out of all proportion to their body.',
		'Mostly nocturnal, this predator memorises complex mental maps of their territory, anticipating the likely paths their prey might take.',
		'These predators collaborate to attack in groups, communicating via a sophisticated combination of scents and vibrations.',
		'This predator fashions tools from their environment, conserving energy by automating their hunting process where possible.',
		"This predator studies their prey's behaviour from afar, determining points of weakness and calculating the best time to strike."
	],
	'Lone predator': [
		'Highly intelligent, these fish appear aware of the world beyond their waters. They seem haunted by this realisation, of a land of wonders they will never visit.'
	],
	'Long-distance migration': [
		'Migratory in nature, their seasonal wanders take them from one pole to the other, moving as the light levels change.',
		'Remarkably high endurance means they rarely stop moving, able to gaze endlessly as they migrate across the planet.',
		'Their natural high stamina serves them well as they wander, walking countless miles in their search for food and shelter.',
		"Their search for a mate takes them countless miles across the planet's surface, an arduous and long-distance journey for love.",
		'Their search for food drags them far and wide across the planet, their journey never ending.',
	],
	'Long-sighted': [
		'Their eyes have evolved to scan the horizon, able to pick out movement at vast distances. Up close, however, they are entirely unable to focus.'
	],
	'Mate-seeking': [
		'Their lives are painfully short, and these flying insects spend their handful of days in a furious quest to mate.'
	],
	Methodical: [
		'Calm and methodical creatures, they graze the planet with an air of gentle, unflustered serenity.'
	],
	Migratory: [
		'Long-distance fliers, their migratory routes take them from pole-to-pole in their search for food.'
	],
	Nervous: [
		'Nervous and flighty, these creatures exist in a constant state of nervous excitement, ready to flee at the first sign of danger.'
	],
	'Never sleeps': [
		'No matter the size of their shoal, the lack of any communicative organs leave these fish with a profound sense of loneliness.'
	],
	Nomadic: [
		'Always on the move, these nomadic grazers search far and wide for the perfect grazing sites.',
		'Drawn by magnetic forces on long journeys across the planet, their lives are spent in constant motion.',
		'Their search for food drags them far and wide across the planet, their journey never ending.',
		'Tough, hardy wanderers, they spend their lives on the move. Their existence is a constant, slow-moving race against predators and starvation.',
		'Weaker than their appearance suggests, they make up for the many who die on their nomadic wanderings with frequent and rapid breeding.'
	],
	'Only sees up': [
		'Their lives are brief; their existence a blip, nothing but a single desperate thrash against great global currents that carry them.'
	],
	'Pack hunter': [
		'Their eyes never close, for they never sleep. Their swim is endless, unbroken by rest or respite.'
	],
	Passive: [
		'Brain scans reveal unusually structured hypothalamus. It appears they perceive time on a different scale to most life, leading to their unflustered, passive temperament.',
		'Gentle, passive creatures. Dull and unintelligent in attitude, they are nonetheless content and unworried.',
		'Passive, they are happy to ignore most animal life unless forced by circumstance to pay attention.',
		'Poor sensory systems leave this typically passive creature unable to perceive much of the external world. However, brain scans reveal a deep, rich inner life.',
		'Slow moving, passive creatures, they are content to focus only on plantlife.'
	],
	'Patient hunter': [
		'A patient predator, they are willing to wait for days on end for the perfect moment to strike.',
		'A slow but relentless predator. Once they have begun their hunt there is little that will stop them.',
		'A well-regulated digestive system means they need only feed very occasionally. They are free to be patient in their search for prey.',
		'Calm in spirit, they appear almost serene. This surface impression belies the cruelty latent in this vicious hunter.',
		'Patient by nature, they watch their prey carefully before striking, wasting no energy on failed hunts.'
	],
	Peaceful: [
		'They appear to be peaceful creatures, happily socialising both within their species and without.'
	],
	Prudent: [
		'Cautious by nature. Even when facing starvation, they do all they can to avoid straying into unknown territory.',
	],
	Reckless: [
		'A reckless predator, they charge into fights, caring little for stealth or ambush.',
		'A reckless predator, they happily hunt creatures far larger than themselves.',
		'A vicious predator, they chase their prey with reckless abandon.',
		"Adrenaline glands embedded throughout the dermal layer suppress this beast's awareness of pain.",
		'Driven by blind fury, this predator is oblivious to all but their prey during a hunt.'
	],
	'Remembers faces': [
		'A higher order intelligence lives within its skull. The analysis process reveals an eidetic memory, though some brain functions appear resistant to the scanner.',
		'A remarkable fusion between their optic nerve and hippocampus means visual data is instantaneously and perfectly stored. An adaptation for navigation, perhaps. But it ensures they will never forget you.',
		'Highly intelligent, they remember every encounter they ever have with another species.',
		'Highly social and with a complex herd hierarchy, their remarkable memory ensures they never forget the face of another creature, be they friend or foe.',
		'Possessing a calm intelligence, their piercing eyes never forget a face.'
	],
	'Seeks company': [
		'Gregarious, wide-roaming creatures. They are occasionally found alone, but such animals are unhappy, lost from their herd.'
	],
	'Self-aware': [
		'Highly intelligent for such a small animal, they appear to be entirely aware of their physical limitations.'
	],
	'Shoots neurotoxic spines': [
		'Their lives are short, and these saltwater fish spend their days in a desperate swim to find a willing mate.'
	],
	Shy: [
		'They are shy creatures, cowed by years of constant predation by more aggressive beasts.'
	],
	'Silent stalker': [
		'Highly intelligent, these fish appear aware of the world beyond their waters. They seem haunted by this realization, of a land of wonders they will never visit.'
	],
	'Sings at dusk': [
		'When the light begins to fade and the shadows stretch out across the hills, this soulful and intelligent being takes to the sky to sing, their sweet music tumbling down behind them.'
	],
	Skittish: [
		'Carried by the wind as much as their wings, these small insects live a scattered and chaotic existence.',
		'Tense and easily startled, these creatures show a heightened sense of fear; they are alert to danger with every step.'
	],
	'Slow grazer': [
		'Patient and slow, they nibble and graze in perpetuity as they loll across the plains.'
	],
	'Smells blood': [
		'Their eyes never close, for they never sleep. Their swim is endless, unbroken by rest or respite.'
	],
	'Stalks prey for days': [
		'A careful hunter, they stalk their prey along long-distance migration routes. The weak are picked off as the journey wears them down.',
		'A patient hunter, their highly evolved sense organs allow them to detect prey at extreme distances.',
		'Intelligent, calm, and methodical, this relentless hunter stalks their prey to the point of exhaustion.',
		'Methodical and patient, they stalk their prey for hours on end, waiting for the perfect moment to strike.',
		'They have evolved the ability to sleep while moving, allowing them to hunt their prey over colossal distances.'
	],
	'Strikes from below': [
		'Carried by the currents as much as by their fins, their lives know no order, no system. They simply exist wherever greater forces have placed them.'
	],
	Submissive: [
		'Gentle animals at heart, they wish only to be left in peace to roam.',
		'Powerful but submissive, they have evolved to avoid confrontation.',
		'Submissive and gentle in their relationships with one another, they nonetheless respond forcefully when threatened by other creatures.',
		'Submissive without being timid, these gentle creatures know no fear, only curiosity.'
	],
	'Tends plants': [
		'Once secure in a territory, they appear to tend to local plantlife, bolstering their own food supply.'
	],
	Threatening: [
		'Large-eyed and with a swollen brain-sac, these fish appear to possess a wisdom that few sea creatures ever obtain.'
	],
	Timid: [
		'Gentle creatures, though timid. They are reluctant to approach strangers, but display complex social behaviours within their herd.'
	],
	Transcendent: [
		'Scans reveal a nervous system of pure light; the inner lives are radiant beyond compare.'
	],
	Unafraid: [
		'A desperate, ravenous hunter. Inefficient energy processing means this creature is forever seeking their next meal, hunger overriding any sense of danger.',
		'A fearless, highly specialised hunter. Shortened neural pathways allow for near-instant cognitive processing, eliminating the need for base emotion.',
		'Possessed of a tremendous natural strength, they fear no other creature that walks upon this world.',
		'The flesh of these creatures is poisonous to most other species. They have no natural predators, and hunt totally unafraid.',
		'This brain of this creature produces no stress-related hormones, resulting in a predator entirely uninhibited by fear.',
		'This predator is naturally curious, and will eat most other species. An internal array of beak-like protrusions help digest unusual food.'
	],
	Unpredictable: [
		'Jerky and unbalanced in its movements, its unusual brain chemistry leaves it prone to sudden outbursts of aggression.',
		'Temperamental, effervescent creatures. They swirl through the air with a wild and beautiful unpredictability.'
	],
	'Very cautious': [
		'These cautious fliers only take to the open sky when it is unavoidable, preferring to hug the terrain and flit between the cover of bushes and trees.'
	],
	Vicious: [
		'A vicious beast, it attracts a mate by creating a grisly display from the bones of its prey.'
	],
	Vigilant: [
		'Collaborative herd animals, they work together to spot incoming predators, hundreds of eyes scanning the horizon in unison.'
	],
	Warlike: [
		'A highly territorial predator, their excellent memory and long-range vision allow them to hunt across vast distances.'
	],
	Wary: [
		'They display an uneasy caution in the face of novelty, untrusting of strangers and strange situations.'
	],
	Watchful: [
		'They are cautious, watchful creatures; their sharp eyes always pointed to the horizon.'
	],
	'Wildly aggressive': [
		'Soon after the birth, they fight to the death with their siblings; only the strongest and most vicious survive infancy.'
	],
	Wise: [
		'Long-lived and gentle, their rich lives and complex society hierarchy allow them to develop wisdom that rivals technologically advanced species.',
		'Long lives, large brains, and canny, well-honed instincts give this creature the unmistakable air of wisdom.'
	]
}

export default temperamentSentences;