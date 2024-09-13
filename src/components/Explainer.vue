<script setup lang="ts">
import { computed, ref } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const props = defineProps<{
  helpTitle?: string;
  helpImg?: string;
  tooltip?: string;
}>();

const imageHasLoaded = ref(false);
const isHelpModalVisible = ref(false);

const openModal = () => {
  if (props.helpTitle) isHelpModalVisible.value = true;
};
const helperImage = computed(() => `/src/assets/images/${props.helpImg}.webp`);
</script>

<template>
  <Button
    :aria-disabled="!helpTitle"
    :fluid="false"
    class="tooltip p-2"
    severity="secondary"
    rounded
    text
    @click="openModal"
  >
    <span class="pi pi-question-circle"></span>
    <span class="tooltip-text has-text-centered">{{ tooltip }}</span>
  </Button>

  <Dialog
    v-model:visible="isHelpModalVisible"
    :draggable="false"
    pt:root:class="dialog-wrapper mx-4"
    dismissable-mask
    modal
  >
    <template #header>
      <h2 class="title is-4 has-text-centered full-width mb-0">{{ helpTitle }}</h2>
    </template>

    <div class="is-flex is-flex-direction-column has-text-centered">
      <div>
        <slot></slot>
      </div>

      <div class="transition-container">
        <ProgressSpinner />

        <Button
          :class="{ 'no-opacity': !imageHasLoaded }"
          :href="helperImage"
          as="a"
          class="image-wrapper link mt-3 is-flex is-flex-direction-column"
          rel="noopener noreferrer"
          tabindex="0"
          target="_blank"
          link
        >
          <img
            :src="helperImage"
            alt="Explainer"
            class="help-img full-width"
            @load="imageHasLoaded = true"
          />
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.tooltip {
  overflow: visible;
  aspect-ratio: 1;

  &[aria-disabled='true'] {
    cursor: default;
    background-color: transparent !important;
    outline: none;
  }

  &:hover .tooltip-text,
  &:focus-visible .tooltip-text {
    visibility: visible;
    opacity: 1;
  }

  /* these css variables are undefined without a tooltip on the page! */

  .tooltip-text {
    --width: var(--p-tooltip-max-width);
    background: var(--p-tooltip-background);
    box-shadow: var(--p-tooltip-shadow);
    border-radius: var(--p-tooltip-border-radius);
    bottom: 110%;
    color: var(--p-tooltip-color);
    left: 50%;
    margin-inline-start: calc(var(--width) * -0.5);
    opacity: 0;
    padding: var(--p-tooltip-padding);
    position: absolute;
    text-wrap: balance;
    transition: opacity 0.3s !important;
    visibility: hidden;
    width: var(--width);
    z-index: 1;

    &::after {
      --arrow-width: 6px;
      border: var(--arrow-width) solid transparent;
      border-block-start-color: var(--p-tooltip-background);
      content: '';
      left: 50%;
      margin-inline-start: calc(var(--arrow-width) * -1);
      position: absolute;
      top: 100%;
    }
  }
}

.no-opacity {
  opacity: 0;
}

.transition-container {
  display: grid;
  place-items: center;

  & > * {
    grid-area: 1 / 1;
  }

  .image-wrapper {
    transition: opacity 0.5s;

    &::after {
      content: 'Click to enlarge';
      display: block;
    }

    .help-img {
      aspect-ratio: auto;
      max-height: 500px;
      max-width: 450px;
      min-height: 110px;
      object-fit: contain;
    }
  }
}
</style>
