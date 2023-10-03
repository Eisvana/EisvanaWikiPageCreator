import { image, toggleSection } from "../../common";
import { wikiCodePercentage, docByExternal } from "../../miscLogic/celestialobjectslogic";
import type { ElementFunctions } from "../../types/elements";
import { addTemplate, autoBH, autoPirate, combineEconConf, expectedPrefixSentence, planetInputs, regionLong, searchUpgrades, spaceStationSection, tradeables } from "./system";

const systemElementFunctions: ElementFunctions = [
	{
		element: 'portalglyphsInput',
		func: () => { regionLong(); expectedPrefixSentence(); autoBH() }
	},
	{
		element: ['planetInput', 'moonInput'],
		func: () => planetInputs()
	},
	{
		element: 'nameInput',
		func: () => expectedPrefixSentence()
	},
	{
		element: 'factionInput',
		func: () => { spaceStationSection(); combineEconConf() }
	},
	{
		element: ['economybuyInput', 'economysellInput'],
		func: function () { wikiCodePercentage(this as unknown as HTMLInputElement, 1) }
	},
	{
		element: ['wealthInput', 'conflictInput'],
		func: function () { autoPirate(this as unknown as HTMLSelectElement) }
	},
	{
		element: 'platformInput',
		func: () => docByExternal()
	},
	{
		element: 'systemExtras',
		func: function () { addTemplate(this as unknown as HTMLInputElement) }
	},
	{
		element: 'merchantSearch',
		func: function () { searchUpgrades(this as unknown as HTMLInputElement) }
	},
	{
		element: 'addTradeablesButton',
		handler: 'click',
		func: () => tradeables()
	},
	{
		element: 'hideMTMerchantButton',
		handler: 'click',
		func: function () { toggleSection('MTMerchant', this as unknown as HTMLButtonElement) }
	},
	{
		element: 'hideSSMerchantButton',
		handler: 'click',
		func: function () { toggleSection('SSMerchant', this as unknown as HTMLButtonElement) }
	},
	{
		element: 'hideECMerchantButton',
		handler: 'click',
		func: function () { toggleSection('ECMerchant', this as unknown as HTMLButtonElement) }
	},
	{
		element: 'hideESMerchantButton',
		handler: 'click',
		func: function () { toggleSection('ESMerchant', this as unknown as HTMLButtonElement) }
	},
	{
		element: 'hideSDMerchantButton',
		handler: 'click',
		func: function () { toggleSection('SDMerchant', this as unknown as HTMLButtonElement) }
	},
	{
		element: 'ssFileUpload',
		handler: 'change',
		func: function () { image(this as unknown as HTMLInputElement) }
	},
	{
		element: 'navFileUpload',
		handler: 'change',
		func: function () { image(this as unknown as HTMLInputElement) }
	},
]

export default systemElementFunctions;