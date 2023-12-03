/**
 * @fileoverview Provides functions needed for the album actions (copy album code, open album...) to work.
 */

import { loadHTML } from "../common";
import type { ElementFunctions } from "../types/elements";
import { globalElements, globalFunctions, pageData } from "../variables/objects";
import { wikiLink } from "../variables/simple";
import { assignLink, copyCode } from "./actions";

/**
* Represents the album actions HTML code.
* @type {string}
*/
const actionsHTML = `<button id="albumBtn" class="button is-outlined is-primary"
	   data-link="album" data-evt-id="copyButton">
	   Copiar el wikicódigo del album
	   </button>
	   <a class="button is-outlined is-primary" id="albumLink"
	   data-link="album" data-evt-id="openAlbumButton">
	   Abrir Album
	   </a>`;

const eventListeners: ElementFunctions = [
	{
		element: 'copyButton',
		handler: 'click',
		func: function () { copyCode(this as unknown as HTMLButtonElement, 'albumText') }
	},
	{
		element: 'openAlbumButton',
		handler: 'click',
		func: function () { albumLink(this as unknown as HTMLAnchorElement) }
	},
]

export const actionsDom = loadHTML(actionsHTML, {}, eventListeners) as Document;

/**
 * Assigns a link to given element based on the album's PAGENAME.
 * Expects external 'albumLinkGen()' function which returns the PAGENAME of the album.
 * @param {Element} element - The element to assign the link to.
 * @returns {void}
 */
export function albumLink(element: HTMLAnchorElement) {
	element.style.pointerEvents = 'none';
	const catalogue = (() => {
		if (typeof globalFunctions.albumLinkGen == 'function') {
			return globalFunctions.albumLinkGen();
		} else if (pageData.catalogue) {
			return pageData.catalogue;
		} else {
			console.warn('¡No se proporciona ninguna página wiki. Defina la función `albumLinkGen()` y agréguela al objeto `globalFunctions` o defina un catálogo en la propiedad `pageData.catalogue`!');
			element.style.pointerEvents = '';
		}
	})();
	if (catalogue) assignLink(element, wikiLink + catalogue);
}

/**
 * These functions can be overwritten using by chaining "External" behind their name.
 * The external function should return the value that should go into the field.
 */

/**
 * Sets the output value for the album item type (the part directly behind the civ in the heading).
 * @function
 * @returns {string} The type of album item.
 */
export function albumItemType() {
	const output = (() => {
		if (typeof globalFunctions.albumItemTypeExternal == 'function') {
			return globalFunctions.albumItemTypeExternal();
		} else {
			return pageData.type;
		}
	})() as string;
	(globalElements.output.album as HTMLOutputElement).innerText = output;
}

/**
 * Updates the album description element on MT pages (after the album macro, used for MT pages).
 *
 * @function
 * @name albumDesc
 * @returns {undefined}
 */
export function albumDesc() {
	const output = (() => {
		if (typeof globalFunctions.albumDescExternal == 'function') {
			return globalFunctions.albumDescExternal() as string;
		} else {
			return '';
		}
	})();
	const outputElement = globalElements.output.albumDesc as HTMLElement;
	if (!outputElement) return;
	outputElement.innerText = output;
}

/**
 * A function that retrieves information about the discoverer of an album.
 *
 * @function
 * @return {string} - Returns the discoverer of an album, or a link to the wiki page if available.
 * @example
 *
 * // Sample usage
 * albumDiscoverer();
 */
export function albumDiscoverer() {
	const output = (() => {
		if (typeof globalFunctions.albumDiscovererExternal == 'function') {
			return globalFunctions.albumDiscovererExternal() as string;
		} else {
			const { discovered, discoveredlink } = pageData;
			if (discoveredlink) {
				return `wiki=${discoveredlink}`;
			} else {
				return `discoverer=${discovered}`;
			}
		}
	})();
	const outputElement = globalElements.output.albumDiscoverer as HTMLOutputElement;
	if (!outputElement) return;
	outputElement.innerText = output;
}

/**
 * Sets the name of the album in the global output element.
 *
 * @function
 * @returns {void}
 */
export function albumName() {
	const output = (() => {
		if ((typeof globalFunctions.albumNameExternal === 'function')) {
			return globalFunctions.albumNameExternal();
		} else {
			return pageData.name;
		}
	})() as string;
	(globalElements.output.albumName as HTMLOutputElement).innerText = output;
}

/**
 * Populates the "other" parameter in the album.
 * @returns {void}
 */
export function albumOther() {
	const output = (() => {
		if (typeof globalFunctions.albumOtherExternal == 'function') {
			return globalFunctions.albumOtherExternal();
		} else {
			return '';
		}
	})();
	const outputElement = globalElements.output.albumOther as HTMLOutputElement;
	if (!outputElement) return;
	outputElement.innerText = output as string;
}

/**
 * Sets the album type in the heading before the "entry".
 * @function
 * @returns {string} The album type.
 */
function albumType() {
	const output = (() => {
		if (typeof globalFunctions.albumTypeExternal === 'function') {
			return globalFunctions.albumTypeExternal();
		} else {
			return '';
		}
	})() as string;
	(globalElements.output.albumType as HTMLOutputElement).innerText = output;
}

/**
 * Updates the album data in the UI based on the page data.
 */
function updateAlbumData() {
	const dataLinks: { [key: string]: string } = {
		albumHeaderName: 'name',
		albumImage: 'image',
		albumGlyphs: 'portalglyphs'
	};
	for (const id in dataLinks) {
		const element = globalElements.output[id] as HTMLOutputElement;
		element.innerText = pageData[dataLinks[id]] as string;
	}
}

/**
 * This function contains several sub-functions which are called only when the album is completely loaded. If the album is already loaded, then the sub-functions will execute immediately. If not, the function listens for the 'albumLoaded' event to trigger and then executes the sub-functions.
 *
 * @function
 * @name albumFunctions
 * @returns {void}
 */
export function albumFunctions() {
	if (pageData.albumInitialised) {
		albumData();
	} else {
		document.addEventListener('albumLoaded', () => albumData());
	}
	/**
	 * Calls all functions related to album creation and updating.
	 * @function
	 * @name albumData
	 * @returns {void}
	*/
	function albumData() {
		updateAlbumData();
		albumDiscoverer();
		albumName();
		albumOther();
		albumType();
		albumItemType();
		albumDesc();
	}
}