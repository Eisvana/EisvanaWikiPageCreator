import { addInfoBullet, datalists, hideOrgName } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import creatureDatalists from "../../datalists/creatureDatalists";
import { toggleRedirect } from "../../modules/actions";
import { albumFunctions } from "../../modules/albumactions";
import creatureElementFunctions from "./elementFunctions";
import creatureElements from "./elementStore";
import { albumDropdown, bundlePropFunctions, genderDropdown, genusDropdown, genusProduces, hideAlbumEntry, hideCreaturePrio, hideSecGenderProps, noLineBreak, pageName, specialNotes, specialNotesTextFunc } from "./fauna";

updateGlobalElements(creatureElements);
assignElementFunctions(creatureElementFunctions);

datalists(creatureDatalists);

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