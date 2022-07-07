const GHubRegions = {
	'F9556C30': 'The Arm of Vezitinen',
	'F9555C30': 'Canthian',
	'F9555C31': 'Dexterf Sector',
	'F9556C31': 'The Arm of Katteus',
	'F9557C31': 'Nugsdor Adjunct',
	'F9557C30': 'Uefert Nebula',
	'F9557C2F': 'Widraik',
	'F9556C2F': 'Airnaka Conflux',
	'F9555C2F': 'Sivess Instability',
	'FA556C30': 'Savenix Instability',
	'F8556C30': 'Nonlopsi Instability'
};
const CalHubRegions = {
	'F9556C30': 'Uisaor Spur',
	'F9555C30': 'The Arm of Kiffeyn',
	'F9555C31': 'Ilongl Cloud',
	'F9556C31': 'The Arm of Taticale',
	'F9557C31': 'Egerap Anomaly',
	'F9557C30': 'Wakestones Expanse',
	'F9557C2F': 'Erhahn Fringe',
	'F9556C2F': 'Imrikians Terminus',
	'F9555C2F': 'Imedeili',
	'FA556C30': 'Kovasu Adjunct',
	'F8556C30': 'Lossians Boundary'
};
const EisHubRegions = {
	'F9556C30': 'Riwala',
	'F9555C30': 'Omskio Instability',
	'F9555C31': 'Marcki',
	'F9556C31': 'Anolamga Spur',
	'F9557C31': 'Sea of Zonyayp',
	'F9557C30': 'Rayuyar Band',
	'F9557C2F': 'Umaton Instability',
	'F9556C2F': 'Exramb Adjunct',
	'F9555C2F': 'Ologowe Fringe',
	'FA556C30': 'Yatrifex',
	'FA555C30': 'Yeiada Sector',
	'FA555C31': 'Iptrevs Fringe',
	'FA556C31': 'Yamiraith Sector',
	'FA557C31': 'Wedragi Spur',
	'FA557C30': 'Rezhensk',
	'FA557C2F': 'Sobert Cloud',
	'FA556C2F': 'Umtats Anomaly',
	'FA555C2F': 'Tavill',
	'F8556C30': 'Qangew Expanse',
	'F8555C30': 'Nijhwal Boundary',
	'F8555C31': 'Usband Cluster',
	'F8556C31': 'Ejongaa Anomaly',
	'F8557C31': 'Zahrel Expanse',
	'F8557C30': 'The Arm of Fupand',
	'F8557C2F': 'Cuculta',
	'F8556C2F': 'Etmarao',
	'F8555C2F': 'Otreie Void'
};
const validPortalKeys = '0123456789ABCDEF'
const vocals = 'AEIOUaeiou'

// codeId	= id in div and spans in wikicode
// inputId	= id in input tags

// get text from input field
function getInput(inputId) {
	document.getElementById(inputId).value
}

// places something in the code
function setOutput(codeId, textToPut) {
	let text = sanitizeString(textToPut)
	document.getElementById(codeId).innerHTML = text
}

// get text from input fields
function textFunction(codeId, inputId) {
	let text = document.getElementById(inputId).value
	text = sanitizeString(text)
	document.getElementById(codeId).innerHTML = text
}

// clears value of an input
function clearValue(inputId) {
	document.getElementById(inputId).value = ''
}

// clears text of an element in the code
function clearText(codeId) {
	document.getElementById(codeId).innerHTML = ''
}

// removes wiki markup from a string
function sanitizeString(input) {
	let text = input.replaceAll('[', '')
		.replaceAll(']', '')
		.replaceAll('{', '')
		.replaceAll('}', '')
	return text
}

// resets all output text to null
function resetAll(galleryId) {

	const output = document.querySelectorAll('output');

	output.forEach((output, index) => {
		output.innerHTML = ''
	});

	let child = document.getElementById(galleryId)

	while (child.firstChild) {
		child.removeChild(child.firstChild);
	}
}

// resets one output
function resetOutput(codeId) {
	document.getElementById(codeId).value = ''
}

// get text from radio buttons (multiple choice buttons)
function radioFunction(codeId, inputId) {
	document.getElementById(codeId).innerHTML =
		document.querySelector(`[id^=${inputId}]:checked`).value
}

// copy text button, needs to be a div with id="wikiText"
function copyText(codeId, inputId) {
	let copyTextContent = document.getElementById(codeId).innerText
	navigator.clipboard.writeText(copyTextContent.replaceAll('\n\n\n', '\n\n'))

	document.getElementById(inputId).innerHTML = 'Copied!'
	setTimeout(() => {
		document.getElementById(inputId).innerHTML = 'Copy wikicode'
	}, 1500)
}

// converts the output of a date input function that's already in the document earlier to the format YYYY/MM/DD
function dateConvert(codeId) {
	let text = document.getElementById(codeId).innerHTML
	document.getElementById(codeId).innerHTML = text.replaceAll("-", "/")
}

// creates a wiki link for your page
function wikiLink(codeId, region_codeId, name_inputId) {

	let name = document.getElementById(name_inputId).value;
	name = sanitizeString(name);
	let region = document.getElementById(region_codeId).innerHTML;
	let a = document.getElementById(codeId);
	let link = 'https://nomanssky.fandom.com/wiki/Special:EditPage/' + name;
	if (name != '' && region != 'No valid Hub region' && region != '') {
		a.href = link;
		a.setAttribute('target', '_blank');
		a.setAttribute('rel', 'noopener noreferrer');
	} else {
		a.removeAttribute('href');
		a.className = 'button is-danger'
		if (name == '') {
			a.innerHTML = 'Missing name!'
		} else {
			a.innerHTML = 'Wrong glyphs!'
		}
		setTimeout(() => {
			a.className = 'button is-outlined is-primary'
			a.innerHTML = 'Create page'
		}, 1500)
	}
	//	setOutput(codeId, link);
}

// gets the current year
function currentYear(codeId) {
	document.getElementById(codeId).innerHTML = new Date().getFullYear();
}

function setDropDownOptions(options, dropdown) {
	for (const option in options) {
		el = document.createElement('option')
		el.value = options[option]
		el.innerHTML = options[option]
		el.id = option

		document.getElementById(dropdown).appendChild(el)
	}
}
 
// assigns the region based on glyphs
function glyphRegion(glyph_inputId, civ_inputId, region_codeId) {
	let glyphElement = document.getElementById(glyph_inputId)
	let glyphs = document.getElementById(glyph_inputId).value
	let civ = document.getElementById(civ_inputId).value
	let region = '';
	if (glyphs.length == 12) {
		let regionGlyphs = glyphs.substring(4);
		switch (civ) {
			case "GHub":
				region = GHubRegions[regionGlyphs]
				break

			case "CalHub":
				region = CalHubRegions[regionGlyphs]
				break

			case "EisHub":
				region = EisHubRegions[regionGlyphs]
				break
		}
	}
	if (region == undefined) {
		document.getElementById(region_codeId).style.backgroundColor = 'red';
		region = 'No valid Hub region'
	} else {
		document.getElementById(region_codeId).style.backgroundColor = '';
	}
	setOutput(region_codeId, region);
}

// set galaxy and civ based on one dropdown
function civGalaxy(inputId) {
	let civStub = "civStub"
	let civilized = "civilized"
	let galaxy = "galaxy"

	switch (document.getElementById(inputId).value) {
		case "GHub":
			setOutput(civStub, "GHub")
			setOutput(civilized, "Galactic Hub Project")
			setOutput(galaxy, "Euclid")
			break

		case "CalHub":
			setOutput(civStub, "GHub Calypso")
			setOutput(civilized, "Galactic Hub Calypso")
			setOutput(galaxy, "Calypso")
			break

		case "EisHub":
			setOutput(civStub, "GHub Eissentam")
			setOutput(civilized, "Galactic Hub Eissentam")
			setOutput(galaxy, "Eissentam")
			break
	}
}

// automatically refreshes when an element is changed
function autoRefresh() {

	const input = document.querySelectorAll('input');

	input.forEach((input, index) => {
		if (input.hasAttribute('oninput')) {
			input.setAttribute('oninput', input.getAttribute('oninput') + '; showInput()');
		} else {
			input.setAttribute('oninput', 'showInput()');
		}
	});

	const select = document.querySelectorAll('select');

	select.forEach((select, index) => {
		if (select.hasAttribute('onchange')) {
			select.setAttribute('onchange', select.getAttribute('onchange') + '; showInput()');
		} else {
			select.setAttribute('onchange', 'showInput()');
		}
	});

	const textarea = document.querySelectorAll('textarea');

	textarea.forEach((textarea, index) => {
		if (textarea.hasAttribute('oninput')) {
			textarea.setAttribute('oninput', textarea.getAttribute('oninput') + '; showInput()');
		} else {
			textarea.setAttribute('oninput', 'showInput()');
		}
	});
}

// download file with current form content: buttonId: Id of download button; codeId: Id of textelement to get; inputId: Name of object input tag Id
function downloadFile(buttonId, codeId, inputId) {

	let downloadFileContent = document.getElementById(codeId).innerText.replaceAll('\n\n\n', '\n\n');

	let mimeType = 'data:application/octet-stream';

	let name = document.getElementById(inputId).value;
	let a = document.getElementById(buttonId);
	a.href = mimeType + ',' + encodeURIComponent(downloadFileContent);
	a.download = name + '.txt';
}

// makes glyph buttons clickable and adds their value to input field
function glyphOnClick(button, inputId) {

	const input = document.getElementById(inputId);
	const portalCode = input.value;

	if (portalCode.length < 12) {
		input.value += button.value;
		showInput();
	}
}

function glyphInputOnChange(input) {
	const newValue = input?.value?.toUpperCase?.();
	if (newValue == null) return;

	input.value = newValue
		.split('')
		.filter(char => validPortalKeys.includes(char))
		.join('')
		.substr(0, 12);

	showInput();
}

// deletes last character of a string
function deleteCharacter(codeId) {
	const input = document.getElementById(codeId);
	const editedText = input.value.slice(0, -1);

	input.value = editedText;
	showInput();
}

function imgUpload(codeId, inputId, textInputField) {

	// if file upload input
	let imgName = document.getElementById(inputId).value.split("\\").pop()
	setOutput(codeId, imgName)
	document.getElementById(textInputField).value = imgName
}

// handles gallery images
function galleryUpload(uploadId, descId, codeId) {

	const inp = document.getElementById(uploadId);
	const inputDiv = document.getElementById(descId);
	const wikiCodeGalleryDiv = document.getElementById(codeId);

	for (let fileIndex = 0; fileIndex < inp.files.length; ++fileIndex) {
		const file = inp.files.item(fileIndex);
		const name = file.name;
		const imgUrlData = URL.createObjectURL(file);
		const childIndex = (inputDiv.childNodes?.length ?? 0) + fileIndex;
		const inputId = 'pic' + childIndex;
		const galleryId = 'gallery' + childIndex;
		const wikiCodeGalleryId = 'wikiCodeGallery' + childIndex;
		const wikiCodeGalleryValueId = 'wikiCodeGalleryValue' + childIndex;

		const galleryTemplate = `<div id="${galleryId}" class="gallery-item">
			<a class="gallery-media" href=${imgUrlData} target="_blank" rel="noopener noreferrer">
				<img src="${imgUrlData}" alt="" />
			</a>
			<div class="gallery-meta">
				<span class="delete-icon" onclick="rmGallery('${galleryId}', '${wikiCodeGalleryId}');">❌</span>
				<p><b>Name: </b>${name}</p>
				<input id="${inputId}" type="text" placeholder="Description" oninput="galleryInput(this,'${wikiCodeGalleryValueId}')" />
			</div>
		</div>`;

		inputDiv.insertAdjacentHTML('beforeend', galleryTemplate);

		const wikiCodeGalleryTemplate = `<div id="${wikiCodeGalleryId}">
			<span>${name}</span><output id="${wikiCodeGalleryValueId}"></output>
		</div>`;

		wikiCodeGalleryDiv.insertAdjacentHTML('beforeend', wikiCodeGalleryTemplate);
	}
}

// adds or removes descriptions from the gallery
function galleryInput(input, galleryId) {
	if (!input.value == '') {
		document.getElementById(galleryId).innerHTML = '\|' + input.value
	} else {
		setOutput(galleryId, '')
	}
}

// removes gallery row if X is clicked
function rmGallery(galleryId, wikiCodeGalleryId) {
	const galleryNode = document.getElementById(galleryId);
	galleryNode.remove();

	const wikiCodeGalleryNode = document.getElementById(wikiCodeGalleryId);
	wikiCodeGalleryNode.remove();
}

// displays Hub region number
function getHubNumber(region_codeId) {
	let region = document.getElementById(region_codeId).innerHTML;
	let check = document.getElementById('civ').value;
	let index
	let regArray = []
	switch (check) {
		case "GHub":
			regArray = Object.values(GHubRegions);
			index = regArray.indexOf(region);
			if (index > 10) {
				index = 'Huburb'
			} else {
				index++
			}
			break;

		case "CalHub":
			regArray = Object.values(CalHubRegions);
			index = regArray.indexOf(region);
			index++
			break;

		case "EisHub":
			regArray = Object.values(EisHubRegions);
			index = regArray.indexOf(region);
			index++
			break;
	}
	return index
}

// forces only one discovered parm
function hideDiscoverer(discovered, discoveredlink) {
	let discoveredInput = document.getElementById(discovered)
	let discoveredlinkInput = document.getElementById(discoveredlink)
	if (!discoveredlinkInput.value == '') {
		discoveredInput.parentElement.parentElement.style.display = 'None'
	} else {
		discoveredInput.parentElement.parentElement.style.display = ''
	};
	if (!discoveredInput.value == '') {
		discoveredlinkInput.parentElement.parentElement.style.display = 'None'
	} else {
		discoveredlinkInput.parentElement.parentElement.style.display = ''
	};
}

// applies a/an based on given input string
function enPrefix(inputId, codeId) {
	if (!codeId == undefined) {
		let text = document.getElementById(inputId).value.substring(0, 1);
		if (vocals.includes(text)) {
			setOutput(codeId, 'an')
		} else {
			setOutput(codeId, 'a')
		}
	} else {
		let text = inputId.substring(0, 1);
		if (vocals.includes(text)) {
			return 'an'
		} else {
			return 'a'
		}
	}
}

// adds generic civ researchteam if none is given
function researchTeam(researchTeam_codeId, civ_codeId) {
	if (document.getElementById(researchTeam_codeId).innerHTML == '') {
		document.getElementById(researchTeam_codeId).innerHTML = document.getElementById(civ_codeId).innerHTML;
	}
}

// adds documented by information if documenter != discoverer
function docBy(codeId, inputId, discovered_inputId, discoveredlink_inputId, researchTeam_codeId) {
	let documenter = document.getElementById(inputId).value;
	let chapter = document.getElementById(researchTeam_codeId).innerHTML;
	let discoverer = document.getElementById(discovered_inputId).value;
	let discoveredlink = document.getElementById(discoveredlink_inputId).value;
	if (chapter.length > 4) {
		chapter = '';
	} else {
		chapter = chapter + ' researcher'
	}
	
	if (documenter != '' && documenter != discoverer && documenter != discoveredlink) {
		document.getElementById(codeId).parentElement.parentElement.style.display = '';
		setOutput(codeId, `Documented by ${chapter} ${documenter}.`)
	} else {
		document.getElementById(codeId).parentElement.parentElement.style.display = 'none';
	}
}