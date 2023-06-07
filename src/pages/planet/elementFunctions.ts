import { ElementFunctions } from "../../types/elements";
import { addMoon } from "./planet";

const planetElementFunctions: ElementFunctions = [
	{
		element: 'addMoonButton',
		handler: 'click',
		func: function () { addMoon(this as unknown as HTMLButtonElement) }
	}
]

export default planetElementFunctions;