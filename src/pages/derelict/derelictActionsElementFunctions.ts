import { copyCode } from "../../modules/actions";
import { albumLink } from "../../modules/albumactions";
import type { ElementFunctions } from "../../types/elements";

const derelictActionsElementFunctions: ElementFunctions = [
	{
		element: 'copyButton',
		handler: 'click',
		func: function () { copyCode(this as unknown as HTMLButtonElement, 'classTableEntry') }
	},
	{
		element: 'openAlbumButton',
		handler: 'click',
		func: function () { albumLink(this as unknown as HTMLAnchorElement) }
	},
]

export default derelictActionsElementFunctions;