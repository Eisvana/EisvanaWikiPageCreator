import type { ElementFunctions } from "../../types/elements";
import { discoverer, enemyCheckboxes, processGlyphs } from "./derelict";

const derelictElementFunctions: ElementFunctions = [
	{
		element: 'portalglyphsInput',
		func: function () { processGlyphs(this as unknown as HTMLInputElement) }
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