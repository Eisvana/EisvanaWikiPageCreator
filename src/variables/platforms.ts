import { mapOptions } from '@/helpers/selectMapping';
import type { SelectOption } from '@/types/selectInputOptions';

export const platforms = {
  PC: 'PC',
  PlayStation: 'PS',
  Xbox: 'XB',
  Switch: 'NS',
} as const;

export const mappedPlatformOptions: SelectOption[] = mapOptions(platforms);
