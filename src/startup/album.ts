import { addDomAsElement, addStaticPageData } from "../common";
import { updateGlobalElements } from "../commonElements/elementBackend/elementStore";
import wikitext from "../htmlSnippets/album.html?raw";
import { actionsDom } from "../modules/albumactions";
import { globalElements } from "../variables/objects";

const albumElements = {
	output: {
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
}

const albumEntry = globalElements.output.albumEntry;
const albumActions = globalElements.output.albumActions;

// If the global albumEntry element exists, set its innerHTML to the wikitext.
if (albumEntry instanceof HTMLDivElement) albumEntry.innerHTML = wikitext;

// If the global albumActions element exists, set its innerHTML to the actions.
if (albumActions instanceof HTMLDivElement) {
	addDomAsElement(actionsDom, albumActions, 'afterbegin');

	// Update the global albumElements with their respective IDs.
	updateGlobalElements(albumElements);

	// Dispatches the albumLoaded event to notify that the album is ready.
	document.dispatchEvent(new Event('albumLoaded'));

	/**
	 * Boolean flag indicating that the album has been initialised.
	 * @type {boolean}
	 */
	addStaticPageData('albumInitialised', true);

	const albumNote = `<p style="width:100%" class="has-text-centered mb-3">¡No olvides crear una entrada de álbum!</p>`;
	albumActions.insertAdjacentHTML('afterbegin', albumNote);
}
