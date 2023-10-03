import { assignFunction } from "../../commonElements/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import type { ElementFunction, ElementIds } from "../../types/elements";
import { pageData, footerInputs } from "../../variables/objects";

const footerElements: ElementIds = {
	input: {
		settings: 'settings',
	}
}
const footerInputList: NodeListOf<HTMLInputElement | HTMLSelectElement> = document.querySelectorAll('footer dialog .data>*');
footerInputs.push(...Array.from(footerInputList));

// Iterate over each input element and add its `id` to the `footerElements.input` object.
footerInputList.forEach(input => {
	const id = input.id;
	footerElements.input![id] = id;

	const functionObj: ElementFunction = {
		element: id,
		func: function () { delete pageData.restored }
	}

	// If the input element has a `data-store` attribute, add a `delete` function to it.
	if (input.dataset.store) assignFunction(functionObj);
})

// Update the `globalElements` object to include the new footerElements.
updateGlobalElements(footerElements);