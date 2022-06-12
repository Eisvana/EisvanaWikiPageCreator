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
	textFunction(codeId, inputId)
	
	var name = document.getElementById(codeId).innerHTML
	var a = document.getElementById(codeId)
	var link = 'https://nomanssky.fandom.com/wiki/' + name + '?action=edit'
	a.href = link
	document.getElementById(codeId).innerHTML = link
}

// gets the current year
function currentYear(codeId) {
	document.getElementById(codeId).innerHTML = new Date().getFullYear()
}

// region dropdowns for different Hubs
function civRegDropdown(targetId, inputId) {
	
	const GHubRegions	= ['The Arm of Vezitinen', 'Canthian', 'Dexterf Sector', 'The Arm of Katteus', 'Nugsdor Adjunct', 'Uefert Nebula', 'Widraik', 'Airnaka Conflux', 'Sivess Instability', 'Savenix Instability', 'Nonlopsi Instability']
	const CalHubRegions	= ['Uisaor Spur', 'The Arm of Kiffeyn', 'Ilongl Cloud', 'The Arm of Taticale', 'Egerap Anomaly', 'Wakestones Expanse', 'Erhahn Fringe', 'Imrikians Terminus', 'Imedeili', 'Kovasu Adjunct', 'Lossians Boundary']
	const EisHubRegions	= ['Riwala', 'Omskio Instability', 'Marcki', 'Anolamga Spur', 'Sea of Zonyayp', 'Rayuyar Band', 'Umaton Instability', 'Exramb Adjunct', 'Ologowe Fringe', 'Yatrifex', 'Yeiada Sector', 'Iptrevs Fringe', 'Yamiraith Sector', 'Wedragi Spur', 'Rezhensk', 'Sobert Cloud', 'Umtats Anomaly', 'Tavill', 'Qangew Expanse', 'Nijhwal Boundary', 'Usband Cluster', 'Ejongaa Anomaly', 'Zahrel Expanse', 'The Arm of Fupand', 'Cuculta', 'Etmarao', 'Otreie Void']

	function createOption(value) {
		el = document.createElement('option')
		el.value = value
		el.innerHTML = value
		el.id = value

		document.getElementById(targetId).appendChild(el)
	}


	var check = document.getElementById(inputId).value
	document.getElementById(targetId).innerHTML = ""
	switch(check) {
		case "GHub":
			for (const region of GHubRegions) {
				createOption(region);
			}
		break;

		case "CalHub":
			for (const region of CalHubRegions) {
				createOption(region);
			}
		break;

		case "EisHub":
			
			for (const region of EisHubRegions) {
				createOption(region);
			}
		break;
	}

	document.getElementById('GHub').addEventListener('click', function() {
		document.getElementById(targetId).innerHTML = ''

		for (const region of GHubRegions) {
			createOption(region)
		}
	})

	document.getElementById('CalHub').addEventListener('click', function() {
		document.getElementById(targetId).innerHTML = ''

		for (const region of CalHubRegions) {
			createOption(region)
		}
	})

	document.getElementById('EisHub').addEventListener('click', function() {
		document.getElementById(targetId).innerHTML = ''

		for (const region of EisHubRegions) {
			createOption(region)
		}
	})
}

// set galaxy and civ based on one dropdown
function civGalaxy(inputId) {
	var civStub = "civStub"
	var civilized = "civilized"
	var galaxy = "galaxy"

	switch(document.getElementById(inputId).value) {
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