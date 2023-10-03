import type { ElementIds, ElementId } from "../../types/elements";
import { globalElements } from "../../variables/objects";
import elementIds from "../elementStoreFrontend";

// functions

/**
 * Updates global elements with values from an object.
 * @param {Object} object - The object containing values to be updated.
 */
function updateGlobalElements(object: ElementIds): void {
	for (const entries of Object.entries(object)) {
		const section = entries[0] as keyof ElementIds;
		const obj = entries[1] as ElementId;
		for (const [key, dest] of Object.entries(obj)) {
			const element = getDestElements(dest);
			if (element == null) continue;
			globalElements[section] ??= {};
			globalElements[section]![key] = element.length > 1 ? element : element[0];
		}
	}
}

/**
 * Returns an array of DOM elements with the specified name or ID.
 *
 * @param {string} dest - The name or ID of the elements to search for.
 * @returns {Array} An array of matching DOM elements.
 */
function getDestElements(dest: string): Array<HTMLElement> {
	const destElements = Array.from(document.getElementsByName(dest));
	if (!destElements.length) {
		const element = document.getElementById(dest);
		if (element) destElements.push(element);
	}
	return destElements;
}

/**
 * Finds all input, select, and text area elements in the current page and adds their IDs to the commonElements list of input IDs.
 */
function addInputs() {
	const inputs = document.querySelectorAll('input, select, textarea');
	const inputElements = Object.values(elementIds.input as ElementId);
	for (const input of Array.from(inputs)) {
		if (inputElements.includes(input.id)) continue;
		elementIds.input![input.id] = input.id;
	}
}

/**
 * Finds all output elements in the current page and adds their names or IDs (whichever exists) to the commonElements list of output names/IDs.
 */
function addOutputs() {
	const outputs = document.getElementsByTagName('output');
	const outputElements = Object.values(elementIds.output as ElementId);
	for (const output of Array.from(outputs)) {
		if (outputElements.includes(output.name) || outputElements.includes(output.id)) continue;
		const keyVal = output.name || output.id;
		elementIds.output![keyVal] = keyVal;
	}
}

// exports
export { updateGlobalElements, getDestElements, addInputs, addOutputs };