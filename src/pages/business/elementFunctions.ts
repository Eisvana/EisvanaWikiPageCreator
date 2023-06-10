import { hideDiscoverer, enPrefix } from "../../common";
import { ElementFunctions } from "../../types/elements";
import { addSection, fixHC } from "./business";

const businessElementFunctions: ElementFunctions = [
	{
		element: 'ownerInput',
		func: () => { hideDiscoverer("ownerInput", "ownerlinkInput") }
	},
	{
		element: 'ownerlinkInput',
		func: () => { hideDiscoverer("ownerlinkInput", "ownerInput") }
	},
	{
		element: 'currencyInput',
		func: function () { fixHC(this as unknown as HTMLInputElement); enPrefix((this as unknown as HTMLInputElement).value, "enPrefix") }
	},
	{
		element: 'sectionAddButton',
		handler: 'click',
		func: () => addSection()
	},
]

export default businessElementFunctions;