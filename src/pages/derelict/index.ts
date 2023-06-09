import { addStaticPageData, researchTeamDropdown } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import { globalElements } from "../../variables/objects";
import { enemyCheckboxes, setGalaxy, updateGalaxyTableEntry } from "./derelict";
import derelictElementFunctions from "./elementFunctions";
import derelictElements from "./elementStore";
import '../../startup';

addStaticPageData('huburbs', true);

updateGlobalElements(derelictElements);
assignElementFunctions(derelictElementFunctions);

// startupFunctions
setGalaxy((globalElements.input.galaxyInput as HTMLSelectElement).value);
enemyCheckboxes();
researchTeamDropdown();
updateGalaxyTableEntry();