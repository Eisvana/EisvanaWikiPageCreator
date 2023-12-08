import type { Regions } from '../types/regions';

/**
 * An object representing discovery regions and their associated names.
 */
export const regions: Regions = {
  'F7EC0D24': 'Uekenbe Shallows',
	'032FE9B0': 'Uklots Shallows',
	'FEA34C10': 'Eighba Fringe',
	'F7EC0D25': 'Xecroften',
	'F8EBDD24': 'Areyas',
	'0EEC7D10': 'Sea of Ticrops',
};

// Make 'regions' read-only
Object.freeze(regions);
