function textFunction(a, b) {
    document.getElementById(a).innerHTML =
        document.getElementById(b).value;
}

function radioFunction(x, y) {
	document.getElementById(x).innerHTML =
		document.querySelector("[id^=y]:checked").value;
}

function copyText() {
	var copyTextContent = document.getElementById("wikiText").innerText;
	navigator.clipboard.writeText(copyTextContent.replaceAll('\n\n\n', '\n\n'));
	console.log(copyTextContent);

	document.getElementById('btn').innerHTML = 'Copied!';
	setTimeout(() => {
	  document.getElementById('btn').innerHTML = 'Copy wikicode';
	}, 1500);
}
