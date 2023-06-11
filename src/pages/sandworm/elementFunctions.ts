import { planetMoonSentence } from "../../miscLogic/locationLogic";
import { albumItemType, albumName, albumOther, albumDiscoverer } from "../../modules/albumactions";
import { ElementFunctions } from "../../types/elements";
import { catalogue, wormName, autoSpawn } from "./sandworm";

const sandwormElementFunctions: ElementFunctions = [
	{
		element: 'civ',
		func: () => { catalogue(); albumItemType() }
	},
	{
		element: ['planetInput', 'moonInput'],
		func: () => { wormName(); planetMoonSentence(); albumName() }
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
		element: 'wormmaxdepthInput',
		func: () => albumOther()
	},
	{
		element: ['discoveredInput', 'discoveredlinkInput'],
		func: () => albumDiscoverer()
	},
]

export default sandwormElementFunctions;