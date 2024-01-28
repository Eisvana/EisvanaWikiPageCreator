/**
 * @fileoverview Inserts portalglyph buttons into the page and handles all logic surrounding them.
 */

import { errorMessage, triggerEvent, wikiCode } from "../common";
import { getDestElements } from "../commonElements/elementBackend/elementStore";
import { globalElements, pageData } from "../variables/objects";
import { regions, galaxies } from "../variables/regions";

const validPortalKeys = '0123456789ABCDEF';

const portalglyphsInput = document.getElementById('portalglyphsInput');
const glyphDeleteButton = document.getElementById('glyphDeleteButton');

function updateButtonVisibility() {
  if (!(portalglyphsInput instanceof HTMLInputElement) || !(glyphDeleteButton instanceof HTMLButtonElement)) return;
  glyphDeleteButton.style.display = portalglyphsInput.value ? 'block' : 'none';
}

// Updates button visibility when input field value changes
portalglyphsInput?.addEventListener('input', updateButtonVisibility);

// Update button visibility on page loads
updateButtonVisibility();

/**
 * Adds portal glyph buttons to a specified element.
 * @param {HTMLElement} element - The element to which the buttons should be added.
 * @param {string} glyphInputBindId - The input binding ID for the glyph press function.
 * @returns {void}
 */
export function addPortalGlyphButtons(element: HTMLElement, glyphInputBindId: string) {
	if (!element) return;
	const glyphs: Array<HTMLButtonElement> = [];
	for (const letter of validPortalKeys) {
		const glyph = generateButton(letter);
		glyphs.push(glyph);
	}
	element.innerHTML = '';
	for (const glyph of glyphs) {
		element.appendChild(glyph);
	}

	function generateButton(letter: string) {
		const button = document.createElement('button');
		const span = document.createElement('span');

		button.type = 'button';
		button.dataset.inputBind = glyphInputBindId;
		button.classList.add('button');
		button.value = letter;
		button.addEventListener('click', function () { glyphOnClick(this as unknown as HTMLButtonElement) });

		span.classList.add('glyph', 'icon', 'is-small');
		span.innerText = letter;

		button.appendChild(span);
		return button;
	}
}

/**
 * Handles the onclick event of a glyph button.
 *
 * @param {HTMLButtonElement} button - The button that was clicked
 * @returns {void}
 */
function glyphOnClick(button: HTMLButtonElement) {
	const glyphInputBindId: string = button?.dataset?.inputBind ?? '';
	const input = globalElements.input[glyphInputBindId] as HTMLInputElement
		?? document.getElementById(glyphInputBindId) as HTMLInputElement
		?? button?.closest('.tableHeader')?.previousElementSibling?.querySelector('input') as HTMLInputElement;
	const portalCode = input.value;

	if (portalCode.length < 12) {	// NoSonar complete portal glyph length
		(input).value += button.value;
	}
	triggerEvent(input, 'input');
}

/**
 * Displays the portal glyphs based on the user's input, and also updates the wiki code and glyph region on the page.
 *
 * @returns {void}
 */
export function displayGlyphs() {
	const input = globalElements.input.portalglyphsInput as HTMLInputElement;
	const glyphString = input.value;
	pageData.portalglyphs = glyphString;
	const dest = input.dataset.destNoauto;
	wikiCode(glyphString, dest);
	glyphRegion(glyphString);
  glyphGalaxy(glyphString);
	if (getDestElements('galacticCoords').length) wikiCode(glyphs2Coords(glyphString), 'galacticCoords')
}

/**
 * Removes the last character from a given input field, updates the value of the field, and executes `triggerEvent` with the updated input field.
 *
 * @param {HTMLElement} button - The button element clicked to invoke this function.
 * @returns {void} - This function does not return a value.
 */
export function deleteCharacter(button: HTMLButtonElement | undefined = undefined) {
	const input = button?.dataset?.inputBind ?? '';
	const glyphInput = (() => {
		if (input) {
			return globalElements.input[input] as HTMLInputElement
				?? document.getElementById(input) as HTMLInputElement;
		} else if (button) {
			return button.closest('.table-cell')?.nextElementSibling?.querySelector('input') as HTMLInputElement;
		} else {
			return globalElements.input.portalglyphsInput as HTMLInputElement;
		}
	})();
	const enteredGlyphs = glyphInput.value?.split('');
	enteredGlyphs.pop();
	const newString = enteredGlyphs.join('');
	(glyphInput).value = newString;
	triggerEvent(glyphInput, 'input');
}

/**
 * This function handles the `oninput` event for the input field for glyph values.
 *
 * @param {HTMLInputElement} input - The input field element for glyph values
 * @returns {void}
 */
export function glyphInputOnChange(input: HTMLInputElement) {
	// Converts the value of the input field to uppercase
	const newValue = input?.value?.toUpperCase?.();
	if (newValue == null) return;

	// Sets the input field value to the validated glyph value
	input.value = validateGlyphInput(newValue);
}

/**
 * This function validates a string of portal glyphs by filtering out invalid characters and truncating the result to 12 characters or less.
 *
 * @param {string} glyphString - The string of portal glyphs to validate
 * @returns {string} The validated string of portal glyphs
 */
export function validateGlyphInput(glyphString: string): string {
	// Filters out invalid characters and truncates the result to 12 characters or less
	return glyphString
		.split('')
		.filter(char => validPortalKeys.includes(char))
		.join('')
		.substring(0, 12);		// NoSonar max glyph length
}

export function validateGlyphs(glyphs: string, list: any) {
	if (glyphs.length !== 12) return '';
	const glyphsExtracted = glyphs.substring(4);
	return list[glyphsExtracted];
}

export function glyphHandler(glyphs: string, list: any, type: string) {
	const glyphElement = globalElements.input.portalglyphsInput;
	let item = '';
	if (glyphs?.length == 12) {
		item = validateGlyphs(glyphs, list);
	}
	glyphError(item, glyphElement as HTMLElement);
	wikiCode(item ?? '', type);
}

export function glyphRegion(glyphs: string) {
	glyphHandler(glyphs, regions, 'region');
}

export function glyphGalaxy(glyphs: string) {
	glyphHandler(glyphs, galaxies, 'galaxy');
}

export function glyphError(item: string | undefined, glyphElement: HTMLElement) {
	errorMessage(glyphElement,
		(item === undefined)
    ? 'Los glifos introducidos no forman parte de la RSS. Consulte <i><a href="https://nomanssky.fandom.com/es/wiki/Regiones_RSS" target="_blank" rel="noopener noreferrer">regiones RSS</a></i> para obtener una lista de regiones válidas'
    : '');
}

/**
 * Converts a glyph string to coordinates.
 * @param {string} glyphs - A string of glyphs representing coordinates.
 * @returns {string} A string of coordinates in the format "XXXX:YYYY:ZZZZ:SSSS".
 */
export function glyphs2Coords(glyphs: string) {
	if (glyphs.length != 12) return '';		// NoSonar complete portal glyph length

	const X_Z_POS_SHIFT = 2049;
	const X_Z_NEG_SHIFT = 2047;
	const Y_POS_SHIFT = 129;
	const Y_NEG_SHIFT = 127;

	const x_glyphs = parseInt(glyphs.substring(9, 12), 16);		// NoSonar X coordinate part
	const y_glyphs = parseInt(glyphs.substring(4, 6), 16);		// NoSonar Y coordinate part
	const z_glyphs = parseInt(glyphs.substring(6, 9), 16);		// NoSonar Z coordinate part
	const system_idx = glyphs.substring(1, 4);					// NoSonar system index part

	let coords_x = 0;
	let coords_y = 0;
	let coords_z = 0;

	if (x_glyphs >= X_Z_POS_SHIFT) {
		coords_x = x_glyphs - X_Z_POS_SHIFT;
	} else {
		coords_x = x_glyphs + X_Z_NEG_SHIFT;
	}

	if (z_glyphs >= X_Z_POS_SHIFT) {
		coords_z = z_glyphs - X_Z_POS_SHIFT;
	} else {
		coords_z = z_glyphs + X_Z_NEG_SHIFT;
	}

	if (y_glyphs >= Y_POS_SHIFT) {
		coords_y = y_glyphs - Y_POS_SHIFT;
	} else {
		coords_y = y_glyphs + Y_NEG_SHIFT;
	}

	const coordinates: Array<string> = [];
	const coordData = [coords_x, coords_y, coords_z];

	for (let i = 0; i < 3; i++) {		// NoSonar the 3 is to only get indices 0-2, since the logic for index 3 is different.
		coordinates[i] = coordData[i].toString(16).toUpperCase().padStart(4, '0');	// NoSonar the 16 is to convert to hex, the 4 is to bump it to a length of 4
	}

	coordinates[3] = system_idx.padStart(4, '0');	// NoSonar the 4 is to bump it to a length of 4

	return coordinates.join(':');
}