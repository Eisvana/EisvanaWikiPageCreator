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
  Hay un orden preferido de imágenes.:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Paisaje</li>
			<li>Vista nocturna</li>
			<li>Sistema de cuevas</li>
			<li>Zona Costera</li>
			<li>Bajo el mar</li>
			<li>Visor de análisis</li>
			<li>Guía de exploración planetaria</li>
			<li>Página del planeta</li>
			<li>Página del sistema</li>
			<li>Mapa galáctico</li>
		</ol>
	</div>`
);
