import type { GlobalElements } from "../types/elements";
import type { LinkObj } from "../types/links";
import type { StdObj, TransformedElementFunctions } from "../types/objects";
import type { AnyPrimitive } from "../types/values";

/**
 * An object that contains links.
 * @type {Object}
 */
export const links: LinkObj = {};

/**
 * An object that contains page data.
 * @type {Object}
 */
export const pageData: {
	[key: string]: AnyPrimitive | Array<string>;
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
	[key: string]: () => (void | string | number | boolean);
} = {}

/**
 * Array of input elements inside the footer dialog's "data" container.
 *
 * @type {Array}
 */
export const footerInputs: Array<HTMLInputElement | HTMLSelectElement> = [];

export const transformedElementFunctions: TransformedElementFunctions = {};

export const staticBooleans: { [key: string]: boolean } = {};

export const locsByType: StdObj = {
	Royal: 'Sentinel Pillar',
	Sentinel: 'Harmonic Camp',
	Atlantid: 'Monolith',
}