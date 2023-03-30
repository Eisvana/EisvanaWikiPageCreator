/**
 * @fileoverview Generates the footer and handles theming, as well as user defined global default values.
 */

// custom global settings
const footerElements = {
	input: {
		settings: 'settings',
	}
};

/**
 * Determines the user's theme preference and applies it to the footer of the current HTML document.
 * @async
 * @function
 * @returns {undefined}
 */
(async () => {
	// determines if the user has a set theme
	let theme = localStorage.getItem('theme') ?? 'light';    //default to light

	/**
	 * If the user has not yet set a theme preference, and the user's operating system is using a dark theme,
	 * the theme of the footer will be set to "dark".
	 */
	if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// OS theme setting detected as dark
		theme = 'dark';
	}

	// if dark theme is preferred, set document with a `data-theme` attribute
	if (theme == 'dark') document.documentElement.dataset.theme = 'dark';

	if (!localStorage.getItem('theme')) localStorage.setItem('theme', theme);

	/**
	 * Loads the HTML of the footer and removes the `<a>` element with an `id` of `about` if it links to the current page.
	 */
	const dom = await loadHTML('src/htmlSnippets/footer.html');
	const about = dom.getElementById('about');
	if (about.href == window.location) about.remove();

	/**
	 * If a global `globalElements` object exists, the `innerHTML` property of the `footer` key is set to `footerHTML`.
	 * Otherwise, the `innerHTML` property of the element with an `id` of `footer` is set to `footerHTML`.
	 */
	const footerHTML = dom.body.innerHTML;
	if (typeof globalElements == 'undefined') {
		document.getElementById('footer').innerHTML = footerHTML;
	} else {
		globalElements.output.footer.innerHTML = footerHTML;
	}

	/**
	 * Set up footer dialog elements and define internal logic.
	 */

	/**
	 * NodeList of input elements inside the footer dialog's "data" container.
	 *
	 * @type {NodeList}
	 */
	const inputs = document.querySelectorAll('footer dialog .data>*');

	// Iterate over each input element and add its `id` to the `footerElements.input` object.
	inputs.forEach(input => {
		footerElements.input[input.id] = input.id;

		// If the input element has a `data-store` attribute, add a `delete` function to it.
		if (input.dataset.store) assignFunction(input, 'delete pageData.restored');
	});

	// Update the global `footerElements` object to include the new input elements.
	updateGlobalElements(footerElements);

	/**
	 * Array of input elements inside the footer dialog's "data" container.
	 *
	 * @type {Array}
	 */
	footerElements.inputs = inputs

	// Add portal glyph buttons to the `globalElements.input.settingsPortalglyphButtons` container.
	addPortalGlyphButtons(globalElements.input.settingsPortalglyphButtons, 'portalglyphsDefault');

	/**
	 * Object containing functions to be called when certain settings elements in the footer dialog are changed.
	 *
	 * @type {Object}
	 */
	const settingsElementFunctions = {
		civDefault: ['researchTeamDropdown(globalElements.input.researchteamDefault, this.value)'],
		discoveredDefault: ['hideDiscoverer("discoveredDefault", "discoveredlinkDefault")'],
		discoveredlinkDefault: ['hideDiscoverer("discoveredlinkDefault", "discoveredDefault")'],
		portalglyphsDefault: ['glyphInputOnChange(this); validateGlyphSettings(this); document.getElementById("settingsPortalglyphsPreview").value = validateGlyphInput(this.value)'],
	}

	// Assign each function to its corresponding element in the footer dialog.
	assignElementFunctions(settingsElementFunctions);
})();

/**
 * Changes the theme of the page and sets a localStorage variable to track the theme between page loads.
 * @function
 * @returns {void}
 */
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

/**
 * Displays the settings modal and restores default values.
 * @function
 * @global
 * @return {void}
 */
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

/**
 * Called when user submits values. Stores entered values in localstorage.
 * @function
 * @returns {void}
 */
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

/**
 * Populates input fields with default values on page load and on reset.
 * Retrieves default values from local storage, if available.
 * @function
 * @returns {void}
 */
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
		if (!input) continue;

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

/**
 * Sets dialog options back to their default values when the user resets custom globals.
 * @function
 * @returns {void}
 */
function restoreDefaults() {
	/**
	 * The input HTML elements in the footer.
	 * @type {NodeList}
	 */
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

/**
 * Validates a glyph user input and updates the UI with any errors
 * @param {HTMLInputElement} input - The user's glyph input
 */
function validateGlyphSettings(input) {
	const glyphString = input.value;
	const allRegions = structuredClone(regions);
	addHuburbs(allRegions);
	Object.freeze(allRegions);
	const region = validateGlyphs(glyphString, globalElements.input.civDefault.value, allRegions);
	glyphError(region, input);
	globalElements.input.settings.querySelector('form button.is-primary').disabled = region == undefined;
}