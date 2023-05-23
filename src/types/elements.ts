export interface ElementFunction {
	element: string | HTMLElement;
	handler?: keyof HTMLElementEventMap;
	prio?: boolean;
	func: () => void;
}

export type ElementFunctions = Array<ElementFunction>;

export type AnyHTMLElement<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[T];
export type GlobalElement = AnyHTMLElement | AnyHTMLElement[];

export interface ElementId {
	[key: string]: string;
}

export interface ElementIds {
	input?: ElementId,
	output?: ElementId,
}

export interface GlobalElements {
	input: { [key: string]: GlobalElement },
	output: { [key: string]: GlobalElement },
}