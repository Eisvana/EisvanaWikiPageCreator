import { assignElementFunctions } from "../../elementFrontends/elementBackend/elementFunctions";
import { getCurrentYear } from "../../miscLogic/dateLogic";
import baseElementFunctions from "./elementFunctions";
import '../../startup';

assignElementFunctions(baseElementFunctions);

getCurrentYear('censusrenewal');