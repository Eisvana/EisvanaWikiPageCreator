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