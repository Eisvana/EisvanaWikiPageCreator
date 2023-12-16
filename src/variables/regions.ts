import type { Regions, Galaxies } from '../types/regions';

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
  'FBF21696': 'Uhcheimri Void',
	'F7EC1D24': 'Becheeth Sector',
	'F9F846D8': 'Emcalh Nebula',
	'F6EC0D23': 'Juhalbe Cluster',
  '0AAEBB96': 'Larinar Boundary',
  '0266CF95': 'Skitco',
};

// Make 'regions' read-only
Object.freeze(regions);

/**
 * An object representing discovery regions and their galaxy names.
 */
export const galaxies: Galaxies = {
  'F7EC0D24': 'Euclid',
  '032FE9B0': 'Euclid',
  'FEA34C10': 'Euclid',
  'F7EC0D25': 'Euclid',
  'F8EBDD24': 'Euclid',
  '0EEC7D10': 'Euclid',
  'FBF21696': 'Eissentam',
  'F7EC1D24': 'Euclid',
  'F9F846D8': 'Euclid',
  'F6EC0D23': 'Euclid',
  '0AAEBB96': 'Euclid',
  '0266CF95': 'Hilbert Dimension',
};
// Make 'galaxies' read-only
Object.freeze(galaxies);
