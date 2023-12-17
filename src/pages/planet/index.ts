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
			<li>Paisaje/Landscape</li>
			<li>Vista nocturna/Night View</li>
			<li>Sistema de cuevas/Cave System</li>
			<li>Zona Costera/Coast Area</li>
			<li>Bajo el mar/Underwater</li>
			<li>Visor de análisis/Analysis Visor</li>
			<li>Guía de exploración planetaria/Planet Exploration Guide</li>
			<li>Página del planeta/Planet Page</li>
			<li>Página del sistema/System Page</li>
			<li>Mapa galáctico/Galaxy Map</li>
		</ol>
	</div>`
);
