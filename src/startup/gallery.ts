import Sortable from "sortablejs";
import { globalElements } from "../variables/objects";
import { moveItem } from "../modules/gallery";

/**
 * This adds a Sortable.js component to the galleryWrapper element,
 * allowing the user to reorganize the items in the gallery with drag-and-drop.
 * It checks if the device has a coarse pointer, and if so, it will not load the Sortable.js component.
 */
if (!window.matchMedia('(pointer: coarse)').matches) {		// Check if device has coarse pointer
	const galleryWrapper = globalElements.output.galleryItems as HTMLElement;
	new Sortable(galleryWrapper, {		// NoSonar (used by a library, not useless!)
		handle: '.handle',	// handle's class
		animation: 250,
		onUpdate: function (evt) { moveItem(evt) },
	})
}