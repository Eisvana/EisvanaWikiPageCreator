/**
 * Determines if the user has a set theme and updates the document accordingly.
 * @async
 * @function
 * @returns {Promise} A promise that resolves when the footer is loaded and rendered.
 */
(async () => {
	// determines if the user has a set theme
	let theme = localStorage.getItem('theme') ?? 'light';    //default to light
	// local storage is used to override OS theme settings
	if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// OS theme setting detected as dark
		theme = 'dark';
	}

	// if dark theme is preferred, set document with a `data-theme` attribute
	if (theme == 'dark') document.documentElement.dataset.theme = 'dark';

	if (!localStorage.getItem('theme')) localStorage.setItem('theme', theme);

	const dom = await loadHTML('src/htmlSnippets/footer.html');

	const about = dom.getElementById('about');
	if (about.href == window.location) about.remove();

	const footerHTML = dom.body.innerHTML;

	if (typeof globalElements == 'undefined') {
		document.getElementById('footer').innerHTML = footerHTML;
	} else {
		globalElements.output.footer.innerHTML = footerHTML;
	}
})();

// function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme() {
	document.documentElement.dataset.transition = 'true';
	if (localStorage.getItem('theme') == 'light') {
		localStorage.setItem('theme', 'dark');
		document.documentElement.dataset.theme = 'dark';
	} else {
		localStorage.setItem('theme', 'light');
		document.documentElement.dataset.theme = 'light';
	}

	// adding delay to allow the CSS transition to complete. This is only for Chrome, Firefox would work with any timeout (even 0) #chromesucks
	setTimeout(() => {
		delete document.documentElement.dataset.transition;
	}, 400);
}

// custom global settings
const footerElements = {
	input: {
		settings: 'settings',
	}
};

(() => {
	const inputs = document.querySelectorAll('footer dialog .data>*');
	inputs.forEach(input => {
		footerElements.input[input.id] = input.id;
		if (input.dataset.store) assignFunction(input, 'delete pageData.restored');
	});
	updateGlobalElements(footerElements);
	footerElements.inputs = inputs
	addPortalGlyphButtons(globalElements.input.settingsPortalglyphButtons, 'portalglyphsDefault');

	// define dialog internal logic
	const settingsElementFunctions = {
		civDefault: ['researchTeamDropdown(globalElements.input.researchteamDefault, this.value)'],
		discoveredDefault: ['hideDiscoverer("discoveredDefault", "discoveredlinkDefault")'],
		discoveredlinkDefault: ['hideDiscoverer("discoveredlinkDefault", "discoveredDefault")'],
		portalglyphsDefault: ['glyphInputOnChange(this); validateGlyphSettings(this); document.getElementById("settingsPortalglyphsPreview").value = validateGlyphInput(this.value)'],
	}
	assignElementFunctions(settingsElementFunctions);
})();


// shows modal
function showSettings() {
	restoreDefaults();
	const dialog = globalElements.input.settings;
	dialog.style.scale = '0';
	dialog.showModal();
	dialog.style.scale = '1';
	dialog.scrollTo(0, 0);

	const settings = JSON.parse(localStorage.getItem('defaultSettings')) ?? new Object;
	for (const setting in settings) {
		const input = dialog.querySelector(`.data [data-store="${setting}"]`);
		if (!input) continue;
		input.value = settings[setting];
		switch (input.id) {
			case 'civDefault':
				input.onchange();
				break;
			case 'portalglyphsDefault':
				executeOnInput(input);
				break;
		}
	}
	hideDiscoverer();
	delete pageData.restored;
}

// called when user submits values. Stores entered values in localstorage
function updateDefaultValues() {
	if (pageData.restored) {
		localStorage.removeItem('defaultSettings');
		delete pageData.restored;
		return;
	}
	const settings = new Object;
	const inputs = footerElements.inputs;
	for (const input of inputs) {
		const value = input?.value;
		const store = input?.dataset?.store;
		if ((input?.options?.[input.options.length - 1]?.value == value || value) && store) settings[store] = sanitiseString(value);
	}

	localStorage.setItem('defaultSettings', JSON.stringify(settings));
}

// called on pageload and on reset. Populates inputs with values before the code automation kicks in
function readDefaultValues() {
	const settings = JSON.parse(localStorage.getItem('defaultSettings')) ?? new Object;
	for (const setting in settings) {
		const input = (() => {
			if (setting.split(' ').length > 1) {
				return setting.split(' ').map(id => document.getElementById(id)).find(element => element);
			} else {
				return document.getElementById(setting);
			}
		})();
		if (input) {
			input.value = settings[setting];

			switch (setting) {
				case 'civInput':
					pageData.civShort = settings[setting];
					researchTeamDropdown();
					break;
				case 'portalglyphsInput':
					executeOnInput(input);
					break;
			}
		}
	}
}

// called when user resets custom globals. Sets all dialog options back to default
function restoreDefaults() {
	const inputs = footerElements.inputs;
	for (const input of inputs) {
		if (input?.value == undefined) continue;
		if (input.tagName.toLowerCase() == 'select') {
			input.value = input.options?.[0]?.value;
		} else {
			input.value = '';
		}
	}
	hideDiscoverer();
	pageData.restored = true;
}

function validateGlyphSettings(input) {
	const glyphString = input.value;
	const allRegions = structuredClone(regions);
	addHuburbs(allRegions);
	Object.freeze(allRegions);
	const region = validateGlyphs(glyphString, globalElements.input.civDefault.value, allRegions);
	glyphError(region, input);
	globalElements.input.settings.querySelector('form button.is-primary').disabled = region == undefined;
}