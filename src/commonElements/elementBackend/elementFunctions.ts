import { getCurrentHTMLFile } from '../../common';
import type { AnyHTMLElement, ElementFunction, ElementFunctions, GlobalElements } from '../../types/elements';
import { globalElements, pageData, transformedElementFunctions } from '../../variables/objects';
import { getDestElements } from './elementStore';
import { hashElement } from './hashes';

export function assignFunction(dataObject: ElementFunction): void {
	if (Array.isArray(dataObject.element)) {
		const elements = structuredClone(dataObject.element);
		for (const element of elements) {
			dataObject.element = element;
			assignFunction(dataObject);
		}
		return;
	}
	const simplePages = ['about', '', 'flora', 'mineral'];	// excludes the index and about pages from the advanced behaviour. flora is a temporary test for the vue app
	if (!pageData.eventListeners && !simplePages.includes(getCurrentHTMLFile())) {
		transformListenerData(dataObject);
		return;
	}
	const { handler, func } = dataObject;
	const elementId = dataObject.element as keyof GlobalElements;
	const element = getListenerElement(elementId);
	const elementArray = [element];
	const flattenedArray = elementArray.flat();
	for (const element of flattenedArray) {
		const listener: keyof HTMLElementEventMap = getEventHandler(handler, element);
		attachListener(element, listener, func);
	}
}

export function assignElementFunctions(elementFunctions: ElementFunctions) {
	for (const functionObject of elementFunctions) {
		assignFunction(functionObject);
	}
}

function getListenerElement(elementId: string | HTMLElement) {
	if (typeof elementId != 'string') return elementId;

	if (globalElements.input[elementId]) {
		return globalElements.input[elementId];
	}

	return getDestElements(elementId);
}

function getEventHandler(handler: keyof HTMLElementEventMap | undefined, element: HTMLElement) {
	const inputTag = element?.tagName?.toLowerCase();
	const inputType: string = inputTag === 'input' ? (element as HTMLInputElement).type : '';

	return handler ?? (() => {
		if (inputTag === 'select' || inputType === 'radio' || inputType === 'checkbox') {
			return 'change';
		} else {
			return 'input';
		}
	})();
}

export function transformListenerData(dataObj: ElementFunction | ElementFunctions) {
	const sourceArray = [dataObj].flat();

	for (const obj of sourceArray) {
		const htmlElement = getListenerElement(obj.element as string | HTMLElement) as HTMLElement;
		if (Array.isArray(htmlElement) && !htmlElement.length) continue;
		const hashedValue = hashElement(htmlElement);
		const handler = getEventHandler(obj.handler, htmlElement);
		transformedElementFunctions[hashedValue] ??= {};

		if (!transformedElementFunctions[hashedValue][handler]) {
			transformedElementFunctions[hashedValue][handler] = {
				element: htmlElement,
				func: []
			}
		}
		transformedElementFunctions[hashedValue][handler].func[obj.prio ? 'unshift' : 'push'](obj.func);
	}
}

export function attachTransformedListeners() {
	for (const handlerObj of Object.values(transformedElementFunctions)) {
		for (const [handler, obj] of Object.entries(handlerObj)) {
			for (const func of obj.func) {
				const elementArray = [obj.element];
				const flattenedArray = elementArray.flat();
				for (const element of flattenedArray) {
					attachListener(element, handler, func);
					delete element.dataset.hash;
				}
			}
		}
	}
}

export function attachListener(element: AnyHTMLElement<keyof HTMLElementTagNameMap>, listener: string, func: () => void) {
	element?.addEventListener(listener, func);
	const listeners = (element.dataset.listeners) ??= listener;
	const listenerArray = listeners.split(' ');
	if (!listenerArray.includes(listener))
		element.dataset.listeners += ` ${listener}`;
}