import { hideOrgName } from "../../common";
import { docByExternal } from "../../miscLogic/celestialobjectslogic";
import { locationSentence } from "../../pages/system/system";
import type { ElementFunctions } from "../../types/elements";

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
		element: ['portalglyphsInput'],
		func: () => locationSentence()
	},
]

export default celestialObjectElementFunctions;