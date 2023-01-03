function startupFunctions() {
	updateRegions();
}

const businessElements = {
	input: {
		contentsInput: 'contentsInput',
	},
	output: {
		contents: 'contents',
	}
}
updateGlobalElements(businessElements);

const businessElementFunctions = {
	civ: ['updateRegions()', null, true],
	ownerInput: ['hideDiscoverer("ownerInput", "ownerlinkInput")'],
	ownerlinkInput: ['hideDiscoverer("ownerlinkInput", "ownerInput")'],
	currencyInput: ['fixHC(this)'],
}
assignElementFunctions(businessElementFunctions);


// fallback to dropdown for pages with no glyphs
function updateRegions() {
	const civ = pageData.civShort;
	const regionNames = Object.values(regions[civ]);
	setDropdownOptions(globalElements.input.regionInput, regionNames);
};

(() => {
	const currencyDatalist = {
		currencies: ['{{CurrencyHubCoin}}']
	}
	datalists(currencyDatalist);
})();

// replaces HubCoin with the HubCoin link macro
function fixHC(element) {
	const value = pageData.currency.toLowerCase();
	const dest = element.dataset.dest;
	if (value === 'hubcoin') wikiCode('{{CurrencyHubCoin}}', dest);
}

// adds section to input and code
function addSection() {
	const inputSection = globalElements.input.contentsInput;
	const outputSection = globalElements.output.contents;
	const childtree = document.querySelectorAll('[data-section]');
	const IDs = [0];	// dummy element to avoid if statement
	for (const child of childtree) {
		IDs.push(parseInt(child.dataset.section));
	}
	function compareNumbers(a, b) {
		return a - b;
	}
	IDs.sort(compareNumbers);
	const childIndex = IDs[IDs.length - 1] + 1;
	const heading = childIndex + 'heading';
	const img = childIndex + 'img';
	const text = childIndex + 'text';

	const heading_input = childIndex + 'heading_input';
	const img_input = childIndex + 'img_input';
	const img_upload = childIndex + 'img_upload';
	const text_input = childIndex + 'text_input';

	const input_template = `<div class="tableHeader text sectionToggle" data-section="${childIndex}section">
		<div><span class="has-text-weight-bold">Title: </span><output name=${heading}></output></div>
		<button class="button is-danger is-outlined" type="button" onclick="removeSpecificSection('${childIndex}section')">Remove</button>
	</div>
	<div class="tableCell text" data-section="${childIndex}section">
		<label for="${heading_input}">Section heading:</label>
	</div>
	<div class="tableCell data" data-section="${childIndex}section">
		<input type="text" id="${heading_input}" data-dest="${heading}">
	</div>
	<div class="tableCell text" data-section="${childIndex}section">
		<label for="${img_input}">Image name, including file extension:</label>
	</div>
	<div class="tableCell data" data-section="${childIndex}section">
		<input type="text" id="${img_input}" data-dest="${img}" oninput="showContentImg(this)">
		<input type="file" id="${img_upload}" accept="image/*" onchange="image(this); showContentImg(this.previousElementSibling)">
	</div>
	<div class="tableHeader data no-flex" data-section="${childIndex}section">
		<label for="${text_input}">Content:</label>
		<textarea class="mb-2" id="${text_input}" data-dest="${text}"></textarea>
	</div>`

	const code_template = `<div data-section="${childIndex}section">==<output name="${heading}"></output>==</div>
	<div style="display:none" data-section="${childIndex}section">[[File:<output id="${img}"></output>|thumb]]</div>
	<div data-section="${childIndex}section"><output id="${text}"></output><br><br></div>`

	inputSection.insertAdjacentHTML("beforebegin", input_template);
	outputSection.insertAdjacentHTML("beforeend", code_template);

	const inputs = document.querySelectorAll(`[data-section="${childIndex}section"] input, [data-section="${childIndex}section"] textarea`);
	for (const input of inputs) {
		assignFunction(input, 'wikiCode(this)');
	}
}

function showContentImg(element) {
	const dest = element.dataset.dest;
	const target = document.getElementById(dest).parentElement;
	if (element.value) {
		target.style.display = '';
	} else {
		target.style.display = 'none';
	}
}

// generic function to remove elements in array
function removeSection(array) {
	for (const section of array) {
		section.remove();
	}
}

// removes specific section
function removeSpecificSection(sectionName) {
	const sections = document.querySelectorAll(`[data-section="${sectionName}"]`);
	removeSection(sections);
}

function resetExternal() {
	const contentSections = document.querySelectorAll('[data-section]');
	globalElements.output.contents.innerHTML = '';
	removeSection(contentSections);
}