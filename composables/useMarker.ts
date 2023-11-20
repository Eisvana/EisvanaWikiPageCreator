import { useDataValidation } from './useDataValidation';

export function useMarker() {
  const { isValidData, message } = useDataValidation(true);
  document.body.dataset.mark = isValidData.value.toString();
  return { isValidData, message };
}
