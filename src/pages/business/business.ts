/**
 * @fileoverview Provides functions which can be used by the Business page creator.
 */

import businessInputs from '../htmlSnippets/businessInputs.html?raw';

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

	cachedHTML.files.add('src/htmlSnippets/businessInputs.html');
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
	const { input: { contentsInput: inputSection }, output: { contents: outputSection } } = globalElements;
	const elementList = document.querySelectorAll('[data-section]');
	const childIndex = getChildIndex(elementList, 'dataset.section');
	const replacementStrings = {
		childIndex,
		heading: 'heading' + childIndex,
		img: 'img' + childIndex,
		text: 'text' + childIndex,
		heading_input: 'heading_input' + childIndex,
		img_input: 'img_input' + childIndex,
		img_upload: 'img_upload' + childIndex,
		text_input: 'text_input' + childIndex,
	}

	const inputHtml = loadHTML(businessInputs, replacementStrings);
	const code = `
		<div data-section="section${childIndex}">==<output name="${replacementStrings.heading}"></output>==</div>
		<div style="display:none" data-section="section${childIndex}">[[File:<output id="${replacementStrings.img}"></output>|thumb]]</div>
		<div data-section="section${childIndex}"><output id="${replacementStrings.text}"></output><br><br></div>`;

	const inputs = input_dom.querySelectorAll(`[data-section="section${strings.childIndex}"] :is(input, textarea)`);
	for (const input of inputs) {
		assignFunction(input, 'wikiCode(this)');
	}

	inputSection.insertAdjacentHTML("beforebegin", inputHtml);
	outputSection.insertAdjacentHTML("beforeend", code);
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