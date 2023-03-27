function startupFunctions() {
	celestialStartupFunctions();
	autoInfested();
	wormAutoSpawn();
	wormAlbumName();
	if (typeof planetStartupFunctions == 'function') planetStartupFunctions();
}

const planetMoonElements = {
	input: {
		resourceInputs: 'resourceInputs',
		autoSpawn: 'autoSpawnInput',
	},
	output: {
		resourceBullets: 'resourceBullets',
		creatures: 'creatures',
		plants: 'plants',
		minerals: 'minerals',
		sandworm: 'sandworm',
	}
}
updateGlobalElements(planetMoonElements);

const planetMoonElementFunctions = {
	civ: ['wormAlbumName()', null, true],
	systemInput: ['locationSentence()'],
	faunaNumberInput: ['numberStats(this); plural(pageData[this.dataset.destNoauto], "faunaSentencePlural")'],
	sentinelInput: ['sentinelSentence()'],
	descriptionInput: ['autoInfested(this)'],
	sandwormInput: ['addSandwormTemplate()'],
	wormmaxdepthInput: ['numberStats(this, 1)'],
	autoSpawn: ['wormAutoSpawn()'],
}
assignElementFunctions(planetMoonElementFunctions);

function plural(number, dest = null) {
	const word = (() => {
		if (number == 1) return 'is';
		return 'are';
	})();
	if (!dest) return word;
	wikiCode(word, dest);
}

function planetDescriptor(element) {
	const dest = element.dataset.destNoauto;
	const output = buildDescriptor(element.value, pageData.pageType, ' ');
	const destElements = globalElements.output[dest];
	if (Array.isArray(destElements)) {
		destElements.forEach(item => item.innerText = output);
	} else {
		destElements.innerText = output;
	}
}

// constructs location sentence
function locationSentence() {
	const systemName = pageData.system;
	const regionName = pageData.region;
	const civ = pageData.civShort;

	const output = `It can be found in the [[${systemName}]] [[star system]] in the [[${regionName}]] [[region]] (HUB${getHubNumber(regionName)}) of the ${HubGal(civ)}.`;

	globalElements.output.location.innerText = output;
}

function addResource(element = globalElements.input.resourceInputs.querySelector('button')) {
	const inputSection = element.parentElement;
	const elementList = document.querySelectorAll('[data-resource]');
	const childIndex = getChildIndex(elementList, 'dataset.resource');
	const resource_input = 'resource_input' + childIndex;

	const inputHTML = `<div class="tableCell text removable" data-resource="section${childIndex}">
		<button class="button is-outlined is-danger icon is-small" title="Remove resource" type="button" disabled onclick="removeSpecificSection('section${childIndex}', 'resource'); enableResourceAdd()">&#10006</button>
		<label for="${resource_input}">Resource name:</label>
	</div>
	<div class="tableCell data" data-resource="section${childIndex}">
		<input type="text" list="resources" id="${resource_input}" oninput="resourceList()" onchange="forceDatalist(this)">
	</div>`;

	inputSection.insertAdjacentHTML('beforebegin', inputHTML);

	const resourceRemoveButtons = document.querySelectorAll('[data-resource] button');
	const resourceInputSectionCount = resourceRemoveButtons.length;

	while (document.querySelectorAll('[data-resource] button').length < 3) {
		addResource(element);
	}

	// enter the number of sections you want to allow behind the ">" operator.
	if (resourceInputSectionCount + 1 > 6) {
		element.disabled = true;
	}

	// default state is disabled because that's easier to handle. Enable if more than 3 sections are present (every planet has at least 3 resources)
	if (resourceInputSectionCount > 3) {
		for (const button of resourceRemoveButtons) {
			button.disabled = false;
		}
	}
}

function enableResourceAdd() {
	const addButton = globalElements.input.resourceInputs.querySelector('button');
	addButton.disabled = false;

	const resourceRemoveButtons = document.querySelectorAll('[data-resource] button');
	const resourceInputSectionCount = resourceRemoveButtons.length;

	if (resourceInputSectionCount < 4) {
		for (const button of resourceRemoveButtons) {
			button.disabled = true;
		}
	}
	resourceList();
}

function resourceList() {
	const resourceShorts = getResourceData();
	const resourceInputs = document.querySelectorAll('[data-resource] input');
	const resources = new Set();
	for (const input of resourceInputs) {
		if (input.value) resources.add(input.value);
	}
	const resourceData = new Object;
	for (const resource of Array.from(resources)) {
		resourceData[resource] = resourceShorts[resource];
	}

	const usedResources = Object.keys(resourceData);
	const usedResourceShorts = Object.values(resourceData);

	for (let i = 0; i < usedResources.length; i++) {
		const resource = usedResources[i];
		usedResources[i] = `* {{ilink|${resource}}}`;

		const resourceShort = usedResourceShorts[i];
		usedResourceShorts[i] = `[[${resourceShort}]]`;
	}
	globalElements.output.resourceList.innerText = usedResourceShorts.join(', ');
	globalElements.output.resourceBullets.innerText = usedResources.join('\n');
}

function sentinelSentence() {
	const sentDescriptor = pageData.sentinel;
	const sentinels = getSentinelData();
	const sentLevel = (() => {
		for (const level in sentinels) {
			if (sentinels[level].includes(sentDescriptor)) return level;
		}
	})();

	const output = `[[Sentinel]] activity on this ${pageData.pageType.toLowerCase()} is classified as: ''${sentDescriptor}''. The sentinels ${(sentLevel == 'aggressive') ? '' : "don't"} present an immediate threat.`;
	globalElements.output.sentinelSentence.innerText = output;
}

async function addFauna(element) {
	const inputSection = element.parentElement;
	const outputSection = globalElements.output[element.dataset.destNoauto];
	const sectionType = 'fauna';
	const elementList = document.querySelectorAll(`[data-${sectionType}]`);
	const i = getChildIndex(elementList, `dataset.${sectionType}`);

	const inputHTML = await loadHTML('src/htmlSnippets/creatureInputs.html', { i: i });

	const outputHTML = `<div data-fauna="section${i}">|-</div>
	<div data-fauna="section${i}">|[[File:<output id="faunaFile${i}"></output>|150px]] || <output id="faunaName${i}" name="faunaName${i}"></output> || <output id="faunaRarity${i}"></output> / <output id="faunaEcosystem${i}"></output> / <output id="faunaActivity${i}"> </output> <output id="faunaHemisphere${i}"></output> || <output id="faunaGenus${i}"></output> || <output id="faunaHeight${i}"></output>m || <output id="faunaWeight${i}"></output>kg || <output id="faunaDiscoverer${i}"></output></div>`;

	inputSection.insertAdjacentHTML('beforebegin', inputHTML.body.innerHTML);
	outputSection.insertAdjacentHTML('beforeend', outputHTML);
	postProcessSection(element, sectionType, i);
	genusDropdown(globalElements.input[`faunaEcosystemInput${i}`]);
}

async function addFlora(element) {
	const inputSection = element.parentElement;
	const outputSection = globalElements.output[element.dataset.destNoauto];
	const sectionType = 'flora';
	const elementList = document.querySelectorAll(`[data-${sectionType}]`);
	const i = getChildIndex(elementList, `dataset.${sectionType}`);

	const inputHTML = await loadHTML('src/htmlSnippets/floraInputs.html', { i: i });

	const outputHTML = `<div data-flora="section${i}">|-</div>
	<div data-flora="section${i}">|[[File:<output id="floraFile${i}"></output>|150px]] || <output id="floraName${i}" name="floraName${i}"></output> || <output id="floraAge${i}"></output> || <output id="floraRoot${i}"></output> || <output id="floraNut${i}"></output> || <output id="floraNote${i}"></output> || <output id="floraElements${i}"></output> || <output id="floraDiscoverer${i}"></output></div>`;

	inputSection.insertAdjacentHTML('beforebegin', inputHTML.body.innerHTML);
	outputSection.insertAdjacentHTML('beforeend', outputHTML);

	postProcessSection(element, sectionType, i);
}

async function addMineral(element) {
	const inputSection = element.parentElement;
	const outputSection = globalElements.output[element.dataset.destNoauto];
	const sectionType = 'mineral';
	const elementList = document.querySelectorAll(`[data-${sectionType}]`);
	const i = getChildIndex(elementList, `dataset.${sectionType}`);

	const inputHTML = await loadHTML('src/htmlSnippets/mineralInputs.html', { i: i });

	const outputHTML = `<div data-mineral="section${i}">|-</div>
	<div data-mineral="section${i}">|[[File:<output id="mineralFile${i}"></output>|150px]] || <output id="mineralName${i}" name="mineralName${i}"></output> || <output id="mineralMetal${i}"></output> || <output id="mineralFormation${i}"></output> || <output id="mineralNote${i}"></output> || <output id="mineralElements${i}"></output> || <output id="mineralDiscoverer${i}"></output></div>`;

	inputSection.insertAdjacentHTML('beforebegin', inputHTML.body.innerHTML);
	outputSection.insertAdjacentHTML('beforeend', outputHTML);

	postProcessSection(element, sectionType, i);
}

function postProcessSection(element, sectionType, i) {
	addAllTooltips();
	changeTableEntry(element);

	const sectionElements = { input: {}, output: {} };

	const inputs = document.querySelectorAll(`[data-${sectionType}="section${i}"] :is(input, select)`);
	for (const input of inputs) {
		sectionElements.input[input.id] = input.id;
		if (input.dataset.dest) {
			assignFunction(input, 'wikiCode(this)');
			wikiCode(input);
		}
		if (input.dataset.destNoauto) {
			assignFunction(input, 'storeData(this)');
			storeData(input);
		}
		if (input.dataset.default) {
			assignFunction(input, 'assignDefaultValue(this)', null, true);
			assignDefaultValue(input);
		}
		if (input.list) {
			assignFunction(input, 'forceDatalist(this)', 'onchange');
		}
	}
	const outputs = document.querySelectorAll(`[data-${sectionType}="section${i}"] output`);
	for (const output of outputs) {
		if (output.id) sectionElements.output[output.id] = output.id;
	}
	updateGlobalElements(sectionElements);
}

/**
 * Function that handles the change in table entries.
 *
 * @param {HTMLElement} element - The HTMLElement that was clicked.
 *
 * @returns {void}
 */
function changeTableEntry(element) {
	const parent = element.parentElement;
	const section = parent.dataset.section;
	const elements = document.querySelectorAll(`.tableHeader[data-${section}]`);
	for (let i = 0; i < elements.length; i++) {
		const className = 'is-' + oddEven(i + 1);
		const subsection = elements[i].dataset[section];
		const cells = document.querySelectorAll(`[data-${section}="${subsection}"]`)
		for (const cell of cells) {
			cell.classList.remove('is-odd', 'is-even');
			cell.classList.add(className);
		}
	}
	if (!parent.dataset[section]) return;

	if (section == 'fauna') {
		findAndRemove(links.genera);
		addGenus();
	} else {
		findAndRemove(links.resources?.[section]);
		floraMineralResourceLinks();
	}

	function findAndRemove(object) {
		if (!object) return;
		const subsection = parent.dataset[section];
		const sectionNumber = extractNumber(subsection);
		const item = Object.keys(object);
		const itemName = item.find(element => extractNumber(element) == sectionNumber);
		delete object[itemName];
	}
}

function addGenus(element = null) {
	const genera = links.genera ??= new Object;
	if (element) {
		const value = element.value;
		const dest = element.dataset.destNoauto;

		genera[dest] = sanitiseString(value);
	}

	const usedGenera = new Set();
	const linkedGenera = sortObj(structuredClone(genera), true);
	for (const creature in linkedGenera) {
		const genus = linkedGenera[creature];
		if (genus && !usedGenera.has(genus)) {
			linkedGenera[creature] = `[[${genus}]]`;
			usedGenera.add(genus);
		}
	}

	for (const key in linkedGenera) {
		const output = linkedGenera[key];
		globalElements.output[key].innerText = output;
	}
}

function floraMineralResourceLinks(element = null) {
	const resources = links.resources ??= new Object;
	if (element) {
		const value = element.value;
		const target = element.dataset.destNoauto;
		const id = element.id;
		const sectionName = element.parentElement.dataset.section.split(' ')[0];
		const planetProp = sectionName.replace(extractNumber(sectionName), '');

		resources[planetProp] ??= new Object;
		resources[planetProp][target] ??= new Object;
		resources[planetProp][target][id] = sanitiseString(value);
	}

	const usedResources = new Set();
	const linkedResources = sortObj(structuredClone(resources));	// flora, minerals
	for (const planetPropName in sortObj(linkedResources)) {
		const planetProp = linkedResources[planetPropName];			// flora1, flora2, flora3...
		for (const destId in sortObj(planetProp)) {
			const resources = planetProp[destId];					// flora1prim, flora1sec
			for (const resourceInput in resources) {						// Carbon, Sodium
				const resource = resources[resourceInput];
				if (resource && !usedResources.has(resource)) {
					resources[resourceInput] = `[[${resource}]]`;
					usedResources.add(resource);
				}
			}
		}
	}

	for (const prop in linkedResources) {
		for (const outputElement in linkedResources[prop]) {
			const output = Object.values(linkedResources[prop][outputElement]).filter(resource => resource).join(', ');		// filters for truthy values
			globalElements.output[outputElement].innerText = output;
		}
	}
}

// sets genus dropdown
function genusDropdown(element) {
	const creatureData = getCreatureData();
	const ecosystem = element.value;
	const genera = Object.keys(creatureData.ecosystems[ecosystem])
	const sectionNumber = extractNumber(element.id);
	const genusInputID = 'faunaGenusInput' + sectionNumber;

	const commonNames = new Array;
	for (const genus of genera) {
		commonNames.push(`${genus} (${creatureData.ecosystems[ecosystem][genus].commonName})`);
	}

	setDropdownOptions(globalElements.input[genusInputID], genera, commonNames);
	addGenus(globalElements.input[genusInputID]);
}

function autoWorm(wormBool) {
	if (wormBool) globalElements.input.sandwormInput.checked = true;
	addSandwormTemplate();
}

function addSandwormTemplate() {
	const element = globalElements.input.sandwormInput;
	const dest = element.dataset.destNoauto;
	const sections = Array.from(document.querySelectorAll(`[data-section="${dest}"]`));
	const outputElement = globalElements.output[dest];
	sections.push(outputElement);
	for (const section of sections) {
		if (element.checked) {
			section.style.display = '';
		} else {
			section.style.display = 'none';
		}
	}
}

function wormAutoSpawn() {
	const spawn = (() => {
		const elements = globalElements.input.autoSpawn;
		for (const element of elements) {
			if (element.checked) return element.value;
		}
	})();
	globalElements.output.wormAutoSpawn.innerText = spawn;
}

function wormAlbumName() {
	const civShort = pageData.civShort;
	const output = (() => {
		switch (civShort) {
			case 'GHub':
				return 'GHEC Sandworm Album';

			case 'CalHub':
				return 'CalHub Rare Fauna Album#Sandworm|CalHub Rare Fauna Album';

			case 'EisHub':
				return 'EisHub Shaihuluda Album';
		}
	})();
	globalElements.output.wormAlbumName.innerText = output;
}

function resetExternal() {
	const sections = document.querySelectorAll('[data-moon], [data-resource], [data-fauna], [data-flora], [data-mineral]');
	removeSection(sections);

	enableResourceAdd();
	if (typeof enableMoonAdd == 'function') enableMoonAdd();
}