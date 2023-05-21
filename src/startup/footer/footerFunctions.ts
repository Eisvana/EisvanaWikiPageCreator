import { hideDiscoverer, researchTeamDropdown } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { restoreDefaults, showSettings, switchTheme, updateDefaultValues, validateGlyphSettings } from "../../modules/footer";
import { deleteCharacter, glyphInputOnChange, validateGlyphInput } from "../../modules/portalglyphs";
import { ElementFunctions } from "../../types/elements";
import { globalElements } from "../../variables/objects";

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