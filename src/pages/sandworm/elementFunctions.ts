import { planetMoonSentence } from "../../miscLogic/locationLogic";
import { albumName, albumOther, albumDiscoverer } from "../../modules/albumactions";
import type { ElementFunctions } from "../../types/elements";
import { catalogue, wormName, autoSpawn } from "./sandworm";

const sandwormElementFunctions: ElementFunctions = [
	{
		element: ['planetInput', 'moonInput'],
		func: () => { wormName(); planetMoonSentence(undefined, undefined, true); albumName() }
	},
	{
		element: 'autoSpawn',
		func: () => autoSpawn()
	},
	{
		element: 'researchTeam',
		func: () => catalogue()
	},
	{
		element: 'wormclassInput',
		func: () => albumName()
	},
	{
		element: ['wormmaxdepthInput', 'wormstomachInput'],
		func: () => albumOther()
	},
	{
		element: ['discoveredInput', 'discoveredlinkInput'],
		func: () => albumDiscoverer()
	},
]

export default sandwormElementFunctions;