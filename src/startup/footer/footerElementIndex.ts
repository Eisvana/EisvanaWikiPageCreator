import { assignFunction } from "../../elementFrontends/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../elementFrontends/elementBackend/elementStore";
import { footerElements } from "../../modules/footer";
import { ElementFunctions } from "../../types/elements";
import { pageData } from "../../variables/objects";

/**
 * NodeList of input elements inside the footer dialog's "data" container.
 *
 * @type {NodeList}
 */
export const footerInputs: NodeListOf<HTMLElement> = document.querySelectorAll('footer dialog .data>*');

// Iterate over each input element and add its `id` to the `footerElements.input` object.
footerInputs.forEach(input => {
	const id = input.id;
	footerElements.input![id] = id;

	const functionObj: ElementFunctions = {
		element: id,
		func: function () { delete pageData.restored }
	}


	// If the input element has a `data-store` attribute, add a `delete` function to it.
	if (input.dataset.store) assignFunction(functionObj);
})

// Update the `globalElements` object to include the new footerElements.
updateGlobalElements(footerElements);

/**
 * Array of input elements inside the footer dialog's "data" container.
 *
 * @type {Array}
 */
footerElements.inputs = footerInputs;