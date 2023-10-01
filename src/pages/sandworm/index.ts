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
	The preferred order of pictures is as follows:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Worm scan</li>
			<li>Moon Page</li>
			<li>Planet Page</li>
			<li>System Page</li>
			<li>Galaxy Map</li>
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