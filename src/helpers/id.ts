let count = 0;

export const useId = (prefix = 'id-') => `${prefix}${count++}`;
