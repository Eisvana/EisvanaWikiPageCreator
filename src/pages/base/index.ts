import { assignElementFunctions } from '../../commonElements/elementBackend/elementFunctions';
import { getCurrentYear } from '../../miscLogic/dateLogic';
import baseElementFunctions from './elementFunctions';
import '../../startup';
import { switchCensusSocialParm } from './base';

assignElementFunctions(baseElementFunctions);

// startupFunctions
getCurrentYear('censusrenewal');
switchCensusSocialParm();
