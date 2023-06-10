import { numberStats, researchTeamDropdown } from "../../common";
import { ElementFunctions } from "../../types/elements";
import { enemyCheckboxes, processGlyphs, setGalaxy, updateGalaxyTableEntry } from "./derelict";

const derelictElementFunctions: ElementFunctions = [
	{
		element: 'portalglyphsInput',
		func: function () { processGlyphs(this as unknown as HTMLInputElement) }
	},
	{
		element: 'galaxyInput',
		func: function () { setGalaxy((this as unknown as HTMLSelectElement).value); researchTeamDropdown(); updateGalaxyTableEntry() }
	},
	{
		element: ['roomInput', 'hyperdriveInput', 'fuelInput'],
		func: function () { numberStats(this as unknown as HTMLInputElement) }
	},
	{
		element: 'enemiesInput',
		func: () => enemyCheckboxes()
	},
]

export default derelictElementFunctions;