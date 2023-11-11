import { updateGlobalElements } from '../../commonElements/elementBackend/elementStore';
import planetElements from './elementStore';
import { autoWater, generateGalleryArray, moonList, resetExternal } from './planet';
import { assignElementFunctions } from '../../commonElements/elementBackend/elementFunctions';
import planetElementFunctions from './elementFunctions';
import { addStaticPageData } from '../../common';
import { globalFunctions } from '../../variables/objects';
import '../../startup/planetMoon';

globalFunctions.generateGalleryArray = () => generateGalleryArray();

document.addEventListener('pageReset', () => resetExternal());

updateGlobalElements(planetElements);
assignElementFunctions(planetElementFunctions);
moonList();
autoWater();

addStaticPageData(
  'galleryExplanationExternal',
  `
There is a preferred order of pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Landscape</li>
			<li>Night View</li>
			<li>Cave System</li>
			<li>Coast Area</li>
			<li>Underwater</li>
			<li>Analysis Visor</li>
			<li>Planet Exploration Guide</li>
			<li>Planet Page</li>
			<li>System Page</li>
			<li>Galaxy Map</li>
		</ol>
	</div>`
);
