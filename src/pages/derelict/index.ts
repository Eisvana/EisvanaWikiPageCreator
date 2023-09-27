import { addDomAsElement, loadHTML, researchTeamDropdown, triggerEvent } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import { globalElements, globalFunctions } from "../../variables/objects";
import { albumLinkGen, discoverer, enemyCheckboxes, galaxyTableEntry } from "./derelict";
import derelictElementFunctions from "./elementFunctions";
import derelictElements from "./elementStore";
import { actionsDom } from "../../modules/albumactions";
import derelictActionsElementFunctions from "./derelictActionsElementFunctions";
import '../../startup';

globalFunctions.albumLinkGen = () => albumLinkGen();

updateGlobalElements(derelictElements);
assignElementFunctions(derelictElementFunctions);

(globalElements.output.galaxyTable as HTMLOutputElement).innerHTML = galaxyTableEntry;

/* Adding action buttons */

// save noteId for later
const noteId = 'galaxyTableActionsNote';
const note = `<p id="${noteId}">If the page already exists, just add an entry for the derelict freighter from your system</p>`;
// add note to DOM
actionsDom.body.insertAdjacentHTML('afterbegin', note);

// save the innerHTML of the body for later
const domBodyHtml = actionsDom.body.innerHTML;

// add actionsDom to real DOM. This clears the actionsDom body
addDomAsElement(actionsDom, globalElements.input.galaxyTableActions as HTMLDivElement, 'afterbegin');

/* First entry done, starting second entry */

// construct new DOM from old innerHTML, stripping the eventListeners in the process
const newActionsDom = loadHTML(domBodyHtml, {}, derelictActionsElementFunctions) as Document;

// change content and element IDs so they are still unique
const noteElement = newActionsDom.getElementById(noteId);
noteElement!.id = 'indexTableActionsNote';
noteElement!.innerText = `If the page doesn't exist yet, add an entry to the catalogue as well`;

// copy button
const tableBtn = newActionsDom.getElementById('albumBtn');
tableBtn!.id = 'tableBtn';
tableBtn!.dataset.link = 'classTableEntry';
tableBtn!.innerText = 'Copy Index Entry Code';

// open link button
const pageLink = newActionsDom.getElementById('albumLink');
pageLink!.id = 'pageLink';
pageLink!.dataset.link = 'classTableEntry';
pageLink!.innerText = 'Open Index Page';

// add modified elements to real DOM
addDomAsElement(newActionsDom, globalElements.input.classTableActions as HTMLDivElement, 'afterbegin');

/* action buttons added */

// startupFunctions
const imageInput = globalElements.input.fileInput as HTMLInputElement;
const glyphsInput = globalElements.input.portalglyphsInput as HTMLInputElement;
triggerEvent(imageInput, 'input');
triggerEvent(glyphsInput, 'input');
enemyCheckboxes();
researchTeamDropdown();
discoverer();