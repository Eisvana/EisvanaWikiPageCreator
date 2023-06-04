import { hideOrgName } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { docByExternal } from "../../miscLogic/celestialobjectslogic";
import { locationSentence } from "../../pages/system/system";
import { ElementFunctions } from "../../types/elements";

hideOrgName();
locationSentence();

const celestialObjectElementFunctions: ElementFunctions = [
	{
		element: 'docDateInput',
		func: () => docByExternal()
	},
	{
		element: 'discDateInput',
		func: () => docByExternal()
	},
	{
		element: 'platformInput',
		func: () => docByExternal()
	},
	{
		element: 'oldNameInput',
		func: () => hideOrgName()
	},
	{
		element: 'civ',
		func: () => locationSentence()
	},
	{
		element: 'portalglyphsInput',
		func: () => locationSentence()
	},
]

assignElementFunctions(celestialObjectElementFunctions);
