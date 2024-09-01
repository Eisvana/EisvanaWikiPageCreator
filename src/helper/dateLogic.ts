/**
 * @fileoverview Provides functions related to date
 */

import { wikiCode } from "../common";

/**
 * Processes the date value of an input element and sends the transformed data to a Wiki Code.
 * @param {HTMLInputElement} element - The input element containing the date value.
 * @returns {void}
 */
export function processDate(element: HTMLInputElement) {
	const date = element.value;
	const dest = element.dataset.destNoauto;
	wikiCode(date.replaceAll("-", "/"), dest);
}

/**
 * Retrieves the current year and passes it to the wikiCode function to output it to a specified element.
 *
 * @param {string} outputId - The ID of the HTML element where the current year will be displayed.
 * @returns {void}
 */
export function getCurrentYear(outputId: string) {
	const currentYear = new Date().getFullYear();

	wikiCode(currentYear.toString(), outputId);
}