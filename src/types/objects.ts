export interface StdObj {
	[key: string]: string;
}

export interface SortObj {
	[key: string]: unknown;
}

export interface LinkObj {
	[key: string]: string | LinkObj;
}

export interface ResourceLinks {
	[key: string]: {
		[key: string]: string;
	}
}

export interface PlanetPropResourceLinks {
	[key: string]: {
		[key: string]: StdObj;
	}
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

export interface CreatureData {
	ecosystems: {
		[key: string]: {
			[key: string]: {
				commonName: string;
				produces: Array<string>;
			}
		}
	},
	catalogs: {
		[key: string]: {
			[key: string]: Array<string>;
		}
	}
}

export interface PicObj {
	picName?: string;
	desc?: string;
}