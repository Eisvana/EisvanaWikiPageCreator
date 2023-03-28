/**
 * @fileoverview Provides functions needed for the album actions (copy album code, open album...) to work.
 */

// The logic for calculating the link target should be done by the main JS file of the page
const albumElements = {
	output: {
		albumCiv: 'albumCiv',
		album: 'album',
		albumType: 'albumType',
		albumHeaderName: 'albumHeaderName',
		albumImage: 'albumImage',
		albumName: 'albumName',
		albumOther: 'albumOther',
		albumGlyphs: 'albumGlyphs',
		albumDiscoverer: 'albumDiscoverer',
		albumText: 'albumText',
		albumDesc: 'albumDesc'
	}
};		// this semicolon is necessary, otherwise the code throws an error

/**
 * Initializes the album entry with the provided album information and sets up the UI.
 * @function
 */
(async () => {
	async function initAlbumEntry() {
		console.log('start loading!')
		const wikitext = await loadHTML('src/htmlSnippets/album.html');
		console.log("loaded!")
		const actions = `<button id="albumBtn" class="button is-outlined is-primary"
			onclick="copyCode(this, 'albumText')">
			Copy album wikicode
			</button>
			<a class="button is-outlined is-primary" id="albumLink"
			onclick="albumLink(this)">
			Open Album
			</a>`
		// If the global albumEntry element exists, set its innerHTML to the wikitext.
		if (globalElements.output.albumEntry) globalElements.output.albumEntry.innerHTML = wikitext.body.innerHTML;

		// If the global albumActions element exists, set its innerHTML to the actions.
		if (globalElements.output.albumActions) globalElements.output.albumActions.innerHTML = actions;

		// Update the global albumElements with their respective IDs.
		updateGlobalElements(albumElements);

		/**
		 * Object containing functions that act upon album-related HTML elements.
		 */
		const albumElementFunctions = {
			civ: ['albumCiv()', null, true],
		}
		// Assign albumElementFunctions to their respective HTML elements.
		assignElementFunctions(albumElementFunctions);

	};
	globalElements.initAlbumEntryPromise = initAlbumEntry;
	globalElements.initAlbumEntryPromise();
})();

/**
 * Assigns a link to given element based on the album's PAGENAME.
 * Expects external 'albumLinkGen()' function which returns the PAGENAME of the album.
 * @param {Element} element - The element to assign the link to.
 * @returns {void}
 */
function albumLink(element) {
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
		if (typeof albumItemTypeExternal == 'function') {
			return albumItemTypeExternal();
		} else {
			return pageData.type;
		}
	})();
	globalElements.output.album.innerText = output;
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
		if (typeof albumDescExternal == 'function') {
			return albumDescExternal();
		} else {
			return '';
		}
	})();
	globalElements.output.albumDesc.innerText = output;
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
function albumDiscoverer() {
	const output = (() => {
		if (typeof albumDiscovererExternal == 'function') {
			return albumDiscovererExternal();
		} else {
			const discovered = pageData.discovered;
			const discoveredlink = pageData.discoveredlink;
			if (discoveredlink) {
				return `wiki=${discoveredlink}`;
			} else {
				return `discoverer=${discovered}`;
			}
		}
	})();
	globalElements.output.albumDiscoverer.innerText = output;
}

/**
 * Sets the name of the civilization in the heading.
 * @function
 * @name albumCiv
 * @returns {void}
 */
function albumCiv() {
	const output = (() => {
		if (typeof albumCivExternal == 'function') {
			return albumCivExternal();
		} else {
			return pageData.civShort;
		}
	})();
	globalElements.output.albumCiv.innerText = output;
}

/**
 * Sets the name of the album in the global output element.
 *
 * @function
 * @returns {void}
 */
function albumName() {
	const output = (() => {
		if ((typeof albumNameExternal == 'function')) {
			return albumNameExternal();
		} else {
			return pageData.name;
		}
	})();
	globalElements.output.albumName.innerText = output;
}

/**
 * Populates the "other" parameter in the album.
 * @returns {void}
 */
function albumOther() {
	const output = (() => {
		if (typeof albumOtherExternal == 'function') {
			return albumOtherExternal();
		} else {
			return '';
		}
	})();
	globalElements.output.albumOther.innerText = output;
}

/**
 * Sets the album type in the heading before the "entry".
 * @function
 * @returns {string} The album type.
 */
function albumType() {
	const output = (() => {
		if (typeof albumTypeExternal == 'function') {
			return albumTypeExternal();
		} else {
			return '';
		}
	})();
	globalElements.output.albumType.innerText = output;
}

/**
 * Calls all functions related to album creation on page load.
 * @function
 * @name albumFunctions
 * @returns {void}
 */
function albumFunctions() {
	albumCiv();
	albumDiscoverer();
	albumName();
	albumOther();
	albumType();
	albumItemType();
	albumDesc();
}