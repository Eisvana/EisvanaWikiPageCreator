function getDietSentence(diet: string, searchDiet: string = diet) {
	if (!diet) return;
	const dietSentences: { [key: string]: string[] } = {
		biomeMeat: [
			`Carnivores, their desire for ${diet} knows no limits.`,
			`Carnivores, their hunger for ${diet} is never-ending.`,
			`Carnivores, their hunger for ${diet} knows no bounds.`,
			`Gut analysis reveals a diet consisting almost entirely of ${diet}.`,
			`A highly specialised digestive system allows them to eat the ${diet} that grow on their home planet.`,
			`Their diet is rich in the ${diet} found in abundance on this planet.`,
			`Always hungry, they seek out and consume the ${diet} that grow freely across this world.`,
			`Their diet is varied, but they will gorge upon ${diet} at any opportunity.`,
			`They feast upon ${diet}, and will travel vast distances to find it.`,
		],
		'Absorbed nutrients': [
			'Though they have mouths, it seems their primary nutrient intake is via their skin, in a form of atmospheric mineral absorption.'
		],
		Algae: [
			'Filtering gills inside their cheeks allow them to suck up water and extract nutrients from algal blooms.'
		],
		Anything: [
			'Opportunistic, they happily devour any food source they find: fruit, nuts, insects, old bones, occasional rocks.'
		],
		Birds: [
			'Quick-witted and sharp, they prey upon any unsuspecting or inattentive birds who linger too low to the ground.'
		],
		Blood: [
			'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.'
		],
		'Blood-drinker': [
			'They feast upon their prey only when fresh, guzzling blood while it is still hot. Cold corpses and old meat are left for the scavengers.'
		],
		'Brain matter': [
			'After making a kill, these carnivorous beasts shatter the skulls of their prey and offer the brain matter to the oldest member of their pack.'
		],
		Brains: [
			'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.'
		],
		'Brined organs': [
			'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.'
		],
		Cannibal: [
			'All-consuming in their hunger, these carnivores will turn cannibal with little provocation, happy to feast upon their kin.'
		],
		Cannibalism: [
			'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.'
		],
		Carnivorous: [
			'Gut analysis reveals an iron-rich, carnivorous diet. Their stool is dense and mighty.'
		],
		'[[Cave Marrow|Cave marrow]]': [
			'They delve underground in search of food, and show a particular fondness for the [[Cave Marrow|cave marrow]].'
		],
		'Coagulated blood': [
			'After making a kill, they will preserve the blood of their prey in coagulated lumps. These stores serve them well during lean patches, times when their hunts go unsuccessful.'
		],
		'Collects seeds': [
			'Gut analysis reveals their diet consists primarily of vast numbers of partially rotted nuts.',
			'Sharp vision allows them to detect seeds just as they begin to swell in their pods, giving them an edge over other foraging creatures.'
		],
		Corpses: [
			"Carnivorous but opportunistic, these beasts will happily raid the corpse of some other hunter's prey."
		],
		'Crunches bones': [
			'Sharp teeth and powerful jaws allow them to crunch through the carcasses of their prey, feasting upon flesh and bone alike.'
		],
		'Decayed plant life': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		'Deepwater algae': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		'Deepwater spores': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		'Drifting plants': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		'Di-hydrogen crystals': [
			'A plague upon stranded adventurers, as they feast upon [[di-hydrogen]] crystals. Their highly reactive saliva dissolves the crystals without the need to chew.'
		],
		'Digs for tubers': [
			'Nocturnal tunnellers, they dig out elaborate tunnels in pursuit of nutritious tubers.',
			'Sharp sense and sharper claws allow them to tunnel swiftly through the earth in search of the tubers that form the bulk of their diet.'
		],
		'Drifting carcasses': [
			'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.'
		],
		Eggs: [
			'While not adapted for open confrontation, they are nonetheless impressive hunters. Under the cover of darkness, they steal into nests and feast upon eggs and hatchlings alike.'
		],
		'Extracts bone marrow': [
			'Carnivores, they prefer to hunt larger creatures. They strip the flesh from the bones of their prey before finally consuming the marrow in a way that is almost ritualistic.'
		],
		'[[Faecium]]': [
			'Highly specialised sense organs allow them to dig through the [[Faecium|fecal deposits]] of other creatures, sniffing out and consuming the nutrients within.',
			'Their adaptive sensory system temporarily shuts down their olfactory nerves as they snout through faecium deposits in search of undigested morsels.'
		],
		'Flesh chunks': [
			'Carnivores, their appetite for flesh knows no bounds. They swallow it down in great chunks, ripped from the bones of their prey.'
		],
		'Flesh-eater': [
			'Dental analysis reveals jaws and teeth well-adapted to the ripping of flesh from bones, to the chewing life from other beings.'
		],
		Flowers: [
			'They supplement their tuber-based diet with brightly-coloured flowers; the complex dye compounds providing a valuable micronutrient boost.'
		],
		Foliage: [
			'Group feeders, they collect leaves from local plantlife and eat only when the whole herd can be satisfied.',
			'Herbivores, they feast upon the mineral-rich leaves of local plantlife.'
		],
		'Foraged leftovers': [
			'Omnivorous and greedy, they feast upon the unwanted scraps left behind by creatures with more specifically adapted diets.'
		],
		'Foraged nuts': [
			'A forager, they search the ground for the fallen nuts that provide their main nutrient source.',
			'Comfortable amongst dense foliage, they sniff and scurry among fallen leaves, searching for the nuts that provide their food.'
		],
		'Fresh leaves': [
			'Leaf-eaters, their teeth are too soft to eat most vegetable matter. As such, they consume only soft, fresh leaves.',
			'Their diet appears highly specific; they nibble only the freshest new shoots from local plantlife.'
		],
		'Fresh meat': [
			'Well-adapted to the hunt but poorly-adapted to digestion, these carnivores will only feast upon the freshest of meat.'
		],
		'Gelatinous chunks': [
			'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.'
		],
		Grass: [
			'Perpetual grazers, they consume vast amounts of grass each day.',
			'Primarily a grazing animal, the poor nutrient levels of their grass-based diet leads them to seek out and lick mineral rich rocks.'
		],
		'[[Gravitino Ball|Gravitino balls]]': [
			'[[Pugneum]]-infused teeth allow them to consume and digest [[Gravitino Ball|gravitino balls]], crunching through their outer shells in an explosion of light.'
		],
		'High in calcium': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		Hypercarnivore: [
			'Extremely powerful carnivores, they sit atop the food chain. Nothing dares hunt them.'
		],
		'Hypnotises prey': [
			'Unyielding, hypnotic eyes mesmerise their prey, allowing them to feast upon other creatures without the mortal peril of the hunt.'
		],
		'Insects and grubs': [
			'Their tongues are razor sharp and lightning-quick, allowing them to catch and skewer the small insects that make up the majority of their diet.'
		],
		'[[Kelp Sac]]': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		'Large mammals': [
			'They seek out larger creatures, prefering to make the one occasional kill and then feast upon it for months.'
		],
		'Liquidised organs': [
			'They digest their meals before they consume them. Powerful enzymes are injected directly into their prey; their liquid flesh is then drunk at leisure.'
		],
		'Living sponges': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		'Marine detritus': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		'Marine snow': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		'Meat-eater': [
			'Exclusively carnivorous, they feast upon the flesh of other creatures. None are spared from their jaws.'
		],
		'Meat chunks': [
			'Brutal carnivores, they will begin their bloody feasts even while their prey continues to thrash, its death throes not yet complete.'
		],
		'[[Mordite]]': [
			'Drawn to the smell of death, their primary nutrient source is [[Mordite]]. They do not discriminate between beast or plant.'
		],
		'[[Mordite Root|Mordite roots]]': [
			'Their hunger is only sated by the chunky, fleshy [[Mordite Root|roots]] of the [[mordite]] plant.'
		],
		'Mostly rocks': [
			'Dense teeth and a series of extremely acidic stomachs allow them to consume a diet mostly consisting of rocks.'
		],
		Nectar: [
			'A specially-adapted tongue indicates their diet is predominantly nectar, harvested from local flora.'
		],
		'Nibbles at moss': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		'Nibbles at shoots': [
			'Delicate feeders, they nibble selectively at local flora, ensuring they never entirely strip an area of foliage.',
			'Exceptionally fine teeth allow them to selectively eat, chewing only the most nutritious parts of otherwise tough and hard to digest plants.'
		],
		'[[NipNip Buds|NipNip buds]]': [
			'Their diet is largely conventional, consisting largely of local flora. But the scent of [[NipNip|Nip Nip]] drives them to a frenzy, and they will gorge upon its [[NipNip Buds|buds]].'
		],
		'Nutritious water weeds': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		Offal: [
			'Carnivores, they happily tear through the flesh of their prey, desperate to feast upon the offal found deep within the carcass.'
		],
		'Old bones': [
			'Well-adapted digestive systems allow them to find nutrients where others would give up. They happily feast upon the marrow of discarded bones, cracking them open and guzzling their nutritious cores.'
		],
		Organs: [
			'Extremely well-adapted toxin removal systems allow them to consume prey in its entirety, from the standard flesh to the richly nutritious but frequently hazardous offal.'
		],
		'Other carnivores': [
			'These are hypercarnivores, powerful predators at the top of the food chain. These are the beasts that hunt the hunters.'
		],
		'Other fish': [
			'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.'
		],
		'[[Oxide elements]]': [
			'Their blood is highly toxic to most predators, thanks to their [[Oxide elements|oxide]]-rich diet.'
		],
		'Partially-digested meat': [
			'Omnivores, they gobble down anything they are able to find. Powerful digestive enzymes allow them to make use of the discarded scraps left behind by more powerful predators.'
		],
		Petals: [
			'Their finely-tuned sense of smell draws them to the most beautiful, richly-scented flowers, which they then consume whole.'
		],
		Plankton: [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		'Plant roots': [
			'Sharp digging claws allow them to excavate and consume plant roots, which appear to make up the bulk of their diet.',
			'Spoor analysis reveals a high-fibre diet. Primary nutrient source appears to be excavated plant roots.'
		],
		Pollen: [
			'A gnawing hunger for sugar drives their every waking moment; their existence a constant hunt from sweet plant to the next.'
		],
		'Processes dirt': [
			'They snuffle for food with their noses dug into the dirt, flicking earth into their mouths with long, spiked tongues. Nutrient source is presumed to be soil-bound microorganisms.'
		],
		'Putrefied meat': [
			'While physically weaker than some other carnivorous species, these creatures gain their advantage in the strength of their digestive tract. They will happily consume month-old corpses and suffer no ill-effect, no bacterial retaliation.'
		],
		'Raw meat': [
			'Unsophisticated and unrestrained carnivores, they feast upon the raw flesh of their fallen prey.'
		],
		'Removed hearts': [
			'Clean, fastidious eaters. They butcher the corpses of their prey, preparing each chunk of flesh on some instinctive schedule. They appear to reserve the hearts of their prey for consumption only during specific lunar phases.'
		],
		'Rotten wood': [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		'Rotting Fruit': [
			'Drawn to sugar, they consume the small fruits that fall from local flora.',
			'Their diet consists of fallen fruit that has begun to rot. This fermented, bacteria-enriched mush appears to have a vital place in their digestive system.'
		],
		'Salinated flesh': [
			'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.'
		],
		'Scavenged remains': [
			'Sneaky and opportunistic, they steal from the kills of larger predators, nipping in and making away with whatever they can.'
		],
		'Scavenged scraps': [
			'Scavengers, they plunder the stores of other animals, stealing bones and scraps wherever they find them.'
		],
		Seaweed: [
			'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.'
		],
		Shellfish: [
			'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.'
		],
		Sinew: [
			'Row after row of highly-polished teeth allow them to tear through flesh and sinew alike. They can strip a corpse to the bone in minutes.'
		],
		'Small animals': [
			'Ill-equipped to compete with large animals, they choose to prey upon smaller foes. Rodents, insects, nitrogen-rich plantlife - anything unlikely to fight back.',
			'They prefer to acquire their meat from sources that will not fight back. Quick jaws and sharp eyes allow them to prey upon the small, darting creatures that other hunters leave behind.'
		],
		'Small trees': [
			'Constantly hungry, their specially adapted teeth and guts allow them to consume entire trees, from leaf to sap to trunk.',
			'They use their acidic tongues to burrow into trees, dissolving and then sucking out the soft and delicious inner wood.'
		],
		'Steals from others': [
			'Omnivorous and thieving, they eat whatever they find, wherever they find it. Frequently, this means consuming the hard-won stores of other animals.'
		],
		'Stinging leaves': [
			'Their tongues are hairy and thick, allowing them to happily chew upon all but the most venomous of leaves.'
		],
		'Tall grasses': [
			'They root through the undergrowth in search of food, chewing at the heads of ripe grasses.'
		],
		Turtles: [
			'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.'
		],
		Vegetation: [
			'Gut analysis reveals a varied but exclusively vegetarian diet.',
			'Voracious feeders, they consume several times their own body weight in vegetable matter every day.'
		],
		'[[Venom Urchin]]s': [
			'Powerful, armour-plated tongues allow them to penetrate the toxic, spiny shells of [[Venom Urchin]]s. The rich green yolk within provides ample nutrients.'
		],
		Wasteflesh: [
			'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.'
		],
		Worms: [
			'They push through worm piles with their strong snouts, slurping down whole tangled colonies in mere moments.'
		]
	}
	return dietSentences[searchDiet];
}

export default getDietSentence;