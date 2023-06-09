import { hideOrgName } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { docByExternal } from "../../miscLogic/celestialobjectslogic";
import { locationSentence } from "../../pages/system/system";
import { globalFunctions } from "../../variables/objects";
import celestialObjectElementFunctions from "./elementFunctions";
import '..';

globalFunctions.docByExternal = () => docByExternal();

assignElementFunctions(celestialObjectElementFunctions);

hideOrgName();
locationSentence();