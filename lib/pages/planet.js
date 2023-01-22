function startupFunctions() {
	addResource();
	locationSentence();
}

const systemElements = {
	input: {
		moonInputs: 'moonInputs',
		resourceInputs: 'resourceInputs',
	},
	output: {
		resourceBullets: 'resourceBullets',
	}
}
updateGlobalElements(systemElements);

const systemElementFunctions = {
	civ: ['locationSentence()', null, true],
	portalglyphsInput: ['locationSentence()', null, true],
	systemInput: ['locationSentence()'],
	faunaNumberInput: ['numberStats(this)'],
	sentinelInput: ['sentinelSentence()'],
}
assignElementFunctions(systemElementFunctions);


function addMoon(element) {
	const inputSection = element.parentElement;
	const elementList = document.querySelectorAll('[data-moon]');
	const childIndex = getChildIndex(elementList, 'dataset.moon');
	const moon_input = 'moon_input' + childIndex;

	const inputHTML = `<div class="tableCell text" data-moon="section${childIndex}">
		<label for="${moon_input}">Moon name:</label>
		<button class="button is-danger is-outlined" type="button" onclick="removeSpecificSection('section${childIndex}', 'moon'); enableMoonAdd()">Remove</button>
	</div>
	<div class="tableCell data" data-moon="section${childIndex}">
		<input type="text" id="${moon_input}" oninput="moonList()">
	</div>`;

	inputSection.insertAdjacentHTML('beforebegin', inputHTML);

	const moonElements = { input: {} };
	moonElements.input[moon_input] = moon_input;
	updateGlobalElements(moonElements);

	const moonInputSectionCount = document.querySelectorAll('[data-moon]').length / 2;

	// enter the number of sections you want to allow behind the ">" operator.
	if (moonInputSectionCount + 1 > 2) {
		element.disabled = true;
	}
}

function enableMoonAdd() {
	const addButton = globalElements.input.moonInputs.querySelector('button');
	addButton.disabled = false;
	moonList();
}

function moonList() {
	const moonInputs = document.querySelectorAll('[data-moon] input');
	const moons = new Array;
	for (const input of moonInputs) {
		if (input.value) moons.push(`[[${input.value}]]`);
	}

	globalElements.output.moonList.innerText = moons.join(', ');
	pageData.moons = moons;
	moonSentence()
}

function moonSentence() {
	const output = (() => {
		const moons = pageData.moons;
		if (!moons || moons.length == 0) {
			return `This planet has no moons.`;
		} else {
			const moonCount = moons.length;
			return `This planet's [[moon]]${(moonCount == 2) ? 's' : ''} ${plural(moonCount)} ${moons.join(' and ')}.`;
		}
	})();
	wikiCode(output, 'moonSentence');
}

function addResource(element = globalElements.input.resourceInputs.querySelector('button')) {
	const inputSection = element.parentElement;
	const elementList = document.querySelectorAll('[data-resource]');
	const childIndex = getChildIndex(elementList, 'dataset.resource');
	const resource_input = 'resource_input' + childIndex;

	const inputHTML = `<div class="tableCell text" data-resource="section${childIndex}">
		<label for="${resource_input}">Resource name:</label>
		<button class="button is-danger is-outlined" type="button" disabled onclick="removeSpecificSection('section${childIndex}', 'resource'); enableResourceAdd()">Remove</button>
	</div>
	<div class="tableCell data" data-resource="section${childIndex}">
		<input type="text" list="resources" id="${resource_input}" oninput="resourceList()">
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