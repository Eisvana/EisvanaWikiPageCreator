import { researchTeamDropdown } from "../../common";
import { ElementFunctions } from "../../types/elements";
import { discoverer, enemyCheckboxes, processGlyphs, updateGalaxyTableEntry } from "./derelict";

const derelictElementFunctions: ElementFunctions = [
	{
		element: 'portalglyphsInput',
		func: function () { processGlyphs(this as unknown as HTMLInputElement) }
	},
	{
		element: 'civInput',
		func: function () { researchTeamDropdown(); updateGalaxyTableEntry() }
	},
	{
		element: 'enemiesInput',
		func: () => enemyCheckboxes()
	},
	{
		element: ['discoveredInput', 'discoveredlinkInput'],
		func: () => discoverer()
	},
]

export default derelictElementFunctions;