import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { getCurrentYear } from "../../miscLogic/dateLogic";
import baseElementFunctions from "./elementFunctions";
import '../../startup';

// functions to run at startup
assignElementFunctions(baseElementFunctions);
getCurrentYear('censusrenewal');