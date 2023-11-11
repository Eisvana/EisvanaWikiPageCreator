<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useArticleText } from '../../composables/useArticleText';
import { storeToRefs } from 'pinia';
import { useDataValidationStore } from '@/stores/dataValidation';
import { useStaticPageDataStore } from '@/stores/pageData';
import { useDataValidation } from '@/composables/useDataValidation';
import { hashPageData } from '@/common';

const dataValidationStore = useDataValidationStore();
const { text, copy } = storeToRefs(dataValidationStore);

const staticPageData = useStaticPageDataStore();
const { fullArticleElement, debug } = storeToRefs(staticPageData);

const isValid = ref(true);
const isClicked = ref(false);

const buttonStates = reactive({
  fail: '',
  idle: 'Copy Code',
  success: 'Copied!',
});
const buttonText = ref(buttonStates.idle);

function copyArticle() {
  text.value = hashPageData();
  copy.value = true; // set to true to pass the validation check

  const { isValidData, message } = useDataValidation(debug.value); // sets `copy` to false again
  const { articleText } = useArticleText(fullArticleElement);

  navigator.clipboard.writeText(articleText.value ?? '');

  copy.value = true; // set to true again so it passes validation for page creation
  buttonStates.fail = message.value;
  buttonText.value = isValidData.value ? buttonStates.success : buttonStates.fail;
  isClicked.value = true;
  isValid.value = isValidData.value;

  setTimeout(() => {
    buttonText.value = buttonStates.idle;
    isValid.value = true;
    isClicked.value = false;
  }, 1500); // NoSonar wait 1.5s before resetting button
}

const elementClass = computed(() => {
  const clickText = isClicked.value ? 'no-interaction' : '';
  const colourClass = isValid.value ? 'is-outlined is-primary' : 'is-danger';
  return `${colourClass} ${clickText}`;
});
</script>

<template>
  <button
    :class="elementClass"
    class="button"
    id="copy"
    type="button"
    @click="copyArticle"
  >
    {{ buttonText }}
  </button>
</template>
