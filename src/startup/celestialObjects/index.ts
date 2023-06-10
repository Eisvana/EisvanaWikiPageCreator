import { datalists, hideOrgName } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { docByExternal } from "../../miscLogic/celestialobjectslogic";
import { locationSentence } from "../../pages/system/system";
import { globalFunctions } from "../../variables/objects";
import celestialObjectElementFunctions from "./elementFunctions";
import planetDatalists from "../../datalists/planetDatalists";
import '..';

globalFunctions.docByExternal = () => docByExternal();

datalists(planetDatalists);

assignElementFunctions(celestialObjectElementFunctions);

hideOrgName();
locationSentence();