/**
 * @fileoverview Provides functions which can be used by the Base page creator.
 */

import { checkboxWikiCode, errorMessage, regexMatch, wikiCode } from "../../common";
import { globalElements } from "../../variables/objects";

export const exocraftTableEntry = `<output name="exocrafts"></output>`;


export function exocraftCheckboxes() {
	const checkboxes = document.getElementsByName('exocraftInput') as NodeListOf<HTMLInputElement>;
	const exocrafts: Array<string> = [];
	for (const checkbox of Array.from(checkboxes)) {
		if (checkbox.checked) exocrafts.push(checkbox.value);
	}
	wikiCode(exocrafts.join(', '), 'exocrafts');
}

/**
 * Validates Discord tags.
 *
 * @returns {void}
 */
export function validateDiscord() {
	const element = globalElements.input.censusDiscordInput as HTMLInputElement;
	const tag = element.value;

	const hasValidNewTag = /^[a-z0-9._]+$/.test(tag);

	errorMessage(element, !tag || hasValidNewTag ? '' : 'Invalid Discord tag. Please give your username, not your display name.');
}

/**
 * Validates the input value for a Reddit user name and generates wiki code for it.
 * @function
 *
 * @returns {void}
 */
export function validateReddit() {
	const element = globalElements.input.censusRedditInput as HTMLInputElement;
	const value = element.value.trim();
	const redditName = (() => {
		if (value.toLowerCase().startsWith('u/')) {
			return value.substring(2);	// NoSonar 0-1 are the `u/`, and we want to ignore that
		} else {
			return value;
		}
	})();
	if (redditName.includes(' ')) {
		errorMessage(element, 'Reddit name must not include spaces');
		return;
	} else {
		errorMessage(element);
	}
	const dest = element.dataset.destNoauto;
	wikiCode(redditName, dest);
}

/**
 * Capitalizes the input value of a friend code input element and calls the wikiCode function.
 * @function
 */
export function capitaliseFriendCode() {
	const element = globalElements.input.censusFriendInput as HTMLInputElement;
	element.value = element.value.toUpperCase();
	const dest = element.dataset.destNoauto;
	wikiCode(element, dest);
}

/**
 * Validates a friend code format (xxxx-xxxx-xxxxx).
 * @function
 * @returns {void}
 */
export function validateFriendcode() {
	const element = globalElements.input.censusFriendInput as HTMLInputElement;
	const friendCode = element.value;
	const friendCodeRegex = new RegExp(/(?:[0-9A-Za-z]{4}-){2}[0-9A-Za-z]{5}/);
	if (!friendCode || regexMatch(friendCode, friendCodeRegex)) {
		errorMessage(element);
	} else {
		errorMessage(element, 'Formato del código de amigo incorrecto');
	}
}

/**
 * Automatically checks or unchecks a checkbox to create a census entry.
 *
 * @function
 * @returns {void}
 */
export function createCensusEntry() {
	const checkbox = globalElements.input.censusShowInput as HTMLInputElement;
	const input = globalElements.input.censusPlayerInput as HTMLInputElement;
	const inputBool = Boolean(input.value);	// boolean from the input (true if any input is given)
	if (checkbox.checked == inputBool) return;
	checkbox.checked = inputBool;
	checkboxWikiCode(checkbox);
}