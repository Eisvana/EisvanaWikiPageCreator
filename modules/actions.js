const actions =
	`<button class="button is-warning" id="reset" onclick="reset()">Reset inputs</button>
<button class="button is-outlined is-primary" id="copy" onclick="copyCode(this)">Copy wikicode</button>
<a class="button is-outlined is-primary" id="download" onclick="downloadFile(this)">Download file</a>
<a class="button is-outlined is-primary" id="create" onclick="createPage(this)">Create page</a>`;

globalElements.output.actions.innerHTML = actions;

let copyButtonPress, createButtonPress;

function reset() {
	const inputs = document.querySelectorAll('.table .data select, .table .data input');
	const outputs = document.getElementsByTagName('output');
	for (const input of inputs) {
		if (input.type != 'checkbox') input.value = '';
		input.checked = false;
	}
	for (const output of outputs) {
		output.innerText = '';
	}
	globalElements.input.version.value = versions[0];
	globalElements.input.civ.value = globalElements.input.civ.children[0].value;
	
	try { resetGallery() } catch(error) { console.error(error) };

	for (const key in pageData) {
		if (key != 'pageType') delete pageData[key];
	}
	showAll();
}

function copyCode(input) {
	if (copyButtonPress) return;
	copyButtonPress = true;
	const buttonText = input.innerText;
	const dataIntegrity = checkDataIntegrity();
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
	const copyTextContent = globalElements.output.fullArticle.innerText.replaceAll('\n\n\n', '\n\n');
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


function createPage(button) {
	if (createButtonPress) return;
	createButtonPress = true;
	const name = pageData.name;
	const glyphs = pageData.portalglyphs;
	const region = pageData.region;
	const buttonText = button.innerText;
	const a = button;
	const link = 'https://nomanssky.fandom.com/wiki/Special:EditPage/' + name;
	const dataIntegrity = checkDataIntegrity();
	if (!dataIntegrity) {
		a.href = link;
		a.setAttribute('target', '_blank');
		a.setAttribute('rel', 'noopener noreferrer');
		createButtonPress = false;
	} else {
		a.removeAttribute('href');
		a.className = 'button is-danger';
		a.innerText = dataIntegrity;
		setTimeout(() => {
			a.className = 'button is-outlined is-primary';
			a.innerText = buttonText;
			createButtonPress = false;
		}, 1500)
	}
}

function checkDataIntegrity() {
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