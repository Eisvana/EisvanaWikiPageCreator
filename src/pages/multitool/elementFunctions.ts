import { enPrefix, image, toggleSection } from "../../common";
import { albumName, albumOther, albumDiscoverer, albumItemType } from "../../modules/albumactions";
import type { ElementFunctions } from "../../types/elements";
import { pageData } from "../../variables/objects";
import { acquirementAlbumBundle, acquirementBundle, acquirementGallery, addInfo, appearance, autoMTLoc, autoMTType, hideCost, hideLocName, hideSrLocName, locRegNr, subtypeDropdown } from "./multitool";

const MTElementFunctions: ElementFunctions = [
	{
		element: 'nameInput',
		func: () => { albumName(); appearance() }
	},
	{
		element: 'typeInput',
		func: () => { addInfo(); autoMTLoc(); subtypeDropdown(); enPrefix(pageData.type as string, 'enPrefix'); albumItemType(); albumOther(); appearance() }
	},
	{
		element: 'subtypeInput',
		func: () => { albumOther(); addInfo(); appearance(); albumItemType() }
	},
	{
		element: 'researchTeam',
		func: () => addInfo()
	},
	{
		element: 'locInput',
		func: function () { acquirementBundle(); hideLocName(); hideCost(); autoMTType() }
	},
	{
		element: 'srlocInput',
		func: () => { acquirementBundle(); hideSrLocName() }
	},
	{
		element: ['srInput', 'planetInput', 'moonInput'],
		func: () => acquirementBundle()
	},
	{
		element: 'axesInput',
		func: () => acquirementAlbumBundle()
	},
	{
		element: ['slotsInput', 'classInput'],
		func: () => albumOther()
	},
	{
		element: ['srImgInput', 'sysImgInput', 'cabInput', 'coordsInput'],
		func: () => acquirementGallery()
	},
	{
		element: ['srImgUpload', 'sysImgUpload', 'cabUpload', 'coordsUpload'],
		handler: 'change',
		func: function () { image(this as unknown as HTMLInputElement); acquirementGallery() }
	},
	{
		element: 'portalglyphsInput',
		func: () => locRegNr()
	},
	{
		element: ['discoveredInput', 'discoveredlinkInput'],
		func: () => albumDiscoverer()
	},
	{
		element: ['mainColourInput', 'secColourInput'],
		func: () => appearance()
	},
	{
		element: 'hideAppearanceButton',
		handler: 'click',
		func: function () { toggleSection('appearance', this as unknown as HTMLButtonElement) }
	},
]

export default MTElementFunctions;