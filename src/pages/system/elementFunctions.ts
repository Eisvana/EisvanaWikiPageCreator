import { numberStats, toggleSection } from "../../common";
import { wikiCodePercentage, docByExternal } from "../../miscLogic/celestialobjectslogic";
import { ElementFunctions } from "../../types/elements";
import { addTemplate, autoBH, autoPirate, civCatalog, combineEconConf, expectedHubTagSentence, planetInputs, regionLong, searchUpgrades, spaceStationSection, tradeables } from "./system";

const systemElementFunctions: ElementFunctions = [
	{
		element: 'civ',
		func: () => { regionLong(); expectedHubTagSentence(); civCatalog() }
	},
	{
		element: 'portalglyphsInput',
		func: () => { regionLong(); expectedHubTagSentence(); autoBH() }
	},
	{
		element: ['planetInput', 'moonInput'],
		func: function () { numberStats(this as unknown as HTMLInputElement); planetInputs() }
	},
	{
		element: 'nameInput',
		func: () => expectedHubTagSentence()
	},
	{
		element: 'factionInput',
		func: () => { spaceStationSection(); combineEconConf() }
	},
	{
		element: ['economybuyInput', 'economysellInput'],
		func: function () { wikiCodePercentage(this as unknown as HTMLInputElement) }
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
		element: 'distanceInput',
		func: function () { numberStats(this as unknown as HTMLInputElement) }
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
]

export default systemElementFunctions;