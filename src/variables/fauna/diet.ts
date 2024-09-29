import type { SelectOption } from '@/types/selectInputOptions';
import creatureDietDatalist from '@/datalists/creatureDietDatalists';

// export const mappedModeOptions: SelectOption[] = Object.entries(creatureDietDatalist).map(([key, value]) => ({
//     label: value,
//     value: key,
// }));

export const mappedModeOptions: SelectOption[] = Object.entries(creatureDietDatalist).map(([key]) => ({
  label: key,
  value: key,
}));
