import type { SelectOption } from '@/types/selectInputOptions';
import creatureBehavioursDatalist from '@/datalists/creatureDatalists3';

// export const mappedModeOptions: SelectOption[] = Object.entries(creatureBehavioursDatalist).map(([key, value]) => ({
//     label: value,
//     value: key,
// }));

export const mappedModeOptions: SelectOption[] = Object.entries(creatureBehavioursDatalist).map(([key]) => ({
  label: key,
  value: key,
}));
