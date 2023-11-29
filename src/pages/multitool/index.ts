import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { albumFunctions } from "../../modules/albumactions";
import { globalFunctions, pageData } from "../../variables/objects";
import MTElementFunctions from "./elementFunctions";
import { acquirementBundle, addInfo, albumDescExternal, albumItemTypeExternal, albumLinkGen, albumOtherExternal, albumTypeExternal, autoMTLoc, generateGalleryArray, hideCost, hideLocName, hideSrLocName, locRegNr, subtypeDropdown } from "./multitool";
import { addStaticPageData, enPrefix } from "../../common";
import '../../startup';

globalFunctions.albumDescExternal = () => albumDescExternal();
globalFunctions.albumOtherExternal = () => albumOtherExternal();
globalFunctions.albumItemTypeExternal = () => albumItemTypeExternal();
globalFunctions.albumTypeExternal = () => albumTypeExternal();
globalFunctions.generateGalleryArray = () => generateGalleryArray();
globalFunctions.albumLinkGen = () => albumLinkGen();

addStaticPageData('galleryExplanationExternal', `
Hay un orden preferido de imágenes:
	<div class='is-flex is-justify-content-center'>
		<ol class='has-text-left'>
			<li>Menú de descubrimiento</li>
			<li>Página de precios</li>
			<li>Estadísticas base</li>
			<li>Asentamiento menor/Pilar centinela/Campamento armónico/Monolito</li>
			<li>Multiherramienta en mano</li>
			<li>Vista en primera persona</li>
		</ol>
	</div>`)

assignElementFunctions(MTElementFunctions);

// startupFunctions
acquirementBundle();
addInfo();
autoMTLoc();
subtypeDropdown();
hideLocName();
hideSrLocName();
locRegNr();
hideCost();
albumFunctions();
enPrefix(pageData.type as string | undefined ?? '', 'enPrefix');