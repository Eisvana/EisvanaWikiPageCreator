const celestialObjectElementFunctions = {
	docDateInput: ['docByExternal()'],
	discDateInput: ['docByExternal()'],
}
assignElementFunctions(celestialObjectElementFunctions);

function plural(number) {
	if (number == 1) return 'is';
	return 'are';
}

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

// constructs location sentence
function locationSentence() {
	const systemName = pageData.system;
	const regionName = pageData.region;
	const civ = pageData.civShort;

	const output = `It can be found in the [[${systemName}]] [[star system]] in the [[${regionName}]] [[region]] (HUB${getHubNumber(regionName)}) of the ${HubGal(civ)}.`;

	globalElements.output.location.innerText = output;
}

function sentinelSentence() {
	const sentDescriptor = pageData.sentinel;
	const sentLevel = (() => {
		for (const level in sentinels) {
			if (sentinels[level].includes(sentDescriptor)) return level;
		}
	})();

	const output = `[[Sentinel]] activity on this ${pageData.pageType} is classified as: ''${sentDescriptor}''. The sentinels ${(sentLevel == 'aggressive') ? 'do' : "don't"} present an immediate threat.`;
	globalElements.output.sentinelSentence.innerText = output;
}