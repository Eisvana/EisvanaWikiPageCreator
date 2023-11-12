import type { Regions } from '../types/regions';

/**
 * An object representing discovery regions and their associated names.
 */
export const regions: Regions = {
  A21117FF: 'Flinus',
  A11117FF: 'Imnito',
  A11127FF: 'Hiuccli',
  A21127FF: 'Insesu',
  A21107FF: 'Cuynteto',
  A21107FE: 'Uskabar',
  A21117FE: 'Ziwananau',
};

// Make 'regions' read-only
Object.freeze(regions);
