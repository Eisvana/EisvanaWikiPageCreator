// codeId	= id in div and spans in wikicode
// inputId	= id in input tags

// get text from input fields
function textFunction(codeId, inputId) {
    document.getElementById(codeId).innerHTML =
        document.getElementById(inputId).value;
}

// get text from radio buttons (multiple choice buttons)
function radioFunction(codeId, inputId) {
	document.getElementById(codeId).innerHTML =
		document.querySelector(`[id^=${inputId}]:checked`).value;
}

// copy text button, needs to be a div with id="wikiText"
function copyText(codeId, inputId) {
	var copyTextContent = document.getElementById(codeId).innerText;
	navigator.clipboard.writeText(copyTextContent.replaceAll('\n\n\n', '\n\n'));

	document.getElementById(inputId).innerHTML = 'Copied!';
	setTimeout(() => {
	  document.getElementById(inputId).innerHTML = 'Copy wikicode';
	}, 1500);
}

// converts the output of a date input function that's already in the document earlier to the format YYYY/MM/DD
function dateConvert(codeId) {
	let text = document.getElementById(codeId).innerHTML; 
	document.getElementById(codeId).innerHTML = text.replaceAll("-", "/");
}

// creates a wiki link for your page
function wikiLink(codeId, inputId) {
	textFunction(codeId, inputId)
	
	var name = document.getElementById(codeId).innerHTML
	var a = document.getElementById(codeId)
	var link = 'https://nomanssky.fandom.com/wiki/' + name + '?action=edit';
	a.href = link;
	document.getElementById(codeId).innerHTML = link;
}

// gets the current year
function currentYear(codeId) {
	document.getElementById(codeId).innerHTML = new Date().getFullYear();	
}

// region dropdowns for different Hubs
function civRegDropdown(targetId) {
	function createOption(value) {
		el = document.createElement('option');
		el.value = value;
		el.innerHTML = value;
		el.id = value;

		document.getElementById(targetId).appendChild(el);
	}

	document.getElementById('GHub').addEventListener('click', function() {
		document.getElementById(targetId).innerHTML = '';

		createOption('The Arm of Vezitinen');
		createOption('Canthian');
		createOption('Dexterf Sector');
		createOption('The Arm of Katteus');
		createOption('Nugsdor Adjunct');
		createOption('Uefert Nebula');
		createOption('Widraik');
		createOption('Airnaka Conflux');
		createOption('Sivess Instability');
		createOption('Savenix Instability');
		createOption('Nonlopsi Instability');
	});

	document.getElementById('CalHub').addEventListener('click', function() {
		document.getElementById(targetId).innerHTML = '';

		createOption('Uisaor Spur');
		createOption('The Arm of Kiffeyn');
		createOption('Ilongl Cloud');
		createOption('The Arm of Taticale');
		createOption('Egerap Anomaly');
		createOption('Wakestones Expanse');
		createOption('Erhahn Fringe');
		createOption('Imrikians Terminus');
		createOption('Imedeili');
		createOption('Kovasu Adjunct');
		createOption('Lossians Boundary');
	});

	document.getElementById('EisHub').addEventListener('click', function() {
		document.getElementById(targetId).innerHTML = '';

		createOption('Riwala');
		createOption('Omskio Instability');
		createOption('Marcki');
		createOption('Anolamga Spur');
		createOption('Sea of Zonyayp');
		createOption('Rayuyar Band');
		createOption('Umaton Instability');
		createOption('Exramb Adjunct');
		createOption('Ologowe Fringe');
		createOption('Yatrifex');
		createOption('Yeiada Sector');
		createOption('Iptrevs Fringe');
		createOption('Yamiraith Sector');
		createOption('Wedragi Spur');
		createOption('Rezhensk');
		createOption('Sobert Cloud');
		createOption('Umtats Anomaly');
		createOption('Tavill');
		createOption('Qangew Expanse');
		createOption('Nijhwal Boundary');
		createOption('Usband Cluster');
		createOption('Ejongaa Anomaly');
		createOption('Zahrel Expanse');
		createOption('The Arm of Fupand');
		createOption('Cuculta');
		createOption('Etmarao');
		createOption('Otreie Void');
	});
}