import type { SelectOption } from '@/types/selectInputOptions';
import creatureNotesDatalist from '@/datalists/creatureDatalists2';

// export const mappedModeOptions: SelectOption[] = Object.entries(creatureNotesDatalist).map(([key, value]) => ({
//     label: value,
//     value: key,
// }));

export const mappedModeOptions: SelectOption[] = Object.entries(creatureNotesDatalist).map(([key]) => ({
    label: key,
    value: key,
}));
