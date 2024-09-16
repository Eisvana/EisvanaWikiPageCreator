import { mapWealth } from '@/helpers/selectMapping';

// the keys are capitalised because they will appear as section headings
export const wealth = {
  High: ['Advanced', 'Affluent', 'Booming', 'Flourishing', 'High Supply', 'Opulent', 'Prosperous', 'Wealthy'],
  Medium: [
    'Adequate',
    'Balanced',
    'Comfortable',
    'Developing',
    'Medium Supply',
    'Promising',
    'Satisfactory',
    'Sustainable',
  ],
  Low: ['Declining', 'Destitute', 'Failing', 'Fledgling', 'Low Supply', 'Struggling', 'Unsuccessful', 'Unpromising'],
  Outlaw: ['Black Market'],
} as const satisfies Record<string, string[]>;

export const mappedWealthOptions = mapWealth(wealth);
