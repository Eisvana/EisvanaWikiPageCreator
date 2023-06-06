import { datalists, enPrefix } from "../../common";
import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import businessElementFunctions from "./elementFunctions";
import businessElements from "./elementStore";
import { globalFunctions } from "../../variables/objects";
import { resetExternal } from "./business";
import '../../startup';

globalFunctions.resetExternal = () => resetExternal();

updateGlobalElements(businessElements);
assignElementFunctions(businessElementFunctions);


const currencyDatalist = {
	currencies: ['{{CurrencyHubCoin}}']
}
datalists(currencyDatalist);

// startupFunctions
const input = document.getElementById('currencyInput') as HTMLInputElement;
enPrefix(input.value, 'enPrefix');
