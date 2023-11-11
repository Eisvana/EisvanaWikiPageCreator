import { datalists, triggerEvent } from '../../common';
import { assignElementFunctions } from '../../commonElements/elementBackend/elementFunctions';
import { updateGlobalElements } from '../../commonElements/elementBackend/elementStore';
import { autoInfested } from '../../miscLogic/celestialobjectslogic';
import { resetExternal, wormAlbumName, wormAutoSpawn } from '../../miscLogic/planetMoonLogic';
import { globalElements, globalFunctions } from '../../variables/objects';
import planetMoonElementFunctions from './elementFunctions';
import planetMoonElements from './elementStore';
import floraDatalists from '../../datalists/floraDatalists';
import mineralDatalists from '../../datalists/mineralDatalists';
import '../celestialObjects';

globalFunctions.resetExternal = () => document.dispatchEvent(new Event('pageReset'));

document.addEventListener('pageReset', () => resetExternal());

const datalistObjects = [floraDatalists, mineralDatalists];

datalistObjects.forEach((obj) => datalists(obj));

updateGlobalElements(planetMoonElements);
assignElementFunctions(planetMoonElementFunctions);

triggerEvent(
  (globalElements.input.resourceInputs as HTMLDivElement).querySelector('button') as HTMLButtonElement,
  'click'
);
autoInfested();
wormAutoSpawn();
wormAlbumName();
