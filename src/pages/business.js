function startupFunctions() {
	const input = document.querySelector('[oninput*="enPrefix"]');
	enPrefix(input.value, 'enPrefix');
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
	ownerInput: ['hideDiscoverer("ownerInput", "ownerlinkInput")'],
	ownerlinkInput: ['hideDiscoverer("ownerlinkInput", "ownerInput")'],
	currencyInput: ['fixHC(this); enPrefix(this.value, "enPrefix")'],
}
assignElementFunctions(businessElementFunctions);


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
	const elementList = document.querySelectorAll('[data-section]');
	const childIndex = getChildIndex(elementList, 'dataset.section');
	const heading = 'heading' + childIndex;
	const img = 'img' + childIndex;
	const text = 'text' + childIndex;
	const heading_input = 'heading_input' + childIndex;
	const img_input = 'img_input' + childIndex;
	const img_upload = 'img_upload' + childIndex;
	const text_input = 'text_input' + childIndex;

	const input_template = `<div class="tableHeader text sectionToggle" data-section="section${childIndex}">
		<div><span class="has-text-weight-bold">Title: </span><output name=${heading}></output></div>
		<button class="button is-danger is-outlined" type="button" onclick="removeSpecificSection('section${childIndex}')">Remove</button>
	</div>
	<div class="tableCell text" data-section="section${childIndex}">
		<label for="${heading_input}">Section heading:</label>
	</div>
	<div class="tableCell data" data-section="section${childIndex}">
		<input type="text" id="${heading_input}" data-dest="${heading}">
	</div>
	<div class="tableCell text" data-section="section${childIndex}">
		<label for="${img_input}">Image name, including file extension:</label>
	</div>
	<div class="tableCell data" data-section="section${childIndex}">
		<input type="text" id="${img_input}" data-dest="${img}" oninput="showContentImg(this)">
		<input type="file" id="${img_upload}" accept="image/*" onchange="image(this); showContentImg(this.previousElementSibling)">
	</div>
	<div class="tableHeader data no-flex" data-section="section${childIndex}">
		<label for="${text_input}">Content:</label>
		<textarea class="mb-2" id="${text_input}" data-dest="${text}"></textarea>
	</div>`

	const code_template = `<div data-section="section${childIndex}">==<output name="${heading}"></output>==</div>
	<div style="display:none" data-section="section${childIndex}">[[File:<output id="${img}"></output>|thumb]]</div>
	<div data-section="section${childIndex}"><output id="${text}"></output><br><br></div>`

	inputSection.insertAdjacentHTML("beforebegin", input_template);
	outputSection.insertAdjacentHTML("beforeend", code_template);

	const inputs = document.querySelectorAll(`[data-section="section${childIndex}"] :is(input, textarea)`);
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

function resetExternal() {
	const contentSections = document.querySelectorAll('[data-section]');
	globalElements.output.contents.innerText = '';
	removeSection(contentSections);
}