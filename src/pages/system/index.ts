import { assignElementFunctions } from '../../commonElements/elementBackend/elementFunctions';
import { updateGlobalElements } from '../../commonElements/elementBackend/elementStore';
import { wikiCodePercentage } from '../../miscLogic/celestialobjectslogic';
import '../../startup/celestialObjects/celestialObjects';
import { globalElements } from '../../variables/objects';
import systemElementFunctions from './elementFunctions';
import systemElements from './elementStore';
import { addTemplate, autoPirate, civCatalog, combineEconConf, expectedHubTagSentence, merchantUpgrades, planetInputs, regionLong, searchUpgrades, spaceStationSection } from './system';

updateGlobalElements(systemElements);
assignElementFunctions(systemElementFunctions);

// startupFunctions
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