<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { wikiLink } from '@/variables/simple';
import { storeToRefs } from 'pinia';
import { usePageDataStore, useStaticPageDataStore } from '@/stores/pageData';
import { useDataValidation } from '@/composables/useDataValidation';

const pageData = usePageDataStore();
const { pageName } = storeToRefs(pageData);

const staticPageData = useStaticPageDataStore();
const { debug } = storeToRefs(staticPageData);

const pageLink = ref<string | undefined>();
const isValid = ref(true);

const buttonStates = reactive({
  fail: '',
  idle: 'Create Page',
});
const buttonText = ref(buttonStates.idle);

function createPage() {
  const { isValidData, message } = useDataValidation(false, debug.value);
  pageLink.value = isValidData.value ? wikiLink + 'Special:EditPage/' + pageName.value : undefined;

  if (isValidData.value) return;
  buttonStates.fail = message.value;
  buttonText.value = buttonStates.fail;
  isValid.value = isValidData.value;

  setTimeout(() => {
    buttonText.value = buttonStates.idle;
    isValid.value = true;
  }, 1500); // NoSonar wait 1.5s before resetting button
}

const elementClass = computed(() => (isValid.value ? 'is-outlined is-primary' : 'is-danger no-interaction'));
</script>

<template>
  <a
    :class="elementClass"
    :href="pageLink"
    class="button"
    id="create"
    rel="noopener noreferrer"
    target="_blank"
    @click="createPage"
    >{{ buttonText }}</a
  >
</template>
