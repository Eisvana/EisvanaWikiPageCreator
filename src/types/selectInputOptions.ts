export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectOptionGroup {
  groupLabel: string;
  items: (SelectOption | string)[];
}
