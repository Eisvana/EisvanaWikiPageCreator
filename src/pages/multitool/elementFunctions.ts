import { image, toggleSection } from "../../common";
import { albumName, albumOther, albumDiscoverer, albumItemType } from "../../modules/albumactions";
import { ElementFunctions } from "../../types/elements";
import { acquirementAlbumBundle, acquirementBundle, acquirementGallery, addInfo, appearance, autoMTLoc, autoSentinel, hideCost, hideLocName, hideSrLocName, locGalaxy, locHubNr, subtypeDropdown } from "./multitool";

const MTElementFunctions: ElementFunctions = [
	{
		element: 'nameInput',
		func: () => { albumName(); appearance() }
	},
	{
		element: 'civ',
		func: () => { locGalaxy(); addInfo(); appearance(); locHubNr() }
	},
	{
		element: 'typeInput',
		func: () => { addInfo(); appearance(); autoMTLoc(); subtypeDropdown(); albumItemType(); albumOther() }
	},
	{
		element: 'subtypeInput',
		func: () => { albumOther(); addInfo() }
	},
	{
		element: 'researchTeam',
		func: () => addInfo()
	},
	{
		element: 'locInput',
		func: function () { acquirementBundle(); hideLocName(); hideCost(); autoSentinel(this as unknown as HTMLSelectElement) }
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
		func: () => locHubNr()
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