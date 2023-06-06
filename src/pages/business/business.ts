/**
 * @fileoverview Provides functions which can be used by the Business page creator.
 */

import { addDomAsElement, getChildIndex, image, loadHTML, removeSection, removeSpecificSection, wikiCode } from '../../common';
import { ElementFunctions } from '../../types/elements';
import { globalElements, pageData } from '../../variables/objects';
import businessInputs from '../../htmlSnippets/businessInputs.html?raw';

/**
 * Replaces HubCoin with the HubCoin link macro
 * @param {HTMLElement} element - The element to replace HubCoin with HubCoin link macro
 * @returns {void}
 */
export function fixHC(element: HTMLInputElement) {
	const currency = pageData.currency as string;
	const value = currency.toLowerCase();
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
export function addSection() {
	const { input: { contentsInput: inputSection }, output: { contents: outputSection } } = globalElements;
	const elementList: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-section]');
	const childIndex = getChildIndex(Array.from(elementList), 'dataset.section').toString();
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

	const eventListeners: ElementFunctions = [
		{
			element: 'wikicode',
			handler: 'input',
			func: function () { wikiCode(this as unknown as HTMLInputElement | HTMLTextAreaElement) }
		},
		{
			element: 'removeButton',
			handler: 'click',
			func: () => removeSpecificSection(`section${childIndex}`)
		},
		{
			element: 'fileInput',
			handler: 'input',
			func: function () { wikiCode(this as unknown as HTMLInputElement); showContentImg(this as unknown as HTMLInputElement) }
		},
		{
			element: 'imageUpload',
			handler: 'change',
			func: function () { image(this as unknown as HTMLInputElement); showContentImg((this as unknown as HTMLInputElement).previousElementSibling as HTMLInputElement) }
		},
	]

	const inputDom = loadHTML(businessInputs, replacementStrings, eventListeners) as Document;
	const code = `
		<div data-section="section${childIndex}">==<output name="${replacementStrings.heading}"></output>==</div>
		<div style="display:none" data-section="section${childIndex}">[[File:<output id="${replacementStrings.img}"></output>|thumb]]</div>
		<div data-section="section${childIndex}"><output id="${replacementStrings.text}"></output><br><br></div>`;
	addDomAsElement(inputDom, inputSection as HTMLElement, 'beforebegin');
	(outputSection as HTMLElement).insertAdjacentHTML("beforeend", code);
}

/**
 * Hides or shows an image based on the value of its corresponding checkbox.
 * @param {HTMLElement} element - The checkbox input element.
 * @returns {void}
 */
export function showContentImg(element: HTMLInputElement) {
	const dest = element.dataset.dest as string;
	const target = document.getElementById(dest)!.parentElement as HTMLElement;
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
export function resetExternal() {
	const contentSections: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-section]');
	(globalElements.output.contents as HTMLDivElement).innerText = '';
	removeSection(Array.from(contentSections));
}