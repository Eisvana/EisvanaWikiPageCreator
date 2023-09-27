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
	There is a preferred order of gallery pictures, depending on ship type:
	<div class='dialog-center is-flex-wrap-wrap mt-2' style='gap: 1rem'>
		<div>
			<div class='has-text-weight-bold'>Normal Ships:</div>
			<ol class='dialog-list mt-1'>
				<li>Rear view of ship</li>
				<li>Inventory screen</li>
				<li>NPC Ship Pilot</li>
				<li>Analysis Visor Scan</li>
				<li>System Page</li>
			</ol>
		</div>
		<div>
			<div class='has-text-weight-bold'>Living Ships/Interceptors:</div>
			<ol class='dialog-list mt-1'>
				<li>Rear view of ship</li>
				<li>Inventory screen</li>
				<li>Analysis Visor Scan</li>
				<li>Crash site</li>
				<li>Planet/Moon Page</li>
				<li>System Page</li>
			</ol>
		</div>
		<div>
			<div class='has-text-weight-bold'>Freighters:</div>
			<ol class='dialog-list mt-1'>
				<li>Rear view of freighter</li>
				<li>Inventory screen</li>
				<li>NPC freighter captain</li>
				<li>Analysis Visor Scan</li>
				<li>System Page</li>
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