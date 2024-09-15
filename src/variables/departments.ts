import { mapOptions } from '@/helpers/selectMapping';
import { civName } from './civilization';
import type { SelectOption } from '@/types/selectInputOptions';

export const departments = {
  'Wiki Scholars': 'Eisvana Wiki Scholars',
  EBC: 'Eisvana Builder Collective',
} as const;

export const mappedDepartmentOptions: SelectOption[] = [{ label: '', value: civName }, ...mapOptions(departments)];
