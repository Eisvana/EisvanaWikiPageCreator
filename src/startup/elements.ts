import { assignElementFunctions } from "../elementFrontends/elementBackend/elementFunctions";
import { addInputs, addOutputs, updateGlobalElements } from "../elementFrontends/elementBackend/elementStore";
import elementFunctions from "../elementFrontends/elementFunctionsFrontend";
import elementIds from "../elementFrontends/elementStoreFrontend";
import { addAllTooltips } from "../modules/tooltip";
import { ElementIds } from "../types/elements";
import { globalElements } from "../variables/objects";

addInputs();
addOutputs();
updateGlobalElements(elementIds);

assignElementFunctions(elementFunctions);

addAllTooltips();

// handle dialog stuff
const dialogElements: ElementIds = {
	output: {
		explanationHeading: 'explanationHeading',
		explanationContent: 'explanationContent',
		explanationLink: 'explanationLink',
		explanationImg: 'explanationImg',
	}
}

const content = `<h2 id="explanationHeading" class="title is-4"></h2>
<div id="explanationContent" class="nms-font"></div>
<a id="explanationLink" target='_blank' rel='noopener noreferrer'>
	<img id="explanationImg" alt='Explainer Image'>
</a>
<form method="dialog">
	<button class="button" type="submit" autofocus>Close</button>
</form>`;

const explanationElement = globalElements.output.explanation as HTMLDialogElement;
if (explanationElement) explanationElement.innerHTML = content;

updateGlobalElements(dialogElements);
