import { addInfoBullet, hideOrgName } from "../../common";
import { toggleRedirect } from "../../modules/actions";
import { albumFunctions } from "../../modules/albumactions";
import { albumDropdown, bundlePropFunctions, genderDropdown, genusDropdown, genusProduces, hideAlbumEntry, hideCreaturePrio, hideSecGenderProps, noLineBreak, pageName, specialNotes, specialNotesTextFunc } from "./fauna";


updateGlobalElements(creatureElements);
assignElementFunctions(creatureElementFunctions);

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