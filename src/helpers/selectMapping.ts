import type { SelectOption, SelectOptionGroup } from '@/types/selectInputOptions';

export const mapOptions = (mappingObj: Record<string, string>): SelectOption[] =>
  Object.entries(mappingObj).map((item) => ({ label: item[0], value: item[1] }));

export function mapWealth(wealthObj: Record<string, string[]>): SelectOptionGroup[] {
  const entries = Object.entries(wealthObj);
  const mappedOptions = entries.map((item) => ({
    groupLabel: item[0],
    items: item[1],
  }));
  return mappedOptions;
}
