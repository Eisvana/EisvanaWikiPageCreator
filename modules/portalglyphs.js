const glyphs = new Array;
for (const letter of validPortalKeys) {
	const glyph = `<button type="button" class="button" value="${letter}" onclick="glyphOnClick(this)"><span class="glyph icon is-small">${letter}</span></button>`;
	glyphs.push(glyph);
}
globalElements.output.portalglyphButtons.innerHTML = glyphs.join('');

function glyphOnClick(button) {
	const input = globalElements.input.portalglyphsInput;
	const portalCode = input.value;

	if (portalCode.length < 12) {
		input.value += button.value;
	}
	displayGlyphs();
}

function displayGlyphs() {
	const glyphString = globalElements.input.portalglyphsInput.value;
	for (const output of globalElements.output.portalglyphs) {
		output.innerText = glyphString;
	}
}

function deleteCharacter() {
	const enteredGlyphs = globalElements.input.portalglyphsInput.value.split('');
	enteredGlyphs.pop();
	const newString = enteredGlyphs.join('');
	globalElements.input.portalglyphsInput.value = newString;
	displayGlyphs();
}

function glyphInputOnChange(input) {
	const newValue = input?.value?.toUpperCase?.();
	if (newValue == null) return;

	input.value = newValue
		.split('')
		.filter(char => validPortalKeys.includes(char))
		.join('')
		.substr(0, 12);
	displayGlyphs()
}
