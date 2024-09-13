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

const openModal = () => (isHelpModalVisible.value = true);
const helperImage = computed(() => `/src/assets/images/${props.helpImg}.webp`);
</script>

<template>
  <Button
    v-tooltip.top="{
      value: tooltip,
      class: 'has-text-centered',
    }"
    :disabled="!helpTitle"
    :aria-disabled="!helpTitle"
    class="full-opacity"
    icon="pi pi-question-circle"
    severity="secondary"
    rounded
    text
    @click="openModal"
  />

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
          :class="imageHasLoaded ? 'full-opacity' : 'no-opacity'"
          :href="helperImage"
          as="a"
          class="image-wrapper mt-3 is-flex is-flex-direction-column"
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
  </Dialog>
</template>

<style scoped>
.full-opacity {
  opacity: 1 !important;
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

    &:hover {
      text-decoration: underline;
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
