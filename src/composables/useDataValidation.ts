import { useDataValidationStore } from '@/stores/dataValidation';
import { usePageDataStore } from '@/stores/pageData';
import md5Hex from 'md5-hex';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export function useDataValidation(override: boolean | undefined = false) {
  const pageData = usePageDataStore();
  const { name, glyphs, regionNumber } = storeToRefs(pageData);

  const dataValidationStore = useDataValidationStore();
  const { text: savedText, copy } = storeToRefs(dataValidationStore);

  const isValidData = ref(false);
  const message = ref('');

  const currentText = md5Hex(JSON.stringify(pageData));

  if (
    (override && import.meta.env.DEV) ||
    (name.value && glyphs.value && regionNumber.value && currentText === savedText.value && copy.value)
  ) {
    copy.value = false;
    isValidData.value = true;
    message.value = '';
  } else if (!name.value) {
    message.value = 'Missing Name!';
  } else if (!glyphs.value || !regionNumber.value) {
    message.value = 'Wrong Glyphs!';
  } else {
    message.value = 'Copy Code First!';
  }

  return { isValidData, message };
}
