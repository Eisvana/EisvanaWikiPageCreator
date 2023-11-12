<script setup lang="ts">
import DebugActions from './DebugActions.vue';
import CreatePageButton from './CreatePageButton.vue';
import CopyArticleButton from './CopyArticleButton.vue';
import { computed, ref, watchEffect } from 'vue';
import { usePageDataStore, useStaticPageDataStore } from '@/stores/pageData';
import { storeToRefs } from 'pinia';
import { sanitiseString } from '@/common';
import { useArticleText } from '@/composables/useArticleText';
import WikiLink from '../structure/WikiLink.vue';

const pageData = usePageDataStore();
const { name, pageName } = storeToRefs(pageData);

const staticPageData = useStaticPageDataStore();
const { fullArticleElement } = storeToRefs(staticPageData);

const sanitisedPageName = computed(() => sanitiseString(name.value));

watchEffect(() => (pageName.value = sanitisedPageName.value));

const downloadFileName = computed(() => pageName.value + '.txt');
const downloadFileData = ref<string | undefined>();

function downloadFile() {
  const { articleText } = useArticleText(fullArticleElement);
  const mimeType = 'data:text/plain';
  downloadFileData.value = articleText.value ? mimeType + ',' + encodeURIComponent(articleText.value) : undefined;
}

const isDev = import.meta.env.DEV;
</script>

<template>
  <p class="has-text-centered">
    You must copy the code first, then paste it into the wiki page.<br />Also don't forget to upload any images you have
    put here.
  </p>
  <div class="buttons">
    <CopyArticleButton />
    <a
      :download="downloadFileName"
      :href="downloadFileData"
      class="button is-outlined is-primary"
      id="download"
      @click="downloadFile"
      >Download File</a
    >
    <WikiLink
      class="button is-outlined is-primary"
      link="Special:Upload?multiple=true"
      text="Upload Pictures"
    />

    <CreatePageButton />
    <button
      class="button is-warning"
      id="reset"
      type="reset"
      @click="pageData.$reset()"
    >
      Reset Inputs
    </button>
    <DebugActions v-if="isDev" />
  </div>
</template>
