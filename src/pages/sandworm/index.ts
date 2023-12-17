import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import { albumFunctions } from "../../modules/albumactions";
import sandwormElementFunctions from "./elementFunctions";
import sandwormElements from "./elementStore";
import { globalFunctions } from "../../variables/objects";
import { generateGalleryArray, albumLinkGen, albumOtherExternal, albumNameExternal, albumItemTypeExternal, autoSpawn, catalogue, wormName } from "./sandworm";
import { addStaticPageData } from "../../common";
import { planetMoonSentence } from "../../miscLogic/locationLogic";
import '../../startup';

globalFunctions.generateGalleryArray = () => generateGalleryArray();
globalFunctions.albumLinkGen = () => albumLinkGen();
globalFunctions.albumOtherExternal = () => albumOtherExternal();
globalFunctions.albumNameExternal = () => albumNameExternal();
globalFunctions.albumItemTypeExternal = () => albumItemTypeExternal();

addStaticPageData('galleryExplanationExternal', `
El orden preferido de las imágenes es el siguiente:
<div class='dialog-center'>
<ol class='dialog-list'>
<li>Escaneo de gusanos</li>
<li>Página de la Luna</li>
<li>Página del planeta</li>
<li>Página del sistema</li>
<li>Mapa de galaxias</li>
</ol>
	</div>`)

updateGlobalElements(sandwormElements);
assignElementFunctions(sandwormElementFunctions);

// startupFunctions
wormName();
planetMoonSentence(undefined, undefined, true);
catalogue();
autoSpawn();
albumFunctions();