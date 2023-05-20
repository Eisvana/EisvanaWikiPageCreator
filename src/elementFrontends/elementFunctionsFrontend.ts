import { civ, docBy, enableTextMarking, hideDiscoverer, researchTeam, validateCoords } from "../common";
import { displayGlyphs, glyphInputOnChange } from "../modules/portalglyphs";
import { ElementFunctions } from "../types/elements";

/**
 * An object containing functions to assign to each input element on the page.
 * Functions are in the format 'functionName(params)' and can be assigned to each input element using `assignElementFunctions`.
 * @type {Object}
 */
const elementFunctions: ElementFunctions[] = [
	{
		element: 'nameInput',
		func: function () { enableTextMarking() }
	},
	{
		element: 'researchTeam',
		func: function () { researchTeam(); docBy() }
	},
	{
		element: 'civ',
		func: function () { civ() }
	},
	{
		element: 'portalglyphsInput',
		func: function () { glyphInputOnChange(this as unknown as HTMLInputElement); displayGlyphs(); enableTextMarking() }
	},
	{
		element: 'discoveredInput',
		func: function () { hideDiscoverer("discoveredInput", "discoveredlinkInput"); docBy() }
	},
	{
		element: 'discoveredlinkInput',
		func: function () { hideDiscoverer("discoveredlinkInput", "discoveredInput"); docBy() }
	},
	{
		element: 'docbyInput',
		func: function () { docBy() }
	},
	{
		element: 'axesInput',
		handler: 'change',
		func: function () { validateCoords() }
	},
]

export default elementFunctions;