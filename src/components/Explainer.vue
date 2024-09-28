<script setup lang="ts">
import { computed, ref } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import DialogWrapper from './DialogWrapper.vue';

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
  <div>
    <Button
      :aria-disabled="!helpTitle"
      :fluid="false"
      class="tooltip"
      severity="secondary"
      rounded
      text
      @click="openModal"
    >
      <span class="pi pi-question-circle"></span>
      <span class="tooltip-text has-text-centered">{{ tooltip }}</span>
    </Button>
  </div>

  <DialogWrapper
    v-model="isHelpModalVisible"
    dismissable-mask
    closable
  >
    <template #header>
      <h2 class="title is-4 has-text-centered full-width mb-0">{{ helpTitle }}</h2>
    </template>

    <div class="is-flex is-flex-direction-column has-text-centered">
      <div>
        <slot></slot>
      </div>

      <div
        v-if="helpImg"
        class="transition-container"
      >
        <ProgressSpinner />

        <Button
          :class="{ 'no-opacity': !imageHasLoaded }"
          :href="helperImage"
          as="a"
          class="image-wrapper link mt-3 is-flex is-flex-direction-column"
          rel="noopener noreferrer"
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
  </DialogWrapper>
</template>

<style scoped>
.tooltip {
  overflow: visible;
  aspect-ratio: 1;
  /* This is the highest value I can go with the padding before changing the box size */
  padding: 0.46rem;

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

  .tooltip-text {
    --p-tooltip-max-width: 12.5rem;
    --p-tooltip-background: var(--p-surface-700);
    --p-tooltip-shadow: var(--p-overlay-popover-shadow);
    --p-tooltip-border-radius: var(--p-overlay-popover-border-radius);
    --p-tooltip-color: var(--p-surface-0);
    --p-tooltip-padding: 0.5rem 0.75rem;

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
