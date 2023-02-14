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

// generates discovered section sentences
function docByExternal() {
	const discovered = pageData.discovered;
	const discoveredlink = pageData.discoveredlink;
	const documenter = pageData.docby;
	const platform = (pageData.platform == 'NS') ? 'Switch' : pageData.platform;
	const civilized = pageData.civilized;

	function formatDate(date) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const simpleDate = date.replaceAll('-', '/');
		const dateObj = new Date(simpleDate);
		return dateObj.toLocaleString('en-UK', options);
	}
	const discDate = formatDate(pageData.discDate);
	const docDate = formatDate(pageData.docDate);

	const documented = formatName(documenter);

	const research = (() => {
		const chapterSentence = displayResearch();
		if (chapterSentence == civilized || !chapterSentence) return platform + ' explorer';
		return chapterSentence;
	})();

	const discoverer = (() => {
		if (!discoveredlink) {
			return formatName(discovered);
		} else {
			return `{{profile|${discoveredlink}}}`;
		}
	})();

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

// add % to e-sell/buy
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

function autoInfested(element = globalElements.input.descriptionInput) {
	const descriptorData = getDescriptorData().Infested;
	const infestedDescriptors = new Array;
	for (const list in descriptorData) {
		infestedDescriptors.push(...descriptorData[list]);
	}

	// true: system. false: planet/moon
	const isInfested = infestedDescriptors.includes(element.value);
	if (pageData.pageType == 'System') return isInfested;

	document.getElementById('infested').innerText = isInfested ? '([[Biome Subtype - Infested|Infested]]) ' : '';
}

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