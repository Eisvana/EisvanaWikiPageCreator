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
	pageData.portalglyphs = glyphString;
	for (const output of globalElements.output.portalglyphs) {
		output.innerText = glyphString;
	}
	glyphRegion(glyphString);
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
		.substring(0, 12);
	displayGlyphs()
}

function glyphRegion(glyphs) {
	const glyphElement = globalElements.input.portalglyphsInput;
	const regionOut = globalElements.output.region;
	const civ = globalElements.input.civ.value;
	const regionList = regions[civ];
	let region = '';
	if (glyphs?.length == 12) {
		const regionGlyphs = glyphs.substring(4);
		region = regionList[regionGlyphs];
	}
	if (region == undefined) {
		regionOut.style.backgroundColor = 'red';
		region = 'No valid Hub region'
		glyphElement.style.backgroundColor = 'red'
		pageData.region = '';
	} else {
		regionOut.style.backgroundColor = '';
		glyphElement.style.backgroundColor = ''
		pageData.region = region;
	}
	regionOut.innerText = region;
}