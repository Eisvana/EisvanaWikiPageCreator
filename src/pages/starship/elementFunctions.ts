import { enPrefix, toggleSection } from "../../common";
import { toggleRedirect } from "../../modules/actions";
import { albumName, albumOther, albumDiscoverer } from "../../modules/albumactions";
import type { ElementFunctions } from "../../types/elements";
import { subtypeDropdown, showHideStarshipSelects, shipStats, loc, appearanceSentence, addInfo, introType, appearanceDropdowns, calcInv, calcS, invDropdown, costSlotCalc, toggleHaulerInvDropdown } from "./starship";

const starshipElementFunctions: ElementFunctions = [
	{
		element: 'nameInput',
		func: () => { appearanceSentence(); albumName(); toggleRedirect() }
	},
	{
		element: 'systemInput',
		func: () => loc()
	},
	{
		element: ['planetInput', 'moonInput', 'axesInput'],
		func: () => { loc(); albumOther() }
	},
	{
		element: 'portalglyphsInput',
		func: () => loc()
	},
	{
		element: 'typeInput',
		func: function () { introType(); subtypeDropdown(); showHideStarshipSelects(); shipStats(); appearanceDropdowns(); appearanceSentence(); calcS(); loc(); addInfo(); albumOther(); enPrefix((this as unknown as HTMLSelectElement).value, "enPrefix") }
	},
	{
		element: 'subtypeInput',
		func: () => { invDropdown(); toggleHaulerInvDropdown(); calcInv(); appearanceSentence(); loc(); addInfo() }
	},
	{
		element: ['inventoryInput', 'economyInput'],
		func: () => { calcS(); albumOther(); costSlotCalc() }
	},
	{
		element: 'pilotInput',
		func: () => albumOther()
	},
	{
		element: ['discoveredInput', 'discoveredlinkInput'],
		func: () => albumDiscoverer()
	},
	{
		element: 'researchTeam',
		func: () => addInfo()
	},
	{
		element: ['mainColourInput', 'secColourInput', 'secPartsInput', 'accessoriesInput', 'miscPartsInput'],
		func: () => appearanceSentence()
	},
	{
		element: 'hideAppearanceButton',
		handler: 'click',
		func: function () { toggleSection('appearance', this as unknown as HTMLButtonElement) }
	},
]

export default starshipElementFunctions;