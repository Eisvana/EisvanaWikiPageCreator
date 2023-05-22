import md5Hex from 'md5-hex';

// Can turn HTMLElements into a unique string value.
export function hashElement(element: HTMLElement): string {
	const elementArray = [element].flat();
	const elementHash = md5Hex(elementArray[0].outerHTML);	// hash the outerHTML. We're not using the native crypto API because that's async.
	for (const element of elementArray) {
		element.dataset.hash ||= elementHash;
	}
	return elementArray[0].dataset.hash as string;
}