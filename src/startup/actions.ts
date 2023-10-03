import { addDomAsElement, enableTextMarking, loadHTML, triggerEvent } from "../common";
import { copyCode, createPage, downloadFile, reset } from "../modules/actions";
import type { ElementFunctions } from "../types/elements";
import { globalElements, staticBooleans } from "../variables/objects";

/**
 * Sets actions and notes for the EisvanaWikiPageCreator. This function first sets up
 * several buttons for copying, downloading, and creating pages. It then adds a note
 * reminding the user to upload any images they have added. Finally, it adds a debug
 * mode checkbox, and sets up a handler for toggling debug mode on and off.
 * @function
 * @returns {undefined}
 */

// Sets up buttons for copying, downloading, and creating pages.
const actionsHTML = `
<button class="button is-outlined is-primary" id="copy" type="button" data-link="page" data-evt-id="copyButton">Copy Wikicode</button>
<a class="button is-outlined is-primary" id="download" data-evt-id="downloadButton">Download File</a>
<a class="button is-outlined is-primary" href="https://nomanssky.fandom.com/wiki/Special:Upload?multiple=true" id="uploadLink" rel="noopener noreferrer" target="_blank">Upload Pictures</a>
<a class="button is-outlined is-primary" id="create" data-link="page" data-evt-id="createPageButton">Create Page</a>
<button class="button is-warning" id="reset" type="reset" data-evt-id="resetButton">Reset Inputs</button>`;

const evtListenerObj: ElementFunctions = [
	{
		element: 'copyButton',
		handler: 'click',
		func: function () { copyCode(this as unknown as HTMLButtonElement, 'fullArticle') }
	},
	{
		element: 'downloadButton',
		handler: 'click',
		func: function () { downloadFile(this as unknown as HTMLAnchorElement) }
	},
	{
		element: 'createPageButton',
		handler: 'click',
		func: function () { createPage(this as unknown as HTMLAnchorElement) }
	},
	{
		element: 'resetButton',
		handler: 'click',
		func: () => reset()
	},
]

const inputDom = loadHTML(actionsHTML, {}, evtListenerObj) as Document;

// Adds a note reminding the user to upload any images they have added.
const copyNote = `<p class="has-text-centered">You must copy the code first, then paste it into the wiki page.<br>Also don't forget to upload any images you have put here.</p>`;

// Inserts the actions and note into the HTML.
const actions = globalElements.output.actions as HTMLElement;
actions.innerHTML = '';

addDomAsElement(inputDom, actions, 'afterbegin');

actions.insertAdjacentHTML('beforebegin', copyNote);

// Adds debug mode checkbox and sets up a handler for toggling debug mode on and off.
// import.meta.env.PROD: {boolean} whether the app is running in production. https://vitejs.dev/guide/env-and-mode.html
const isProd = import.meta.env.PROD

const devTools = `
<label style="display:flex; gap: .3rem"><input class="checkbox" type="checkbox" id="skipCheck" data-evt-id="skipCheck">Enable debug (no checks, no popups)</label>;
<button style="margin: 0 1rem" class="button is-danger is-small" id="clearCache" data-evt-id="clearCache">Clear Localstorage</button>`;

const evtListners: ElementFunctions = [
	{
		element: 'clearCache',
		handler: 'click',
		func: () => localStorage.clear()
	},
	{
		element: 'skipCheck',
		handler: 'change',
		func: function () {
			const checkState = (this as unknown as HTMLInputElement).checked;
			staticBooleans.debug = checkState;
			staticBooleans.uploadShown = checkState;
			staticBooleans.galleryUploadShown = checkState;
			document.documentElement.dataset.debug = checkState.toString();
			enableTextMarking();
		}
	}
]

const actionsWrapper = globalElements.output.actions as HTMLElement;
const debugDom = loadHTML(devTools, {}, evtListners) as Document;

// if on production, set the debug flag permanently to false
// if on dev (not prod), add the devtools from above
if (isProd) {
	Object.defineProperty(staticBooleans, 'debug', { configurable: false, writable: false, value: false });
} else {
	addDomAsElement(debugDom, actionsWrapper, 'beforeend');
}

const skipCheckElement = document.getElementById('skipCheck') as HTMLInputElement | null;
if (skipCheckElement) {
	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has('debug')) {
		skipCheckElement.checked = true;
		triggerEvent(skipCheckElement, 'change');
	}
}