import { toggleSection } from "../common";
import { assignElementFunctions } from "../commonElements/elementBackend/elementFunctions";
import { addInputs, addOutputs, updateGlobalElements } from "../commonElements/elementBackend/elementStore";
import elementFunctions from "../commonElements/elementFunctionsFrontend";
import elementIds from "../commonElements/elementStoreFrontend";
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

// mark player inputs
const playerInputIds = [
	'builderInput',
	'builderlinkInput',
	'ownerInput',
	'ownerlinkInput',
	'discoveredInput',
	'discoveredlinkInput'
]
for (const id of playerInputIds) {
	const element = globalElements.input[id] as HTMLInputElement;
	if (!element) continue;
	element.dataset.player = '';
}

toggleSection();