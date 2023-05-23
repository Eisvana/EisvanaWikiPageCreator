import { addStaticPageData, enableTextMarking, triggerEvent } from "../common";
import { assignElementFunctions } from "../commonElements/elementBackend/elementFunctions";
import { copyCode, createPage, downloadFile, reset } from "../modules/actions";
import { ElementFunctions } from "../types/elements";
import { globalElements, pageData } from "../variables/objects";
import { wikiLink } from "../variables/simple";

/**
 * Sets actions and notes for the HubWikiPageCreator. This function first sets up
 * several buttons for copying, downloading, and creating pages. It then adds a note
 * reminding the user to upload any images they have added. Finally, it adds a debug
 * mode checkbox, and sets up a handler for toggling debug mode on and off.
 * @function
 * @returns {undefined}
 */

// Sets up buttons for copying, downloading, and creating pages.
const copyBtn = document.createElement('button');
const downloadLink = document.createElement('a');
const picUploadLink = document.createElement('a');
const createLink = document.createElement('a');
const resetBtn = document.createElement('button');

[copyBtn, downloadLink, picUploadLink, createLink].forEach(element => element.classList.add('button', 'is-outlined', 'is-primary'));

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

const functionObj: ElementFunctions = [
	{
		element: copyBtn,
		handler: 'click',
		func: function () { copyCode(this as unknown as HTMLButtonElement, 'fullArticle') }
	},
	{
		element: downloadLink,
		handler: 'click',
		func: function () { downloadFile(this as unknown as HTMLAnchorElement) }
	},
	{
		element: createLink,
		handler: 'click',
		func: function () { createPage(this as unknown as HTMLAnchorElement) }
	},
	{
		element: resetBtn,
		handler: 'click',
		func: () => reset()
	},
]
assignElementFunctions(functionObj);

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
if (import.meta.env.PROD) addStaticPageData('debug', false);

const skipCheck = `<label style="display:flex; gap: .3rem"><input class="checkbox" type="checkbox" id="skipCheck">Enable debug (no checks, no popups)</label>`;
const clearLocalStorage = `<button style="margin: 0 1rem" class="button is-danger is-small" id="clearCache" onclick="localStorage.clear()">Clear Localstorage</button>`;
const actionsWrapper = globalElements.output.actions as HTMLElement;
actionsWrapper.insertAdjacentHTML('beforeend', skipCheck + clearLocalStorage);
const skipCheckElement = document.getElementById('skipCheck') as HTMLInputElement | null;
if (skipCheckElement) {
	skipCheckElement.onchange = (e) => {
		const checkState = (e.target as HTMLInputElement).checked;
		pageData.debug = checkState;
		pageData.uploadShown = checkState;
		pageData.galleryUploadShown = checkState;
		document.documentElement.dataset.debug = checkState.toString();
		enableTextMarking();
	}

	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has('debug')) {
		skipCheckElement.checked = true;
		triggerEvent(skipCheckElement, 'change');
	}
}