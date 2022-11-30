function planetMoon() {
	const planetElement = globalElements.input.planetInput;
	const moonElement = globalElements.input.moonInput;
	const planet = planetElement.value;
	const moon = moonElement.value;
	const dest = globalElements.output.celestialBody;
	const text = (() => {
		if (moon) {
			return `moon [[${moon}]]`;
		} else {
			return `planet [[${planet}]]`;
		}
	})();
	dest.innerText = text;
}