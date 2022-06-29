const GHubHuburbRegions = ['Wekeram Conflux', 'Ahomas Fringe', 'Nudryorob Fringe', 'Urzews Instability', 'Ercays', 'Dahiloci Conflux', 'Rapphosu', 'Kemurrim Expanse', 'Ardarea Sector', 'Cetrocho Spur', 'Guitat Cloud', 'Unceto Cloud', 'Yamurab Instability', 'Tenavata Terminus', 'Menacaro', 'Ziessuw Mass'];
// GHub has additional ship and MT hunting grounds
for (let i of GHubHuburbRegions) {
	GHubRegions.push(i);
};

const FighterSubtype = ['Alpha', 'Barrel', 'Jet', 'Long', 'Needle', 'Rasa', 'Snowspeeder', 'Stubby', 'Viper'];
const ExplorerSubtype = ['Hopper', 'Firespray'];
const HaulerSubtype = ['Aftershock', 'Ball', 'Body only', 'Box', 'C-Wing', 'Bent Wing', 'D-Flect Wing', 'E-Wing', 'Fan Wing', 'V-Wing', 'Thrusters only', 'W-Wing', 'Shield', 'Tie-Shield', 'Split Shield'];
const ShuttleSubtype = ['Single Tube', 'Double Tube', 'Small Box Body', 'Large Box Body'];
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
			setDropDownOptions(HaulerSubtype, subtype);
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
	let chanceSentence = 'always spawns';
	if (type != 'Exotic' && type == 'Living Ship') {
		switch (econ[0]) {
			case "★★★":
				var chance = '2%';
				break;

			case "★★":
				var chance = '1%';
				break;

			case "★":
				var chance = '0%';
				break;

			default:
				var chance = '5%';
		}
		chanceSentence = 'has a ' + chance + ' chance to spawn'
	}
	document.getElementById(codeId).innerHTML = 'This starship ' + chanceSentence + ' in S-class.'
}

// assigns starship stats macro
function shipStats(inputId, codeId) {
	type = document.getElementById(inputId).value
	if (type == 'Living Ship') {
		type = 'Living'
	}
	setOutput(codeId, type + 'Ship')
}

// shows and hides section based on other input
function showHideStarshipSelects(type_inputId, subtype_inputId, exotic_inputId, pilot_inputId, maneuver_inputId, damage_inputId, shield_inputId, warp_inputId, inventory_inputId, planet_inputId, moon_inputId, axes_inputId, economy_inputId) {
	const yes = ''
	const no = 'none'

	var type = document.getElementById(type_inputId).value
	var subtype = document.getElementById(subtype_inputId)
	var exotic = document.getElementById(exotic_inputId)
	var pilot = document.getElementById(pilot_inputId)
	var inventory = document.getElementById(inventory_inputId)
	var maneuver = document.getElementById(maneuver_inputId)
	var damage = document.getElementById(damage_inputId)
	var shield = document.getElementById(shield_inputId)
	var warp = document.getElementById(warp_inputId)
	var economy = document.getElementById(economy_inputId)
	var planet = document.getElementById(planet_inputId)
	var moon = document.getElementById(moon_inputId)
	var axes = document.getElementById(axes_inputId)

	var subtypetr = subtype.parentElement.parentElement
	var exotictr = exotic.parentElement.parentElement
	var pilottr = pilot.parentElement.parentElement
	var inventorytr = inventory.parentElement.parentElement
	var maneuvertr = maneuver.parentElement.parentElement
	var damagetr = damage.parentElement.parentElement
	var shieldtr = shield.parentElement.parentElement
	var warptr = warp.parentElement.parentElement
	var economytr = economy.parentElement.parentElement
	var planettr = planet.parentElement.parentElement
	var moontr = moon.parentElement.parentElement
	var axestr = axes.parentElement.parentElement

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
			inventory.value = ''
			maneuver.value = ''
			damage.value = ''
			shield.value = ''
			warp.value = ''
			//			economy.value = ''
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
			economytr.style.display = no
			planettr.style.display = no
			moontr.style.display = no
			axestr.style.display = no

			subtype.value = ''
			exotic.value = 'Royal'
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
			//			economy.value = ''
			planet.value = ''
			moon.value = ''
			axes.value = ''
	}
}

function resetShip(galleryDesc, type_inputId, subtype_inputId, exotic_inputId, pilot_inputId, maneuver_inputId, damage_inputId, shield_inputId, warp_inputId, inventory_inputId, planet_inputId, moon_inputId, axes_inputId, economy_inputId) {
	resetAll(galleryDesc)
	document.getElementById(type_inputId).value = 'Fighter';
	showHideStarshipSelects(type_inputId, subtype_inputId, exotic_inputId, pilot_inputId, maneuver_inputId, damage_inputId, shield_inputId, warp_inputId, inventory_inputId, planet_inputId, moon_inputId, axes_inputId, economy_inputId);
	subtypeDropdown(type_inputId, subtype_inputId);
}
/*
// calculates inventory sizes
function invCalc() {
	
	
}

// constructs location sentence
function loc(codeId,) {
	if (document.getElementById(type).value == 'Freighter' && document.getElementById().value) {
		
	getHubNumber("region_input", "hub_nr");
	
//Freighter
This freighter was discovered in the [[SystemName]] [[star system]] in the [[RegionName]] [[region]] (HUBx) of the [[Galactic Hub Eissentam]], in the [[Eissentam]] [[galaxy]].
//Capital
It can be found after warping into the star system if a space battle is triggered.
//System
It can be found randomly while pulsing around in the star system.	

//Normal Ship
This starship was discovered in the [[SystemName]] [[star system]] in the [[RegionName]] [[region]] (HUBx) of the [[Galactic Hub Eissentam]], in the [[Eissentam]] [[galaxy]].

It can be found at either the [[Space Station]] or any [[Trade Outpost]]s available in the star system.

//LS
This starship was discovered in the [[SystemName]] [[star system]] in the [[RegionName]] [[region]] (HUBx) of the [[Galactic Hub Eissentam]], in the [[Eissentam]] [[galaxy]].

It can be found on the [[PlanetName/MoonName]] planet/moon at the coordinates lat, long.
}
*/

/*
{{trim|{{#switch: {{lc:{{{region|}}} }}<!--Assigning galaxies and region numbers based on user input-->
| riwala = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB1)}} 
| omskio instability = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB2)}}
| marcki = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB3)}}
| anolamga spur = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB4)}}
| sea of zonyayp = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB5)}}
| rayuyar band = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB6)}}
| umaton instability = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB7)}}
| exramb adjunct = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB8)}}
| ologowe fringe = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB9)}}
| yatrifex = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB10)}}
| yeiada sector = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB11)}}
| iptrevs fringe = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB12)}}
| yamiraith sector = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB13)}}
| wedragi spur = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB14)}}
| rezhensk = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB15)}}
| sobert cloud = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB16)}}
| umtats anomaly = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB17)}}
| tavill = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB18)}}
| qangew expanse = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB19)}}
| nijhwal boundary = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB20)}}
| usband cluster = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB21)}}
| ejongaa anomaly = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB22)}}
| zahrel expanse = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB23)}}
| the arm of fupand = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB24)}}
| cuculta = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB25)}}
| etmarao = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB26)}}
| otreie void = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB27)}}
| the arm of vezitinen = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB1)}}
| canthian = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB2)}}
| dexterf sector = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB3)}}
| the arm of katteus = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB4)}}
| nugsdor adjunct = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB5)}}
| uefert nebula = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB6)}}
| widraik = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB7)}}
| airnaka conflux = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB8)}}
| sivess instability = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB9)}}
| savenix instability = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB10)}}
| nonlopsi instability = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB11)}}
| #default = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|Huburb}}
}}
{{#switch: {{lc:{{{economy}}} }}<!--Assigning economy tiers based on user input-->
| declining
| destitute
| failing
| fledgling
| low supply
| struggling
| unsuccessfu
| unpromising = {{#vardefine:EconTier|T1}}
| adequate
| balanced
| comfortable
| developing
| medium supply
| promising 
| satisfactory
| sustainable = {{#vardefine:EconTier|T2}}
| advanced
| affluent
| booming
| flourishing
| high supply
| opulent
| prosperous
| wealthy = {{#vardefine:EconTier|T3}}
| #default = {{#vardefine:EconTier|unknown}}<!--flagging Economy name as invalid-->
}}
{{#switch: {{lc:{{{subtype}}} }}<!--Assigning capital status to freighters based on user input-->
| venator
| imperial
| resurgent
| sentinel
| battleship
| dreadnought = {{#vardefine:Cap|yes}}
| #default = {{#vardefine:Cap|no}}
}}
{{#switch: {{lc:{{{type}}} }}<!--look if entered type is valid-->
| exotic
| explorer
| fighter
| hauler
| shuttle
| freighter
| living ship = {{#vardefine:KnownType|yes}}
| #default = {{#vardefine:KnownType|no}}<!--flagging type as invalid-->
}}
{{#switch: {{lc:{{{inventory}}} }}<!--look if entered inventory size is valid-->
| small
| medium
| large = {{#vardefine: InvKnown|yes}}
| #default = {{#vardefine: InvKnown|no}}<!--flagging inventory size as invalid-->
}}
{{#ifeq: {{#var:KnownType}}|no| <big><pre>Error during page creation: Unknown type. Please check for spelling errors.</pre></big>| }}<!--give error if type is invalid-->
{{#switch: {{lc: {{{type}}} }}| freighter| exotic| living ship = |#default = {{#ifeq: {{#var:InvKnown}}|no| <big><pre>Error during page creation: Unknown inventory size. Please check for spelling errors.</pre></big>| }} }}<!--give error if inventory size is invalid-->
{{#ifeq: {{#var:EconTier}}|unknown| <big><pre>Error during page creation: Unknown economy. Please check for spelling errors.</pre></big>| }}<!--give error if Economy name is invalid-->
<nowiki>{{Version|</nowiki>{{{release}}}<nowiki>}}</nowiki><br><!--Assign version macro-->
<nowiki>{{GHub</nowiki>{{#ifeq: {{#var:HUB}} |EHUB |&nbsp;Eissentam|}}<nowiki>}}</nowiki><br><!--Assign civ macro-->
}}<nowiki>{{trim|{{Starship infobox</nowiki><br>
| name = {{#explode: {{PAGENAME}}|(|0}}<br><!--Getting shipname from page name, taking into account potential system names in the title-->
| image = {{#if: {{{image|}}}|{{{image}}}|{{#explode: {{PAGENAME}}|(|0}} front.jpg}}<br><!--Generating image name from shipname-->
| galaxy = {{#ifeq: {{#var:HUB}} |EHUB |Eissentam|Euclid}}<br><!--Generating galaxy from hub variable-->
| region = {{ucfirst: {{lc: {{#explode:{{{region}}}| |0}} }} }} {{#ifeq: {{lc: {{#explode:{{{region}}}| |1}} }}|of|{{lc: {{#explode:{{{region}}}| |1}} }}| {{ucfirst: {{lc: {{#explode:{{{region}}}| |1}} }} }} }} {{#ifeq: {{lc: {{#explode:{{{region}}}| |2}} }}|of|{{lc: {{#explode:{{{region}}}| |2}} }}| {{ucfirst: {{lc: {{#explode:{{{region}}}| |2}} }} }} }} {{ucfirst: {{lc: {{#explode:{{{region}}}| |3}} }} }}<br><!--Splitting user input into pieces, auto capitalizing region names (everything execpt "of" is capitalized)-->
| system = {{{system}}}<br>
| planet = {{#ifeq: {{lc: {{{type}}} }}| living ship |{{{planet}}} | }}<br><!--parsing planet name if it is a living ship-->
| moon = {{#ifeq: {{lc: {{{type}}} }}| living ship |{{{moon}}} | }}<br><!--parsing moon name if it is a living ship-->
| axes = {{#ifeq: {{lc: {{{type}}} }}| living ship|{{#replace: {{{lat}}}|,|.}}, {{#replace: {{{long}}}|,|.}} | }}<br><!--parsing planetary coordinates if it is a living ship-->
| economy = {{#switch: {{#var:EconTier}}|T1 = ★|T2 = ★★ |T3 = ★★★ }} ({{ucfirst: {{lc: {{{economy}}} }} }})<br><!--Assigning Economy stars and economy name-->
| coordinates = {{Glyphs2Coords|{{uc: {{{portalglyphs}}}}}}}<br><!--Capitalizing coordinates-->
| portalglyphs = {{uc: {{{portalglyphs}}} }}<br>
| type = {{#ifeq: {{lc: {{{type}}} }}|living ship|Living Ship|{{ucfirst: {{lc: {{{type}}} }} }} }}<br><!--autocapitalizing ship type-->
| subtype = {{#if: {{{subtype|}}} | {{#ifeq: {{#count: {{lc: {{{subtype}}} }}|-}}|0|{{ucfirst: {{lc: {{#explode: {{{subtype}}}| |0 }} }} }} {{ucfirst: {{lc: {{#explode: {{{subtype}}}| |1 }} }} }}|{{#replace: {{ucfirst: {{lc: {{#explode: {{{subtype}}}|-|0 }} }} }}-{{ucfirst: {{lc: {{#explode: {{{subtype}}}|-|1 }} }} }}|wing|Wing }} }} |}}<br><!--autocapitalizing subtype, taking into account "-"-->
| pilot = {{#ifeq: {{lc:{{{type}}} }}|freighter|{{ucfirst: {{lc: {{{pilot}}} }} }}|}}<br><!--parsing planet name if it is a freighter-->
| exotic = {{#ifeq: {{lc:{{{type}}} }}|exotic|{{#if: {{{Exoticsubtype|}}}| {{ucfirst: {{lc: {{{Exoticsubtype}}} }} }} }}| }}<br><!--parsing exotic subtype if it is an exotic-->
| class = {{#ifeq: {{lc: {{{type}}} }}|living ship|S|}}<br>
| inventory = {{#switch: {{lc:{{{type}}} }}<!--Assigning inv sizes-->
| freighter = {{#ifeq: {{#var:Cap}}|yes|Large|Small}}<!--big if capital freighter, otherwise small-->
| shuttle = {{#ifeq:{{{inventory}}}|Small|Small|Medium}}<!--small if entered, otherwise medium-->
| living ship = Medium
| exotic = Small
| #default = {{ucfirst: {{lc: {{{inventory}}} }} }}<!--if nothing above matches, taking user entered inv size-->
}}<br>
| slots = {{#switch: {{lc:{{{type}}} }} <!--assigning slot counts, checking for small, medium or large user inputs-->
| fighter = {{#switch: {{lc:{{{inventory}}} }}|small = 15-19|medium = 20-29|large=30-38}}
| hauler = {{#switch: {{lc:{{{inventory}}} }} |small = 25-31|medium = 32-39|large=40-48}}
| explorer = {{#switch: {{lc:{{{inventory}}} }} |small = 15-19|medium = 20-29|large=30-38}}
| shuttle = {{#ifeq: {{lc:{{{inventory}}} }} |small| 18-23|19-28}}
| exotic = 15-20
| living ship = 22
| freighter = {{#ifeq: {{#var:Cap}}|yes|24-34|15-19}} 
}}<br>
| techslots = {{#switch: {{lc:{{{type}}} }}<!--assigning tech slot counts, checking for small, medium or large user inputs-->
| fighter = {{#switch: {{lc:{{{inventory}}} }}|small = 2-4|medium = 3-5|large=5-12}}
| hauler = {{#switch: {{lc:{{{inventory}}} }}|small = 2-4|medium = 4-6|large=6-8}}
| explorer = {{#switch: {{lc:{{{inventory}}} }}|small = 3-5|medium = 5-8|large=8-12}}
| shuttle = {{#ifeq: {{lc:{{{inventory}}} }}|small| 3-6|5-8}}
| exotic = 4-6
| living ship = 21
| freighter = {{#ifeq: {{#var:Cap}}|yes|5-9|3-6}} 
}}<br>
| cost = {{#switch: {{lc:{{{type}}} }}<!--assigning costs, checking for small, medium or large user inputs-->
| fighter = {{#switch: {{lc:{{{inventory}}} }}|small = 550,000-3,000,000|medium = 1,865,000-18,200,000|large=10,500,000-57,500,000}}
| hauler = {{#switch: {{lc:{{{inventory}}} }}|small = 4,500,000-20,000,000|medium = 12,700,000-52,500,000|large=32,500,000-126,000,000}}
| explorer = {{#switch: {{lc:{{{inventory}}} }} |small = 445,000-1,875,000|medium = 1,565,000-11,900,000|large=9,200,000-39,000,000}}
| shuttle = {{#ifeq: {{lc:{{{inventory}}} }} |small| 510,000-2,525,000|660,000-6,600,000}}
| exotic = 5,000,000-12,000,000
| living ship = 2,980,000
| freighter = {{#ifeq: {{#var:Cap}}|yes|26,150,000-178,000,000|5,000,000-23,000,000}} 
}}<br>
| civilized = {{#ifeq: {{#var:HUB}}|EHUB| Galactic Hub Eissentam|{{#ifeq: {{#var:Num}}|Huburb|GHSH|Galactic Hub Project}} }}<br><!--assigning civilized, based on region user input-->
| discovered = {{#if: {{{discovered|}}} | {{trim|{{#ifeq: {{#count: {{{discovered}}}|reddit}}|0| {{#ifeq: {{#count: {{{discovered}}}|User}}|0|{{{discovered}}}| <nowiki>{{profile|</nowiki>{{trim|{{#explode: {{#explode: {{{discovered}}}|:|-1 }}|{{!}}|0 }}{{#ifeq: {{#explode: {{#explode: {{{discovered}}}|:|-1 }}|{{!}}|0 }}|{{#sub: {{#explode: {{#explode: {{{discovered}}}|:|-1 }}|{{!}}|1 }}|0|-2}}| |{{!}}{{#sub: {{#explode: {{#explode: {{{discovered}}}|:|-1 }}|{{!}}|1 }}|0|-2}} }} }}<nowiki>}}</nowiki>}}|<nowiki>{{reddit|</nowiki>{{trim|{{#explode: {{#explode: {{{discovered}}}|/|-1 }}| |0 }}{{#ifeq: {{#explode: {{#explode: {{{discovered}}}|/|-1 }}| |0 }}|{{#sub: {{#explode: {{#explode: {{{discovered}}}|/|-1 }}| |1 }}|0|-1}}| |{{!}}{{#sub: {{#explode: {{#explode: {{{discovered}}}|/|-1 }}| |1 }}|0|-1}} }} }}<nowiki>}}</nowiki>}} }} }}<br><!--parsing discovered if populated, We Were Exploding Anyway-->
| discoveredlink = {{#if: {{{discoveredlink|}}} | {{{discoveredlink}}} }}<br><!--parsing discoveredlink if populated-->
| researchteam = GHSH<br>
| damageB = {{#ifeq: {{lc: {{{type}}} }}|living ship|{{#replace: {{{damage}}}|,|.}} }}<br>
| shieldB = {{#ifeq: {{lc: {{{type}}} }}|living ship|{{#replace: {{{shield}}}|,|.}} }}<br>
| warpB = {{#ifeq: {{lc: {{{type}}} }}|living ship|{{#replace: {{{hyperdrive}}}|,|.}} }}<br>
| maneuverB = {{#ifeq: {{lc: {{{type}}} }}|living ship|{{#replace: {{{maneuver}}}|,|.}} }}<br>
| release = {{{release}}}<!--parsing release-->
<br><nowiki>}}}}</nowiki><br>
<nowiki>'''</nowiki>{{#explode: {{PAGENAME}}|(|0}}<nowiki>'''</nowiki> is a {{#ifeq: {{lc:{{{type}}} }}|freighter |freighter |starship}}.

<nowiki>==Summary==</nowiki><br>
<nowiki>'''</nowiki>{{#explode: {{PAGENAME}}|(|0}}<nowiki>'''</nowiki> is {{#ifeq: {{#sub: {{lc:{{{type}}} }}|0|1}} | e | an | a }} <nowiki>[[</nowiki>Starship Catalogue - {{#ifeq: {{lc: {{{type}}} }}| living ship| Living Ship|{{ucfirst: {{lc: {{#explode:{{{type}}}| |0}} }} }} }}|{{#ifeq: {{lc: {{{type}}} }}| living ship| Living Ship| {{ucfirst: {{lc: {{#explode:{{{type}}}| |0}} }} }} }}<nowiki>]]</nowiki>-type <nowiki>[[starship]].</nowiki><!--taking first ship letter and determining a or an, assigning link to correct catalog and autocapitalizing types-->

{{#switch: {{lc:{{{type}}} }}<!--Assigning S class probability based on Economy name-->
| exotic = This starship always spawns in S-class.
| living ship = This starship always spawns in S-class.
| #default = This {{#ifeq: {{lc:{{{type}}} }}|freighter | freighter|starship}} has a {{#switch: {{#var:EconTier}}|T1 = 0 |T2 = 1 |T3 = 2}}% chance to spawn in S-class.
}}

<nowiki>==Appearance==</nowiki><br>
{{#if: {{{appearance|}}}|{{{appearance}}} }}<!--putting appearance desc here if populated-->

<nowiki>==Stats==</nowiki><br>
<nowiki>{{</nowiki>{{trim|{{#ifeq: {{lc:{{{type}}} }}| living ship | LivingShip| {{ucfirst: {{lc: {{#explode:{{{type}}}| |0}} }} }}Ship}} }}Stats<nowiki>}}</nowiki><!--Assigning stat macros based on user entered class-->

<nowiki>==Location==</nowiki><br>
This {{#ifeq: {{lc:{{{type}}} }}|freighter | freighter|starship}} was discovered in the <nowiki>[[</nowiki>{{{system}}}<nowiki>]]</nowiki> <nowiki>[[star system]]</nowiki> in the <nowiki>[[</nowiki>{{trim|{{ucfirst: {{lc: {{#explode:{{{region}}}| |0}} }} }} {{#ifeq: {{lc: {{#explode:{{{region}}}| |1}} }}|of|{{lc: {{#explode:{{{region}}}| |1}} }}| {{ucfirst: {{lc: {{#explode:{{{region}}}| |1}} }} }} }} {{#ifeq: {{lc: {{#explode:{{{region}}}| |2}} }}|of|{{lc: {{#explode:{{{region}}}| |2}} }}| {{ucfirst: {{lc: {{#explode:{{{region}}}| |2}} }} }} }} {{ucfirst: {{lc: {{#explode:{{{region}}}| |3}} }} }} }}<nowiki>]]</nowiki> {{#ifeq: {{#var:Num}}|Huburb|<nowiki>[[region]]</nowiki>, Huburb|{{#var:Num}} }} of the <nowiki>[[Galactic Hub</nowiki>{{#ifeq: {{#var:HUB}}|EHUB|&nbsp;Eissentam<nowiki>]]</nowiki>, in the <nowiki>[[Eissentam]] [[galaxy]].</nowiki>|<nowiki>]]</nowiki>.}}<!--auto capitalizing region name, using galaxy based on region-->

{{#switch: {{lc:{{{type}}} }}
| freighter = {{#ifeq: {{#var:Cap}} |yes|It can be found after warping into the star system if a space battle is triggered. |It can be found randomly while pulsing around in the star system.}}
| living ship = It can be found on {{#if: {{{moon|}}} |moon <nowiki>[[</nowiki>{{{moon}}}<nowiki>]]</nowiki>|planet <nowiki>[[</nowiki>{{{planet}}}<nowiki>]]</nowiki>}} at the coordinates ({{#replace: {{{lat}}}|,|.}}, {{#replace: {{{long}}}|,|.}}). 
| #default = It can be found at the <nowiki>[[Space Station]] or any of the [[Trade Outpost]]s</nowiki> in the system.}}<!--Assigning location based on type-->

<nowiki>==Additional information==</nowiki><br>
{{trim|Featured in the {{#ifeq: {{lc:{{{type}}} }}|freighter |<nowiki>[[</nowiki>Galactic Hub {{#ifeq: {{#var:HUB}} |EHUB|Eissentam|}} Freighter Catalog<nowiki>]]</nowiki>|<nowiki>[[</nowiki>Galactic Hub {{#ifeq: {{#var:HUB}} |EHUB|Eissentam|}} Starship Catalog - {{#ifeq: {{lc: {{{type}}} }}| living ship| Living Ship|{{ucfirst: {{lc: {{#explode:{{{type}}}| |0}} }} }} }}<nowiki>]]</nowiki> album}} and documented by the <nowiki>[[Galactic Hub Ship Hunters]]</nowiki>.<!--Assigning catalog based on type, adding documented by information if populated-->

{{#if: {{{docby|}}}| Documented by GHSH researcher {{trim|{{#ifeq: {{#count: {{{docby}}}|reddit}}|0| {{#ifeq: {{#count: {{{docby}}}|User}}|0|{{{docby}}}| <nowiki>{{profile|</nowiki>{{trim|{{#explode: {{#explode: {{{docby}}}|:|-1 }}|{{!}}|0 }}{{#ifeq: {{#explode: {{#explode: {{{docby}}}|:|-1 }}|{{!}}|0 }}|{{#sub: {{#explode: {{#explode: {{{docby}}}|:|-1 }}|{{!}}|1 }}|0|-2}}| |{{!}}{{#sub: {{#explode: {{#explode: {{{docby}}}|:|-1 }}|{{!}}|1 }}|0|-2}} }} }}<nowiki>}}</nowiki>}}|<nowiki>{{reddit|</nowiki>{{trim|{{#explode: {{#explode: {{{docby}}}|/|-1 }}| |0 }}{{#ifeq: {{#explode: {{#explode: {{{docby}}}|/|-1 }}| |0 }}|{{#sub: {{#explode: {{#explode: {{{docby}}}|/|-1 }}| |1 }}|0|-1}}| |{{!}}{{#sub: {{#explode: {{#explode: {{{docby}}}|/|-1 }}| |1 }}|0|-1}} }} }}<nowiki>}}</nowiki>}} }}. }} }}

<nowiki>==Gallery==</nowiki><br>
<nowiki><gallery></nowiki><br>{{#ifeq: {{lc: {{{type}}} }}|living ship
|{{#if: {{{rear|}}}|{{{rear}}}|{{#explode: {{PAGENAME}}|(|0}} back.jpg}} <nowiki>|</nowiki> Rear view of {{#ifeq: {{lc:{{{type}}} }}|freighter|freighter| ship}}
<br>{{#if: {{{inv|}}}|{{{inv}}}|{{#explode: {{PAGENAME}}|(|0}} inv.jpg}} <nowiki>|</nowiki> inventory screen
<br>{{#if: {{{crashsite|}}}|{{{crashsite}}} |{{#explode: {{PAGENAME}}|(|0}} crash.jpg}} <nowiki>|</nowiki> Crash site
<br>{{#if: {{{scan|}}}|{{{scan}}}|{{#explode: {{PAGENAME}}|(|0}} scan.jpg}} <nowiki>|</nowiki> Analysis Visor Scan
<br>{{#if: {{{planetdm|}}}|{{{planetdm}}} |{{#if: {{{moon|}}}|{{{moon}}}|{{{planet}}}}} DM.jpg}} <nowiki>|</nowiki> {{#if: {{{moon|}}}|Moon|Planet}} Page
<br>{{#if: {{{sysdm|}}}|{{{sysdm}}}|{{{system}}} DM.jpg}} <nowiki>|</nowiki> System Page
|{{#if: {{{rear|}}}|{{{rear}}}|{{#explode: {{PAGENAME}}|(|0}} back.jpg}} <nowiki>|</nowiki> Rear view of {{#ifeq: {{lc:{{{type}}} }}|freighter|freighter| ship}}
<br>{{#if: {{{inv|}}}|{{{inv}}}|{{#explode: {{PAGENAME}}|(|0}} inv.jpg}} <nowiki>|</nowiki> inventory screen
<br>{{#if: {{{pilotpic|}}}|{{{pilotpic}}}|{{#explode: {{PAGENAME}}|(|0}} {{#ifeq: {{lc:{{{type}}} }}|freighter|cpt|pilot}}.jpg}} <nowiki>|</nowiki> NPC {{#ifeq: {{lc:{{{type}}} }}|freighter|Freighter Captain|Ship Pilot}}
<br>{{#if: {{{scan|}}}|{{{scan}}}|{{#explode: {{PAGENAME}}|(|0}} scan.jpg}} <nowiki>|</nowiki> Analysis Visor Scan
<br>{{#if: {{{sysdm|}}}|{{{sysdm}}}|{{{system}}} DM.jpg}} <nowiki>|</nowiki> System Page }}
<br><nowiki></gallery></nowiki><!--Creating gallery using either automatic filenames or custom ones if parms are populated-->

<nowiki>==Reference links==</nowiki><br>
<nowiki>{{StarshipRefLinks|type=</nowiki>{{{type}}}<nowiki>}}</nowiki><noinclude>
{{doc}}
</noinclude>
*/