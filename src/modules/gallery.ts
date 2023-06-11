/**
 * @fileoverview Provides functions needed for the gallery to work.
 */

import { globalElements, globalFunctions, pageData } from "../variables/objects";
import { addDomAsElement, errorMessage, getChildIndex, loadHTML, sanitiseString, setDropdownOptions } from "../common";
import { explanation } from "./tooltip";
import galleryInputHtml from '../htmlSnippets/galleryInput.html?raw'
import { ElementFunctions } from "../types/elements";
import Sortable from "sortablejs";

/**
* Handles gallery image uploads
*
* @function
*/
export function galleryUpload() {
	// Get globalElements and set input, inputDiv, wikiCodeGalleryDiv, and errors
	const inp = globalElements.input.galleryUpload as HTMLInputElement;
	if (!inp?.value) return;
	const inputDiv = globalElements.output.galleryItems as HTMLDivElement;
	const wikiCodeGalleryDiv = globalElements.output.galleryCode as HTMLDivElement;
	const errors: Array<string> = [];

	// Loop through each file in inp.files
	if (!inp.files?.length) return;
	for (const file of Array.from(inp.files)) {

		// Declare and initialize name variable
		const name: string = file.name;

		// Check if file is too large, and continue if it is
		const uploadSizeLimit = 10000000;
		if (file.size > uploadSizeLimit) {
			errors.push(name);
			continue;
		}

		// Get childtree and childIndex, and set dropdownId, wikiCodeGalleryId, and wikiCodeGalleryValueId
		const childtree = inputDiv.children;
		const childIndex = getChildIndex(Array.from(childtree) as Array<HTMLElement>, 'id');

		// Create nameElement
		const nameElement = (() => {
			const p = document.createElement('p');
			const span = document.createElement('span');
			p.innerText = name;
			span.classList.add('has-text-weight-bold');
			span.innerText = 'Name: ';
			p.insertAdjacentElement('afterbegin', span);
			return p.outerHTML;
		})();

		// Create replacementStrings object
		const replacementStrings = {
			imgUrlData: URL.createObjectURL(file),
			inputId: 'pic' + childIndex,
			dropdownId: 'dropdown' + childIndex,
			galleryId: 'gallery' + childIndex,
			wikiCodeGalleryId: 'wikiCodeGallery' + childIndex,
			wikiCodeGalleryValueId: 'wikiCodeGalleryValue' + childIndex,
			nameElement,
		}

		const functionObj: ElementFunctions = [
			{
				element: 'move',
				handler: 'click',
				func: function () { mobileMoveItem(this as unknown as HTMLButtonElement, replacementStrings.wikiCodeGalleryId, (this as unknown as HTMLButtonElement).dataset.move as string) }
			},
			{
				element: 'dropdown',
				handler: 'change',
				func: function () { galleryDesc(this as unknown as HTMLSelectElement, replacementStrings.inputId, replacementStrings.wikiCodeGalleryValueId) }
			},
			{
				element: 'pic',
				handler: 'input',
				func: function () { galleryInput(this as unknown as HTMLInputElement, replacementStrings.wikiCodeGalleryValueId) }
			},
			{
				element: 'removeButton',
				handler: 'click',
				func: function () { rmGallery(this as unknown as HTMLButtonElement, replacementStrings.wikiCodeGalleryId) }
			},
		]

		// Load galleryTemplate using loadHTML function and replacementStrings
		const galleryTemplateDom = loadHTML(galleryInputHtml, replacementStrings, functionObj) as Document;

		// Get galleryElement and generate galleryArray if it exists
		const dropdown = galleryTemplateDom.getElementById(replacementStrings.dropdownId) as HTMLSelectElement;

		// Set dropdown options or hide element if galleryArray is empty
		if (typeof globalFunctions.generateGalleryArray == 'function') globalFunctions.generateGalleryArray();

		const galleryArray = pageData.galleryArray as Array<string>;
		if (galleryArray) {
			setDropdownOptions(dropdown, galleryArray);
		} else {
			dropdown.parentElement!.style.display = 'none';
		}

		// Set wikiCodeGalleryTemplate string
		const wikiCodeGalleryTemplate = `<div id="${replacementStrings.wikiCodeGalleryId}">
		<span>${name}</span><output id="${replacementStrings.wikiCodeGalleryValueId}"></output>
		</div>`;

		// Add galleryTemplate and wikiCodeGalleryTemplate to respective divs
		addDomAsElement(galleryTemplateDom, inputDiv, 'afterbegin');
		wikiCodeGalleryDiv.insertAdjacentHTML('afterbegin', wikiCodeGalleryTemplate);
	}

	// If errors exist, show error message. Otherwise, clear error message
	errorMessage(inp, errors.length ? `The following file(s) exceed the 10MB upload limit and couldn't be added:<br>${errors.join(',<br>')}` : undefined);

	// If galleryUploadShown is true, exit the function. Otherwise, show gallery explanation popup
	if (pageData.galleryUploadShown) return;
	// the galleryExplanationExternal() function should return string with the popup text. HTML is supported.
	if (pageData.galleryExplanationExternal) {
		explanation('Gallery',
			`${pageData.galleryExplanationExternal}
		<div class="mt-3"><span class="has-text-weight-bold">NOTE</span>: You can access this popup at any time by clicking on the "?" next to the gallery upload button.</div>`);
	}
	pageData.galleryUploadShown = true;
}

/**
 * Takes the selected description from a dropdown element and inserts it into an input field.
 *
 * @param {HTMLInputElement} dropdownElement - The dropdown element that contains the descriptions.
 * @param {string} inputId - The ID of the input field to insert the selected description.
 * @param {string} codeId - The ID of the code block to update after inserting the description.
 */
function galleryDesc(dropdownElement: HTMLSelectElement, inputId: string, codeId: string) {
	const dropdown = dropdownElement.value;
	const input = document.getElementById(inputId) as HTMLInputElement;
	input.value = dropdown;
	galleryInput(input, codeId);
}

/**
 * Adds or removes descriptions from the gallery.
 *
 * @param {HTMLInputElement} input - The input element containing the description to add or remove
 * @param {string} galleryId - The ID of the gallery element to modify
 * @returns {void}
 */
function galleryInput(input: HTMLInputElement, galleryId: string) {
	const desc = sanitiseString(input.value);
	document.getElementById(galleryId)!.innerText = desc ? '|' + desc : '';
}

/**
 * Removes a gallery entry when the X button is clicked.
 * @param {Node} galleryNode - The gallery node to remove from the DOM.
 * @param {string} wikiCodeGalleryId - The ID of the wiki code gallery node.
 */
function rmGallery(galleryNode: HTMLButtonElement, wikiCodeGalleryId: string) {
	const wikiCodeGalleryNode = document.getElementById(wikiCodeGalleryId);
	wikiCodeGalleryNode!.remove();
	galleryNode.closest('.gallery-item')!.remove();
}

/**
* This function moves the selected item in the gallery up or down depending on the drag direction and updates the gallery wikicode accordingly.
* @function moveItem
* @param {Object} evt - The event object containing information about the item that was moved.
*/
export function moveItem(evt: Sortable.SortableEvent) {
	const oldIndex = evt.oldIndex as number;
	const newIndex = evt.newIndex as number;
	const galleryElement = document.getElementById('galleryCode');
	if (!galleryElement) return;
	const galleryItems = Array.from(galleryElement.children);
	const extractedItem = galleryItems.splice(oldIndex, 1);
	galleryItems.splice(newIndex, 0, extractedItem[0])
	const HTML: Array<string> = [];
	for (const item of galleryItems) {
		const code = item.outerHTML;
		HTML.push(code);
	}
	galleryElement.innerHTML = HTML.join('');
}

/**
 * Moves item in gallery and gallery wikicode up or down depending on user input
 * @param {HTMLElement} element - The element to move
 * @param {string} codeId - The ID of the gallery code item
 * @param {('up'|'down')} direction - The direction to move the element
 * @returns {void}
 */
function mobileMoveItem(element: HTMLElement, codeId: string, direction: string) {
	const galleryItem = element.closest('.gallery-item')
	const galleryCodeItem = document.getElementById(codeId);
	const elements = [galleryItem, galleryCodeItem];
	for (const element of elements) {
		if (!element) return;

		const wrapper = element.parentNode;
		if (!wrapper) return;

		if (direction == 'up' && element.previousElementSibling) {
			wrapper.insertBefore(element, element.previousElementSibling);
		} else if (direction == 'down' && element.nextElementSibling) {
			wrapper.insertBefore(element, element.nextElementSibling.nextElementSibling);
		}
	}
}

export function resetGallery() {
	const galleryElement = globalElements.output.galleryItems as HTMLDivElement;
	galleryElement.innerHTML = '';
}