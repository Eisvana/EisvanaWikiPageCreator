(() => {
	const actions =
		`<button class="button is-warning" id="reset" onclick="reset()">Reset inputs</button>
<button class="button is-outlined is-primary" id="copy" onclick="copyCode(this, 'fullArticle')">Copy wikicode</button>
<a class="button is-outlined is-primary" id="download" onclick="downloadFile(this)">Download file</a>
<a class="button is-outlined is-primary" id="create" onclick="createPage(this)">Create page</a>`;

	globalElements.output.actions.innerHTML = actions;
})();

let copyButtonPress, createButtonPress;

function reset() {
	const inputs = document.querySelectorAll('.table .data input, .table .data textarea');
	const selects = document.querySelectorAll('.table .data select');
	const outputs = document.getElementsByTagName('output');
	for (const input of inputs) {
		if (input.type != 'checkbox') input.value = '';
		input.checked = false;
	}
	for (const select of selects) {
		select.value = select.children[0].value;
	}

	for (const output of outputs) {
		if (output.id == 'censusrenewal') continue;
		output.innerText = '';
	}

	try { resetGallery() } catch (error) { console.error(error) };

	for (const key in pageData) {
		if (key != 'pageType') delete pageData[key];
	}

	const errors = document.querySelectorAll('.error')
	for (const error of errors) {
		errorMessage(error.previousElementSibling);
	}

	showAll();
}

function copyCode(input, wikiCodeId) {
	if (copyButtonPress) return;
	copyButtonPress = true;
	const buttonText = input.innerText;
	const dataIntegrity = checkDataIntegrity();		// true if data is wrong
	if (dataIntegrity) {
		input.classList.remove('is-primary');
		input.classList.add('is-danger');
		input.innerText = dataIntegrity;
		setTimeout(() => {
			input.classList.remove('is-danger');
			input.classList.add('is-primary');
			input.innerText = buttonText;
			copyButtonPress = false;
		}, 1500);
		return;
	}
	const copyTextContent = globalElements.output[wikiCodeId].innerText.replaceAll('\n\n\n', '\n\n');
	navigator.clipboard.writeText(copyTextContent);

	input.innerText = 'Copied!';
	setTimeout(() => {
		input.innerText = buttonText;
		copyButtonPress = false;
	}, 1500)
}


function downloadFile(button) {
	const downloadFileContent = globalElements.output.fullArticle.innerText.replaceAll('\n\n\n', '\n\n');

	const mimeType = 'data:text/plain';

	const name = pageData.name;
	const a = button;
	a.href = mimeType + ',' + encodeURIComponent(downloadFileContent);
	a.download = name + '.txt';
}

const wikiLink = 'https://nomanssky.fandom.com/wiki/';

function createPage(element) {
	if (createButtonPress) return;
	createButtonPress = true;
	const name = pageData.name;
	const link = wikiLink + 'Special:EditPage/' + name;
	assignLink(element, link);
}

function assignLink(element, link) {
	const dataIntegrity = checkDataIntegrity();
	if (!dataIntegrity) {
		element.href = link;
		element.setAttribute('target', '_blank');
		element.setAttribute('rel', 'noopener noreferrer');
		createButtonPress = false;
	} else {
		const buttonText = element.innerText;
		element.removeAttribute('href');
		element.className = 'button is-danger';
		element.innerText = dataIntegrity;
		setTimeout(() => {
			element.className = 'button is-outlined is-primary';
			element.innerText = buttonText;
			createButtonPress = false;
		}, 1500);
	}
}

function checkDataIntegrity() {		// returns false if nothing is wrong
	const name = pageData.name;
	const glyphs = pageData.portalglyphs;
	const region = pageData.region;
	const pageType = pageData.pageType;

	if (name && (glyphs || pageType == 'Business') && region) {
		return false;
	} else if (name == '') {
		return 'Missing name!';
	} else {
		return 'Wrong glyphs!';
	}
}