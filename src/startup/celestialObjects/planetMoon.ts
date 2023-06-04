import { numberStats, triggerEvent } from '../../common';
import { assignElementFunctions } from '../../commonElements/elementBackend/elementFunctions';
import { updateGlobalElements } from '../../commonElements/elementBackend/elementStore';
import { autoInfested } from '../../miscLogic/celestialobjectslogic';
import { addSandwormTemplate, plural, sentinelSentence, wormAlbumName, wormAutoSpawn } from '../../miscLogic/planetMoonLogic';
import { locationSentence } from '../../pages/system/system';
import { ElementFunctions } from '../../types/elements';
import { globalElements, globalFunctions, pageData } from '../../variables/objects';
import './celestialObjects';

triggerEvent((globalElements.input.resourceInputs as HTMLDivElement).querySelector('button') as HTMLButtonElement, 'click')
autoInfested();
wormAutoSpawn();
wormAlbumName();
if (typeof globalFunctions.planetStartupFunctions == 'function') globalFunctions.planetStartupFunctions();

const planetMoonElements = {
	input: {
		resourceInputs: 'resourceInputs',
		autoSpawn: 'autoSpawnInput',
	},
	output: {
		resourceBullets: 'resourceBullets',
		creatures: 'creatures',
		plants: 'plants',
		minerals: 'minerals',
		sandworm: 'sandworm',
	}
}
updateGlobalElements(planetMoonElements);

const planetMoonElementFunctions: ElementFunctions = [
	{
		element: 'civ',
		func: () => wormAlbumName()
	},
	{
		element: 'systemInput',
		func: () => locationSentence()
	},
	{
		element: 'faunaNumberInput',
		func: function () {
			numberStats(this as unknown as HTMLInputElement);
			plural(parseInt(pageData[(this as unknown as HTMLInputElement).dataset.destNoauto as string] as string), 'faunaSentencePlural')
		}
	},
	{
		element: 'sentinelInput',
		func: () => sentinelSentence()
	},
	{
		element: 'descriptionInput',
		func: function () { autoInfested(this as unknown as HTMLInputElement) }
	},
	{
		element: 'sandwormInput',
		func: () => addSandwormTemplate()
	},
	{
		element: 'wormmaxdepthInput',
		func: function () { autoInfested(this as unknown as HTMLInputElement) }
	},
	{
		element: 'autoSpawn',
		func: () => wormAutoSpawn()
	},
]
assignElementFunctions(planetMoonElementFunctions);