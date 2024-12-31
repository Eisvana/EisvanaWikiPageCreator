import type { SelectOption } from '@/types/selectInputOptions';

const InEnglish = ['', 'North', 'South'] as const;
// const InSpanish = ['', 'Norte', 'Sur'] as const;

export const mappedModeOptions: SelectOption[] = InEnglish.map((InEnglish) => ({ label: InEnglish, value: InEnglish }));
