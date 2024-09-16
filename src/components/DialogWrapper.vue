<script setup lang="ts">
import { syncRefs, useElementBounding, useScrollLock, useWindowSize } from '@vueuse/core';
import Dialog from 'primevue/dialog';
import { computed, ref, watch } from 'vue';

defineProps<{
  closable?: boolean;
  dismissableMask?: boolean;
}>();

const model = defineModel<boolean>({ required: true });

const emit = defineEmits(['show']);

// There is a bug in PrimeVue that causes layout shifts when a modal is shown: https://github.com/primefaces/primevue/issues/6094
// This code compensates for this bug
// This whole scroll killing is only necessary because the <Select> input has some scroll bugs, so scrolling should not happen.
// There is still a tiny move to the left when the modal is dismissed, but I'm not sure how that can be fixed.
const doc = ref(document.documentElement);
const isLocked = useScrollLock(doc);

const { width: windowWidth } = useWindowSize();
const { width: documentWidth } = useElementBounding(doc);

const scrollBarWidth = computed(() => windowWidth.value - documentWidth.value);
watch(model, (newVal) => doc.value.style.setProperty('--p-scrollbar-width', `${newVal ? scrollBarWidth.value : 0}px`));

syncRefs(model, isLocked);
</script>

<template>
  <Dialog
    v-model:visible="model"
    :closable
    :dismissable-mask
    :draggable="false"
    pt:root:class="dialog-wrapper mx-4"
    modal
    @show="emit('show')"
  >
    <template #header>
      <slot name="header"></slot>
    </template>

    <slot></slot>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </Dialog>
</template>
