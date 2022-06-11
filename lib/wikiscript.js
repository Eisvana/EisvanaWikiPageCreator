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
function copyText() {
	var copyTextContent = document.getElementById("wikiText").innerText;
	navigator.clipboard.writeText(copyTextContent.replaceAll('\n\n\n', '\n\n'));

	document.getElementById('btn').innerHTML = 'Copied!';
	setTimeout(() => {
	  document.getElementById('btn').innerHTML = 'Copy wikicode';
	}, 1500);
}


//WIP!!
function dateConvert(codeId) {
	let text = document.getElementById(codeId).innerHTML; 
	document.getElementById(codeId).innerHTML = text.replaceAll("-", "/");
}