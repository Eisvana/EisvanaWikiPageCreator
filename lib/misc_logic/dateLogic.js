function processDate(element) {
	const date = element.value;
	const dest = element.dataset.destNoauto;
	wikiCode(date.replaceAll("-", "/"), dest);
}

function getCurrentYear(outputId) {
	const currentYear = new Date().getFullYear();

	wikiCode(currentYear.toString(), outputId);
}