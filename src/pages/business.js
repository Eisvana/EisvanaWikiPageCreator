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

/**
 * Replaces HubCoin with the HubCoin link macro
 * @param {HTMLElement} element - The element to replace HubCoin with HubCoin link macro
 * @returns {void}
 */
function fixHC(element) {
	const value = pageData.currency.toLowerCase();
	const dest = element.dataset.dest;
	if (value === 'hubcoin') wikiCode('{{CurrencyHubCoin}}', dest);
}

/**
 * Adds a section to the input and code.
 * 
 * @function
 * @memberof globalElements
 * @param {Element} inputSection - The section to add to the input.
 * @param {Element} outputSection - The section to add to the output.
 * @param {NodeList} elementList - The list of elements with section data.
 * @param {number} childIndex - The index of the child.
 * @param {string} heading - The heading element ID.
 * @param {string} img - The image element ID.
 * @param {string} text - The text element ID.
 * @param {string} heading_input - The heading input element ID.
 * @param {string} img_input - The image input element ID.
 * @param {string} img_upload - The image upload element ID.
 * @param {string} text_input - The text input element ID.
 * @constant {string} input_template - The HTML template for adding a new section to the input.
 * @constant {string} code_template - The HTML template for adding a new section to the code.
 */
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

/**
 * Hides or shows an image based on the value of its corresponding checkbox.
 * @param {HTMLElement} element - The checkbox input element.
 * @returns {void}
 */
function showContentImg(element) {
	const dest = element.dataset.dest;
	const target = document.getElementById(dest).parentElement;
	if (element.value) {
		target.style.display = '';
	} else {
		target.style.display = 'none';
	}
}

/**
 * Resets the 'contents' element of the global 'output' object to an empty string
 * and removes all content sections from the page.
 *
 * @function
 * @returns {void}
 */
function resetExternal() {
	const contentSections = document.querySelectorAll('[data-section]');
	globalElements.output.contents.innerText = '';
	removeSection(contentSections);
}