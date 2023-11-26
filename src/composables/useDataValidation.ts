import { hashPageData } from '@/common';
import { useDataValidationStore } from '@/stores/dataValidation';
import { usePageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export function useDataValidation(simple: boolean = false, override: boolean | undefined = false) {
  const pageData = usePageDataStore();
  const { name, glyphs } = storeToRefs(pageData);

  const dataValidationStore = useDataValidationStore();
  const { text: savedText, copy } = storeToRefs(dataValidationStore);

  const isValidData = ref(false);
  const message = ref('');

  const currentText = hashPageData();

  const condition = Boolean(
    (override && import.meta.env.DEV) ||
      (name.value && glyphs.value && ((currentText === savedText.value && copy.value) || simple))
  );

  const messages = {
    success: '',
    noName: '¡Falta el nombre!',
    wrongGlyphs: '¡Faltan los glifos!',
    notCopied: '¡Copia el código primero!',
  };

  isValidData.value = condition;
  copy.value = false;

  if (condition) {
    message.value = messages.success;
  } else if (!name.value) {
    message.value = messages.noName;
  } else if (!glyphs.value) {
    message.value = messages.wrongGlyphs;
  } else {
    message.value = messages.notCopied;
  }

  return { isValidData, message };
}
