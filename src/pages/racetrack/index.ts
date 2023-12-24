import { addDomAsElement, researchTeamDropdown, triggerEvent } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import { globalElements } from "../../variables/objects";
import { exocraftCheckboxes, exocraftTableEntry } from "./racetrack";
import derelictElementFunctions from "./elementFunctions";
import derelictElements from "./elementStore";
import { actionsDom } from "../../modules/albumactions";
import '../../startup';


updateGlobalElements(derelictElements);
assignElementFunctions(derelictElementFunctions);

(globalElements.output.exocraftTable as HTMLOutputElement).innerHTML = exocraftTableEntry;
(globalElements.output.exocraftText as HTMLOutputElement).innerHTML = exocraftTableEntry;


/* Adding action buttons */

// save noteId for later
const noteId = 'exocraftTableActionsNote';
const note = `<p id="${noteId}">Si la página ya existe, simplemente agregue una entrada para el carguero abandonado desde su sistema</p>`;
// add note to DOM
actionsDom.body.insertAdjacentHTML('afterbegin', note);


// add actionsDom to real DOM. This clears the actionsDom body
addDomAsElement(actionsDom, globalElements.input.exocraftTableActions as HTMLDivElement, 'afterbegin');


// startupFunctions
const imageInput = globalElements.input.fileInput as HTMLInputElement;
const glyphsInput = globalElements.input.portalglyphsInput as HTMLInputElement;
triggerEvent(imageInput, 'input');
triggerEvent(glyphsInput, 'input');
exocraftCheckboxes();
researchTeamDropdown();

