const celestialObjectElementFunctions = {
	docDateInput: ['docByExternal()'],
	discDateInput: ['docByExternal()'],
}
assignElementFunctions(celestialObjectElementFunctions);

// generates discovered section sentences
function docByExternal() {
	const discovered = pageData.discovered;
	const discoveredlink = pageData.discoveredlink;
	const documenter = pageData.docby;
	const platform = pageData.platform;
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