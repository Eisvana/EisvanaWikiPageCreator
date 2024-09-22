import type { SelectOption } from '@/types/selectInputOptions';

export const modes = ['Normal', 'Creative', 'Relaxed', 'Survival', 'Permadeath', 'Custom'] as const;

export const mappedModeOptions: SelectOption[] = modes.map((mode) => ({ label: mode, value: mode }));
