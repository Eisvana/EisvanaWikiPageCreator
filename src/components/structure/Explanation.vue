<script setup lang="ts">
import { nextTick, ref, watchEffect } from 'vue';

/**
 * Explanation Modal
 * `img` prop is used for the image file path
 * default slot is used for hover popup
 * `heading` slot is used for modal heading
 * `content` slot is used for modal content
 */

const props = defineProps<{
  img?: string;
  open?: boolean;
}>();

const dialogElement = ref<HTMLDialogElement | null>(null);
const imgElement = ref<HTMLImageElement | null>(null);
const linkElement = ref<HTMLAnchorElement | null>(null);

const img = props.img?.trim() ?? '';

const translate = ref('0 -100vh');
const src = ref('');
const opacity = ref(0);
const marginBlockStart = ref(0);

const openedOnce = ref(false);
const loadFailed = ref(false);

const emit = defineEmits(['update:open']);

watchEffect(() => {
  if (props.open) showModal();
});

function showModal() {
  translate.value = '0 -100vh';
  src.value ||= img;
  openedOnce.value ||= true;
  emit('update:open', true);

  // Show the modal with a slide-down animation
  nextTick(() => {
    if (dialogElement.value) {
      dialogElement.value.showModal();
      translate.value = '0 0';
      dialogElement.value.scrollTo(0, 0);
    }
  });
}

function imgOnload() {
  marginBlockStart.value = 1;
  opacity.value = 1;
}
</script>

<template>
  <button
    :aria-disabled="!$slots.content || undefined"
    class="tooltip"
    @click="$slots.content && showModal()"
  >
    <img
      src="/assets/icons/help.svg"
      alt="Help"
    />
    <p class="tooltiptext nms-font"><slot></slot></p>
  </button>

  <Teleport to="body">
    <dialog
      v-if="openedOnce"
      :style="{ translate }"
      class="explanation modal-content content"
      ref="dialogElement"
      @close="$emit('update:open', false)"
    >
      <h2
        id="explanationHeading"
        class="explanationHeading title is-4"
      >
        <slot name="heading"></slot>
      </h2>

      <div
        id="explanationContent"
        class="explanationContent nms-font"
      >
        <slot name="content"></slot>
      </div>
      <a
        v-if="src && !loadFailed"
        :href="`./assets/images/jpg/${src}.jpg`"
        class="explanationLink loading"
        id="explanationLink"
        ref="linkElement"
        rel="noopener noreferrer"
        target="_blank"
      >
        <picture>
          <source
            :srcset="`./assets/images/webp/${src}.webp`"
            class="explanationWebpImg"
            id="explanationWebpImg"
            type="image/webp"
          />
          <img
            :src="`./assets/images/jpg/${src}.jpg`"
            :style="{
              opacity,
              'margin-block-start': marginBlockStart + 'rem',
            }"
            alt="Explainer Image"
            class="explanationFallbackImg"
            id="explanationFallbackImg"
            ref="imgElement"
            @loadstart="loadFailed = false"
            @load="imgOnload"
            @error="loadFailed = true"
          />
        </picture>
      </a>
      <form method="dialog">
        <button
          class="button"
          type="submit"
          autofocus
        >
          Close
        </button>
      </form>
    </dialog>
  </Teleport>
</template>
