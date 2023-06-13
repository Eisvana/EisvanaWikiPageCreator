import { addStaticPageData, autoShow, enableTextMarking, getCurrentHTMLFile, getSelectedText, preventCopy, showAll, triggerEvent, versionDropdown } from "../common";
import { attachTransformedListeners } from "../commonElements/elementBackend/elementFunctions";
import { readDefaultValues } from "../modules/footer";
import { globalElements, staticBooleans } from "../variables/objects";

const currentHTMLFile = getCurrentHTMLFile();
addStaticPageData('pageType', currentHTMLFile);

autoShow();
readDefaultValues();
versionDropdown();
staticBooleans.uploadShown = true;
staticBooleans.galleryUploadShown = true;
showAll();
if (!staticBooleans.debug) {
	staticBooleans.uploadShown = false;
	staticBooleans.galleryUploadShown = false;
}
enableTextMarking();
const outputColumn = globalElements.output.output as HTMLDivElement;
// the order of the touch and mouse events MUST NOT BE CHANGED!!!
// it will not work the other way around. Touch must be before mouse
// globalElements.output.output.ontouchstart = () => preventCopy();		// this must be first		// this is commented out because it had bad scroll UX on mobile. It should be triggered when tapped, but not when swiped.
outputColumn.onmousedown = () => preventCopy();		// this must be second

for (const section of Array.from(outputColumn.children)) {
	const outputSection = section as HTMLDivElement;
	outputSection.onmouseup = (e) => getSelectedText(e.target as HTMLElement);
	outputSection.ontouchend = (e) => getSelectedText(e.target as HTMLElement);
}

attachTransformedListeners();
try {
	triggerEvent(globalElements.input.portalglyphsInput as HTMLInputElement, 'input');
} catch (error) { /* do nothing */ }
addStaticPageData('eventListeners', true);