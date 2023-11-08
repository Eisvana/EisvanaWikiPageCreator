<script setup lang="ts">
import DebugActions from './DebugActions.vue';
import { computed } from 'vue';
import { usePageDataStore } from '../../stores/pageData';

const pageData = usePageDataStore();

const props = defineProps<{
  copiedSuccessful: boolean;
  triedCopy: boolean;
}>();

const emit = defineEmits(['copy']);

function emitCopyEvt() {
  emit('copy');
}

const isProd = import.meta.env.PROD;

const copyButtonText = computed(() => {
  const states = {
    success: 'Copied!',
    fail: 'smth went wrong idk',
    notCopied: 'Copy Wikicode',
  };

  if (props.triedCopy) {
    return props.copiedSuccessful ? states.success : states.fail;
  } else {
    return states.notCopied;
  }
});
</script>

<template>
  <p class="has-text-centered">
    You must copy the code first, then paste it into the wiki page.<br />Also don't forget to upload any images you have
    put here.
  </p>
  <div class="buttons">
    <button
      :class="{ 'is-danger': triedCopy && !copiedSuccessful }"
      class="button is-outlined is-primary"
      id="copy"
      type="button"
      data-link="page"
      @click="emitCopyEvt"
    >
      {{ copyButtonText }}
    </button>
    <a
      class="button is-outlined is-primary"
      id="download"
      >Download File</a
    >
    <a
      class="button is-outlined is-primary"
      href="https://nomanssky.fandom.com/wiki/Special:Upload?multiple=true"
      id="uploadLink"
      rel="noopener noreferrer"
      target="_blank"
      >Upload Pictures</a
    >
    <a
      class="button is-outlined is-primary"
      id="create"
      data-link="page"
      >Create Page</a
    >
    <button
      class="button is-warning"
      id="reset"
      type="reset"
      @click="pageData.$reset()"
    >
      Reset Inputs
    </button>
    <DebugActions v-if="!isProd" />
  </div>
</template>
