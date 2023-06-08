import { triggerEvent } from '../../common';
import { assignElementFunctions } from '../../commonElements/elementBackend/elementFunctions';
import { updateGlobalElements } from '../../commonElements/elementBackend/elementStore';
import { autoInfested } from '../../miscLogic/celestialobjectslogic';
import { wormAlbumName, wormAutoSpawn } from '../../miscLogic/planetMoonLogic';
import { globalElements } from '../../variables/objects';
import planetMoonElementFunctions from './planetMoonElementFunctions';
import planetMoonElements from './planetMoonElementStore';
import './celestialObjects';

updateGlobalElements(planetMoonElements);
assignElementFunctions(planetMoonElementFunctions);

triggerEvent((globalElements.input.resourceInputs as HTMLDivElement).querySelector('button') as HTMLButtonElement, 'click')
autoInfested();
wormAutoSpawn();
wormAlbumName();