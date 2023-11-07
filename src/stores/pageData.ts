import { defineStore } from 'pinia';
import { versions } from '../variables/versions';
import { regions } from '../variables/regions';

interface State {
	release: string;
	name: string;
	picName: string;
	discovered: string;
	discoveredlink: string;
	orgName: string;
	system: string;
	planet: string;
	moon: string;
	glyphs: string;
	type: string;
	biome: string;
	age: string;
	roots: string;
	nutrients: string;
	notes: string;
	elements: string[];
	polymorphic: string;
	discDate: string;
	docBy: string;
	researchteam: string;
	appearance: string;
}

export const usePageDataStore = defineStore('pageData', {
	state: (): State => ({
		release: versions[0],
		name: '',
		picName: '',
		discovered: '',
		discoveredlink: '',
		orgName: '',
		system: '',
		planet: '',
		moon: '',
		glyphs: '',
		type: '',
		biome: '',
		age: '',
		roots: '',
		nutrients: '',
		notes: '',
		elements: [],
		polymorphic: '',
		discDate: '',
		docBy: '',
		researchteam: '',
		appearance: '',
	}),

	getters: {
		isValidGlyphs: (state) => Object.keys(regions).includes(state.glyphs.substring(4)), // NoSonar region glyphs start at index 4. Tests if an address is valid for Eisvana

	}
});