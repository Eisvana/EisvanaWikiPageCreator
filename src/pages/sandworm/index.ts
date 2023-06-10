import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import { albumFunctions } from "../../modules/albumactions";
import sandwormElementFunctions from "./elementFunctions";
import sandwormElements from "./elementStore";
import { globalFunctions, pageData } from "../../variables/objects";
import { generateGalleryArray, albumLinkGen, albumOtherExternal, albumNameExternal, albumCivExternal, albumItemTypeExternal, autoSpawn, catalogue, wormName } from "./sandworm";
import '../../startup';

globalFunctions.generateGalleryArray = () => generateGalleryArray();
globalFunctions.albumLinkGen = () => albumLinkGen();
globalFunctions.albumOtherExternal = () => albumOtherExternal();
globalFunctions.albumNameExternal = () => albumNameExternal();
globalFunctions.albumCivExternal = () => albumCivExternal();
globalFunctions.albumItemTypeExternal = () => albumItemTypeExternal();

pageData.galleryExplanationExternal = `
	The preferred order of pictures is as follows:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Worm scan</li>
			<li>Moon Page</li>
			<li>Planet Page</li>
			<li>System Page</li>
			<li>Galaxy Map</li>
		</ol>
	</div>`

updateGlobalElements(sandwormElements);
assignElementFunctions(sandwormElementFunctions);

// startupFunctions
wormName();
catalogue();
autoSpawn();
albumFunctions();