import { enPrefix, numberStats, toggleSection } from "../../common";
import { toggleRedirect } from "../../modules/actions";
import { albumName, albumOther, albumDiscoverer } from "../../modules/albumactions";
import { ElementFunctions } from "../../types/elements";
import { subtypeDropdown, showHideStarshipSelects, shipStats, loc, appearanceSentence, addInfo, introType, appearanceDropdowns, calcInv, calcS, invDropdown } from "./starship";

const starshipElementFunctions: ElementFunctions = [
	{
		element: 'nameInput',
		func: () => { appearanceSentence(); albumName(); toggleRedirect() }
	},
	{
		element: 'civ',
		func: () => { loc(); addInfo() }
	},
	{
		element: 'systemInput',
		func: () => loc()
	},
	{
		element: 'planetInput',
		func: () => { loc(); albumOther() }
	},
	{
		element: 'moonInput',
		func: () => { loc(); albumOther() }
	},
	{
		element: 'portalglyphsInput',
		func: () => loc()
	},
	{
		element: 'axesInput',
		func: () => { loc(); albumOther() }
	},
	{
		element: 'typeInput',
		func: function () { introType(); subtypeDropdown(); showHideStarshipSelects(); shipStats(); appearanceDropdowns(); appearanceSentence(); calcS(); loc(); addInfo(); albumOther(); enPrefix((this as unknown as HTMLSelectElement).value, "enPrefix") }
	},
	{
		element: 'subtypeInput',
		func: () => { invDropdown(); calcInv(); appearanceSentence(); loc() }
	},
	{
		element: 'inventoryInput',
		func: () => { calcS(); albumOther() }
	},
	{
		element: 'economyInput',
		func: () => { calcS(); albumOther() }
	},
	{
		element: 'pilotInput',
		func: () => albumOther()
	},
	{
		element: 'maneuverBInput',
		func: function () { numberStats(this as unknown as HTMLInputElement, 1) }
	},
	{
		element: 'damageBInput',
		func: function () { numberStats(this as unknown as HTMLInputElement, 1) }
	},
	{
		element: 'shieldBInput',
		func: function () { numberStats(this as unknown as HTMLInputElement, 1) }
	},
	{
		element: 'warpBInput',
		func: function () { numberStats(this as unknown as HTMLInputElement, 1) }
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
		element: 'researchTeam',
		func: () => addInfo()
	},
	{
		element: 'mainColourInput',
		func: () => appearanceSentence()
	},
	{
		element: 'secColourInput',
		func: () => appearanceSentence()
	},
	{
		element: 'secPartsInput',
		func: () => appearanceSentence()
	},
	{
		element: 'accessoriesInput',
		func: () => appearanceSentence()
	},
	{
		element: 'miscPartsInput',
		func: () => appearanceSentence()
	},
	{
		element: 'hideAppearanceButton',
		handler: 'click',
		func: function () { toggleSection('appearance', this as unknown as HTMLButtonElement) }
	},
]

export default starshipElementFunctions;