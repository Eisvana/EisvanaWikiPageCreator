import { toggleSection } from "../../common";
import { albumDiscoverer, albumName, albumOther } from "../../modules/albumactions";
import type { ElementFunctions } from "../../types/elements"
import { addInfo, appearance, locRegNr } from "./biofrig";

const frigateElementFunctions: ElementFunctions = [
	{
		element: 'nameInput',
		func: () => { albumName(); appearance() }
	},
	{
		element: 'portalglyphsInput',
		func: () => locRegNr()
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