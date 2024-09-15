import { mapWealth } from '@/helpers/selectMapping';

export const wealth = {
  high: ['Advanced', 'Affluent', 'Booming', 'Flourishing', 'High Supply', 'Opulent', 'Prosperous', 'Wealthy'],
  medium: [
    'Adequate',
    'Balanced',
    'Comfortable',
    'Developing',
    'Medium Supply',
    'Promising',
    'Satisfactory',
    'Sustainable',
  ],
  low: ['Declining', 'Destitute', 'Failing', 'Fledgling', 'Low Supply', 'Struggling', 'Unsuccessful', 'Unpromising'],
  outlaw: ['Black Market'],
} as const satisfies Record<string, string[]>;

export const mappedWealthOptions = mapWealth(wealth);
