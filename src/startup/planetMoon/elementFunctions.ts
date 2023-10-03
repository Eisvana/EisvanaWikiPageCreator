import { image, toggleSection } from "../../common";
import { autoInfested } from "../../miscLogic/celestialobjectslogic";
import { addFauna, addFlora, addMineral, addResource, addSandwormTemplate, locationSentence, plural, sentinelSentence, wormAutoSpawn } from "../../miscLogic/planetMoonLogic";
import type { ElementFunctions } from "../../types/elements";
import { pageData } from "../../variables/objects";

const planetMoonElementFunctions: ElementFunctions = [
	{
		element: ['systemInput', 'portalglyphsInput'],
		func: () => locationSentence()
	},
	{
		element: 'faunaNumberInput',
		func: function () { plural(parseInt(pageData[(this as unknown as HTMLInputElement).dataset.destNoauto as string] as string), 'faunaSentencePlural') }
	},
	{
		element: 'sentinelInput',
		func: () => sentinelSentence()
	},
	{
		element: ['descriptionInput', 'wormmaxdepthInput'],
		func: function () { autoInfested(this as unknown as HTMLInputElement) }
	},
	{
		element: 'sandwormInput',
		func: () => addSandwormTemplate()
	},
	{
		element: 'sandwormImgUpload',
		handler: 'change',
		func: function () { image(this as unknown as HTMLInputElement) }
	},
	{
		element: 'autoSpawn',
		func: () => wormAutoSpawn()
	},
	{
		element: 'addResourceButton',
		handler: 'click',
		func: function () { addResource(this as unknown as HTMLButtonElement) }
	},
	{
		element: 'faunaToggleButton',
		handler: 'click',
		func: function () { toggleSection('fauna', this as unknown as HTMLButtonElement) }
	},
	{
		element: 'floraToggleButton',
		handler: 'click',
		func: function () { toggleSection('flora', this as unknown as HTMLButtonElement) }
	},
	{
		element: 'mineralToggleButton',
		handler: 'click',
		func: function () { toggleSection('mineral', this as unknown as HTMLButtonElement) }
	},
	{
		element: 'addFaunaButton',
		handler: 'click',
		func: function () { addFauna(this as unknown as HTMLButtonElement) }
	},
	{
		element: 'addFloraButton',
		handler: 'click',
		func: function () { addFlora(this as unknown as HTMLButtonElement) }
	},
	{
		element: 'addMineralButton',
		handler: 'click',
		func: function () { addMineral(this as unknown as HTMLButtonElement) }
	},
]

export default planetMoonElementFunctions;