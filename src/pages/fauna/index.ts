import { addInfoBullet, addStaticPageData, datalists, hideOrgName } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import creatureDatalists from "../../datalists/creatureDatalists";
import { toggleRedirect } from "../../modules/actions";
import { albumFunctions } from "../../modules/albumactions";
import creatureElementFunctions from "./elementFunctions";
import creatureElements from "./elementStore";
import { albumOtherExternal, addInfo, albumDropdown, bundlePropFunctions, genderDropdown, genusDropdown, genusProduces, hideAlbumEntry, hideCreaturePrio, hideSecGenderProps, noLineBreak, pageName, specialNotes, specialNotesTextFunc, generateGalleryArray, resetExternal } from "./fauna";
import { globalFunctions } from "../../variables/objects";
import { planetMoonSentence } from "../../miscLogic/locationLogic";
import { setTemperamentSentenceDatalist, setBiomeSentenceDatalist, setDietSentenceDatalist } from "./discoveryMenuDatalists";
import '../../startup';

globalFunctions.albumOtherExternal = () => albumOtherExternal();
globalFunctions.generateGalleryArray = () => generateGalleryArray();
globalFunctions.resetExternal = () => resetExternal();

addStaticPageData('galleryExplanationExternal', `
There is a preferred order of pictures:
<div class='dialog-center'>
	<ol class='dialog-list'>
		<li>Gender 1</li>
		<li>Gender 2</li>
		<li>Gender 1 scan</li>
		<li>Gender 2 scan</li>
		<li>Discovery Menu</li>
		<li>Moon Page</li>
		<li>Planet Page</li>
		<li>System Page</li>
		<li>Galaxy Map</li>
	</ol>
</div>`)

datalists(creatureDatalists);

updateGlobalElements(creatureElements);
assignElementFunctions(creatureElementFunctions);

planetMoonSentence(undefined, undefined, true);
genusDropdown();
genderDropdown();
albumDropdown();
hideOrgName();
pageName();
specialNotes();
specialNotesTextFunc();
genusProduces();
addInfo();
addInfoBullet();
hideSecGenderProps();
hideCreaturePrio();
bundlePropFunctions();
hideAlbumEntry();
noLineBreak();
albumFunctions();
toggleRedirect();
setBiomeSentenceDatalist();
setTemperamentSentenceDatalist();
setDietSentenceDatalist();