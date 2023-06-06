import { image, numberStats, toggleSection } from "../../common";
import { albumName, albumOther, albumDiscoverer, albumItemType } from "../../modules/albumactions";
import { ElementFunctions } from "../../types/elements";
import { MTType, acquirementAlbumBundle, acquirementBundle, acquirementGallery, addInfo, appearance, autoMTType, autoSentinel, hideCost, hideLocName, hideSrLocName, locGalaxy, locHubNr, showSizeDropdown } from "./multitool";

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
		func: () => { addInfo(); appearance(); autoMTType(); showSizeDropdown(); MTType(); albumItemType(); albumOther() }
	},
	{
		element: 'sizeInput',
		func: () => { showSizeDropdown(); MTType(); albumOther() }
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
		element: 'srInput',
		func: () => acquirementBundle()
	},
	{
		element: 'planetInput',
		func: () => acquirementBundle()
	},
	{
		element: 'moonInput',
		func: () => acquirementBundle()
	},
	{
		element: 'axesInput',
		func: () => acquirementAlbumBundle()
	},
	{
		element: 'dmgInput',
		func: function () { numberStats(this as unknown as HTMLInputElement, 1, true) }
	},
	{
		element: 'scanInput',
		func: function () { numberStats(this as unknown as HTMLInputElement, 1, true) }
	},
	{
		element: 'costInput',
		func: function () { numberStats(this as unknown as HTMLInputElement) }
	},
	{
		element: 'slotsInput',
		func: function () { numberStats(this as unknown as HTMLInputElement); albumOther() }
	},
	{
		element: 'classInput',
		func: () => albumOther()
	},
	{
		element: 'srImgInput',
		func: () => acquirementGallery()
	},
	{
		element: 'sysImgInput',
		func: () => acquirementGallery()
	},
	{
		element: 'cabInput',
		func: () => acquirementGallery()
	},
	{
		element: 'coordsInput',
		func: () => acquirementGallery()
	},
	{
		element: 'srImgUpload',
		handler: 'change',
		func: function () { image(this as unknown as HTMLInputElement); acquirementGallery() }
	},
	{
		element: 'sysImgUpload',
		handler: 'change',
		func: function () { image(this as unknown as HTMLInputElement); acquirementGallery() }
	},
	{
		element: 'cabUpload',
		handler: 'change',
		func: function () { image(this as unknown as HTMLInputElement); acquirementGallery() }
	},
	{
		element: 'coordsUpload',
		handler: 'change',
		func: function () { image(this as unknown as HTMLInputElement); acquirementGallery() }
	},
	{
		element: 'portalglyphsInput',
		func: () => locHubNr()
	},
	{
		element: 'discoveredInput',
		func: () => albumDiscoverer()
	},
	{
		element: 'discoveredlinkInput',
		func: () => albumDiscoverer()
	},
	{
		element: 'mainColourInput',
		func: () => appearance()
	},
	{
		element: 'secColourInput',
		func: () => appearance()
	},
	{
		element: 'hideAppearanceButton',
		handler: 'click',
		func: function () { toggleSection('appearance', this as unknown as HTMLButtonElement) }
	},
]

export default MTElementFunctions;