function startupFunctions() {
	regionLong();
	merchantUpgrades();
	hideOrgName();
	docByExternal();
	loc();
	//	planetInputs();
}

const systemElements = {
	input: {
		terminalInputs: 'terminalInputs',
	},
	output: {
		tradeTerminal: 'tradeTerminal',
		planets: 'planets',
	}
}
updateGlobalElements(systemElements);

const systemElementFunctions = {
	civ: ['loc(); regionLong()', null, true],
	portalglyphsInput: ['loc(); regionLong()', null, true],
	planetInput: ['numberStats(this); planetInputs()'],
	moonInput: ['numberStats(this); planetInputs()'],
	oldNameInput: ['hideOrgName()'],
	platformInput: ['docByExternal()'],
	docDateInput: ['docByExternal()'],
	discDateInput: ['docByExternal()'],
	distanceInput: ['numberStats(this)'],
	economysellInput: ['numberStats(this)'],
	economybuyInput: ['numberStats(this)'],
}
assignElementFunctions(systemElementFunctions);

function loc() {
	const region = pageData.region;
	const civ = pageData.civShort;
	const HubNr = regNr(region);
	const galaxy = HubGal(civ);

	const output = `Located in the [[${region}]] [[region]]${HubNr} of the ${galaxy}.`;

	wikiCode(output, 'loc');
}

function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

// inserts the planet table into the code
function planetInputs() {
	const inputTarget = globalElements.input.waterInput.parentElement.previousElementSibling;
	const outputTarget = globalElements.output.planets;
	const planetNr = pageData.planet;
	const moonNr = pageData.moon;
	const bodies = clamp(parseInt(planetNr) + parseInt(moonNr), 2, 6);

	function clamp(value, min, max) {
		return Math.max(min, Math.min(max, value));
	}

	function diff() {
		const planetIDs = new Set();
		const planets = (() => {
			const elements = document.querySelectorAll('[data-planet]');
			for (const element of elements) {
				planetIDs.add(element.dataset.planet);
			}
			return Array.from(planetIDs).length;
		})();
		const diff = bodies - planets;		// positive if we need to add sections, negative if we need to delete sections
		return diff;
	}

	const childtree = document.querySelectorAll('[data-planet]');
	const IDs = [0];	// dummy element to avoid if statement
	const regex = /[0-9]/g;		// match all numbers from 0-9 in the given string
	for (const child of childtree) {
		const idNumber = child.dataset.planet.match(regex).join('');	// get all numbers of the string into an array, then join that array
		IDs.push(parseInt(idNumber));
	}
	function compareNumbers(a, b) {
		return a - b;
	}
	IDs.sort(compareNumbers);
	let childIndex = IDs[IDs.length - 1] + 1;

	while (diff() != 0) {
		if (diff() > 0) {
			addPlanet(childIndex);
			childIndex++;
		} else {
			removePlanet();
		}
	}

	function removePlanet() {
		const elements = document.querySelectorAll('[data-planet]');
		const planetIDs = new Set();
		for (const element of elements) {
			planetIDs.add(element.dataset.planet);
		}
		const sectionName = Array.from(planetIDs).pop();
		const section = document.querySelectorAll(`[data-planet="${sectionName}"]`);
		removeSection(section);
	}

	function addPlanet(i) {
		const inputTemplate = `<div class="tableHeader text" data-planet="planet${i}" text-align: center">
			Planet ${i}
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label for="planetName_input${i}">Planet name</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
			<input type="text" id="planetName_input${i}" oninput="document.getElementById('planetName${i}').innerText = this.value">
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label for="planetFile_input${i}">Planet file name</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
				<input type="text" id="planetFile_input${i}" data-dest="planetFile${i}">
				<input type="file" id="mainFileUpl${i}" accept="image/*" oninput="image(this)">
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label for="landscapeFile_input${i}">Landscape file name</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
				<input type="text" id="landscapeFile_input${i}" data-dest="landscapeFile${i}">
				<input type="file" id="secFileUpl${i}" accept="image/*" onchange="img(this)">
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label>Biome</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
				<select id="biome_input${i}" data-dest="biome${i}">
					<option value="Lush">Lush</option>
					<option value="Barren">Barren</option>
					<option value="Dead">Dead</option>
					<option value="Exotic">Exotic</option>
					<option value="Mega Exotic">Mega Exotic</option>
					<option value="Scorched">Scorched</option>
					<option value="Frozen">Frozen</option>
					<option value="Toxic">Toxic</option>
					<option value="Irradiated">Irradiated</option>
					<option value="Marsh">Marsh</option>
					<option value="Volcanic">Volcanic</option>
				</select>
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label for="infested_input${i}">Is infested</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
			<input type="checkbox" id="infested_input${i}" onchange="if (this.checked) {this.value='([[Biome Subtype - Infested|Infested]]) '} else {this.value = ''}; document.getElementById('infested${i}').innerHTML = this.value">
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label for="descriptor_input${i}">Planet description</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
			<input type="text" id="descriptor_input${i}" data-dest-noauto="descriptor${i}">
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label for="resource_input${i}1">Resource 1</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
			<input type="text" id="resource_input${i}1" data-dest-noauto="resource${i}1">
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label for="weather_input${i}">Weather</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
			<input type="text" id="weather_input${i}" oninput="document.getElementById('weather${i}').innerText = this.value">
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label for="sentinel_input${i}">Sentinels</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
			<input type="text" id="sentinel_input${i}" oninput="document.getElementById('sentinel${i}').innerText = this.value">
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label for="flora_input${i}">Flora</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
			<input type="text" id="flora_input${i}" oninput="document.getElementById('flora${i}').innerText = this.value">
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label for="fauna_input${i}">Fauna</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
			<input type="text" id="fauna_input${i}" oninput="document.getElementById('fauna${i}').innerText = this.value">
		</div>
		<div class="tableCell text" data-planet="planet${i}">
			<label for="faunatotal_input${i}">Number of Fauna</label>
		</div>
		<div class="tableCell data" data-planet="planet${i}">
			<input type="number" id="faunatotal_input${i}" min="0" oninput="textFunctionMultiple('FaunaTotal${i}', 'faunatotal_input${i}')">
		</div>`

		const planetTemplate = `<div data-planet="planet${i}" id="body${i}"><div>|-</div>
        <div>|[[File:<output id="planetFile${i}"></output>|150px]]</div>
        <div>|[[File:<output id="landscapeFile${i}"></output>|150px]]</div>
        <div>|[[<output id="planetName${i}"></output>]]</div>
        <div>|{{Biome|<output id="biome${i}"></output>}} <output id="infested${i}"></output>- <output id="descriptor${i}"></output></div>
        <div>|<output id="resource${i}1"></output><output id="resource${i}2"></output><output id="resource${i}3"></output><output id="resource${i}4"></output><output id="resource${i}5"></output></div>
        <div>|<output id="weather${i}"></output></div>
        <div>|<output id="sentinel${i}"></output></div>
        <div>|<output id="flora${i}"></output></div>
        <div>|<output id="fauna${i}"></output> (<output id="faunaTotal${i}" name="FaunaTotal${i}"></output>)</div>
        <div>|-</div>
        <div>!style="background-color:#2f4f4f"|Notes:</div>
        <div>|colspan=8 style="text-align:left"|'''100% Zoology Bonus:''' {{FaunaTotal|<output id="faunaTotalNotes${i}" name="FaunaTotal${i}"></output>}} {{nanites}}</div></div>`

		inputTarget.insertAdjacentHTML('beforebegin', inputTemplate);
		outputTarget.insertAdjacentHTML('beforeend', planetTemplate);
	}
}


// shows or hides the resource inputs for the planet table
function hideResource(currentResource, nextResource) {
	if (currentResource.value == '') {
		const idObj = new Object;
		for (i = 1; i <= 6; i++) {
			const key = 'resource_input' + i.toString()
			const resArr = [];
			for (j = 2; j <= 5; j++) {
				const value = 'resource_input' + i.toString() + j.toString()
				resArr.push(value)
			}
			idObj[key] = []
			for (const resource of resArr) {
				idObj[key].push(resource)
			}
		}
		const currentId = currentResource.id;
		const key = currentId.substring(0, currentId.length - 1);
		const searchArr = idObj[key];
		let index = searchArr.indexOf(currentId)

		for (i = index; i < searchArr.length; i++) {
			const target = searchArr[i]
			document.getElementById(target).value = ''
			document.getElementById(target).parentElement.parentElement.style.display = 'none'
		}
	} else {
		if (nextResource == undefined) return
		document.getElementById(nextResource).parentElement.parentElement.style.display = ''
	}
}

function displayResource(resource_input, resourceCodeId) {
	if (resource_input.value == '') {
		document.getElementById(resourceCodeId).style.display = 'none'
	} else {
		document.getElementById(resourceCodeId).style.display = ''
		document.getElementById(resourceCodeId).innerHTML = '&lt;br&gt;' + resource_input.value
	}
}

// generates Space Station Merchants upgrade list
function merchantUpgrades(group = null) {
	const checkboxes = document.querySelectorAll('[data-dest-checkbox-group]');
	if (group) {
		getCheckedBoxes(group);
		return;
	}

	// if the checkboxes have no onchange event (i.e. at page load), assign them one
	const merchants = new Set();
	for (const checkbox of checkboxes) {
		if (!checkbox.onchange) assignFunction(checkbox, 'merchantUpgrades(this.dataset.destCheckboxGroup)');
		merchants.add(checkbox.dataset.destCheckboxGroup);
	}
	for (const merchant of merchants) {
		getCheckedBoxes(merchant);
	}
	return;

	function getCheckedBoxes(group) {
		const checkboxes = document.querySelectorAll(`[data-dest-checkbox-group="${group}"]`);
		const parm = (group.substring(0, 2) == 'SD') ? '' : group.substring(0, 2);
		const checked = new Array;
		for (const checkbox of checkboxes) {
			if (checkbox.checked) checked.push(checkbox.value);
		}

		const code = new Array;
		for (let i = 1; i <= checked.length; i++) {
			const output = `| ${parm}${i}=${checked[i - 1]}`;
			code.push(output);
		}
		wikiCode(code.join('\n'), group);
		const wrapper = globalElements.output[group].closest('.codeWrapper');
		if (!wrapper) return;		// return if not scrap dealer
		if (code.length == 0) {
			wrapper.style.display = 'none';
		} else {
			wrapper.style.display = '';
		}
	}
}

function tradeables() {
	const inputSection = globalElements.input.terminalInputs;
	const outputSection = globalElements.output.tradeTerminal;
	const childtree = document.querySelectorAll('[data-tradeable]');
	const IDs = [0];	// dummy element to avoid if statement
	const regex = /[0-9]/g;		// match all numbers from 0-9 in the given string

	for (const child of childtree) {
		const idNumber = child.dataset.tradeable.match(regex).join('');		// get all numbers of the string into an array, then join that array
		IDs.push(parseInt(idNumber));
	}
	function compareNumbers(a, b) {
		return a - b;
	}
	IDs.sort(compareNumbers);
	const childIndex = IDs[IDs.length - 1] + 1;
	const price = 'price' + childIndex;
	const text = 'text' + childIndex;
	const text_input = 'text_input' + childIndex;
	const price_input = 'price_input' + childIndex;

	const inputHTML = `<div class="tableHeader text sectionToggle" data-tradeable="section${childIndex}">
		<span class="has-text-weight-bold">Tradeable</span>
		<button class="button is-danger is-outlined" type="button" onclick="removeSpecificSection('section${childIndex}', 'tradeable')">Remove</button>
	</div>
	<div class="tableCell text" data-tradeable="section${childIndex}">
		<label for="${text_input}">Tradeable name:</label>
	</div>
	<div class="tableCell data" data-tradeable="section${childIndex}">
	<input type="text" list="terminal" id="${text_input}" data-dest="${text}">
	</div>
	<div class="tableCell text" data-tradeable="section${childIndex}">
		<label for="${price_input}">Tradeable price:</label>
	</div>
	<div class="tableCell data" data-tradeable="section${childIndex}">
		<input type="text" id="${price_input}" data-dest-noauto="${price}">
	</div>`;

	const codeHTML = `<div data-tradeable="section${childIndex}">|-</div>
	<div data-tradeable="section${childIndex}">| {{ilink|<output id="${text}"></output>}} || {{Units}} <output id="${price}"></output></div>`;

	inputSection.insertAdjacentHTML('beforebegin', inputHTML);
	outputSection.insertAdjacentHTML('beforeend', codeHTML);

	const inputs = document.querySelectorAll(`[data-tradeable="section${childIndex}"] input[data-dest]`);
	for (const input of inputs) {
		assignFunction(input, 'wikiCode(this)');
	}
	const noautoInputs = document.querySelectorAll(`[data-tradeable="section${childIndex}"] input[data-dest-noauto]`);
	for (const input of noautoInputs) {
		assignFunction(input, 'storeData(this); numberStats(this)');
	}
}

function resetExternal() {
	const tradeables = document.querySelectorAll('[data-tradeable]');
	removeSection(tradeables);
}

function regionLong() {
	const region = pageData.region;
	const output = (() => {
		if (region.split(' ').length == 1) return region + ' region';
		return region;
	})();
	globalElements.output.regionLong.innerText = output;
}