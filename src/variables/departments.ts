import { mapOptions } from '@/helpers/selectMapping';
import type { SelectOption } from '@/types/selectInputOptions';

export const departments = {
  'Wiki Scholars': 'Eisvana Wiki Scholars',
  EBC: 'Eisvana Builder Collective',
} as const;

export const mappedDepartmentOptions: SelectOption[] = mapOptions(departments);
