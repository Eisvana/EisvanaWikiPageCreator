import { assignElementFunctions } from "../../elementFrontends/elementBackend/elementFunctions";
import { getCurrentYear } from "../../miscLogic/dateLogic";
import baseElementFunctions from "./elementFunctions";

assignElementFunctions(baseElementFunctions);

getCurrentYear('censusrenewal');