import { assignDefaultValue, displayResearch, forceDatalist, formatName, numberError, numberStats, storeData, wikiCode, wikiCodeSimple } from "../common";
import { getDescriptorData } from "../datalists/planetDatalists";
import { assignFunction } from "../commonElements/elementBackend/elementFunctions";
import { globalElements, pageData } from "../variables/objects";
import { autoWorm, planetDescriptor } from "./planetMoonLogic";

/**
 * @fileoverview Functions that can be used by Planet, Moon and System pages
 */

/**
 * Generates discovered section sentences
 * @function
 * @returns {void}
 */
export function docByExternal() {
	const { discovered, discoveredlink, docby: documenter } = pageData;
	const platform = (pageData.platform === 'NS') ? 'Switch' : pageData.platform;

	const discDate = formatDate(pageData.discDate as string);
	const docDate = formatDate(pageData.docDate as string);

	const documented = formatName(documenter as string);

	/**
	 * Determines the research chapter sentence to use
	 * @function
	 * @returns {string} The research chapter sentence to use
	 */
	const research = (() => {
		const chapterSentence = displayResearch();
		if (chapterSentence && chapterSentence !== 'Eisvana') return chapterSentence;
		return '';
	})();

	/**
	 * Formats the name of the discoverer
	 * @function
	 * @returns {string} The formatted name of the discoverer
	 */
	const discoverer = (() => {
		if (!discoveredlink) {
			return formatName(discovered as string);
		} else {
			return `{{profile|${discoveredlink}}}`;
		}
	})();

	/**
	 * Formats and generates sections to be used in the explorer string
	 * @function
	 * @returns {string} The final generated explorer string
	 */
	const explorer = (() => {
		if (!documenter || documenter === discovered || documenter === discoveredlink) {
			return `Discovered and uploaded by ${research} ${discoverer} on ${discDate}`
		} else {
			return `* Discovered and uploaded by ${platform ? platform + ' explorer' : ''} ${discoverer} on ${discDate}
			* Explored and documented by ${research} ${documented} on ${docDate}`
		}
	})();
	const outputElement = globalElements.output.docby as HTMLOutputElement;
	outputElement.style.display = explorer ? '' : 'none';
	outputElement.innerText = explorer;


	/**
	 * Formats a given date to be in the format 'Month Day, Year'
	 * @function
	 * @param {string} date - The date to format in the format 'YYYY-MM-DD'
	 * @returns {string} The formatted date in the format 'Month Day, Year'
	 */
	function formatDate(date: string) {
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
		const simpleDate = date.replaceAll('-', '/');
		const dateObj = new Date(simpleDate);
		return dateObj.toLocaleString('en-UK', options);
	}
}

/**
* Add percentage sign to e-sell/buy property data for wikiCode output.
* @param {HTMLElement|null} element - the element to apply percentage formatting to.
*/
export function wikiCodePercentage(element: HTMLInputElement | null = null, decimals: number = 0) {
	if (!element) {
		const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-percentage-input]');
		for (const input of Array.from(inputs)) {
			wikiCodePercentage(input, decimals);
		}
		return;
	}
	const dest = element.dataset.destNoauto as string;
	const propertyValue = element.value;
	const propertyData = numberError(element, propertyValue, decimals);
	wikiCode(propertyData ? propertyData + '%' : '', dest);
}

/**
 * Determines whether or not the given element is infested, and updates the page accordingly.
 *
 * @param {HTMLElement} [element=globalElements.input.descriptionInput] - The element to check for infestation.
 * @return {boolean} - If on a System page, returns true if the element is Infested, false otherwise. If on a Planet/Moon page, updates the output text and pageData object accordingly, and returns nothing.
 */
export function autoInfested(element: HTMLInputElement = globalElements.input.descriptionInput as HTMLInputElement): boolean | void {
	const descriptorData = getDescriptorData().Infested;
	const infestedDescriptors: Array<string> = [];
	for (const list in descriptorData) {
		infestedDescriptors.push(...descriptorData[list]);
	}

	// true: system. false: planet/moon
	const isInfested = infestedDescriptors.includes(element.value.trim());
	if (pageData.pageType === 'system') return isInfested;

	(globalElements.output.infested as HTMLOutputElement).innerText = isInfested ? '([[Biome Subtype - Infested|Infested]]) ' : '';
	pageData.infested = isInfested;
	planetDescriptor(element);
	autoWorm(isInfested);
}

/**
* Builds a descriptor for a planet based on its planet class.
* @param {string} descriptor - The descriptor to be used in the construction of the planet's name.
* @param {string} planetClass - The classification of the planet, which will be incorporated into the constructed name.
* @param {string} filler - A string to be added between the planet class and the descriptor for added emphasis in the name.
* @returns {string} The constructed name for the planet.
*/
export function buildDescriptor(descriptor: string, planetClass: string, filler: string): string {
	const data = getDescriptorData();
	const section = (() => {
		for (const biome in data) {
			for (const list in data[biome]) {
				if (data[biome][list]?.includes?.(descriptor.trim())) return list;
			}
		}
		return '';		// this is just a catch so TS doesn't complain
	})();
	switch (section) {
		case 'prefix':
			return planetClass + filler + descriptor.trim();

		case 'suffix':
			return descriptor.trim() + filler + planetClass;

		default:
			return descriptor.trim();
	}
}

/**
 * Initialise form input fields.
 * @param {string} sectionSelector - CSS selector for the input fields to initialise.
 * @returns {void}
 */
export function initialiseSectionInputs(sectionSelector: string) {
	const inputs: NodeListOf<HTMLInputElement | HTMLSelectElement> = document.querySelectorAll(`${sectionSelector} :is(input, select)`);
	for (const input of Array.from(inputs)) {
		if (input.dataset.dest) {
			assignFunction({ element: input, func: function () { wikiCode(this as unknown as HTMLInputElement | HTMLSelectElement) } });
			wikiCode(input);
		}
		if (input.dataset.destNoauto) {
			assignFunction({ element: input, func: function () { storeData(this as unknown as HTMLInputElement | HTMLSelectElement) } });
			storeData(input);
		}
		if (input.dataset.default) {
			assignFunction({ element: input, func: function () { assignDefaultValue(this as unknown as HTMLInputElement | HTMLSelectElement) } });
			assignDefaultValue(input);
		}
		if (input.dataset.destSimple) {
			assignFunction({ element: input, func: function () { wikiCodeSimple(this as unknown as HTMLInputElement) } });
			wikiCodeSimple(input);
		}
		if (input.dataset.destNumber) {
			assignFunction({ element: input, func: function () { numberStats(this as unknown as HTMLInputElement, parseInt((this as unknown as HTMLInputElement).dataset.destNumber as string) || undefined) } });
			numberStats(input as HTMLInputElement, parseInt(input.dataset.destNumber) || undefined);
		}
		if ((input as HTMLInputElement).list) {
			assignFunction({ element: input, handler: 'change', func: function () { forceDatalist(this as unknown as HTMLInputElement) } });
		}
	}
}