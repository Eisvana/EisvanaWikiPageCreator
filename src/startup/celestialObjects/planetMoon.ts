import { triggerEvent } from '../../common';
import { assignElementFunctions } from '../../commonElements/elementBackend/elementFunctions';
import { updateGlobalElements } from '../../commonElements/elementBackend/elementStore';
import { autoInfested } from '../../miscLogic/celestialobjectslogic';
import { wormAlbumName, wormAutoSpawn } from '../../miscLogic/planetMoonLogic';
import { globalElements, globalFunctions } from '../../variables/objects';
import './celestialObjects';
import planetMoonElementFunctions from './planetMoonElementFunctions';
import planetMoonElements from './planetMoonElementStore';

console.log("planetmoon")

updateGlobalElements(planetMoonElements);
assignElementFunctions(planetMoonElementFunctions);

triggerEvent((globalElements.input.resourceInputs as HTMLDivElement).querySelector('button') as HTMLButtonElement, 'click')
autoInfested();
wormAutoSpawn();
wormAlbumName();
if (typeof globalFunctions.planetStartupFunctions == 'function') globalFunctions.planetStartupFunctions();