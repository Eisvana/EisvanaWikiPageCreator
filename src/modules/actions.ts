/**
 * @fileoverview Provides functions needed for the actions (reset, download file, copy code, create page...) to work.
 */

/// <reference types="vite/client" />

import { addStaticPageData, enableTextMarking, triggerEvent } from "../common";
import { globalElements, pageData } from "../variables/objects";
import { galleryUploadShown, uploadShown } from "../variables/sessionstorage";
import { wikiLink } from "../variables/simple";

/**
 * Sets actions and notes for the HubWikiPageCreator. This function first sets up
 * several buttons for copying, downloading, and creating pages. It then adds a note
 * reminding the user to upload any images they have added. Finally, it adds a debug
 * mode checkbox, and sets up a handler for toggling debug mode on and off.
 * @function
 * @returns {undefined}
 */
(() => {
	// Sets up buttons for copying, downloading, and creating pages.
	const copyBtn = document.createElement('button');
	const downloadLink = document.createElement('a');
	const picUploadLink = document.createElement('a');
	const createLink = document.createElement('a');
	const resetBtn = document.createElement('button');

	([copyBtn, downloadLink, picUploadLink, createLink]).forEach(element => element.classList.add('button', 'is-outlined', 'is-primary'));

	// Copy Code Button
	copyBtn.id = 'copy';
	copyBtn.type = 'button';
	copyBtn.dataset.link = 'page';
	copyBtn.innerText = 'Copy Wikicode';
	copyBtn.addEventListener('click', function () { copyCode(this as unknown as HTMLButtonElement, 'fullArticle') });

	// Download File Button
	downloadLink.id = 'download';
	downloadLink.innerText = 'Download File';
	downloadLink.addEventListener('click', function () { downloadFile(this as unknown as HTMLAnchorElement) });

	// Upload Pictures Button
	picUploadLink.id = 'uploadLink';
	picUploadLink.href = wikiLink + 'Special:Upload?multiple=true';
	picUploadLink.rel = 'noopener noreferrer';
	picUploadLink.target = '_blank';
	picUploadLink.innerText = 'Upload Pictures';

	// Create Page Button
	createLink.id = 'create';
	createLink.dataset.link = 'page';
	createLink.innerText = 'Create Page';
	createLink.addEventListener('click', function () { createPage(this as unknown as HTMLAnchorElement) });

	// Reset Button
	resetBtn.classList.add('button', 'is-warning');
	resetBtn.id = 'reset';
	resetBtn.innerText = 'Reset Inputs';
	resetBtn.addEventListener('click', () => reset());

	// Adds a note reminding the user to upload any images they have added.
	const copyNote = `<p class="has-text-centered">You must copy the code first, then paste it into the wiki page.<br>Also don't forget to upload any images you have put here.</p>`;

	// Inserts the actions and note into the HTML.
	const actions = globalElements.output.actions as HTMLElement;
	actions.innerHTML = '';
	const buttonArray = [copyBtn, downloadLink, picUploadLink, createLink, resetBtn];
	for (const button of buttonArray) {
		actions.appendChild(button);
	}

	actions.insertAdjacentHTML('beforebegin', copyNote);

	// Adds debug mode checkbox and sets up a handler for toggling debug mode on and off.
	// import.meta.env.PROD: {boolean} whether the app is running in production. https://vitejs.dev/guide/env-and-mode.html 
	if (import.meta.env.PROD) {
		addStaticPageData('debug', false);
		return;
	}

	const skipCheck = `<label style="display:flex; gap: .3rem"><input class="checkbox" type="checkbox" id="skipCheck">Enable debug (no checks, no popups)</label>`;
	const clearLocalStorage = `<button style="margin: 0 1rem" class="button is-danger is-small" id="clearCache" onclick="localStorage.clear()">Clear Localstorage</button>`;
	const actionsWrapper = globalElements.output.actions as HTMLElement;
	actionsWrapper.insertAdjacentHTML('beforeend', skipCheck + clearLocalStorage);
	const skipCheckElement = document.getElementById('skipCheck') as HTMLInputElement | null;
	if (!skipCheckElement) return;
	skipCheckElement.onchange = (e) => {
		const checkState = (e.target as HTMLInputElement).checked;
		pageData.debug = checkState;
		pageData.uploadShown = checkState;
		pageData.galleryUploadShown = checkState;
		document.documentElement.dataset.debug = checkState.toString();
		enableTextMarking();
	}

	const urlParams = new URLSearchParams(window.location.search);
	if (!urlParams.has('debug')) return;

	skipCheckElement.checked = true;
	triggerEvent(skipCheckElement, 'change')
})();

/**
 * Resets all fields in the input form to their default values and clears any outputs.
 *
 * @function
 * @name reset
 * @global
 *
 * @returns {void}
 */
function reset() {
	const inputs = document.querySelectorAll('.table .data input, .table .data textarea');
	const selects = document.querySelectorAll('.table .data select');
	const outputs = document.getElementsByTagName('output');
	for (const input of inputs) {
		switch (input.type) {
			case 'checkbox':
				input.checked = false;
				break;
			case 'radio':
				const uncheckedRadios: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"]:not([checked])');
				const checkedRadios: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"][checked]');
				for (const radio of Array.from(uncheckedRadios)) radio.checked = false;
				for (const radio of Array.from(checkedRadios)) radio.checked = true;
				break;
			default:
				input.value = '';
		}
	}

	for (const select of selects) {
		select.value = select.options?.[0]?.value;
	}

	for (const output of outputs) {
		output.innerText = '';
	}

	if (typeof resetGallery == 'function') resetGallery();

	for (const key in pageData) {
		delete pageData[key];
	}

	const errors = document.querySelectorAll('.error')
	for (const error of errors) {
		errorMessage(error.previousElementSibling);
	}

	for (const key in links) {
		delete links[key];
	}

	// allow an external function to add reset logic. This external function has to be created when needed.
	if (typeof resetExternal == 'function') resetExternal();
	readDefaultValues();
	showAll();
}

/**
 * Copies the code from the specified input element to the clipboard.
 *
 * @param {HTMLElement} input - The input element containing the code to be copied.
 * @param {string} wikiCodeId - The ID of the wiki code container element.
 */
function copyCode(input, wikiCodeId) {
	// Disables pointer events so the button cannot be clicked multiple times.
	input.style.pointerEvents = 'none';

	// Saves the initial button text for later use.
	const { innerText: buttonText, dataset: { link: dataLink } } = input;

	// Updates the dataIntegrityObj with the new page data and sets the copy flag.
	dataIntegrityObj.text = JSON.stringify(pageData);
	dataIntegrityObj.copy = dataLink;

	// Checks if the data is valid.
	const dataIntegrity = checkDataIntegrity(input);		// true if data is wrong
	if (dataIntegrity) {
		// If the data is invalid, updates the button text to reflect the error and resets the button after a delay.
		input.classList.remove('is-primary');
		input.classList.add('is-danger');
		input.innerText = dataIntegrity;
		setTimeout(() => {
			input.classList.remove('is-danger');
			input.classList.add('is-primary');
			input.innerText = buttonText;
			input.style.pointerEvents = '';
		}, 1500);
		return;
	}

	// If the data is valid, copies the text to the clipboard and updates the dataIntegrityObj.
	const copyTextContent = globalElements?.output?.[wikiCodeId]?.innerText?.replaceAll('\n\n\n', '\n\n') ?? wikiCodeId;
	navigator.clipboard.writeText(copyTextContent);
	dataIntegrityObj.copy = dataLink;	// this must be here, since checkDataIntegrity sets it to false

	// Updates the button text to show that the code has been copied and resets it after a delay.
	input.innerText = 'Copied!';
	setTimeout(() => {
		input.innerText = buttonText;
		input.style.pointerEvents = '';
	}, 1500)
}

/**
 * Downloads a file with the name of the current page and content of globalElements.output.fullArticle.
 * @param {HTMLAnchorElement} button - The anchor element that initiates the file download.
 * @returns {void}
 */
function downloadFile(button) {
	const downloadFileContent = globalElements.output.fullArticle.innerText.replaceAll('\n\n\n', '\n\n');

	const mimeType = 'data:text/plain';

	const name = pageData.name;
	const a = button;
	a.href = mimeType + ',' + encodeURIComponent(downloadFileContent);
	a.download = name + '.txt';
}

/**
 * Disables pointer events on the given element, gets the name of the page,
 * creates a wiki link, and assigns the link to the element.
 *
 * @param {HTMLElement} element - The element that the link should be assigned to.
 * @param {string} [pagename=pageData.name] - The name of the new wiki page. Defaults to the name specified in the pageData object.
 * @returns {void}
 */
function createPage(element, pagename = pageData.name) {
	element.style.pointerEvents = 'none';
	const link = wikiLink + 'Special:EditPage/' + pagename;
	assignLink(element, link);
}

/**
 * Assigns the given `link` to the provided `element`. Before assigning,
 * checks if `dataIntegrity` is valid. If `dataIntegrity` is invalid,
 * disables `element` and displays an error message. Otherwise, assigns
 * the link to `element` and opens it in a new tab.
 *
 * @param {Object} element - The HTML element to assign the link to.
 * @param {string} link - The link to assign to `element`.
 * @returns {undefined}
 *
 * @example
 * assignLink(myAnchorElement, 'https://www.example.com')
 */
function assignLink(element, link) {
	const dataIntegrity = checkDataIntegrity(element);		// boolean
	const forbiddenCharacters = ['#', '<', '>', '[', ']', '{', '|', '}'];
	const regex = new RegExp(`[${forbiddenCharacters.join('')}]`, 'g');

	if (!dataIntegrity) {
		// If dataIntegrity is valid, assign link to element and open in new tab
		element.href = link.replace(regex, ' ');
		element.target = '_blank';
		element.rel = 'noopener noreferrer';
		element.style.pointerEvents = '';
	} else {
		// If dataIntegrity is invalid, disable element and display error message
		const buttonText = element.innerText;
		element.removeAttribute('href');
		element.className = 'button is-danger';
		element.innerText = dataIntegrity;

		// Set timeout to reset element after 1.5 seconds
		setTimeout(() => {
			element.className = 'button is-outlined is-primary';
			element.innerText = buttonText;
			element.style.pointerEvents = '';
		}, 1500);
	}
}

/**
 * Toggles the display of copy and create redirect buttons.
 *
 * @function
 */
function toggleRedirect() {
	if (typeof redirectPage != 'function') return;
	const lastBtn = document.getElementById('reset');
	const redirectIDs = ['copyRedirect', 'createRedirect'];
	const redirectNote = document.createElement('p');
	redirectNote.id = 'redirectNote';
	redirectNote.classList.add('has-text-centered');
	redirectNote.innerText = 'Please create a redirect for your page!';

	if (!redirectPage()) {
		redirectIDs.forEach(() => {
			const secondLastBtn = lastBtn.previousElementSibling;
			if (redirectIDs.includes(secondLastBtn.id)) secondLastBtn.remove();
		})
		document.getElementById(redirectNote.id)?.remove();
		return;
	}
	const copyRedirect = document.createElement('button');
	copyRedirect.innerText = 'Copy Redirect Code';
	copyRedirect.type = 'button';
	assignFunction(copyRedirect, 'copyCode(this, `#REDIRECT [[${pageData.name}]]`)', 'onclick');

	const createRedirect = document.createElement('a');
	createRedirect.rel = 'noopener noreferrer';
	createRedirect.target = '_blank';
	createRedirect.innerText = 'Create Redirect';
	assignFunction(createRedirect, 'createPage(this, redirectPage())', 'onclick');

	const codeArray = new Array;
	const buttons = [copyRedirect, createRedirect]
	for (let i = 0; i < buttons.length; i++) {
		const button = buttons[i];
		const id = redirectIDs[i];
		if (document.getElementById(id)) return;
		button.classList.add('button', 'is-outlined', 'is-primary');
		button.id = id;
		button.dataset.link = 'redirect';
		codeArray.push(button.outerHTML);
	}
	lastBtn.insertAdjacentHTML('beforebegin', codeArray.join(''));
	lastBtn.parentElement.insertAdjacentElement('beforebegin', redirectNote);
}