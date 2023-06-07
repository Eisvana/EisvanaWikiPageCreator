import { hideOrgName } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { docByExternal } from "../../miscLogic/celestialobjectslogic";
import { locationSentence } from "../../pages/system/system";
import { ElementFunctions } from "../../types/elements";
import { globalFunctions } from "../../variables/objects";
import '../';

console.log("celestial")

globalFunctions.docByExternal = () => docByExternal();

hideOrgName();
locationSentence();

const celestialObjectElementFunctions: ElementFunctions = [
	{
		element: ['docDateInput', 'discDateInput', 'platformInput'],
		func: () => docByExternal()
	},
	{
		element: 'oldNameInput',
		func: () => hideOrgName()
	},
	{
		element: ['civ', 'portalglyphsInput'],
		func: () => locationSentence()
	},
]

assignElementFunctions(celestialObjectElementFunctions);
