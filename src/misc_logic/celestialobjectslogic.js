/**
 * @fileoverview Functions that can be used by Planet, Moon and System pages
 */
function celestialStartupFunctions() {
	hideOrgName();
	locationSentence();
}

const celestialObjectElementFunctions = {
	docDateInput: ['docByExternal()'],
	discDateInput: ['docByExternal()'],
	platformInput: ['docByExternal()'],
	oldNameInput: ['hideOrgName()'],
	civ: ['locationSentence()', null, true],
	portalglyphsInput: ['locationSentence()', null, true],
}
assignElementFunctions(celestialObjectElementFunctions);

/**
 * Generates discovered section sentences
 * @function
 * @returns {void}
 */
function docByExternal() {
	const discovered = pageData.discovered;
	const discoveredlink = pageData.discoveredlink;
	const documenter = pageData.docby;
	const platform = (pageData.platform == 'NS') ? 'Switch' : pageData.platform;
	const civilized = pageData.civilized;

	/**
	 * Formats a given date to be in the format 'Month Day, Year'
	 * @function
	 * @param {string} date - The date to format in the format 'YYYY-MM-DD'
	 * @returns {string} The formatted date in the format 'Month Day, Year'
	 */
	function formatDate(date) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const simpleDate = date.replaceAll('-', '/');
		const dateObj = new Date(simpleDate);
		return dateObj.toLocaleString('en-UK', options);
	}
	const discDate = formatDate(pageData.discDate);
	const docDate = formatDate(pageData.docDate);

	const documented = formatName(documenter);

	/**
	 * Determines the research chapter sentence to use
	 * @function
	 * @returns {string} The research chapter sentence to use
	 */
	const research = (() => {
		const chapterSentence = displayResearch();
		if (chapterSentence == civilized || !chapterSentence) return platform + ' explorer';
		return chapterSentence;
	})();

	/**
	 * Formats the name of the discoverer
	 * @function
	 * @returns {string} The formatted name of the discoverer
	 */
	const discoverer = (() => {
		if (!discoveredlink) {
			return formatName(discovered);
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
		if (!documenter || documenter == discovered || documenter == discoveredlink) {
			return `Discovered and uploaded by ${research} ${discoverer} on ${discDate}`
		} else {
			return `* Discovered and uploaded by ${platform} explorer ${discoverer} on ${discDate}
			* Explored and documented by ${research} ${documented} on ${docDate}`
		}
	})();
	globalElements.output.docby.innerText = explorer;
}

/**
* Add percentage sign to e-sell/buy property data for wikiCode output.
* @param {HTMLElement|null} element - the element to apply percentage formatting to.
*/
function wikiCodePercentage(element = null) {
	if (!element) {
		const inputs = document.querySelectorAll('[oninput*="wikiCodePercentage"]');
		for (const input of inputs) {
			wikiCodePercentage(input);
		}
		return;
	}
	const dest = element.dataset.destNoauto
	const propertyValue = pageData[dest];
	const propertyData = numberError(element, propertyValue);
	wikiCode(propertyData ? propertyData + '%' : '', dest);
}

/**
 * Determines whether or not the given element is infested, and updates the page accordingly.
 *
 * @param {HTMLElement} [element=globalElements.input.descriptionInput] - The element to check for infestation.
 * @return {Boolean} - If on a System page, returns true if the element is Infested, false otherwise. If on a Planet/Moon page, updates the output text and pageData object accordingly, and returns nothing.
 */
function autoInfested(element = globalElements.input.descriptionInput) {
	const descriptorData = getDescriptorData().Infested;
	const infestedDescriptors = new Array;
	for (const list in descriptorData) {
		infestedDescriptors.push(...descriptorData[list]);
	}

	// true: system. false: planet/moon
	const isInfested = infestedDescriptors.includes(element.value.trim());
	if (pageData.pageType == 'System') return isInfested;

	globalElements.output.infested.innerText = isInfested ? '([[Biome Subtype - Infested|Infested]]) ' : '';
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
function buildDescriptor(descriptor, planetClass, filler) {
	const data = getDescriptorData();
	const section = (() => {
		for (const biome in data) {
			for (const list in data[biome]) {
				if (data[biome][list]?.includes?.(descriptor.trim())) return list;
			}
		}
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
function initialiseSectionInputs(sectionSelector) {
	const inputs = document.querySelectorAll(`${sectionSelector} :is(input, select)`);
	for (const input of inputs) {
		if (input.dataset.dest) {
			assignFunction(input, 'wikiCode(this)');
			wikiCode(input);
		}
		if (input.dataset.destNoauto) {
			assignFunction(input, 'storeData(this)');
			storeData(input);
		}
		if (input.dataset.default) {
			assignFunction(input, 'assignDefaultValue(this)', null, true);
			assignDefaultValue(input);
		}
		if (input.list) {
			assignFunction(input, 'forceDatalist(this)', 'onchange');
		}
	}
}
