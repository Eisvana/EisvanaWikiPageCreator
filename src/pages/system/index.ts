import { numberStats } from '../../common';
import { assignElementFunctions } from '../../commonElements/elementBackend/elementFunctions';
import { updateGlobalElements } from '../../commonElements/elementBackend/elementStore';
import { docByExternal, wikiCodePercentage } from '../../miscLogic/celestialobjectslogic';
import '../../startup/celestialObjects/celestialObjects';
import { ElementFunctions } from '../../types/elements';
import { globalElements } from '../../variables/objects';
import { addTemplate, autoBH, autoPirate, civCatalog, combineEconConf, expectedHubTagSentence, merchantUpgrades, planetInputs, regionLong, searchUpgrades, spaceStationSection } from './system';

combineEconConf();
merchantUpgrades();
regionLong();
spaceStationSection();
planetInputs();
expectedHubTagSentence();
civCatalog();
addTemplate();
wikiCodePercentage();
autoPirate(globalElements.input.wealthInput);
(globalElements.input.merchantSearch as Array<HTMLInputElement>).forEach((element: HTMLInputElement) => searchUpgrades(element));

const systemElements = {
	input: {
		planetInput: 'planetNumInput',
		moonInput: 'moonNumInput',
		terminalInputs: 'terminalInputs',
		systemExtras: 'systemExtras',
		merchantSearch: 'merchant-search',
	},
	output: {
		tradeTerminal: 'tradeTerminal',
		planets: 'planets',
		Freighters: 'Freighters',
		Derelict: 'Derelict',
		Organic: 'Organic',
		Starships: 'Starships',
		MTs: 'MTs',
	}
}
updateGlobalElements(systemElements);

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
		element: 'planetInput',
		func: function () { numberStats(this as unknown as HTMLInputElement); planetInputs() }
	},
	{
		element: 'moonInput',
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
		element: 'economybuyInput',
		func: function () { wikiCodePercentage(this as unknown as HTMLInputElement) }
	},
	{
		element: 'economysellInput',
		func: function () { wikiCodePercentage(this as unknown as HTMLInputElement) }
	},
	{
		element: 'wealthInput',
		func: function () { autoPirate(this as unknown as HTMLSelectElement) }
	},
	{
		element: 'conflictInput',
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
assignElementFunctions(systemElementFunctions);