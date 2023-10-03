/**
 * @fileoverview Provides functions needed for the actions (reset, download file, copy code, create page...) to work.
 */

/// <reference types="vite/client" />

import md5Hex from "md5-hex";
import { checkDataIntegrity, errorMessage, showAll, resetGallery } from "../common";
import { assignElementFunctions } from "../commonElements/elementBackend/elementFunctions";
import type { ElementFunctions } from "../types/elements";
import { dataIntegrityObj, globalElements, globalFunctions, links, pageData } from "../variables/objects";
import { wikiLink } from "../variables/simple";
import { readDefaultValues } from "./footer";

/**
 * Resets all fields in the input form to their default values and clears any outputs.
 *
 * @function
 * @name reset
 * @global
 *
 * @returns {void}
 */
export function reset() {
	const inputs: NodeListOf<HTMLTextAreaElement | HTMLInputElement> = document.querySelectorAll('.table .data input, .table .data textarea');
	const selects: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.table .data select');
	const outputs = document.getElementsByTagName('output');
	for (const input of Array.from(inputs)) {
		switch (input.type.toLowerCase()) {
			case 'checkbox':
				(input as HTMLInputElement).checked = false;
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

	for (const select of Array.from(selects)) {
		select.value = select.options?.[0]?.value;
	}

	for (const output of Array.from(outputs)) {
		output.innerText = '';
	}

	resetGallery();

	for (const key in pageData) {
		delete pageData[key];
	}

	const errors = document.querySelectorAll('.error')
	for (const error of Array.from(errors)) {
		errorMessage(error.previousElementSibling as HTMLElement);
	}

	for (const key in links) {
		delete links[key];
	}

	// allow an external function to add reset logic. This external function has to be created when needed.
	if (typeof globalFunctions.resetExternal == 'function') globalFunctions.resetExternal();
	readDefaultValues();
	showAll();
}

/**
 * Copies the code from the specified input element to the clipboard.
 *
 * @param {HTMLElement} input - The input element containing the code to be copied.
 * @param {string} wikiCodeId - The ID of the wiki code container element.
 */
export function copyCode(input: HTMLButtonElement, wikiCodeId: string) {
	// Disables pointer events so the button cannot be clicked multiple times.
	input.style.pointerEvents = 'none';

	// Saves the initial button text for later use.
	const { innerText: buttonText, dataset: { link: dataLink } } = input;

	// Updates the dataIntegrityObj with the new page data and sets the copy flag.
	dataIntegrityObj.text = md5Hex(JSON.stringify(pageData));
	dataIntegrityObj.copy = true;
	dataIntegrityObj.link = dataLink as string;

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
		}, 1500);	// NoSonar wait 1.5 seconds before resetting the button
		return;
	}

	// If the data is valid, copies the text to the clipboard and updates the dataIntegrityObj.
	const copyTextContent = (globalElements?.output?.[wikiCodeId] as HTMLElement)?.innerText?.replaceAll('\n\n\n', '\n\n') ?? wikiCodeId;
	navigator.clipboard.writeText(copyTextContent);		// NoSonar we don't care about this lol (maybe we should, but I can't be bothered right now)
	dataIntegrityObj.copy = true;	// this must be here, since checkDataIntegrity sets it to false
	dataIntegrityObj.link = dataLink as string;

	// Updates the button text to show that the code has been copied and resets it after a delay.
	input.innerText = 'Copied!';
	setTimeout(() => {
		input.innerText = buttonText;
		input.style.pointerEvents = '';
	}, 1500)	// NoSonar wait 1.5 seconds before resetting the button
}

/**
 * Downloads a file with the name of the current page and content of globalElements.output.fullArticle.
 * @param {HTMLAnchorElement} button - The anchor element that initiates the file download.
 * @returns {void}
 */
export function downloadFile(button: HTMLAnchorElement) {
	const downloadFileContent = (globalElements.output.fullArticle as HTMLElement).innerText.replaceAll('\n\n\n', '\n\n');

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
export function createPage(element: HTMLAnchorElement, pagename: string = pageData.name as string) {
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
export function assignLink(element: HTMLAnchorElement, link: string) {
	const dataIntegrity = checkDataIntegrity(element);		// string, is empty when everything is good, otherwise contains the error message
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
		}, 1500);	// NoSonar wait 1.5 seconds before resetting the button
	}
}

/**
 * Toggles the display of copy and create redirect buttons.
 *
 * @function
 */
export function toggleRedirect() {
	if (typeof globalFunctions.redirectPage != 'function') return;
	const lastBtn = document.getElementById('reset') as HTMLButtonElement;
	const redirectIDs = ['copyRedirect', 'createRedirect'];
	const redirectNote = document.createElement('p');
	redirectNote.id = 'redirectNote';
	redirectNote.classList.add('has-text-centered');
	redirectNote.innerText = 'Please create a redirect for your page!';

	if (!globalFunctions.redirectPage()) {
		redirectIDs.forEach(() => {
			const secondLastBtn = lastBtn.previousElementSibling as HTMLElement;
			if (redirectIDs.includes(secondLastBtn.id)) secondLastBtn.remove();
		})
		document.getElementById(redirectNote.id)?.remove();
		return;
	}
	const copyRedirect = document.createElement('button');
	copyRedirect.innerText = 'Copy Redirect Code';
	copyRedirect.type = 'button';

	const createRedirect = document.createElement('a');
	createRedirect.rel = 'noopener noreferrer';
	createRedirect.target = '_blank';
	createRedirect.innerText = 'Create Redirect';

	const functionObj: ElementFunctions = [
		{
			element: copyRedirect,
			handler: 'click',
			func: function () { copyCode(this as unknown as HTMLButtonElement, `#REDIRECT [[${pageData.name}]]`) }
		},
		{
			element: createRedirect,
			handler: 'click',
			func: function () { createPage(this as unknown as HTMLAnchorElement, globalFunctions.redirectPage() as string) }
		},
	]
	assignElementFunctions(functionObj);

	const buttons = [copyRedirect, createRedirect]
	for (let i = 0; i < buttons.length; i++) {
		const button = buttons[i];
		const id = redirectIDs[i];
		if (document.getElementById(id)) return;
		button.classList.add('button', 'is-outlined', 'is-primary');
		button.id = id;
		button.dataset.link = 'redirect';
		lastBtn.insertAdjacentElement('beforebegin', button);
	}

	lastBtn.parentElement!.insertAdjacentElement('beforebegin', redirectNote);
}