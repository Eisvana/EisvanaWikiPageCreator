(() => {
	const actions = `
<button class="button is-warning" id="reset" type="reset" onclick="reset()">Reset inputs</button>
<button class="button is-outlined is-primary" id="copy" type="button" onclick="copyCode(this, 'fullArticle')">Copy wikicode</button>
<a class="button is-outlined is-primary" id="download" onclick="downloadFile(this)">Download file</a>
<a class="button is-outlined is-primary" id="create" onclick="createPage(this)">Create page</a>`;

	const copyNote = `<p class="has-text-centered">You must copy the code first, then paste it into the wiki page.</p>`

	globalElements.output.actions.innerHTML = actions;
	globalElements.output.actions.insertAdjacentHTML('beforebegin', copyNote);

	// adds debug mode checkbox
	const url = window.location;
	if (url.hostname != '127.0.0.1' && url.protocol != 'file:') {
		addStaticPageData('debug', false);
		return;
	}
	const skipCheck = `<label style="display:flex; gap: .3rem"><input class="checkbox" type="checkbox" id="skipCheck">Enable debug (no checks, no popups)</label>`;
	globalElements.output.actions.insertAdjacentHTML('beforeend', skipCheck);
	const skipCheckElement = document.getElementById('skipCheck');
	skipCheckElement.onchange = (e) => {
		const checkState = e.target.checked;
		pageData.debug = checkState;
		uploadShown = checkState;
		galleryUploadShown = checkState;
		document.documentElement.dataset.debug = checkState;
		enableTextMarking();
	}
	const urlParams = new URLSearchParams(url.search);
	if (!urlParams.has('debug')) return;

	skipCheckElement.checked = true;
	const event = new Event('change', {
		bubbles: true,
		cancelable: true,
	});
	skipCheckElement.dispatchEvent(event);
})();

function reset() {
	const inputs = document.querySelectorAll('.table .data input, .table .data textarea');
	const selects = document.querySelectorAll('.table .data select');
	const outputs = document.getElementsByTagName('output');
	for (const input of inputs) {
		switch (input.type) {
			case 'checkbox':
				input.checked = false;
				break;
			case 'radio':
				const uncheckedRadios = document.querySelectorAll('input[type="radio"]:not([checked])');
				const checkedRadios = document.querySelectorAll('input[type="radio"][checked]');
				for (const radio of uncheckedRadios) radio.checked = false;
				for (const radio of checkedRadios) radio.checked = true;
				break;
			default:
				input.value = '';
		}
	}

	for (const select of selects) {
		select.value = select.querySelector('option').value;
	}

	for (const output of outputs) {
		output.innerText = '';
	}

	if (typeof resetGallery == 'function') resetGallery();

	for (const key in pageData) {
		if (key != 'pageType' && key != 'galleryArray') delete pageData[key];
	}

	const errors = document.querySelectorAll('.error')
	for (const error of errors) {
		errorMessage(error.previousElementSibling);
	}

	for (key in links) {
		delete links[key];
	}

	// allow an external function to add reset logic. This external function has to be created when needed.
	try {
		resetExternal();
	} catch (error) {
		/* do nothing */
	}

	showAll();
}

function copyCode(input, wikiCodeId) {
	input.style.pointerEvents = 'none';
	const buttonText = input.innerText;
	dataIntegrityObj.text = JSON.stringify(pageData);
	dataIntegrityObj.copy = true;
	const dataIntegrity = checkDataIntegrity();		// true if data is wrong
	if (dataIntegrity) {
		input.classList.remove('is-primary');
		input.classList.add('is-danger');
		input.innerText = dataIntegrity;
		setTimeout(() => {
			input.classList.remove('is-danger');
			input.classList.add('is-primary');
			input.innerText = buttonText;
			input.style.pointerEvents = '';
		}, 1500);
		return;
	}
	const copyTextContent = globalElements.output[wikiCodeId].innerText.replaceAll('\n\n\n', '\n\n');
	navigator.clipboard.writeText(copyTextContent);
	dataIntegrityObj.copy = true;	// this must be here, since checkDataIntegrity sets it to false

	input.innerText = 'Copied!';
	setTimeout(() => {
		input.innerText = buttonText;
		input.style.pointerEvents = '';
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
	element.style.pointerEvents = 'none';
	const name = pageData.name;
	const link = wikiLink + 'Special:EditPage/' + name;
	assignLink(element, link);
}

function assignLink(element, link) {
	const dataIntegrity = checkDataIntegrity();
	if (!dataIntegrity) {
		element.href = link;
		element.target = '_blank';
		element.rel = 'noopener noreferrer';
		element.style.pointerEvents = '';
	} else {
		const buttonText = element.innerText;
		element.removeAttribute('href');
		element.className = 'button is-danger';
		element.innerText = dataIntegrity;
		setTimeout(() => {
			element.className = 'button is-outlined is-primary';
			element.innerText = buttonText;
			element.style.pointerEvents = '';
		}, 1500);
	}
}