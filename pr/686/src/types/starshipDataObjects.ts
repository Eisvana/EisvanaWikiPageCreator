export interface Sections {
	[key: string]: Array<string>;
}

export interface ShipProp {
	Small?: string;
	Medium?: string;
	Large?: string;
	[key: string]: string | undefined;
}

export interface ShipType {
	cost: ShipProp;
	slots: ShipProp;
	techslots: ShipProp;
	subtypes: Array<string> | Sections;
	secParts: Array<string>;
	accessories: Array<string>;
	miscParts: Array<string>;
	sections: Sections;
	[key: string]: ShipProp | Array<string> | Sections
}