function processDate(element) {
	const date = element.value;
	const dest = element.getAttribute('data-dest-noauto');
	document.getElementById(dest).innerText = date.replaceAll("-", "/");
}

function getCurrentYear(outputId) {
	const currentYear = new Date().getFullYear();

	document.getElementById(outputId).innerText = currentYear;
}