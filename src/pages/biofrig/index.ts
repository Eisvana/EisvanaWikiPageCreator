import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { albumFunctions } from "../../modules/albumactions";
import { globalFunctions } from "../../variables/objects";
import { addInfo, albumItemTypeExternal, albumOtherExternal, generateCatalogue, locRegNr } from './biofrig';
import frigateElementFunctions from "./elementFunctions";
import { addStaticPageData } from "../../common";
import '../../startup';

globalFunctions.albumOtherExternal = () => albumOtherExternal();
globalFunctions.albumItemTypeExternal = () => albumItemTypeExternal();

addStaticPageData('galleryExplanationExternal', `
Hay un orden preferido de imágenes de la galería:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Vista trasera de la fragata</li>
			<li>Pantalla de interacción</li>
			<li>Página del sistema</li>
		</ol>
 	</div>`)

addStaticPageData('galleryArray', [
	'',
	'Vista trasera de la fragata',
	'Pantalla de interacción',
	'Página del sistema'
])

assignElementFunctions(frigateElementFunctions);

// startupFunctions
locRegNr();
generateCatalogue();
addInfo();
albumFunctions();