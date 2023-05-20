export interface ElementFunctions {
	element: string | HTMLElement;
	handler?: string;
	func: () => void;
}

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