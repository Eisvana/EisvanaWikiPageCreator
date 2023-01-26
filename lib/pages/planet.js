function startupFunctions() {
	addResource();
	locationSentence();
}

const systemElements = {
	input: {
		moonInputs: 'moonInputs',
	},
	output: {
	}
}
updateGlobalElements(systemElements);

const systemElementFunctions = {
	civ: ['locationSentence()', null, true],
	portalglyphsInput: ['locationSentence()', null, true],
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

	/*	// idk why this exists, it doesn't seem necessary
	const moonElements = { input: {} };
	moonElements.input[moon_input] = moon_input;
	updateGlobalElements(moonElements);
	*/

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

function galleryExplanationExternal() {
	return `There is a preferred order of pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
		<li>System Exploration Guide</li>
		<li>System Page</li>
		<li>Default SS Multitool</li>
	</ol>
	</div>`
}