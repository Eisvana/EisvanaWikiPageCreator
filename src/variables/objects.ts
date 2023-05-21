import { GlobalElements } from "../types/elements";

/**
 * An object that contains links.
 * @type {Object}
 */
export const links = {};

/**
 * An object that contains page data.
 * @type {Object}
 */
export const pageData: {
	[key: string]: string | number | boolean | Array<string>;
} = {};

/**
 * Object used to store the current page data and check for data integrity issues.
 * @type {Object}
 * @property {string} text - The current page data, represented as a string.
 * @property {boolean} copy - Whether the current page's data has been copied.
 */
export const dataIntegrityObj = { text: '', copy: false, link: '' };

/**
 * An object that stores elements that are consistent across pages. It is filled automatically on page load, combined from other objects like commonElements.
 * @type {Object}
 * @property {Object} input - An object that contains input elements.
 * @property {Object} output - An object that contains output elements.
 */
export const globalElements: GlobalElements = {
	input: {},
	output: {},
}

export const globalFunctions: {
	[key: string]: () => void;
} = {}

/**
 * NodeList of input elements inside the footer dialog's "data" container.
 *
 * @type {NodeList}
 */
export const footerInputs: Array<HTMLInputElement | HTMLSelectElement> = [];