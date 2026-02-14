interface CreatureDataObject {
  values: string[];
  sentences: string[];
}

interface Diets {
  Carnivore: CreatureDataObject[];
  Omnivore: CreatureDataObject[];
  Herbivore: CreatureDataObject[];
  Robot: CreatureDataObject[];
}

export const robotSentences = [
  '00007FF69A5CF443  cmp  qword ptr [rsi+2E8h],r13',
  '00007FF69A5CF456  cmp  byte ptr [gbIgnore (07FF69E4BE31Fh)],0',
  '00007FF69A5CF46A  lea  rcx,[string  (07FF69B63A7F4h)]',
  '00007FF69A5CF497  mov  qword ptr [rsp+40h],rax',
  '00007FF69A5CF482  movdqu  xmmword ptr [rsp+60h],xmm0',
  '00007FF69A5CF48F  mov  dword ptr [rsp+48h],92Fh',
  '00007FF69A5CF4A1  movups  xmm0,xmmword ptr [rsp+38h]',
  '00007FF69A5CF4B2  mov  qword ptr [rsp+50h],rax',
  '00007FF69A5CF4B7  lea rdx,[gbIgnore (07FF69E4BE31Fh)]',
  '00007FF69A5CF4D6  movups xmm1,xmmword ptr [rsp+68h]',
  '00007FF712E2305D  movzx  edx,dx',
  '00007FF712E23060  shl  edx,10h',
  '00007FF712E23063  movzx  cx,r8w',
  '00007FF712E23067  or  edx,ecx',
  '00007FF712E23069  mov eax,r8d',
  '00007FF712E2306C  lock   cmpxchg dword ptr [rdi],edx',
  '00007FF712E22F04  mov  rax,qword ptr [rsi+8]',
  '00007FF712E22F08  mov  rcx,qword ptr [r9+rax+10h]',
  '00007FF712E22F0D  mov  eax,dword ptr [rcx]',
  '00007FF712E22F0F  mov  rcx,qword ptr [rsi+10h]',
  '00007FF712E22F13  test  eax,eax',
];

const robotData: CreatureDataObject[] = [
  {
    values: [
      'Pure Silicon',
      'Siphoned Data',
      '[[Nanite Cluster]]s',
      'Recycled Heat',
      'Cosmic Rays',
      'Decaying Atoms',
      'Random',
      'Interlopers',
    ],
    sentences: robotSentences,
  },
];

const fishDiet: CreatureDataObject[] = [
  {
    values: [
      'Marine snow',
      'Chemosynthesis',
      'Vented minerals',
      'Plankton',
      'Seaweed',
      'Deepwater algae',
      'Small crustaceans',
      'Rotten wood',
      'Decayed plant life',
      'Marine detritus',
      'Algal particulates',
      'Coral',
      'Living sponges',
      'Deepwater spores',
      'Nibbles at moss',
      'Hydrothermal minerals',
      'Water filtration',
      'Drifting plants',
      'Silicates',
      'High in calcium',
      'Water vines',
      '[[Kelp Sac|Kelp sacs]]',
      'Nutritious water weeds',
    ],
    sentences: [
      'Scavengers, they feed upon the soft downward drift of plankton; feasting upon the dying remains of tiny organisms.',
    ],
  },
];

function getDietSentenceData(diet: string) {
  if (!diet) return;
  const dietSentences: { DietDescriptions: Diets; WaterDietDescriptions: Diets } = {
    DietDescriptions: {
      Carnivore: [
        {
          values: ['Carnivorous'],
          sentences: ['Gut analysis reveals an iron-rich, carnivorous diet. Their stool is dense and mighty.'],
        },
        {
          values: ['Meat-eater'],
          sentences: [
            'Exclusively carnivorous, they feast upon the flesh of other creatures. None are spared from their jaws.',
          ],
        },
        {
          values: ['Hypnotises prey'],
          sentences: [
            'Unyielding, hypnotic eyes mesmerise their prey, allowing them to feast upon other creatures without the mortal peril of the hunt.',
          ],
        },
        {
          values: ['Crunches bones'],
          sentences: [
            'Sharp teeth and powerful jaws allow them to crunch through the carcasses of their prey, feasting upon flesh and bone alike.',
          ],
        },
        {
          values: ['Blood-drinker'],
          sentences: [
            'They feast upon their prey only when fresh, guzzling blood while it is still hot. Cold corpses and old meat are left for the scavengers.',
          ],
        },
        {
          values: ['Liquidised organs'],
          sentences: [
            'They digest their meals before they consume them. Powerful enzymes are injected directly into their prey; their liquid flesh is then drunk at leisure.',
          ],
        },
        {
          values: ['Extracts bone marrow'],
          sentences: [
            'Carnivores, they prefer to hunt larger creatures. They strip the flesh from the bones of their prey before finally consuming the marrow in a way that is almost ritualistic.',
          ],
        },
        {
          values: ['Organs'],
          sentences: [
            'Extremely well-adapted toxin removal systems allow them to consume prey in its entirety, from the standard flesh to the richly nutritious but frequently hazardous offal.',
          ],
        },
        {
          values: ['Raw meat'],
          sentences: [
            'Unsophisticated and unrestrained carnivores, they feast upon the raw flesh of their fallen prey.',
          ],
        },
        {
          values: ['Flesh-eater'],
          sentences: [
            'Dental analysis reveals jaws and teeth well-adapted to the ripping of flesh from bones, to the chewing life from other beings.',
          ],
        },
        {
          values: ['Hypercarnivore'],
          sentences: ['Extremely powerful carnivores, they sit atop the food chain. Nothing dares hunt them.'],
        },
        {
          values: ['Brain matter'],
          sentences: [
            'After making a kill, these carnivorous beasts shatter the skulls of their prey and offer the brain matter to the oldest member of their pack.',
          ],
        },
        {
          values: ['Sinew'],
          sentences: [
            'Row after row of highly-polished teeth allow them to tear through flesh and sinew alike. They can strip a corpse to the bone in minutes.',
          ],
        },
        {
          values: ['Fresh meat'],
          sentences: [
            'Well-adapted to the hunt but poorly-adapted to digestion, these carnivores will only feast upon the freshest of meat.',
          ],
        },
        {
          values: ['Corpses'],
          sentences: [
            "Carnivorous but opportunistic, these beasts will happily raid the corpse of some other hunter's prey.",
          ],
        },
        {
          values: ['Putrefied meat'],
          sentences: [
            'While physically weaker than some other carnivorous species, these creatures gain their advantage in the strength of their digestive tract. They will happily consume month-old corpses and suffer no ill-effect, no bacterial retaliation.',
          ],
        },
        {
          values: ['Cannibal'],
          sentences: [
            'All-consuming in their hunger, these carnivores will turn cannibal with little provocation, happy to feast upon their kin.',
          ],
        },
        {
          values: ['Offal'],
          sentences: [
            'Carnivores, they happily tear through the flesh of their prey, desperate to feast upon the offal found deep within the carcass.',
          ],
        },
        {
          values: ['Removed hearts'],
          sentences: [
            'Clean, fastidious eaters. They butcher the corpses of their prey, preparing each chunk of flesh on some instinctive schedule. They appear to reserve the hearts of their prey for consumption only during specific lunar phases.',
          ],
        },
        {
          values: ['Small animals'],
          sentences: [
            'They prefer to acquire their meat from sources that will not fight back. Quick jaws and sharp eyes allow them to prey upon the small, darting creatures that other hunters leave behind.',
          ],
        },
        {
          values: ['Other carnivores'],
          sentences: [
            'These are hypercarnivores, powerful predators at the top of the food chain. These are the beasts that hunt the hunters.',
          ],
        },
        {
          values: ['Large mammals'],
          sentences: [
            'They seek out larger creatures, prefering{{sic}} to make the one occasional kill and then feast upon it for months.',
          ],
        },
        {
          values: ['Flesh chunks'],
          sentences: [
            'Carnivores, their appetite for flesh knows no bounds. They swallow it down in great chunks, ripped from the bones of their prey.',
          ],
        },
        {
          values: ['Meat chunks'],
          sentences: [
            'Brutal carnivores, they will begin their bloody feasts even while their prey continues to thrash, its death throes not yet complete.',
          ],
        },
        {
          values: ['Coagulated blood'],
          sentences: [
            'After making a kill, they will preserve the blood of their prey in coagulated lumps. These stores serve them well during lean patches, times when their hunts go unsuccessful.',
          ],
        },
        {
          values: [
            'Rotten meat',
            'Toxic meat',
            'Boiled meat',
            'Radioactive meat',
            'Frozen meat',
            'Preserved meat',
            'Hypnotises prey',
            'Blood-drinker',
            '[[Venom Urchin]]s',
            'Anything',
            'Fetid meat',
            'Charred meat',
          ],
          sentences: [
            `Carnivores, their hunger for ${diet + (['Hypnotises prey', 'Blood-drinker'].includes(diet) ? ' {{sic}}' : '')} knows no bounds.`,
            `Carnivores, their desire for ${diet + (['Hypnotises prey', 'Blood-drinker'].includes(diet) ? ' {{sic}}' : '')} knows no limits.`,
            `Carnivores, their hunger for ${diet + (['Hypnotises prey', 'Blood-drinker'].includes(diet) ? ' {{sic}}' : '')} is never-ending.`,
          ],
        },
      ],
      Omnivore: [
        {
          values: ['Scavenged scraps'],
          sentences: [
            'Scavengers, they plunder the stores of other animals, stealing bones and scraps wherever they find them.',
          ],
        },
        {
          values: ['Insects and grubs'],
          sentences: [
            'Their tongues are razor sharp and lightning-quick, allowing them to catch and skewer the small insects that make up the majority of their diet.',
          ],
        },
        {
          values: ['Worms'],
          sentences: [
            'They push through worm piles with their strong snouts, slurping down whole tangled colonies in mere moments.',
          ],
        },
        {
          values: ['Anything'],
          sentences: [
            'Opportunistic, they happily devour any food source they find: fruit, nuts, insects, old bones, occasional rocks.',
          ],
        },
        {
          values: ['[[Faecium|Faeces]]'],
          sentences: [
            'Their adaptive sensory system temporarily shuts down their olfactory nerves as they snout through [[faecium]] deposits in search of undigested morsels.',
          ],
        },
        {
          values: ['Birds'],
          sentences: [
            'Quick-witted and sharp, they prey upon any unsuspecting or inattentive birds who linger too low to the ground.',
          ],
        },
        {
          values: ['Scavenged remains'],
          sentences: [
            'Sneaky and opportunistic, they steal from the kills of larger predators, nipping in and making away with whatever they can.',
          ],
        },
        {
          values: ['Partially-digested meat'],
          sentences: [
            'Omnivores, they gobble down anything they are able to find. Powerful digestive enzymes allow them to make use of the discarded scraps left behind by more powerful predators.',
          ],
        },
        {
          values: ['Eggs'],
          sentences: [
            'While not adapted for open confrontation, they are nonetheless impressive hunters. Under the cover of darkness, they steal into nests and feast upon eggs and hatchlings alike.',
          ],
        },
        {
          values: ['Steals from others'],
          sentences: [
            'Omnivorous and thieving, they eat whatever they find, wherever they find it. Frequently, this means consuming the hard-won stores of other animals.',
          ],
        },
        {
          values: ['[[Venom Urchin]]s'],
          sentences: [
            'Powerful, armour-plated tongues allow them to penetrate the toxic, spiny shells of [[Venom Urchin]]s. The rich green yolk within provides ample nutrients.',
          ],
        },
        {
          values: ['Foraged leftovers'],
          sentences: [
            'Omnivorous and greedy, they feast upon the unwanted scraps left behind by creatures with more specifically adapted diets.',
          ],
        },
        {
          values: ['Small animals'],
          sentences: [
            'Ill-equipped to compete with large animals, they choose to prey upon smaller foes. Rodents, insects, nitrogen-rich plantlife - anything unlikely to fight back.',
          ],
        },
        {
          values: ['Old bones'],
          sentences: [
            'Well-adapted digestive systems allow them to find nutrients where others would give up. They happily feast upon the marrow of discarded bones, cracking them open and guzzling their nutritious cores.',
          ],
        },
        {
          values: ['[[Mordite]]'],
          sentences: [
            'Drawn to the smell of death, their primary nutrient source is Mordite. They do not discriminate between beast or plant.',
          ],
        },
      ],
      Herbivore: [
        {
          values: ['Vegetation'],
          sentences: [
            'Gut analysis reveals a varied but exclusively vegetarian diet.',
            'Voracious feeders, they consume several times their own body weight in vegetable matter every day.',
          ],
        },
        {
          values: ['Foliage'],
          sentences: [
            'Group feeders, they collect leaves from local plantlife and eat only when the whole herd can be satisfied.',
            'Herbivores, they feast upon the mineral-rich leaves of local plantlife.',
          ],
        },
        {
          values: ['Small trees'],
          sentences: [
            'Constantly hungry, their specially adapted teeth and guts allow them to consume entire trees, from leaf to sap to trunk.',
            'They use their acidic tongues to burrow into trees, dissolving and then sucking out the soft and delicious inner wood.',
          ],
        },
        {
          values: ['Rotting fruit'],
          sentences: [
            'Their diet consists of fallen fruit that has begun to rot. This fermented, bacteria-enriched mush appears to have a vital place in their digestive system.',
            'Drawn to sugar, they consume the small fruits that fall from local flora.',
          ],
        },
        {
          values: ['Fresh leaves'],
          sentences: [
            'Their diet appears highly specific; they nibble only the freshest new shoots from local plantlife.',
            'Leaf-eaters, their teeth are too soft to eat most vegetable matter. As such, they consume only soft, fresh leaves.',
          ],
        },
        {
          values: ['Plant roots'],
          sentences: [
            'Sharp digging claws allow them to excavate and consume plant roots, which appear to make up the bulk of their diet.',
            'Spoor analysis reveals a high-fibre diet. Primary nutrient source appears to be excavated plant roots.',
          ],
        },
        {
          values: ['Digs for tubers'],
          sentences: [
            'Nocturnal tunnellers, they dig out elaborate tunnels in pursuit of nutritious tubers.',
            'Sharp sense and sharper claws allow them to tunnel swiftly through the earth in search of the tubers that form the bulk of their diet.',
          ],
        },
        {
          values: ['Grass'],
          sentences: [
            'Perpetual grazers, they consume vast amounts of grass each day.',
            'Primarily a grazing animal, the poor nutrient levels of their grass-based diet leads{{sic}} them to seek out and lick mineral rich rocks.',
          ],
        },
        {
          values: ['Foraged nuts'],
          sentences: [
            'A forager, they search the ground for the fallen nuts that provide their main nutrient source.',
            'Comfortable amongst dense foliage, they sniff and scurry among fallen leaves, searching for the nuts that provide their food.',
          ],
        },
        {
          values: ['Collects seeds'],
          sentences: [
            'Sharp vision allows them to detect seeds just as they begin to swell in their pods, giving them an edge over other foraging creatures.',
            'Gut analysis reveals their diet consists primarily of vast numbers of partially rotted nuts.',
          ],
        },
        {
          values: ['Nibbles at shoots'],
          sentences: [
            'Delicate feeders, they nibble selectively at local flora, ensuring they never entirely strip an area of foliage.',
            'Exceptionally fine teeth allow them to selectively eat, chewing only the most nutritious parts of otherwise tough and hard to digest plants.',
          ],
        },
        {
          values: ['Tall grasses'],
          sentences: ['They root through the undergrowth in search of food, chewing at the heads of ripe grasses.'],
        },
        {
          values: ['[[Cave Marrow|Cave marrow]]'],
          sentences: ['They delve underground in search of food, and show a particular fondness for the cave marrow.'],
        },
        {
          values: ['[[Mordite Root|Mordite roots]]'],
          sentences: ['Their hunger is only sated by the chunky, fleshy roots of the mordite plant.'],
        },
        {
          values: ['[[Faecium]]', '[[Coprite]]', 'Well-Matured Dung'],
          sentences: [
            'Highly specialised sense organs allow them to dig through the fecal deposits of other creatures, sniffing out and consuming the nutrients within.',
          ],
        },
        {
          values: ['Mostly rocks'],
          sentences: [
            'Dense teeth and a series of extremely acidic stomachs allow them to consume a diet mostly consisting of rocks.',
          ],
        },
        {
          values: ['[[Di-hydrogen]] crystals'],
          sentences: [
            'A plague upon stranded adventurers, as they feast upon [[di-hydrogen]] crystals.  Their highly reactive saliva dissolves the crystals without the need to chew.',
          ],
        },
        {
          values: ['Processes dirt'],
          sentences: [
            'They snuffle for food with their noses dug into the dirt, flicking earth into their mouths with long, spiked tongues. Nutrient source is presumed to be soil-bound microorganisms.',
          ],
        },
        {
          values: ['Oxide elements'],
          sentences: ['Their blood is highly toxic to most predators, thanks to their oxide-rich diet.'],
        },
        {
          values: ['Absorbed nutrients'],
          sentences: [
            'Though they have mouths, it seems their primary nutrient intake is via their skin, in a form of atmospheric mineral absorption.',
          ],
        },
        {
          values: [
            '[[Star Bramble]]',
            '[[Fungal Cluster]]',
            '[[Solar Vine]]',
            '[[Gamma Weed]]',
            '[[Frostwort]]',
            '[[Echinocactus]]',
            '[[Mordite Root]]',
            'Nitrous Oxide',
            '[[Cadmium]]',
            '[[Emeril]]',
            '[[Indium]]',
            '[[Kelp Sac]]',
            '[[Condensed Carbon]]',
          ],
          sentences: [
            `A highly specialised digestive system allows them to eat the ${diet} that grow on their home planet.`,
            `Gut analysis reveals a diet consisting almost entirely of ${diet}.`,
            `Their diet is rich in the ${diet} found in abundance on this planet.`,
            `Always hungry, they seek out and consume the ${diet} that grow freely across this world.`,
            `Their diet is varied, but they will gorge upon ${diet} at any opportunity.`,
            `They feast upon ${diet}, and will travel vast distances to find it.`,
          ],
        },
        {
          values: ['[[NipNip Buds|NipNip buds]]'],
          sentences: [
            'Their diet is largely conventional, consisting largely of local flora. But the scent of Nip Nip drives them to a frenzy, and they will gorge upon its buds.',
          ],
        },
        {
          values: ['[[Gravitino Ball|Gravitino balls]]'],
          sentences: [
            'Pugneum-infused teeth allow them to consume and digest gravitino balls, crunching through their outer shells in an explosion of light.',
          ],
        },
        {
          values: ['Stinging leaves'],
          sentences: [
            'Their tongues are hairy and thick, allowing them to happily chew upon all but the most venomous of leaves.',
          ],
        },
        {
          values: ['Algae'],
          sentences: [
            'Filtering gills inside their cheeks allow them to suck up water and extract nutrients from algal blooms.',
          ],
        },
        {
          values: ['Flowers'],
          sentences: [
            'They supplement their tuber-based diet with brightly-coloured flowers; the complex dye compounds providing a valuable micronutrient boost.',
          ],
        },
        {
          values: ['Petals'],
          sentences: [
            'Their finely-tuned sense of smell draws them to the most beautiful, richly-scented flowers, which they then consume whole.',
          ],
        },
        {
          values: ['Nectar'],
          sentences: [
            'A specially-adapted tongue indicates their diet is predominantly nectar, harvested from local flora.',
          ],
        },
        {
          values: ['Pollen'],
          sentences: [
            'A gnawing hunger for sugar drives their every waking moment; their existence a constant hunt from sweet plant to the next.',
          ],
        },
      ],
      Robot: robotData,
    },
    WaterDietDescriptions: {
      Carnivore: [
        {
          values: [
            'Other fish',
            'Cannibalism',
            'Marine eggs',
            'Turtles',
            'Shellfish',
            'Drifting carcasses',
            'Bones',
            'Hunts squid',
            'Brined organs',
            'Salinated flesh',
            'Brains',
            'Blood',
            'Gelatinous chunks',
            'Wasteflesh',
          ],
          sentences: [
            'Aggressive hunters, they make a meal of any fish unfortunate enough to get caught in their jaws.',
          ],
        },
      ],
      Omnivore: fishDiet,
      Herbivore: fishDiet,
      Robot: robotData,
    },
  };
  return dietSentences;
}

function getDietSentence(diet: string): string[] {
  const sentences = getDietSentenceData(diet);
  if (!diet || !sentences) return [];

  const possibleSentences = new Set<string>();

  for (const dietaryPreference of Object.values(sentences)) {
    const preferences: CreatureDataObject[] = Object.values(dietaryPreference).flat();
    const matches = preferences.filter((item) => item.values.includes(diet)).flatMap((item) => item.sentences);
    matches.forEach((item) => possibleSentences.add(item));
  }

  return Array.from(possibleSentences);
}

export default getDietSentence;
