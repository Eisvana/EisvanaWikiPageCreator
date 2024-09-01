import { mapOptions } from '@/helper/selectMapping';
import { civName } from './civilization';

export const departments = {
  'Wiki Scholars': 'Eisvana Wiki Scholars',
  EBC: 'Eisvana Builder Collective',
} as const;

export const mappedDepartmentOptions = [{ label: '', value: civName }, ...mapOptions(departments)];
