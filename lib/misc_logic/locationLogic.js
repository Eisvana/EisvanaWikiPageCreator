function planetMoon(moon = pageData.moon) {
	if (moon) {
		return 'moon';
	} else {
		return 'planet';
	}
}

function planetMoonSentence(planet = pageData.planet, moon = pageData.moon) {
	const dest = globalElements.output.celestialBody;
	const body = planetMoon(moon);
	const text = (() => {
		if (body == 'moon') {
			return `moon [[${sanitiseString(moon)}]]`;
		} else {
			return `planet [[${sanitiseString(planet)}]]`;
		}
	})();
	if (!dest) return text;
	dest.innerText = text;
}

// generates galaxy part of location sentence
function HubGal(civ) {
	switch (civ) {
		case "GHub":
			return '[[Galactic Hub]]';

		case "CalHub":
			return '[[Galactic Hub Calypso]], in the [[Calypso]] [[galaxy]]';

		case "EisHub":
			return '[[Galactic Hub Eissentam]], in the [[Eissentam]] [[galaxy]]';
	}
}

// returns the region number of a Hub region
function regNr(regionName) {
	function getHubNumber(regionName) {
		for (const Hub in regions) {
			const hubRegions = regions[Hub];
			const index = Object.values(hubRegions).findIndex(region => region == regionName);
			if (Hub == 'GHub' && index > 10) return 'Huburb';
			if (index != -1) return index + 1;
		}
	}

	const hubNr = getHubNumber(regionName);
	if (hubNr == 'Huburb') {
		return ', Huburb';
	} else {
		return ` (HUB${hubNr})`;
	}
}