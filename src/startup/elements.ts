import { toggleSection } from "../common";
import { assignElementFunctions } from "../commonElements/elementBackend/elementFunctions";
import { addInputs, addOutputs, updateGlobalElements } from "../commonElements/elementBackend/elementStore";
import elementFunctions from "../commonElements/elementFunctionsFrontend";
import elementIds from "../commonElements/elementStoreFrontend";
import { addAllTooltips, explanationContent } from "../modules/tooltip";
import type { ElementIds } from "../types/elements";
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
    explanationWebpImg: 'explanationWebpImg',
    explanationFallbackImg: 'explanationFallbackImg',
  }
}

const explanationElement = globalElements.output.explanation as HTMLDialogElement;
if (explanationElement) explanationElement.innerHTML = explanationContent;

updateGlobalElements(dialogElements);

// mark player inputs
const playerInputIds = [
  'builderInput',
  'builderlinkInput',
  'discoveredInput',
  'discoveredlinkInput'
]
for (const id of playerInputIds) {
  const element = globalElements.input[id] as HTMLInputElement;
  if (!element) continue;
  element.dataset.player = '';
}

toggleSection();