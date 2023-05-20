import { ElementFunctions, GlobalElement, GlobalElements } from '../../types/elements';
import { globalElements } from '../../variables/objects';
import { getDestElements } from './elementStore';

export function assignFunction(dataObject: ElementFunctions): void {
	const { handler, func } = dataObject;
	const elementId = dataObject.element as keyof GlobalElements;
	const element = (() => {
		if (typeof elementId != 'string') return elementId;
		
		if (globalElements[elementId]) {
			return globalElements[elementId];
		}
		
		return getDestElements(elementId);
	})() as GlobalElement;
	const elementArray = [element];
	const flattenedArray = elementArray.flat();

	for (const element of flattenedArray) {
		const inputTag = element?.tagName?.toLowerCase();
		const inputType: string = inputTag == 'input' ? (element as HTMLInputElement).type : '';
		const listener = handler ?? (() => {
			if (inputTag == 'select' || inputType == 'radio' || inputType == 'checkbox') {
				return 'change';
			} else {
				return 'input';
			}
		})();
		element?.addEventListener(listener, func);
	}
}

export function assignElementFunctions(elementFunctions: ElementFunctions[]) {
	for (const functionObject of elementFunctions) {
		assignFunction(functionObject);
	}
}