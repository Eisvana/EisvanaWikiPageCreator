const GHubRegions = ['The Arm of Vezitinen', 'Canthian', 'Dexterf Sector', 'The Arm of Katteus', 'Nugsdor Adjunct', 'Uefert Nebula', 'Widraik', 'Airnaka Conflux', 'Sivess Instability', 'Savenix Instability', 'Nonlopsi Instability'];
const CalHubRegions = ['Uisaor Spur', 'The Arm of Kiffeyn', 'Ilongl Cloud', 'The Arm of Taticale', 'Egerap Anomaly', 'Wakestones Expanse', 'Erhahn Fringe', 'Imrikians Terminus', 'Imedeili', 'Kovasu Adjunct', 'Lossians Boundary'];
const EisHubRegions = ['Riwala', 'Omskio Instability', 'Marcki', 'Anolamga Spur', 'Sea of Zonyayp', 'Rayuyar Band', 'Umaton Instability', 'Exramb Adjunct', 'Ologowe Fringe', 'Yatrifex', 'Yeiada Sector', 'Iptrevs Fringe', 'Yamiraith Sector', 'Wedragi Spur', 'Rezhensk', 'Sobert Cloud', 'Umtats Anomaly', 'Tavill', 'Qangew Expanse', 'Nijhwal Boundary', 'Usband Cluster', 'Ejongaa Anomaly', 'Zahrel Expanse', 'The Arm of Fupand', 'Cuculta', 'Etmarao', 'Otreie Void'];
const validPortalKeys = '0123456789ABCDEF'

var galleryIds = []

// codeId	= id in div and spans in wikicode
// inputId	= id in input tags

// get text from input field
function getInput(inputId) {
	document.getElementById(inputId).value
}

// places something in the code
function setOutput(codeId, textToPut) {
	document.getElementById(codeId).innerHTML = textToPut
}

// get text from input fields
function textFunction(codeId, inputId) {
	document.getElementById(codeId).innerHTML =
		document.getElementById(inputId).value
}

// resets all output text to null
function resetAll(galleryId) {

	const output = document.querySelectorAll('output');

	output.forEach((output, index) => {
		output.innerHTML = ''
	});
	
	var child = document.getElementById(galleryId)
	
	while (child.firstChild) {
		child.removeChild(child.firstChild);
	}
	
	galleryIds.length = 0;
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
	var copyTextContent = document.getElementById(codeId).innerText
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
function wikiLink(codeId, inputId) {

	var name = document.getElementById(inputId).value;
	var a = document.getElementById(codeId);
	var link = 'https://nomanssky.fandom.com/wiki/' + name + '?action=edit';
	if (!name == '') {
		a.href = link;
		a.setAttribute('target', '_blank');
		a.setAttribute('rel', 'noopener noreferrer');
	} else {
		a.removeAttribute('href');
		a.className = 'button is-danger'
		a.innerHTML = 'Missing base name!'
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

// region dropdowns for different Hubs
function civRegDropdown() {
	var check = document.getElementById('civ').value;
	document.getElementById('region_input').innerHTML = "";
	switch (check) {
		case "GHub":
			setRegionDropDownOptions(GHubRegions);
			break;

		case "CalHub":
			setRegionDropDownOptions(CalHubRegions);
			break;

		case "EisHub":
			setRegionDropDownOptions(EisHubRegions);
			break;
	}
}

function setRegionDropDownOptions(options) {
	for (const option of options) {
		el = document.createElement('option')
		el.value = option
		el.innerHTML = option
		el.id = option

		document.getElementById('region_input').appendChild(el)
	}
}

// set galaxy and civ based on one dropdown
function civGalaxy(inputId) {
	var civStub = "civStub"
	var civilized = "civilized"
	var galaxy = "galaxy"

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

	var downloadFileContent = document.getElementById(codeId).innerText;
	var downloadFileContent = downloadFileContent.replaceAll('\n\n\n', '\n\n');

	var mimeType = 'data:application/octet-stream';

	var name = document.getElementById(inputId).value;
	var a = document.getElementById(buttonId);
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
	var imgName = document.getElementById(inputId).value.split("\\").pop()
	setOutput(codeId, imgName)
	document.getElementById(textInputField).value = imgName
}

function galleryUpload(uploadId, descId, codeId) {


	var inp = document.getElementById(uploadId);
	for (var i = 0; i < inp.files.length; ++i) {
		var name = inp.files.item(i).name;

		// creating input boxes for descriptions
		var inputDiv = document.getElementById(descId);		

		var tr = document.createElement('tr');
		var th = document.createElement('th');
		var td = document.createElement('td');
		var label = document.createElement('label');
		var input = document.createElement('input');
		var span = document.createElement('span');
		var img = document.createElement('img');
		var a = document.createElement('a');
		var inputId = 'pic' + galleryIds.length
		var spanId = 'span' + galleryIds.length
		var trId = 'tr' + galleryIds.length
//		var imgId = 'img' + galleryIds.length

		inputDiv.appendChild(tr)
		tr.appendChild(th)
		th.appendChild(span)
		th.appendChild(a)
		a.appendChild(img)
		th.appendChild(label)
		tr.appendChild(td)
		td.appendChild(input)
		tr.id = trId;
		span.id = spanId;
//		img.id = imgId;
		span.innerHTML = '&#10060;&nbsp;'
		span.setAttribute('onclick', 'rmGallery(this.id);')
		label.innerHTML = name + ' description:'
		input.id = inputId
		img.src = URL.createObjectURL(inp.files.item(i))
		img.width = '200'
		a.href = img.getAttribute('src')
		a.setAttribute('target', '_blank');
		a.setAttribute('rel', 'noopener noreferrer');

		// creating the wikicode
		var galleryDiv = document.getElementById(codeId);		

		var div = document.createElement('div');
		var output = document.createElement('output');
		var outputDesc = document.createElement('output');
		var galleryId = 'gallery' + galleryIds.length

		galleryDiv.appendChild(div)
		div.appendChild(output)
		output.innerHTML = name
		output.appendChild(outputDesc)
		outputDesc.id = galleryId
		
		galleryIds.push(inputId)

		// filling desc in wikicode
		input.setAttribute('oninput', 'galleryInput(\'' + inputId + '\',\'' + galleryId + '\')');
	}
}

// adds or removes from the gallery
function galleryInput(inputId, galleryId) {

	if (!document.getElementById(inputId).value == '') {
		document.getElementById(galleryId).innerHTML = '\|' + document.getElementById(inputId).value
	} else {
		setOutput(galleryId, '')
	}
}

function rmGallery(index) {
	
	var arrayIndex = index.substr(4); 	
	
	var trId = 'tr' + arrayIndex
	var rmTr = document.getElementById(trId)

	rmTr.remove()

	galleryId = 'gallery' + arrayIndex
	galleryOutput = document.getElementById(galleryId)
	galleryOutput.parentElement.remove()
	galleryOutput.remove()
}