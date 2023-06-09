import Sortable from "sortablejs";
import { globalElements } from "../variables/objects";
import { moveItem } from "../modules/gallery";

/**
 * This adds a Sortable.js component to the galleryWrapper element,
 * allowing the user to reorganize the items in the gallery with drag-and-drop.
 * It is only executed if the device does not have a coarse pointer (touchscreen).
 */
const galleryWrapper = globalElements.output.galleryItems as HTMLElement;
if (!window.matchMedia('(pointer: coarse)').matches && galleryWrapper) {		// Check if device has coarse pointer
	new Sortable(galleryWrapper, {		// NoSonar (used by a library, not useless!)
		handle: '.handle',	// handle's class
		animation: 250,
		onUpdate: function (evt) { moveItem(evt) },
	})
}