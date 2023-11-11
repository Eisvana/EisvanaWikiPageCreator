import { useDataValidationStore } from '@/stores/dataValidation';
import { usePageDataStore } from '@/stores/pageData';
import md5Hex from 'md5-hex';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export function useDataValidation(simple: boolean = false, override: boolean | undefined = false) {
  const pageData = usePageDataStore();
  const { name, glyphs, regionNumber } = storeToRefs(pageData);

  const dataValidationStore = useDataValidationStore();
  const { text: savedText, copy } = storeToRefs(dataValidationStore);

  const isValidData = ref(false);
  const message = ref('');

  const currentText = md5Hex(JSON.stringify(pageData));

  const condition = Boolean(
    (override && import.meta.env.DEV) ||
      (name.value && glyphs.value && regionNumber.value && ((currentText === savedText.value && copy.value) || simple))
  );

  const messages = {
    success: '',
    noName: 'Missing Name!',
    wrongGlyphs: 'Wrong Glyphs!',
    notCopied: 'Copy Code First!',
  };

  isValidData.value = condition;
  copy.value = false;

  if (condition) {
    message.value = messages.success;
  } else if (!name.value) {
    message.value = messages.noName;
  } else if (!glyphs.value || !regionNumber.value) {
    message.value = messages.wrongGlyphs;
  } else {
    message.value = messages.notCopied;
  }

  return { isValidData, message };
}
