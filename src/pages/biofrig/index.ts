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
	There is a preferred order of gallery pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Rear view of frigate</li>
			<li>Interaction screen</li>
			<li>System Page</li>
		</ol>
 	</div>`)

addStaticPageData('galleryArray', [
	'',
	'Rear view of frigate',
	'Interaction screen',
	'System Page'
])

assignElementFunctions(frigateElementFunctions);

// startupFunctions
locRegNr();
generateCatalogue();
addInfo();
albumFunctions();