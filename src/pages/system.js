function startupFunctions() {
	celestialStartupFunctions();
	combineEconConf();
	merchantUpgrades();
	regionLong();
	spaceStationSection();
	planetInputs();
	expectedHubTagSentence();
	civCatalog();
	addTemplate();
	wikiCodePercentage();
	autoPirate(globalElements.input.wealthInput);
}

const systemElements = {
	input: {
		planetInput: 'planetNumInput',
		moonInput: 'moonNumInput',
		terminalInputs: 'terminalInputs',
		systemExtras: 'systemExtras',
	},
	output: {
		tradeTerminal: 'tradeTerminal',
		planets: 'planets',
		Freighters: 'Freighters',
		Derelict: 'Derelict',
		Organic: 'Organic',
		Starships: 'Starships',
		MTs: 'MTs',
	}
}
updateGlobalElements(systemElements);

const systemElementFunctions = {
	civ: ['regionLong(); expectedHubTagSentence(); civCatalog()', null, true],
	portalglyphsInput: ['regionLong(); expectedHubTagSentence(); autoBH()', null, true],
	planetInput: ['numberStats(this); planetInputs()'],
	moonInput: ['numberStats(this); planetInputs()'],
	nameInput: ['expectedHubTagSentence()'],
	factionInput: ['spaceStationSection(); combineEconConf()'],
	economybuyInput: ['wikiCodePercentage(this)'],
	economysellInput: ['wikiCodePercentage(this)'],
	wealthInput: ['autoPirate(this)'],
	conflictInput: ['autoPirate(this)'],
	platformInput: ['docByExternal()'],
	distanceInput: ['numberStats(this)'],
	systemExtras: ['addTemplate(this)'],
}
assignElementFunctions(systemElementFunctions);

function locationSentence() {
	const region = pageData.region;
	const civ = pageData.civShort;
	const HubNr = regNr(region);
	const galaxy = HubGal(civ);

	const output = `Located in the [[${region}]] [[region]]${HubNr} of the ${galaxy}.`;

	wikiCode(output, 'loc');
}

// inserts the planet table into the code
function planetInputs() {
	const inputTarget = globalElements.input.waterInput.parentElement.previousElementSibling;
	const outputTarget = globalElements.output.planets;
	const planetNr = pageData.planet;
	const moonNr = pageData.moon;
	const bodies = clamp(parseInt(planetNr) + parseInt(moonNr), 2, 6);
	if (isNaN(bodies)) return;

	function clamp(value, min, max) {
		return Math.max(min, Math.min(max, value));
	}

	function diff() {
		const planetIDs = new Set();
		const planets = (() => {
			const elements = document.querySelectorAll('[data-planet]');
			for (const element of elements) {
				planetIDs.add(element.dataset.planet);
			}
			return planetIDs.size;
		})();
		const diff = bodies - planets;		// positive if we need to add sections, negative if we need to delete sections
		return diff;
	}
	const elementList = document.querySelectorAll('[data-planet]');
	let childIndex = getChildIndex(elementList, 'dataset.planet');

	while (diff() != 0) {
		if (diff() > 0) {
			addPlanet(childIndex);
			childIndex++;
		} else {
			removePlanet();
		}
	}

	function removePlanet() {
		const elements = document.querySelectorAll('[data-planet]');
		const planetIDs = new Set();
		for (const element of elements) {
			planetIDs.add(element.dataset.planet);
		}
		const sectionName = Array.from(planetIDs).pop();
		const sections = document.querySelectorAll(`[data-planet="${sectionName}"]`);
		removeSection(sections);
	}

	function addPlanet(i) {
		const oddEvenClass = 'is-' + oddEven(i);
		const inputTemplate = `<div class="tableHeader text ${oddEvenClass} sectionToggle" data-planet="planet${i}">
			<p><output id=planetClass${i}>Planet</output> ${i}: <output class="has-text-weight-bold" name="planetName${i}"></output></p>
			<button class="button" onclick="toggleSection('planet${i}', this)">Hide</button>
		</div>
		<div class="tableCell text ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<label for="planetName_input${i}">Planet name</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Name</data>
				<data>Can be found in the planet discovery menu.<br>Enter exactly as seen in game. Watch out for 0 (zero) and O (o).</data>
				<data>./assets/bitmap/planet/planetName.jpg</data>
			</span>			
		</div>
		<div class="tableCell data ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="planetName_input${i}" data-dest="planetName${i}">
		</div>
		<div class="tableCell text ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<label for="planetFile_input${i}">Planet file name</label>
			<span class="tooltip">
				<data>Should show the entire planet from space. Click for an example picture.</data>
				<data>Planet Name</data>
				<data>
					Should show the entire planet from space.<br>
					Make sure no asteroids/pulse lines/freighters are obstructing the picture.
					<br>Point the sun directly at the planet, no weird angles.
					<br>Also try to only get the planet into the shot, no other planets.
					Only exception to this are moons or rings, which should be included if they exist.
					<br>Disable the vignette.
				</data>
				<data>./assets/bitmap/planet/planetPic.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
				<input type="text" id="planetFile_input${i}" data-dest="planetFile${i}" data-default="NmsMisc_NotAvailable.png">
				<input type="file" id="mainFileUpl${i}" accept="image/*" oninput="image(this)">
		</div>
		<div class="tableCell text ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<label for="landscapeFile_input${i}">Landscape file name</label>
			<span class="tooltip">
				<data>Showcase the planet's landscape.</data>
			</span>
		</div>
		<div class="tableCell data ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
				<input type="text" id="landscapeFile_input${i}" data-dest="landscapeFile${i}" data-default="NmsMisc_NotAvailable.png">
				<input type="file" id="secFileUpl${i}" accept="image/*" onchange="image(this)">
		</div>
		<div class="tableCell text ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<label>Biome</label>
			<span class="tooltip">
				<data>Can be determined from the planetary features.</data>
				<data>Planet Biome</data>
				<data>
					Can be determined from the planetary features such as the weather, harvestable plants or available resources.<br>
					See the <a href=https://nomanssky.fandom.com/wiki/Biome rel=noreferrer target=_blank>Biome wiki page</a> for more information.
				</data>
			</span>
		</div>
		<div class="tableCell data ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
				<select id="biome_input${i}" data-dest-noauto="biome${i}" onchange="biomeLinks(this)">
					<option value="Lush">Lush</option>
					<option value="Barren">Barren</option>
					<option value="Dead">Dead</option>
					<option value="Exotic">Exotic</option>
					<option value="Mega Exotic">Mega Exotic</option>
					<option value="Scorched">Scorched</option>
					<option value="Frozen">Frozen</option>
					<option value="Toxic">Toxic</option>
					<option value="Irradiated">Irradiated</option>
					<option value="Marsh">Marsh</option>
					<option value="Volcanic">Volcanic</option>
				</select>
		</div>
		<div class="tableCell text ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<label for="descriptor_input${i}">Planet description</label>
			<span class="tooltip">
				<data>Can be found in the exploration guide.</data>
				<data>Planet Description</data>
				<data>Can be found in the exploration guide.</data>
				<data>./assets/bitmap/planet/planetDesc.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="descriptor_input${i}" list="planetDescriptors" data-dest-noauto="descriptor${i}" oninput="expandDescriptor(this)">
		</div>
		<div class="tableCell text ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<label for="moon_input${i}">Is moon</label>
		</div>
		<div class="tableCell data ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<input type="checkbox" id="moon_input${i}" data-dest-noauto="descriptor_input${i}" oninput="moonSwitch(this)">
		</div>
		<div class="tableHeader text ${oddEvenClass} sectionToggle" data-planet="planet${i}" data-section="planet${i}">
			<div style="display:flex">
				<p style="margin-right:1.5rem">Resources</p>
				<span class="tooltip">
					<data>Found in the Discovery Menu or on the analysis visor.</data>
					<data>Planet Resources</data>
					<data>Found in the Discovery Menu or on the analysis visor.</data>
					<data>./assets/bitmap/planet/resources.jpg</data>
				</span>
			</div>
			<button class="button" onclick="toggleSection('resource${i}', this)">Hide</button>
		</div>
		<div class="tableHeader text ${oddEvenClass}" data-section="resource${i} planet${i}" data-planet="planet${i}">
			<button class="button is-primary" id="addResourceButton${i}" type="button" onclick="addResourceInput(this, ${i})">+ Add Resource</button>
		</div>
		<div class="tableCell text ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<label for="weather_input${i}">Weather</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Weather</data>
				<data>Can be found in the discovery menu.</data>
				<data>./assets/bitmap/planet/weather.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="weather_input${i}" list="weatherData" data-dest-simple="weather${i}" oninput="wikiCodeSimple(this)">
		</div>
		<div class="tableCell text ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<label for="sentinel_input${i}">Sentinels</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Sentinel Level</data>
				<data>Can be found in the discovery menu.</data>
				<data>./assets/bitmap/planet/sentinels.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="sentinel_input${i}" list="sentinels" data-dest="sentinel${i}">
		</div>
		<div class="tableCell text ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<label for="flora_input${i}">Flora</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Flora Level</data>
				<data>Can be found in the discovery menu.</data>
				<data>./assets/bitmap/planet/flora.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="flora_input${i}" list="rarity" data-dest="flora${i}">
		</div>
		<div class="tableCell text ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<label for="fauna_input${i}">Fauna</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Fauna Level</data>
				<data>Can be found in the discovery menu.</data>
				<data>./assets/bitmap/planet/fauna.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="fauna_input${i}" list="rarity" data-dest="fauna${i}">
		</div>
		<div class="tableCell text ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<label for="faunatotal_input${i}">Number of Fauna</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Fauna Number</data>
				<data>Can be found in the discovery menu.</data>
				<data>./assets/bitmap/planet/faunaNum.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${oddEvenClass}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="faunatotal_input${i}" maxlength="2" data-dest-noauto="FaunaTotal${i}" oninput="numberStats(this)">
		</div>`

		const planetTemplate = `<div class="${oddEvenClass}" data-planet="planet${i}" id="body${i}"><div>|-</div>
        <div>|[[File:<output id="planetFile${i}"></output>|150px]]</div>
        <div>|[[File:<output id="landscapeFile${i}"></output>|150px]]</div>
        <div>|[[<output id="planetName${i}" name="planetName${i}"></output>]]</div>
        <div>|<output id="biome${i}"></output><output id="infested${i}"></output>&lt;hr&gt;<output id="descriptor${i}"></output></div>
        <div>|<output id="resource${i}"></output></div>
        <div>|<output id="weather${i}"></output></div>
        <div>|<output id="sentinel${i}"></output></div>
        <div>|<output id="flora${i}"></output></div>
        <div>|<output id="fauna${i}"></output> (<output id="faunaTotal${i}" name="FaunaTotal${i}"></output>)</div>
        <div>|-</div>
        <div>!style="background-color:#2f4f4f"|Notes:</div>
        <div>|colspan=8 style="text-align:left"|'''100% Zoology Bonus''': {{FaunaTotal|<output id="faunaTotalNotes${i}" name="FaunaTotal${i}"></output>}} {{nanites}}</div></div>`

		inputTarget.insertAdjacentHTML('beforebegin', inputTemplate);
		outputTarget.insertAdjacentHTML('beforeend', planetTemplate);
		addAllTooltips();

		// default must be first, otherwise it won't work
		const defaultValue = document.querySelectorAll(`[data-planet="planet${i}"] [data-default]`);
		for (const input of defaultValue) {
			assignFunction(input, 'assignDefaultValue(this)');
			assignDefaultValue(input);
		}
		const auto = document.querySelectorAll(`[data-planet="planet${i}"] [data-dest]`);
		for (const input of auto) {
			assignFunction(input, 'wikiCode(this)');
		}
		const noauto = document.querySelectorAll(`[data-planet="planet${i}"] [data-dest-noauto]`);
		for (const input of noauto) {
			assignFunction(input, 'storeData(this)');
		}
		const lists = document.querySelectorAll(`[data-planet="planet${i}"] [list]`);
		for (const input of lists) {
			assignFunction(input, 'forceDatalist(this)', 'onchange');
		}
		const resourceButton = document.getElementById(`addResourceButton${i}`);
		for (let j = 0; j < 3; j++) {
			addResourceInput(resourceButton, i);
		}

		const resourceOutputs = { output: {} };
		const outputs = document.querySelectorAll(`#body${i} output`);
		for (const output of outputs) {
			const id = output.id;
			resourceOutputs.output[id] = id;
		}
		updateGlobalElements(resourceOutputs);

		biomeLinks(document.getElementById(`biome_input${i}`));
	}
}

function addResourceInput(element, sectionTarget) {
	const inputSection = element.parentElement;
	const elementList = document.querySelectorAll('[data-resource]');
	const childIndex = getChildIndex(elementList, 'dataset.resource');
	const resource = 'resource' + sectionTarget;
	const resource_input = 'resource_input' + childIndex;
	const oddEvenClass = 'is-' + oddEven(i);

	const inputHTML = `<div class="tableCell text removable ${oddEvenClass}" data-section="resource${sectionTarget} planet${sectionTarget}" data-resource="section${childIndex}" data-planet="planet${sectionTarget}">
		<button class="button is-danger is-outlined icon is-small" title="Remove resource" type="button" disabled onclick="removeSpecificSection('section${childIndex}', 'resource'); removeResource('${resource_input}')">&#10006</button>
		<label for="${resource_input}">Resource name:</label>
	</div>
	<div class="tableCell data ${oddEvenClass}" data-section="resource${sectionTarget} planet${sectionTarget}" data-resource="section${childIndex}" data-planet="planet${sectionTarget}">
		<input type="text" list="resources" id="${resource_input}" data-dest-noauto="${resource}" oninput="addResource(this)">
	</div>`;

	inputSection.insertAdjacentHTML('beforebegin', inputHTML);

	const resourceElements = { input: {} };
	resourceElements.input[resource_input] = resource_input;
	updateGlobalElements(resourceElements);

	const resourceInputSections = getResourceInputSections(sectionTarget);
	const resourceInputSectionCount = getResourceInputSectionCount(resourceInputSections);

	// enter the number of sections you want to allow behind the ">" operator.
	if (resourceInputSectionCount + 1 > 6) {
		element.disabled = true;
	}

	// default state is disabled because that's easier to handle. Enable if more than 3 sections are present (every planet has at least 3 resources)
	if (resourceInputSectionCount > 3) {
		for (const element of resourceInputSections) {
			const button = element.querySelector('button');
			if (button) button.disabled = false;
		}
	}
}

function getResourceInputSections(sectionTarget) {
	return document.querySelectorAll(`[data-resource][data-planet="planet${sectionTarget}"]`);
}

// takes an array provided by getResourceInputSections()
function getResourceInputSectionCount(inputs) {
	const sections = new Set();
	for (const input of inputs) {
		sections.add(input.dataset.resource);
	}
	return sections.size;
}

function removeResource(resourceID) {
	const resourceInput = globalElements.input[resourceID];
	const planet = resourceInput.dataset.destNoauto;
	const id = resourceInput.id;
	const sectionTarget = extractNumber(planet);

	// remove element from resources 
	if (resourceInput.value) {
		delete links.resources[planet][id];
		addResource();
	}

	// enable "add resource" button
	document.getElementById(`addResourceButton${sectionTarget}`).disabled = false;

	// disable remove buttons if 3 inputs or less
	const resourceInputSections = getResourceInputSections(sectionTarget);
	const resourceInputSectionCount = getResourceInputSectionCount(resourceInputSections);

	if (resourceInputSectionCount < 4) {
		for (const element of resourceInputSections) {
			const button = element.querySelector('button');
			if (button) button.disabled = true;
		}
	}
}

function moonSwitch(element) {
	const descriptorDropdown = document.getElementById(element.dataset.destNoauto);
	const i = extractNumber(element.id);
	const planetClass = element.checked ? 'Moon' : 'Planet';

	document.getElementById('planetClass' + i).innerText = planetClass;

	expandDescriptor(descriptorDropdown, planetClass);
}

function expandDescriptor(element, planetClass = null) {
	const i = extractNumber(element.id);
	if (!planetClass) {
		planetClass = document.getElementById('moon_input' + i).checked ? 'Moon' : 'Planet';
	}
	const descriptor = element.value;
	const dest = element.dataset.destNoauto;
	const output = buildDescriptor(descriptor, planetClass, '<br>');
	globalElements.output[dest].innerText = output;

	const isInfested = autoInfested(element);		// returns true or false
	infestedBiomeLinks('infested' + i, isInfested)
}

// generates Space Station Merchants upgrade list
function merchantUpgrades(group = null) {
	const checkboxes = document.querySelectorAll('[data-dest-checkbox-group]');
	if (group) {
		getCheckedBoxes(group);
		return;
	}

	// if the checkboxes have no onchange event (i.e. at page load), assign them one
	const merchants = new Set();
	for (const checkbox of checkboxes) {
		if (!checkbox.onchange) assignFunction(checkbox, 'merchantUpgrades(this.dataset.destCheckboxGroup)');
		merchants.add(checkbox.dataset.destCheckboxGroup);
	}
	for (const merchant of merchants) {
		getCheckedBoxes(merchant);
	}
	return;

	function getCheckedBoxes(group) {
		const checkboxes = document.querySelectorAll(`[data-dest-checkbox-group="${group}"]`);
		const parm = (group.startsWith('SD')) ? '' : group.substring(0, 2);
		const checked = new Array;
		for (const checkbox of checkboxes) {
			if (checkbox.checked) checked.push(checkbox.value);
		}

		const code = new Array;
		for (let i = 1; i <= checked.length; i++) {
			const output = `| ${parm}${i}=${checked[i - 1]}`;
			code.push(output);
		}
		wikiCode(code.join('\n'), group);
		const wrapper = globalElements.output[group].closest('#scrapDealer');
		if (!wrapper) return;		// return if not scrap dealer
		if (code.length == 0) {
			wrapper.style.display = 'none';
		} else {
			wrapper.style.display = '';
		}
	}
}

function tradeables() {
	const inputSection = globalElements.input.terminalInputs;
	const outputSection = globalElements.output.tradeTerminal;
	const elementList = document.querySelectorAll('[data-tradeable]');
	const childIndex = getChildIndex(elementList, 'dataset.tradeable');
	const price = 'price' + childIndex;
	const text = 'text' + childIndex;
	const text_input = 'text_input' + childIndex;
	const price_input = 'price_input' + childIndex;

	const inputHTML = `<div class="tableHeader text sectionToggle" data-tradeable="section${childIndex}" data-station="terminal">
		<span class="has-text-weight-bold">Tradeable</span>
		<button class="button is-danger is-outlined" type="button" onclick="removeSpecificSection('section${childIndex}', 'tradeable'); enableTradeableAdd()">Remove</button>
	</div>
	<div class="tableCell text" data-tradeable="section${childIndex}" data-station="terminal">
		<label for="${text_input}">Tradeable name:</label>
	</div>
	<div class="tableCell data" data-tradeable="section${childIndex}" data-station="terminal">
		<input type="text" list="terminal" id="${text_input}" data-dest="${text}">
	</div>
	<div class="tableCell text" data-tradeable="section${childIndex}" data-station="terminal">
		<label for="${price_input}">Tradeable price:</label>
	</div>
	<div class="tableCell data" data-tradeable="section${childIndex}" data-station="terminal">
		<input type="text" id="${price_input}" data-dest-noauto="${price}">
	</div>`;

	const codeHTML = `<div data-tradeable="section${childIndex}">|-</div>
	<div data-tradeable="section${childIndex}">| {{ilink|<output id="${text}"></output>}} || {{Units}} <output id="${price}"></output></div>`;

	inputSection.insertAdjacentHTML('beforebegin', inputHTML);
	outputSection.insertAdjacentHTML('beforeend', codeHTML);

	const inputs = document.querySelectorAll(`[data-tradeable="section${childIndex}"] input[data-dest]`);
	for (const input of inputs) {
		assignFunction(input, 'wikiCode(this)');
	}
	const noautoInputs = document.querySelectorAll(`[data-tradeable="section${childIndex}"] input[data-dest-noauto]`);
	for (const input of noautoInputs) {
		assignFunction(input, 'storeData(this); numberStats(this)');
	}

	const tradeableInputSections = document.querySelectorAll('[data-tradeable]');
	const tradeableInputSectionCount = (() => {
		const sections = new Set();
		for (const tradeableInputSection of tradeableInputSections) {
			const section = tradeableInputSection.dataset.tradeable;
			sections.add(section);
		}
		return sections.size;
	})();

	const button = inputSection.querySelector('button');

	// enter the number of sections you want to allow behind the ">" operator.
	if (tradeableInputSectionCount + 1 > 5) {
		button.disabled = true;
	}
}

function enableTradeableAdd() {
	const inputSection = globalElements.input.terminalInputs;
	const button = inputSection.querySelector('button');

	// enable "add tradeable" button
	button.disabled = false;
}

function resetExternal() {
	const sections = document.querySelectorAll('[data-tradeable], [data-planet]');
	removeSection(sections);
}

function regionLong() {
	const region = pageData.region;
	const output = (() => {
		if (region.split(' ').length == 1) return region + ' region';
		return region;
	})();
	globalElements.output.regionLong.innerText = output;
}

function addResource(element = null) {
	const resources = links.resources ??= new Object;
	if (element) {
		const value = element.value;
		const planet = element.dataset.destNoauto;
		const id = element.id;

		resources[planet] ??= new Object;
		resources[planet][id] = sanitiseString(value);
	}

	const usedResources = new Set();
	const linkedResources = sortObj(structuredClone(resources), true);
	for (const planetName in linkedResources) {
		const planet = linkedResources[planetName];
		for (const key in planet) {
			const resource = planet[key];
			if (resource && !usedResources.has(resource)) {
				linkedResources[planetName][key] = `[[${resource}]]`;
				usedResources.add(resource);
			}
		}
	}

	for (const key in linkedResources) {
		const output = Object.values(linkedResources[key]).filter(resource => resource).join('<br>');
		globalElements.output[key].innerText = output;
	}
}

function biomeLinks(element) {
	const value = element.value;
	const planet = element.dataset.destNoauto;

	const biomes = links.biomes ??= new Object;
	biomes[planet] = sanitiseString(value);

	const usedBiomes = new Set();
	const linkedBiomes = sortObj(structuredClone(biomes), true);
	for (const planetName in linkedBiomes) {
		const biome = linkedBiomes[planetName];
		if (biome && !usedBiomes.has(biome)) {
			linkedBiomes[planetName] = `{{Biome|${biome}}}`;
			usedBiomes.add(biome);
		}
	}
	setBiomeText(linkedBiomes);
}

function infestedBiomeLinks(dest, bool) {
	const infestedBiomes = links.infestedBiomes ??= new Object;
	infestedBiomes[dest] = bool;

	let infestedBiomeLink = false;
	const linkedBiomes = sortObj(structuredClone(infestedBiomes), true);
	for (const planetName in linkedBiomes) {
		const checked = linkedBiomes[planetName];
		if (checked && !infestedBiomeLink) {
			linkedBiomes[planetName] = `<br>([[Biome Subtype - Infested|Infested]])`;
			infestedBiomeLink = true;
		} else if (!checked) {
			linkedBiomes[planetName] = '';
			delete infestedBiomes[planetName];
		} else {
			linkedBiomes[planetName] = ` (Infested) `;
		}
	}
	setBiomeText(linkedBiomes);
}

function setBiomeText(array) {
	for (const key in array) {
		const output = array[key];
		globalElements.output[key].innerText = output;
	}
}

function expectedHubTagSentence() {
	const outputElement = globalElements.output.expectedHubTag;
	const systemName = pageData.name;
	if (!systemName) {
		outputElement.innerHTML = '';
		return;
	};
	const region = pageData.region;
	const glyphs = pageData.portalglyphs;
	const nr = getHubNumber(region);
	const index = (() => {
		let SIV = glyphs.substring(1, 4);
		while (SIV.startsWith('0') && SIV.length > 1) {
			SIV = SIV.substring(1);
		}
		return SIV;
	})();
	const expected = `HUB${nr}-${index}`;

	outputElement.innerHTML = '';
	if (systemName.includes(expected)) return;

	outputElement.innerText = `The expected HUB Tag for this system is ${expected}.` + '\n\n';
}

function spaceStationSection() {
	// define notes
	const notes = {
		uncharted: 'This system is uncharted and has no [[Space Station]].',
		abandoned: 'This space station is abandoned.' + '\n\n',
	}

	// define structure
	const sectionDefinition = {
		normal: ['img', 'terminal', 'merchant', 'scrapDealer'],
		pirate: ['img', 'scrapDealer'],
		abandoned: ['img', 'note', 'terminal'],
		uncharted: ['note'],
	}

	// define faction
	const faction = (() => {
		const input = pageData.faction;
		if (input == 'Uncharted') return 'uncharted';
		if (input.includes('Abandoned')) return 'abandoned';
		if (pageData.wealth.includes('Black Market')) return 'pirate';
		return 'normal';
	})();

	// get all station sections
	const stationSections = document.querySelectorAll('[data-station]');
	for (let i = 0; i < stationSections.length; i++) {
		const section = stationSections[i];
		const sectionName = section.dataset.station;
		if (sectionDefinition[faction].includes(sectionName)) {
			if ((sectionName == 'merchant' || sectionName == 'scrapDealer') && defaultDisplay(section)) {
				i++;
			}
			if (section.id == 'scrapDealer' && !pageData.SDMerchant) {
				section.style.display = 'none';
			} else {
				section.style.display = '';
			}
		} else {
			section.style.display = 'none';
		}
	}
	if (!notes[faction]) return;

	document.querySelector('[data-station="note"]').innerText = notes[faction];

	function defaultDisplay(section) {
		const button = section.querySelector('button');
		if (!button) return;
		const buttonId = button.dataset.buttonId;
		if (!buttonId) return;
		const displayId = 'display' + buttonId;
		const displayValue = button.dataset[displayId];
		return displayValue;
	}
}

/* utility stuff here */
// autofill black hole if SIV is 79 (hide)
function autoBH() {
	const glyphs = pageData.portalglyphs;
	const colorInput = globalElements.input.colorInput;
	const SIV = glyphs.substring(2, 4);
	if (SIV == '79') {
		hideInput(colorInput, 'none');
		colorInput.value = 'Black Hole';
	} else {
		hideInput(colorInput, '');
	}
	wikiCode(colorInput);
}

// autofill conflict/wealth if pirate is selected on either (don't hide)
function autoPirate(element) {
	const value = element.value;
	if (!value.includes('Black Market') && !value.includes('Pirate Controlled')) return;
	const conflict = globalElements.input.conflictInput;
	const wealth = globalElements.input.wealthInput;
	const inputs = [wealth, conflict];
	for (const input of inputs) {
		const pirate = input.querySelector('optgroup[label="Pirate"] option').value;
		input.value = pirate;
		wikiCode(input);
	}
	spaceStationSection();
}

// autofill conflict/economy/wealth if faction includes 'Abandoned' or 'Uncharted' (hide)
function combineEconConf() {
	const faction = pageData.faction;
	const wealth = globalElements.input.wealthInput;
	const economy = globalElements.input.economyInput;
	const conflict = globalElements.input.conflictInput;
	const inputs = [wealth, economy, conflict];

	if (faction.includes('Abandoned') || faction == 'Uncharted') {
		for (const input of inputs) {
			const value = input.querySelector('optgroup[label="Abandoned/Uncharted"] option').value;
			input.value = value;
			wikiCode(input);
			hideInput(input, 'none');
		}
		return;
	}

	for (const input of inputs) {
		hideInput(input, '');
	}
}

// keep templates for starships/freighters/frigates...
function addTemplate(element = null) {
	if (!element) {
		const checkboxes = document.getElementsByName('systemExtras');
		for (const checkbox of checkboxes) {
			addTemplate(checkbox);
		}
		return;
	}

	const outputElement = globalElements.output[element.value];
	if (element.checked) {
		outputElement.style.display = '';
	} else {
		outputElement.style.display = 'none';
	}
}

function civCatalog() {
	const civ = shortenGHub(pageData.civShort);
	wikiCode(civ, 'civShorter');
}

function generateGalleryArray() {
	const array = [
		'',
		'System Exploration Guide',
		'System Page',
		'Default SS Multi-Tool',
	];

	if (pageData.faction == 'Uncharted' || pageData.faction.includes('Abandoned')) {
		array.pop();
	}

	pageData.galleryArray = array;
}

function galleryExplanationExternal() {
	return `There is a preferred order of pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>System Exploration Guide</li>
			<li>System Page</li>
			<li>Default SS Multi-Tool</li>
		</ol>
	</div>`
}