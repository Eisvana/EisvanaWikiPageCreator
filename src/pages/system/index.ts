import { assignElementFunctions } from '../../commonElements/elementBackend/elementFunctions';
import { updateGlobalElements } from '../../commonElements/elementBackend/elementStore';
import { wikiCodePercentage } from '../../miscLogic/celestialobjectslogic';
import { globalElements, globalFunctions } from '../../variables/objects';
import systemElementFunctions from './elementFunctions';
import systemElements from './elementStore';
import { generateGalleryArray, addTemplate, autoPirate, combineEconConf, expectedPrefixSentence, merchantUpgrades, planetInputs, regionLong, resetExternal, searchUpgrades, spaceStationSection } from './system';
import { addStaticPageData, datalists } from '../../common';
import systemDatalists from '../../datalists/systemDatalists';
import '../../startup/celestialObjects';

addStaticPageData('galleryExplanationExternal', `
There is a preferred order of pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Analysis Visor</li>
			<li>System Exploration Guide</li>
			<li>System Page</li>
			<li>Default Space Station Multi-Tool</li>
		</ol>
	</div>`)

globalFunctions.resetExternal = () => resetExternal();
globalFunctions.generateGalleryArray = () => generateGalleryArray();

datalists(systemDatalists);

updateGlobalElements(systemElements);
assignElementFunctions(systemElementFunctions);

// startupFunctions
combineEconConf();
merchantUpgrades();
regionLong();
spaceStationSection();
planetInputs();
expectedPrefixSentence();
addTemplate();
wikiCodePercentage();
autoPirate(globalElements.input.wealthInput as HTMLSelectElement);
(globalElements.input.merchantSearch as Array<HTMLInputElement>).forEach((element: HTMLInputElement) => searchUpgrades(element));