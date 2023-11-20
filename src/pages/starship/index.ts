import { addStaticPageData, enPrefix } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import { toggleRedirect } from "../../modules/actions";
import { albumFunctions } from "../../modules/albumactions";
import { globalElements, globalFunctions } from "../../variables/objects";
import starshipElementFunctions from "./elementFunctions";
import starshipElements from "./elementStore";
import { subtypeDropdown, showHideStarshipSelects, shipStats, addInfo, appearanceDropdowns, calcS, introType, loc, albumTypeExternal, albumOtherExternal, albumLinkGen, generateGalleryArray, resetExternal } from "./starship";
import '../../startup';

globalFunctions.albumTypeExternal = () => albumTypeExternal();
globalFunctions.albumOtherExternal = () => albumOtherExternal();
globalFunctions.albumLinkGen = () => albumLinkGen();
globalFunctions.generateGalleryArray = () => generateGalleryArray();
globalFunctions.resetExternal = () => resetExternal();

addStaticPageData('galleryExplanationExternal', `
Existe un orden preferido de imágenes de la galería, según el tipo de nave:
	<div class='dialog-center is-flex-wrap-wrap mt-2' style='gap: 1rem'>
		<div>
			<div class='has-text-weight-bold'>Nave normal:</div>
			<ol class='dialog-list mt-1'>
				<li>Vista trasera de la nave</li>
				<li>Pantalla de inventario</li>
				<li>Piloto NPC de la nave</li>
				<li>Escaneo de visor de análisis</li>
				<li>Página del sistema</li>
			</ol>
		</div>
		<div>
			<div class='has-text-weight-bold'>Living Ships/Interceptors:</div>
			<ol class='dialog-list mt-1'>
				<li>Vista trasera de la nave</li>
				<li>Pantalla de inventario</li>
				<li>Escaneo de visor de análisis</li>
				<li>Lugar del accidente</li>
				<li>Página Planeta/Luna</li>
				<li>Página del sistema</li>
			</ol>
		</div>
		<div>
			<div class='has-text-weight-bold'>Freighters:</div>
			<ol class='dialog-list mt-1'>
				<li>Vista trasera del carguero</li>
				<li>Pantalla de inventario</li>
				<li>Capitan NPC del carguero</li>
				<li>Escaneo de visor de análisis</li>
				<li>Página del sistema</li>
			</ol>
		</div>
	</div>`)

updateGlobalElements(starshipElements)
assignElementFunctions(starshipElementFunctions);

// startupFunctions
subtypeDropdown();
showHideStarshipSelects();
shipStats();
calcS();
introType();
loc();
addInfo();
appearanceDropdowns();
enPrefix((globalElements.input.typeInput as HTMLSelectElement).value, "enPrefix");
albumFunctions();
toggleRedirect();