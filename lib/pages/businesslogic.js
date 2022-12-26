// fallback to dropdown for pages with no glyphs
function updateRegions(civ_inputId, region_inputId) {
	const civ = document.getElementById(civ_inputId).value;
	document.getElementById(region_inputId).innerHTML = '';
	switch (civ) {
		case "GHub":
			setDropdownOptions(GHubRegions, region_inputId);
			break;

		case "CalHub":
			setDropdownOptions(CalHubRegions, region_inputId);
			break;

		case "EisHub":
			setDropdownOptions(EisHubRegions, region_inputId);
			break;
	}
}

// replaces HubCoin with the HubCoin link macro
function fixHC(inputId) {
	const input = document.getElementById(inputId).value.toLowerCase();
	if (input === 'hubcoin') {
		document.getElementById(inputId).value = '{{CurrencyHubCoin}}';
	}
}

// removes specific section
function addSection(input_sectionId, code_sectionId) {
	const inputSection = document.getElementById(input_sectionId);
	const childtree = inputSection.children;
	const IDs = [0];	// dummy element to avoid if statement
	for (const child of childtree) {
		IDs.push(parseInt(child.getAttribute("name").substring(7)))
	}
	function compareNumbers(a, b) {
		return a - b;
	}
	IDs.sort(compareNumbers);
	const childIndex = IDs[IDs.length - 1] + 1
	const heading = 'heading' + childIndex
	const img = 'img' + childIndex
	const text = 'text' + childIndex

	const heading_input = 'heading_input' + childIndex
	const img_input = 'img_input' + childIndex
	const img_upload = 'img_upload' + childIndex
	const text_input = 'text_input' + childIndex

	const input_template = `<tr name="section${childIndex}">
	<td colspan="2">
		<output name=${heading}></output> - <button type="button" onclick="removeSection('section${childIndex}')">Remove</button>
	</td>
	</tr>
	<tr name="section${childIndex}">
		<th>
			<label for="${heading_input}">Section heading:</label>
		</th>
		<td>
			<input type="text" id="${heading_input}" oninput="textFunctionMultiple('${heading}', '${heading_input}')">
		</td>
	</tr>
	<tr name="section${childIndex}">
	<th><label for="${img_input}">Image name, including file extension:</label>
	<td>
		<input type="text" id="${img_input}" oninput="textFunction('${img}', '${img_input}'); (this.value != '' ? document.getElementById('${img}').parentElement.style.display = '' : document.getElementById('${img}').parentElement.style.display = 'none')">
		<br>
		<input type="file" id="${img_upload}" accept="image/*" onchange="imgUpload('${img}', '${img_upload}', '${img_input}')">
	</td>
</tr>
<tr class="no-border" name="section${childIndex}">
<th style="vertical-align:top" colspan="2"><label for="${text_input}">Content</label>
</tr>
<tr name="section${childIndex}">
<td colspan="2">
	<textarea style="margin-bottom:10px" id="${text_input}" oninput="textAreaFunction('${text}', '${text_input}')"></textarea>
</td>
</tr>`

	const code_template = `<div name="section${childIndex}">==<output name="${heading}"></output>==</div>
	<div style="display:none" name="section${childIndex}">[[File:<output id="${img}"></output>|thumb]]</div>
	<div name="section${childIndex}"><output id="${text}"></output><br><br></div>`

	document.getElementById(input_sectionId).insertAdjacentHTML("beforeend", input_template);
	document.getElementById(code_sectionId).insertAdjacentHTML("beforeend", code_template);
}

// adds section to input and code
function removeSection(sectionName) {
	while (document.getElementsByName(sectionName).length != 0) {
		const sections = document.getElementsByName(sectionName);
		for (const section of sections) {
			section.remove();
		}
	}
}