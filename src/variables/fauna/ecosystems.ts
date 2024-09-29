import type { SelectOption } from '@/types/selectInputOptions';

const InEnglish = ['Ground', 'Flying', 'Underwater', 'Underground'] as const;
// const InSpanish = ['Terrestre', 'Voladora', 'Submarina', 'Subterránea'] as const;

export const mappedModeOptions: SelectOption[] = InEnglish.map((InEnglish) => ({ label: InEnglish, value: InEnglish }));
