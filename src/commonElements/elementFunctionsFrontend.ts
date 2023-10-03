import { docBy, enableTextMarking, hideDiscoverer, image, researchTeam, validateCoords } from "../common";
import { deleteCharacter, displayGlyphs, glyphInputOnChange } from "../modules/portalglyphs";
import type { ElementFunctions } from "../types/elements";
import { staticBooleans } from "../variables/objects";

/**
 * An object containing functions to assign to each input element on the page.
 * Functions are in the format 'functionName(params)' and can be assigned to each input element using `assignElementFunctions`.
 * @type {Object}
 */
const elementFunctions: ElementFunctions = [
	{
		element: 'nameInput',
		func: function () { enableTextMarking() }
	},
	{
		element: 'researchTeam',
		func: function () { researchTeam(); docBy() }
	},
	{
		element: 'fileUpload',
		handler: 'change',
		func: function () { image(this as unknown as HTMLInputElement) }
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
	{
		element: 'glyphDeleteButton',
		handler: 'click',
		func: function () { deleteCharacter() }
	},
	{
		element: 'fileUploadTooltip',
		handler: 'click',
		func: function () { staticBooleans.uploadShown = true }
	},
	{
		element: 'galleryFileUploadTooltip',
		handler: 'click',
		func: function () { staticBooleans.galleryUploadShown = true }
	},
]

export default elementFunctions;