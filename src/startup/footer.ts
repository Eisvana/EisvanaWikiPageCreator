import { hideDiscoverer, loadHTML, researchTeamDropdown } from "../common";
import { assignElementFunctions, assignFunction } from "../elementFrontends/elementBackend/elementFunctions";
import { updateGlobalElements } from "../elementFrontends/elementBackend/elementStore";
import { footerElements, restoreDefaults, showSettings, switchTheme, updateDefaultValues, validateGlyphSettings } from "../modules/footer";
import { addPortalGlyphButtons, deleteCharacter, glyphInputOnChange, validateGlyphInput } from "../modules/portalglyphs";
import { ElementFunctions } from "../types/elements";
import { globalElements, pageData } from "../variables/objects";

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
if ((about as HTMLAnchorElement).href == window.location.toString()) about?.remove();

/**
 * If a global `globalElements` object exists, the `innerHTML` property of the `footer` key is set to `footerHTML`.
 * Otherwise, the `innerHTML` property of the element with an `id` of `footer` is set to `footerHTML`.
 */
const footerHTML = dom.body.innerHTML;
if (typeof globalElements == 'undefined') {
	(document.getElementById('footer') as HTMLElement).innerHTML = footerHTML;
} else {
	(globalElements.output.footer as HTMLElement).innerHTML = footerHTML;
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
	const id = input.id;
	footerElements.input![id] = id;

	const functionObj: ElementFunctions = {
		element: id,
		func: function () { delete pageData.restored }
	}


	// If the input element has a `data-store` attribute, add a `delete` function to it.
	if ((input as HTMLElement).dataset.store) assignFunction(functionObj);
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
addPortalGlyphButtons(globalElements.input.settingsPortalglyphButtons as HTMLElement, 'portalglyphsDefault');

/**
 * Object containing functions to be called when certain settings elements in the footer dialog are changed.
 *
 * @type {Object}
 */
const settingsElementFunctions: Array<ElementFunctions> = [
	{
		element: 'civDefault',
		func: function () { researchTeamDropdown(globalElements.input.researchteamDefault as HTMLSelectElement, (this as unknown as HTMLSelectElement).value) }
	},
	{
		element: 'discoveredDefault',
		func: function () { hideDiscoverer("discoveredDefault", "discoveredlinkDefault") }
	},
	{
		element: 'discoveredlinkDefault',
		func: function () { hideDiscoverer("discoveredlinkDefault", "discoveredDefault") }
	},
	{
		element: 'portalglyphsDefault',
		func: function () {
			const element = this as unknown as HTMLInputElement
			glyphInputOnChange(element);
			validateGlyphSettings(element);
			(document.getElementById("settingsPortalglyphsPreview") as HTMLOutputElement).value = validateGlyphInput(element.value)
		}
	},
	{
		element: 'glyphDeleteDefault',
		handler: 'click',
		func: function () { deleteCharacter(this as unknown as HTMLButtonElement) }
	},
	{
		element: 'switchTheme',
		handler: 'click',
		func: function () { switchTheme() }
	},
	{
		element: 'openSettingsBtn',
		handler: 'click',
		func: function () { showSettings() }
	},
	{
		element: 'submitDefault',
		handler: 'click',
		func: function () { updateDefaultValues() }
	},
	{
		element: 'resetDefault',
		handler: 'click',
		func: function () { restoreDefaults() }
	},
]

// Assign each function to its corresponding element in the footer dialog.
assignElementFunctions(settingsElementFunctions);