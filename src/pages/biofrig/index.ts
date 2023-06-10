import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { albumFunctions } from "../../modules/albumactions";
import { globalFunctions, pageData } from "../../variables/objects";
import { addInfo, albumItemTypeExternal, albumOtherExternal, generateCatalogue, generateGalleryArray, locGalaxy, locHubNr } from './biofrig';
import frigateElementFunctions from "./elementFunctions";
import '../../startup';

globalFunctions.albumOtherExternal = () => albumOtherExternal();
globalFunctions.albumItemTypeExternal = () => albumItemTypeExternal();
globalFunctions.generateGalleryArray = () => generateGalleryArray();

pageData.galleryExplanationExternal = `
	There is a preferred order of gallery pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Rear view of frigate</li>
			<li>Interaction screen</li>
			<li>System Page</li>
		</ol>
 	</div>`;

assignElementFunctions(frigateElementFunctions);

// startupFunctions
locHubNr();
locGalaxy();
generateCatalogue();
addInfo();
albumFunctions();