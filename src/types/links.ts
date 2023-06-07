import { StdObj } from "./objects";

export interface LinkObj {
	[key: string]: ResourceLinks | PlanetPropResourceLinks | BiomeLinks;
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

export interface BiomeLinks {
	[key: string]: boolean;
}