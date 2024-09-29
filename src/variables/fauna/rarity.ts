import type { SelectOption } from '@/types/selectInputOptions';

const InEnglish = ['Common', 'Uncommon', 'Rare'] as const;
// const InSpanish = ['Común', 'No común', 'Raro'] as const;

export const mappedModeOptions: SelectOption[] = InEnglish.map((InEnglish) => ({ label: InEnglish, value: InEnglish }));
