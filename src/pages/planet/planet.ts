/**
 * @fileoverview Provides functions which can be used by the Planet page creator.
 */

import { removeSpecificSection, sanitiseString, wikiCode } from "../../common";
import { plural } from "../../miscLogic/planetMoonLogic";
import { globalElements, pageData } from "../../variables/objects";

/**
 * Add a new section for adding a moon to a planet.
 * @param {HTMLElement} element - The element that triggered the addition of the moon section.
 * @returns {void}
 */
export function addMoon(element: HTMLButtonElement) {
	const inputSection = element.parentElement;
	const elementList = document.querySelectorAll('[data-moon]');
	const childIndex = getChildIndex(elementList, 'dataset.moon');
	const moon_input = 'moon_input' + childIndex;

	const div1 = document.createElement('div');
	const div2 = document.createElement('div');
	const button = document.createElement('button');
	const label = document.createElement('label');
	const input = document.createElement('input');

	div1.classList.add('tableCell', 'text', 'removable');
	div1.dataset.moon = 'section' + childIndex;

	button.classList.add('button', 'is-outlined', 'is-danger', 'icon', 'is-small');
	button.type = 'button';
	button.innerHTML = '&#10006';
	button.addEventListener('click', () => { removeSpecificSection('section' + childIndex, 'moon'); enableMoonAdd() });

	label.htmlFor = moon_input;
	label.innerText = 'Moon name:';

	input.type = 'text';
	input.id = moon_input;
	input.addEventListener('input', () => moonList());

	div1.appendChild(button);
	div1.appendChild(label);

	div2.appendChild(input);

	inputSection.insertAdjacentElement('beforebegin', div1);
	inputSection.insertAdjacentElement('beforebegin', div2);

	const moonInputSectionCount = document.querySelectorAll('[data-moon]').length / 2;	// NoSonar there are two sections for every moon (I guess...?)

	// enter the number of sections you want to allow behind the ">" operator.
	if (moonInputSectionCount + 1 > 2) {	// NoSonar 2 moons is maximum
		element.disabled = true;
	}
}

/**
 * Enables the add button for moonInputs and triggers the moonList function
 * @function
 * @returns {void}
 */
export function enableMoonAdd() {
	const addButton = globalElements.input.moonInputs.querySelector('button');
	addButton.disabled = false;
	moonList();
}

/**
* Populates the moon list in the output with the current values of the moonInputs.
* @function moonList
* @returns {undefined}
*/
export function moonList() {
	const moonInputs = document.querySelectorAll('[data-moon] input');
	const moons = [];
	for (const input of moonInputs) {
		if (input.value) moons.push(`[[${sanitiseString(input.value)}]]`);
	}

	globalElements.output.moonList.innerText = moons.join(', ');
	pageData.moons = moons;
	moonSentence()
}

/**
 * Generates a sentence describing the moons of the current planet.
 * @function
 * @returns {string} - Sentence describing the planet's moons.
 */
function moonSentence() {
	const output = (() => {
		const moons = pageData.moons;
		if (!moons || moons.length == 0) {
			return `This planet has no moons.`;
		} else {
			const moonCount = moons.length;
			return `This planet's [[moon]]${(moonCount > 1) ? 's' : ''} ${plural(moonCount)} ${moons.join(' and ')}.`;
		}
	})();
	wikiCode(output, 'moonSentence');
}