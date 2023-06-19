import { toggleSection } from "../../common";
import { locGalaxy } from "../../miscLogic/locationLogic";
import { albumDiscoverer, albumName, albumOther } from "../../modules/albumactions";
import { ElementFunctions } from "../../types/elements"
import { addInfo, appearance, generateCatalogue, locHubNr } from "./biofrig";

const frigateElementFunctions: ElementFunctions = [
	{
		element: 'civ',
		func: () => { locGalaxy(); addInfo(); appearance(); locHubNr(); generateCatalogue() }
	},
	{
		element: 'nameInput',
		func: () => { albumName(); appearance() }
	},
	{
		element: 'portalglyphsInput',
		func: () => locHubNr()
	},
	{
		element: ['mainColourInput', 'secColourInput', 'tentacleInput'],
		func: () => appearance()
	},
	{
		element: 'researchTeam',
		func: () => addInfo()
	},
	{
		element: 'classInput',
		func: () => albumOther()
	},
	{
		element: 'hideAppearanceButton',
		handler: 'click',
		func: function () { toggleSection('appearance', this as unknown as HTMLButtonElement) }
	},
	{
		element: ['discoveredInput', 'discoveredlinkInput'],
		func: () => albumDiscoverer()
	},
]

export default frigateElementFunctions;