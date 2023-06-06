/**
 * @fileoverview Provides functions needed for the album actions (copy album code, open album...) to work.
 */

import { globalElements, globalFunctions, pageData } from "../variables/objects";
import { wikiLink } from "../variables/simple";
import { assignLink } from "./actions";

/**
* Represents the album actions HTML code.
* @type {string}
*/
export const actionsHTML = `<button id="albumBtn" class="button is-outlined is-primary"
	   data-link="album" onclick="copyCode(this, 'albumText')">
	   Copy Album Wikicode
	   </button>
	   <a class="button is-outlined is-primary" id="albumLink"
	   data-link="album" onclick="albumLink(this)">
	   Open Album
	   </a>`;





/**
 * Assigns a link to given element based on the album's PAGENAME.
 * Expects external 'albumLinkGen()' function which returns the PAGENAME of the album.
 * @param {Element} element - The element to assign the link to.
 * @returns {void}
 */
export function albumLink(element: HTMLAnchorElement) {
	element.style.pointerEvents = 'none';
	const catalogue = (() => {
		if (typeof albumLinkGen == 'function') {
			return albumLinkGen();
		} else if (pageData.catalogue) {
			return pageData.catalogue;
		} else {
			console.warn('No wiki page provided. Add the function `albumLinkGen()` to your code or define a catalog in the `pageData.catalogue` property!');
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
function albumItemType() {
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
function albumDesc() {
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
 * Sets the name of the civilization in the heading.
 * @function
 * @name albumCiv
 * @returns {void}
 */
export function albumCiv() {
	const output = (() => {
		if (typeof globalFunctions.albumCivExternal == 'function') {
			return globalFunctions.albumCivExternal();
		} else {
			return pageData.civShort;
		}
	})() as string;
	(globalElements.output.albumCiv as HTMLOutputElement).innerText = output;
}

/**
 * Sets the name of the album in the global output element.
 *
 * @function
 * @returns {void}
 */
export function albumName() {
	const output = (() => {
		if ((typeof globalFunctions.albumNameExternal == 'function')) {
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
		if (typeof globalFunctions.albumTypeExternal == 'function') {
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
	pageData.albumInitialised ? albumData() : document.addEventListener('albumLoaded', () => albumData());

	/**
	 * Calls all functions related to album creation and updating.
	 * @function
	 * @name albumData
	 * @returns {void}
	 */
	function albumData() {
		updateAlbumData();
		albumCiv();
		albumDiscoverer();
		albumName();
		albumOther();
		albumType();
		albumItemType();
		albumDesc();
	}
}