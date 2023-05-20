/**
 * @fileoverview Provides functions needed for the gallery to work.
 */

import Sortable from "sortablejs";
import { galleryUploadShown } from "../variables/sessionstorage";
import { cachedHTML, globalElements } from "../variables/objects";

/**
 * This function adds a Sortable.js component to the galleryWrapper element,
 * allowing the user to reorganize the items in the gallery with drag-and-drop.
 * It checks if the device has a coarse pointer, and if so, it will not load the Sortable.js component.
 * @global
 * @param {Object} galleryWrapper - The gallery element where items will be reordered.
 */
(() => {
	if (window.matchMedia('(pointer: coarse)').matches) return;		// Check if device has coarse pointer
	const galleryWrapper = globalElements.output.galleryItems;
	new Sortable(galleryWrapper, {		// NoSonar (used by a library, not useless!)
		handle: '.handle',	// handle's class
		animation: 250,
		onUpdate: function (evt) { moveItem(evt) },
	});

	cachedHTML.files.add(`src/htmlSnippets/galleryInput.html`);
})();

/**
* Handles gallery image uploads
*
* @async
* @function
*/
async function galleryUpload() {
	// Get globalElements and set input, inputDiv, wikiCodeGalleryDiv, and errors
	const inp = globalElements.input.galleryUpload;
	if (!inp.value) return;
	const { galleryItems: inputDiv, galleryCode: wikiCodeGalleryDiv } = globalElements.output;
	const errors = new Array;

	// Loop through each file in inp.files
	for (const file of inp.files) {

		// Declare and initialize name variable
		const name = file.name;

		// Check if file is too large, and continue if it is
		if (file.size > 10000000) {
			errors.push(name);
			continue;
		}

		// Get childtree and childIndex, and set dropdownId, wikiCodeGalleryId, and wikiCodeGalleryValueId
		const childtree = inputDiv.children;
		const childIndex = getChildIndex(childtree, 'id');

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

		// Load galleryTemplate using loadHTML function and replacementStrings
		const galleryTemplate = await loadHTML('src/htmlSnippets/galleryInput.html', replacementStrings);

		// Set wikiCodeGalleryTemplate string
		const wikiCodeGalleryTemplate = `<div id="${replacementStrings.wikiCodeGalleryId}">
		<span>${name}</span><output id="${replacementStrings.wikiCodeGalleryValueId}"></output>
		</div>`;

		// Add galleryTemplate and wikiCodeGalleryTemplate to respective divs
		inputDiv.insertAdjacentHTML('afterbegin', galleryTemplate.body.innerHTML);
		wikiCodeGalleryDiv.insertAdjacentHTML('afterbegin', wikiCodeGalleryTemplate);

		// Get galleryElement and generate galleryArray if it exists
		const galleryElement = document.getElementById(replacementStrings.dropdownId);

		// Set dropdown options or hide element if galleryArray is empty
		if (typeof generateGalleryArray == 'function') generateGalleryArray();

		const galleryArray = pageData.galleryArray;
		if (galleryArray) {
			setDropdownOptions(galleryElement, galleryArray);
		} else {
			galleryElement.parentElement.style.display = 'none';
		}
	}

	// If errors exist, show error message. Otherwise, clear error message
	errorMessage(inp, errors.length ? `The following files exceed the 10MB upload limit and couldn't be added:<br>${errors.join(',<br>')}` : null);

	// If galleryUploadShown is true, exit the function. Otherwise, show gallery explanation popup
	if (galleryUploadShown) return;
	// the galleryExplanationExternal() function should return string with the popup text. HTML is supported.
	if (typeof galleryExplanationExternal == 'function') {
		explanation('Gallery',
			`${galleryExplanationExternal()}
		<div class="mt-3"><span class="has-text-weight-bold">NOTE</span>: You can access this popup at any time by clicking on the "?" next to the gallery upload button.</div>`);
	}
	galleryUploadShown(true);
}

/**
 * Takes the selected description from a dropdown element and inserts it into an input field.
 *
 * @param {HTMLInputElement} dropdownElement - The dropdown element that contains the descriptions.
 * @param {string} inputId - The ID of the input field to insert the selected description.
 * @param {string} codeId - The ID of the code block to update after inserting the description.
 */
function galleryDesc(dropdownElement, inputId, codeId) {
	const dropdown = dropdownElement.value;
	const input = document.getElementById(inputId);
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
function galleryInput(input, galleryId) {
	const desc = sanitiseString(input.value);
	document.getElementById(galleryId).innerText = desc ? '|' + desc : '';
}

/**
 * Removes a gallery entry when the X button is clicked.
 * @param {Node} galleryNode - The gallery node to remove from the DOM.
 * @param {string} wikiCodeGalleryId - The ID of the wiki code gallery node.
 */
function rmGallery(galleryNode, wikiCodeGalleryId) {
	const wikiCodeGalleryNode = document.getElementById(wikiCodeGalleryId);
	wikiCodeGalleryNode.remove();
	galleryNode.closest('.gallery-item').remove();
}

/**
* This function moves the selected item in the gallery up or down depending on the drag direction and updates the gallery wikicode accordingly.
* @function moveItem
* @param {Object} evt - The event object containing information about the item that was moved.
*/
function moveItem(evt) {
	const oldIndex = evt.oldIndex;
	const newIndex = evt.newIndex;
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

function resetGallery() {
	globalElements.output.galleryItems.innerHTML = '';
}