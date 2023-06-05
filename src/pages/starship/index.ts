import { addStaticPageData, enPrefix } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import { toggleRedirect } from "../../modules/actions";
import { albumFunctions } from "../../modules/albumactions";
import { globalElements } from "../../variables/objects";
import starshipElementFunctions from "./elementFunctions";
import starshipElements from "./elementStore";
import { subtypeDropdown, showHideStarshipSelects, shipStats, addInfo, appearanceDropdowns, calcS, introType, loc } from "./starship";
import '../../startup';

addStaticPageData('huburbs', true);

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