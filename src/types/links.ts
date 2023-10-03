import type { StdObj } from "./objects";

export interface LinkObj {
	[key: string]: ResourceAndCreatureLinks | PlanetPropResourceLinks | BiomeLinks | StdObj;
}

export type LinkObjValues = LinkObj[keyof LinkObj];

export interface ResourceAndCreatureLinks {
	[key: string]: StdObj;
}

export interface PlanetPropResourceLinks {
	[key: string]: {
		[key: string]: StdObj;
	}
}

export interface BiomeLinks {
	[key: string]: boolean;
}