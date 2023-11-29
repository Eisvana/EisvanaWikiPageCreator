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
Hay un orden preferido de imágenes:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Visor de análisis</li>
			<li>Guía de exploración del sistema</li>
			<li>Página del sistema</li>
			<li>Multiherramienta predeterminada de la estación espacial</li>
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