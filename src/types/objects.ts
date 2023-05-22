export interface SortObj {
	[key: string]: unknown;
}

export interface LinkObj {
	[key: string]: string | LinkObj;
}

export interface TransformedElementFunctions {
	[key: string]: {		// ID of HTMLElement
		[key: string]: {	// handler
			element: HTMLElement;
			func: Array<() => void>;
		}
	}
}

export interface Datalist {
	[key: string]: Array<string>;
}