import { numberStats } from "../../common";
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
		func: function () { numberStats(this as unknown as HTMLInputElement, 1); albumOther() }
	},
	{
		element: ['discoveredInput', 'discoveredlinkInput'],
		func: () => albumDiscoverer()
	},
]

export default sandwormElementFunctions;