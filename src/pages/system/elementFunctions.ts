import { numberStats } from "../../common";
import { wikiCodePercentage, docByExternal } from "../../miscLogic/celestialobjectslogic";
import { ElementFunctions } from "../../types/elements";
import { addTemplate, autoBH, autoPirate, civCatalog, combineEconConf, expectedHubTagSentence, planetInputs, regionLong, searchUpgrades, spaceStationSection } from "./system";

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
]

export default systemElementFunctions;