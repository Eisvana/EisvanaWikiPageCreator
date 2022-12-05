function planetMoon() {
	const planetElement = globalElements.input.planetInput;
	const dest = globalElements.output.celestialBody;
	if (!dest) return;
	const moonElement = globalElements.input.moonInput;
	const planet = planetElement.value;
	const moon = moonElement.value;
	const text = (() => {
		if (moon) {
			return `moon [[${sanitiseString(moon)}]]`;
		} else {
			return `planet [[${sanitiseString(planet)}]]`;
		}
	})();
	dest.innerText = text;
}

function HubGal(civ_inputId) {
	let text;
	let civilization = document.getElementById(civ_inputId).value;
	switch (civilization) {
		case "GHub":
			text = '[[Galactic Hub]]'
			break;

		case "CalHub":
			text = '[[Galactic Hub Calypso]], in the [[Calypso]] [[galaxy]]'
			break;

		case "EisHub":
			text = '[[Galactic Hub Eissentam]], in the [[Eissentam]] [[galaxy]]'
			break;
	}
	return text
}
