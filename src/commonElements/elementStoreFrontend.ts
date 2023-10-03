import type { ElementIds } from "../types/elements";

/**
 * An object that defines IDs and names for elements that are consistent across multiple pages.
 * @type {Object}
 * @property {Object} input - An object that contains input elements.
 * @property {Object} output - An object that contains output elements.
 */
const commonElements: ElementIds = {
	input: {
		version: 'versionInput',
		fileInput: 'fileInput',
		fileUpload: 'fileUpload',
		portalglyphsInput: 'portalglyphsInput',
		researchTeam: 'researchteamInput',
		galleryUpload: 'galleryUpload',
	},
	output: {
		output: 'output',
		portalglyphButtons: 'portalglyphButtons',
		galleryItems: 'galleryItems',
		galleryCode: 'galleryCode',
		explanation: 'explanation',
		fullArticle: 'fullArticle',
		actions: 'actions',
		albumActions: 'albumActions',
		albumEntry: 'albumEntry',
		footer: 'footer',
	}
}

export default commonElements;